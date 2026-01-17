# 一言 API

自用一言API服务，部署于 Cloudflare Pages。

## 🚀 接口说明

随机返回一句话,包含动画、文学、诗词等多种类型。

**接口地址:** `https://your-domain.pages.dev/hitokoto`

> 基于 Cloudflare Functions，支持 `curl` 和浏览器直接访问。

### 📋 请求参数

API支持官方一言格式参数。

| 参数 | 值 | 可选 | 说明 |
|------|----|------|------|
| c | 见后表 | 是 | 句子类型 (a-l) |
| encode | text, json, js, jsonp | 是 | 返回编码 (默认: json) |
| charset | utf-8, gbk | 是 | 字符集 (默认: utf-8) |
| callback | 如: hitokoto | 是 | 调用的异步函数 (JSONP用) |
| select | 默认: .hitokoto | 是 | CSS选择器 (encode=js时使用) |
| min_length | 默认: 0 | 是 | 句子最小长度 (包含) |
| max_length | 默认: 30 | 是 | 句子最大长度 (包含) |

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
curl https://your-domain.com/hitokoto

# 官方格式：获取动画类型
curl https://your-domain.com/hitokoto?c=a

# 官方格式：多个类型
curl https://your-domain.com/hitokoto?c=a&c=b&c=c

# 官方格式：纯文本
curl https://your-domain.com/hitokoto?encode=text

# 官方格式：按长度范围
curl https://your-domain.com/hitokoto?min_length=10&max_length=20

# 官方格式：JSONP格式
curl https://your-domain.com/hitokoto?encode=jsonp&callback=myCallback

# 简化格式：获取动画类型
curl https://your-domain.com/hitokoto?type=a

# 简化格式：纯文本
curl https://your-domain.com/hitokoto?format=text
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
fetch('https://your-domain.pages.dev/hitokoto')
  .then(response => response.json())
  .then(data => {
    document.getElementById('hitokoto').textContent = data.hitokoto;
  });
</script>
```

## 🚀 部署到 Cloudflare Pages

### 方法一: 通过 GitHub 连接 (推荐)

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 进入 **Workers & Pages** → **Create application** → **Pages**
3. 连接你的 GitHub 仓库 `lvcdy/api`
4. 构建设置:
   - **框架预设**: None (或直接使用默认)
   - **构建命令**: 留空
   - **构建输出目录**: `.` (当前目录)
5. 点击 **Save and Deploy**

> 系统会自动识别 `functions` 目录并部署 API 接口。

### 方法二: 使用 Wrangler CLI

```bash
# 安装 Wrangler
npm install -g wrangler

# 登录 Cloudflare
wrangler login

# 部署项目
wrangler pages deploy . --project-name=api
```

## 🛠️ 本地开发

```bash
# 克隆仓库
git clone https://github.com/lvcdy/api.git
cd api

# 使用 Wrangler 本地开发
npx wrangler pages dev .
```

然后访问 `http://localhost:8788/hitokoto`

## 🔄 自动更新

句子库每月自动从 [hitokoto-osc/sentences-bundle](https://github.com/hitokoto-osc/sentences-bundle) 更新一次，确保内容始终保持最新。

## 📚 数据来源

所有一言数据来源于 **[Hitokoto 一言](https://hitokoto.cn/)** 项目的官方句子库 [sentences-bundle](https://github.com/hitokoto-osc/sentences-bundle)。

该项目是一个开源的一言数据库，包含来自动画、漫画、游戏、文学等多个领域的经典句子。感谢 Hitokoto 团队和所有贡献者！

## 📄 License

[LICENSE](LICENSE)
