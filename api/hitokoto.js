(function() {
    // 解析URL参数
    const params = new URLSearchParams(window.location.search);
    const type = params.get('type') || 'random';
    const format = params.get('format') || 'json';
    const callback = params.get('callback') || 'hitokoto';
    
    // 所有可用的句子类型
    const types = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l'];
    
    // 确定要加载的类型
    let selectedType = type === 'random' ? types[Math.floor(Math.random() * types.length)] : type;
    
    // 如果指定的类型无效,使用随机
    if (!types.includes(selectedType)) {
        selectedType = types[Math.floor(Math.random() * types.length)];
    }
    
    // 加载JSON数据
    fetch(`../sentences/${selectedType}.json`)
        .then(response => response.json())
        .then(data => {
            // 随机选择一句
            const sentence = data[Math.floor(Math.random() * data.length)];
            
            // 根据format参数返回不同格式
            if (format === 'text') {
                document.write(sentence.hitokoto);
            } else if (format === 'js' || format === 'jsonp') {
                // JSONP格式
                document.write(callback + '(' + JSON.stringify(sentence) + ')');
            } else {
                // 默认JSON格式
                document.contentType = 'application/json';
                document.write(JSON.stringify(sentence, null, 2));
            }
        })
        .catch(error => {
            const errorResponse = {
                error: '加载失败',
                message: error.message
            };
            
            if (format === 'js' || format === 'jsonp') {
                document.write(callback + '(' + JSON.stringify(errorResponse) + ')');
            } else {
                document.write(JSON.stringify(errorResponse, null, 2));
            }
        });
})();
