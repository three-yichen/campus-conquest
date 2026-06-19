# 大学生制霸生成器

一个纯前端的大学生活经历打卡网页。用户可以为 30 个大学生活项目选择等级，页面会自动计算总分、制霸率和称号，并生成适合截图分享到小红书的结果卡片。

## 功能

- 30 个大学生活项目打卡
- 每个项目支持 0-4 五个等级
- 自动计算当前总分、最大总分、制霸率和称号
- 顶部结果区域适合截图分享
- 支持复制分享文案
- 支持下载分享图 PNG
- 支持重置所有选择
- 使用 localStorage 自动保存进度，刷新后仍会保留

## 等级

- 0：没体验
- 1：体验过
- 2：熟练
- 3：痛苦精通
- 4：已经麻木

## 称号

- 0%-20%：大学新手村
- 20%-40%：校园观察员
- 40%-60%：普通大学生
- 60%-80%：期末周幸存者
- 80%-95%：大学生活制霸者
- 95%-100%：校园传说

## 使用方法

直接双击 `index.html`，用浏览器打开即可使用。

也可以在项目目录中启动任意静态服务器预览，例如：

```bash
python3 -m http.server 8000
```

然后访问：

```text
http://localhost:8000
```

## 下载分享图

页面会把 `.share-poster` 分享卡片导出为 `campus-conquest-report.png`。

项目默认通过本地文件方式引入 `html2canvas`，不使用 CDN。当前仓库中的脚本路径为：

```text
vendor/html2canvas.min.js
```

如果你需要手动补这个文件，可以：

1. 从 `https://html2canvas.hertzen.com/dist/html2canvas.min.js` 下载文件。
2. 在项目根目录创建 `vendor/` 文件夹。
3. 将文件保存为 `vendor/html2canvas.min.js`。
4. 保持 `index.html` 中的这行脚本引用不变：

```html
<script src="vendor/html2canvas.min.js"></script>
```

使用方式：

1. 打开页面后填写你的大学生活等级。
2. 点击“下载分享图”按钮。
3. 浏览器会自动下载 `campus-conquest-report.png`。

降级说明：

- 如果本地 `html2canvas.min.js` 缺失，页面会提示你改用长按或截图保存分享卡片。
- 如果浏览器阻止下载或生成失败，页面也会给出明确失败提示，不会无响应。

## 文件结构

```text
index.html
style.css
main.js
README.md
vendor/html2canvas.min.js
```

## 技术说明

项目只使用原生 HTML、CSS、JavaScript，不依赖 React、Vue、Node 构建工具、后端服务、外部图片、外部字体或第三方 CDN。

主要数据都集中在 `main.js` 顶部常量中：

- `ITEMS`：项目列表
- `LEVELS`：等级列表
- `TITLE_RULES`：称号规则

## 后续计划

- 增加自定义项目
- 增加不同主题配色
- 增加更多校园生活分类

## License

MIT License
