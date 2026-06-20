# 大学生制霸生成器

一个纯前端的大学生活经历打卡网页。用户可以为 30 个大学生活项目选择等级，页面会自动计算总分、制霸率和称号，并生成适合截图分享到小红书的结果卡片。

## v1.0 更新

- 主可视化从“大学副本地图”升级为“抽象校园地图”，以 7 个校园区域展示大学生活点亮进度
- `MAP_AREAS` 保留为常量配置，但区域已重构为：校门广场、教学楼、图书馆、食堂生活区、宿舍区、操场与远方、组织与支线
- 分享海报升级为更接近小红书竖图封面的“大学校园制霸报告”，新增 7 区域迷你校园地图
- 保留 30 个项目数量和顺序，不改变等级玩法，继续兼容基于数组索引的 `localStorage` 存档
- 保留制霸率、称号、人格标签、最强区域、复制分享文案、下载分享图和重置功能

## 功能

- 30 个大学生活项目打卡
- 每个项目支持 0-4 五个等级
- 自动计算当前总分、最大总分、制霸率和称号
- 自动生成大学人格标签、最强校园区域、已制霸项目摘要
- 抽象校园地图实时展示 7 个区域的完成率、状态、进度条和项目 chips
- 分享卡片内置迷你校园地图，适合导出 PNG 后分享
- 支持复制分享文案
- 支持下载分享图 PNG
- 支持重置所有选择
- 使用 `localStorage` 自动保存进度，刷新后仍会保留

## 等级

- 0：没体验
- 1：体验过
- 2：熟练
- 3：痛苦精通
- 4：已经麻木

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
4. 保持 `index.html` 中的脚本引用不变。

## 文件结构

```text
index.html
style.css
main.js
README.md
vendor/html2canvas.min.js
```

## 技术说明

项目只使用原生 HTML、CSS、JavaScript，不依赖 React、Vue、Node 构建工具、后端服务、外部图片、外部字体或新的第三方库。

主要数据都集中在 `main.js` 顶部常量中：

- `ITEMS`：项目列表
- `LEVELS`：等级列表
- `TITLE_RULES`：称号规则
- `TAG_RULES`：人格标签规则
- `MAP_AREAS`：校园地图区域配置

## License

MIT License
