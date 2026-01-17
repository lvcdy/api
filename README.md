# API Service

自用API服务,部署在GitHub Pages上。

## 🚀 功能

### 1. 一言 API (Hitokoto)
随机返回一句话,包含动画、文学、诗词等多种类型。

**接口地址:** `https://lvcdy.github.io/api/api/hitokoto.js`

**参数:**
- `type` - 句子类型(a-l)或random(默认)
- `format` - 返回格式: json(默认)/text/js
- `callback` - JSONP回调函数名

**示例:**
```bash
# 获取随机一言
curl https://lvcdy.github.io/api/api/hitokoto.js

# 获取动画类型
curl https://lvcdy.github.io/api/api/hitokoto.js?type=a

# 仅返回文本
curl https://lvcdy.github.io/api/api/hitokoto.js?format=text
```

### 2. 网站可用性检测 API
检测指定网站是否在线可访问。

**接口地址:** `https://lvcdy.github.io/api/api/status.js`

**参数:**
- `url` - 要检测的网站URL(必填)
- `format` - 返回格式: json(默认)/text/js
- `callback` - JSONP回调函数名

**示例:**
```bash
# 检测网站状态
curl "https://lvcdy.github.io/api/api/status.js?url=https://www.google.com"
```

## 📖 完整文档

访问 [https://lvcdy.github.io/api/](https://lvcdy.github.io/api/) 查看完整的API文档和在线测试。

## 🛠️ 本地开发

```bash
# 克隆仓库
git clone https://github.com/lvcdy/api.git
cd api

# 使用任意HTTP服务器运行
python -m http.server 8000
# 或
npx serve
```

然后访问 http://localhost:8000

## 📝 句子类型

| 类型 | 说明 |
|------|------|
| a | 动画 |
| b | 漫画 |
| c | 游戏 |
| d | 文学 |
| e | 原创 |
| f | 来自网络 |
| g | 其他 |
| h | 影视 |
| i | 诗词 |
| j | 网易云 |
| k | 哲学 |
| l | 抖机灵 |

## 📄 License

[LICENSE](LICENSE)
