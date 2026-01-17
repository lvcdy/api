# 一言 API

自用一言API服务,支持多平台部署（阿里云ESA + Cloudflare Pages）。

## 🚀 接口说明

随机返回一句话,包含动画、文学、诗词等多种类型。

**接口地址:** `https://your-domain.pages.dev/api/hitokoto/hitokoto.html`

> 部署到Cloudflare Pages后，将域名替换为你的实际域名

### 📋 请求参数

API支持官方一言格式和简化格式两种参数风格。

| 参数名 | 简化格式 | 官方格式 | 类型 | 说明 |
|--------|---------|---------|------|------|
| c | type | c | string | 句子类型(a-l)，可多个。不指定则随机 |
| encode | format | encode | string | 返回格式: json(默认)/text/js/jsonp |
| charset | - | charset | string | 字符集: utf-8(默认)/gbk |
| callback | callback | callback | string | JSONP回调函数名 |
| select | - | select | string | JS选择器，encode=js时有效 |
| min_length | - | min_length | number | 返回句子最小长度 |
| max_length | - | max_length | number | 返回句子最大长度 |

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
# 官方格式：获取随机一言(JSON格式)
curl https://your-domain.pages.dev/api/hitokoto/hitokoto.html

# 官方格式：获取动画类型
curl https://your-domain.pages.dev/api/hitokoto/hitokoto.html?c=a

# 官方格式：多个类型
curl https://your-domain.pages.dev/api/hitokoto/hitokoto.html?c=a&c=b&c=c

# 官方格式：纯文本
curl https://your-domain.pages.dev/api/hitokoto/hitokoto.html?encode=text

# 官方格式：按长度范围
curl https://your-domain.pages.dev/api/hitokoto/hitokoto.html?min_length=10&max_length=20

# 官方格式：JSONP格式
curl https://your-domain.pages.dev/api/hitokoto/hitokoto.html?encode=jsonp&callback=myCallback

# 简化格式：获取动画类型
curl https://your-domain.pages.dev/api/hitokoto/hitokoto.html?type=a

# 简化格式：纯文本
curl https://your-domain.pages.dev/api/hitokoto/hitokoto.html?format=text
```

### 📦 返回数据

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

| 字段 | 说明 |
|------|------|
| id | 一言标识 |
| uuid | 一言唯一标识，可链接到 https://hitokoto.cn?uuid=[uuid] 查看 |
| hitokoto | 一言正文(Unicode编码) |
| type | 一言类型 |
| from | 一言出处 |
| from_who | 一言作者 |
| creator | 添加者 |
| creator_uid | 添加者用户ID |
| reviewer | 审核员ID |
| commit_from | 提交方式(web/api) |
| created_at | 添加时间戳 |
| length | 句子长度 |

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
   - **构建输出目录**: `.` (当前目录)
   - **根目录**: `/` (默认)
5. 点击 **Save and Deploy**

系统会自动读取 `esa.jsonc` 和 `build.json` 配置文件。

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

部署完成后，可以在阿里云ESA或Cloudflare设置中添加自定义域名。

## 🌐 多平台分流

该项目支持同时在多个平台部署，实现分流部署的架构：

```
┌─ 阿里云 ESA (主部署)
│  └─ esa.jsonc 配置
│
└─ Cloudflare Pages (备用)
   └─ wrangler.toml / build.json 配置
```

**优势:**
- 高可用性 - 一个平台故障时可快速切换
- 地理分布 - 根据用户位置自动选择最近的节点
- 负载均衡 - 分散流量，提高整体吞吐量
- 成本优化 - 充分利用各平台的免费额度

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
