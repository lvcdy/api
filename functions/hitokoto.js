export async function onRequest(context) {
    const { request, env } = context;
    const url = new URL(request.url);

    // 参数处理
    const params = url.searchParams;
    const c = params.getAll('c');
    const typeParams = params.getAll('type');
    let types = [...c, ...typeParams];

    // 默认类型
    const allTypes = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l'];

    // 过滤有效类型
    types = types.filter(t => allTypes.includes(t));
    if (types.length === 0) {
        types = allTypes; // 默认全选
    }

    // 随机选择一个类型
    const selectedType = types[Math.floor(Math.random() * types.length)];

    // 构造请求内部静态资源的URL
    // 假设 sentences 目录在根目录
    const jsonUrl = `${url.origin}/sentences/${selectedType}.json`;

    try {
        const dataRes = await fetch(jsonUrl);
        if (!dataRes.ok) {
            throw new Error(`Failed to load sentences: ${dataRes.status}`);
        }
        const sentences = await dataRes.json();

        // 筛选长度
        const minLength = parseInt(params.get('min_length') || '0');
        const maxLength = parseInt(params.get('max_length') || '30');

        const filtered = sentences.filter(s => s.length >= minLength && s.length <= maxLength);

        if (filtered.length === 0) {
            return new Response(JSON.stringify({ error: "没有符合条件的句子" }), {
                status: 404,
                headers: { 'Content-Type': 'application/json; charset=utf-8' }
            });
        }

        // 随机抽取
        const sentence = filtered[Math.floor(Math.random() * filtered.length)];

        // 格式化输出
        const encode = params.get('encode') || params.get('format') || 'json';

        if (encode === 'text') {
            return new Response(sentence.hitokoto, {
                headers: { 'Content-Type': 'text/plain; charset=utf-8' }
            });
        } else if (encode === 'js') {
            const select = params.get('select') || '.hitokoto';
            const js = `(function(){var e=document.querySelector('${select}');if(e){e.innerText='${sentence.hitokoto.replace(/'/g, "\\'")}';}})();`;
            return new Response(js, {
                headers: { 'Content-Type': 'application/javascript; charset=utf-8' }
            });
        } else if (encode === 'jsonp') {
            const callback = params.get('callback') || 'hitokoto';
            const jsonp = `${callback}(${JSON.stringify(sentence)})`;
            return new Response(jsonp, {
                headers: { 'Content-Type': 'application/javascript; charset=utf-8' }
            });
        } else {
            return new Response(JSON.stringify(sentence), {
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'Access-Control-Allow-Origin': '*'
                }
            });
        }

    } catch (err) {
        return new Response(JSON.stringify({ error: "Internal Server Error", details: err.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json; charset=utf-8' }
        });
    }
}
