# 一言 API

自用一言API服务,部署在Cloudflare Pages上。

## 🚀 接口说明

随机返回一句话,包含动画、文学、诗词等多种类型。

**接口地址:** `https://your-domain.pages.dev/api/hitokoto/hitokoto.html`

> 部署到Cloudflare Pages后，将域名替换为你的实际域名

### 📋 请求参数

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| type | string | 否 | 句子类型(a-l)或random(默认) |
| format | string | 否 | 返回格式: json(默认)/text/js |
| callback | string | 否 | JSONP回调函数名(format=js时有效) |

### 📝 句子类型

| 类型 | 说明 | 类型 | 说明 |
|------|------|------|------|
| a | 动画 | g | 其他 |
| b | 漫画 | h | 影视 |
| c | 游戏 | i | 诗词 |
| d | 文学 | j | 网易云 |
| e | 原创 | k | 哲学 |
| f | 来自网络 | l | 抖机灵 |

### 💡 使用示例

```bash
# 获取随机一言(JSON格式)
curl https://your-domain.pages.dev/api/hitokoto/hitokoto.html

# 获取动画类型
curl https://your-domain.pages.dev/api/hitokoto/hitokoto.html?type=a

# 仅返回文本
curl https://your-domain.pages.dev/api/hitokoto/hitokoto.html?format=text

# JSONP格式
curl https://your-domain.pages.dev/api/hitokoto/hitokoto.html?format=js&callback=myCallback
```

### 📦 响应示例

```json
{
  "id": 3965,
  "uuid": "3ac5dec2-584b-401c-919d-eef9ea3e6a20",
  "hitokoto": "你的笑像一条恶犬，撞乱了我心弦",
  "type": "g",
  "from": "盗将行",
  "from_who": null,
  "creator": "酷儿",
  "creator_uid": 6,
  "reviewer": 0,
  "commit_from": "web",
  "created_at": "1541653181",
  "length": 15
}
```

### 🌐 在网页中使用

```html
<div id="hitokoto">加载中...</div>

<script>
fetch('https://your-domain.pages.dev/api/hitokoto/hitokoto.html')
  .then(response => response.text())
  .then(data => {
    const sentence = JSON.parse(data);
    document.getElementById('hitokoto').textContent = sentence.hitokoto;
  });
</script>
```

## � 部署到 Cloudflare Pages

### 方法一: 通过 GitHub 连接

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 进入 **Workers & Pages** → **Create application** → **Pages**
3. 连接你的 GitHub 仓库 `lvcdy/api`
4. 构建设置:
   - **框架预设**: None
   - **构建命令**: 留空
   - **构建输出目录**: `.` 或 `/`
   - **根目录**: `/` (默认)
5. 点击 **Save and Deploy**

**重要**: 必须设置 **构建输出目录** 为 `.` 或 `/`，否则会部署失败。

### 方法二: 使用 Wrangler CLI

```bash
# 安装 Wrangler
npm install -g wrangler

# 登录 Cloudflare
wrangler login

# 部署项目
wrangler pages deploy . --project-name=api
```

### 自定义域名

部署完成后，可以在 Cloudflare Pages 设置中添加自定义域名。

## �🛠️ 本地开发

```bash
# 克隆仓库
git clone https://github.com/lvcdy/api.git
cd api

# 使用HTTP服务器运行
python -m http.server 8000
```

然后访问 `http://localhost:8000/api/hitokoto/hitokoto.html`

## � 自动更新

句子库每月自动从 [hitokoto-osc/sentences-bundle](https://github.com/hitokoto-osc/sentences-bundle) 更新一次，确保内容始终保持最新。
## 📚 数据来源

所有一言数据来源于 **[Hitokoto 一言](https://hitokoto.cn/)** 项目的官方句子库 [sentences-bundle](https://github.com/hitokoto-osc/sentences-bundle)。

该项目是一个开源的一言数据库，包含来自动画、漫画、游戏、文学等多个领域的经典句子。感谢 Hitokoto 团队和所有贡献者！
## �📄 License

[LICENSE](LICENSE)
