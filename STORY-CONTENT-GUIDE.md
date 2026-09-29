# Explore Story 内容替换指南

六个物种的杂志文章都集中在根目录的 `story-content.js`。通常只需要修改这个文件和 `assets/stories/` 里的图片，不需要改 HTML、渲染器或样式文件。

请保留每篇记录的 `id` 与 `chapterId`，它们负责把首页卡片连接到正确文章。文字中的中文引号、英文引号、换行和特殊字符会作为普通文字安全显示。

## 1. 修改标题和导语

在对应物种记录中修改这些字段：

```js
year: "在这里填写年份",
title: "在这里填写标题",
englishName: "在这里填写英文名",
scientificName: "在这里填写学名",
habitat: "在这里填写栖息地",
lastLocation: "在这里填写最后记录地点",
introduction: "在这里填写导语",
```

`introduction` 会以比正文更大的字号出现在标题下方。`accent` 是该篇文章的强调色，例如 `accent: "#728e94"`。

## 2. 添加正文段落

在 `blocks: []` 中添加：

```js
{ type: "paragraph", text: "在这里填写正文" },
```

每个对象就是一个可排序区块。要增加段落就复制一项；要改变顺序就移动整个对象。

## 3. 添加图片

在 `blocks: []` 中加入：

```js
{
  type: "image",
  src: "./assets/stories/file-name.jpg",
  alt: "在这里填写图片内容描述",
  caption: "在这里填写图片说明",
  credit: "在这里填写图片来源",
  size: "wide",
  align: "center",
  aspectRatio: "16 / 9",
},
```

如果 `src` 为空、路径写错或文件加载失败，网页会显示“在这里放置图片”和建议比例，不会出现破损图片图标。`caption` 或 `credit` 留空时不会留下多余空白。

## 4. 图片放置目录

所有文章图片统一放进：

```text
assets/stories/
```

建议文件名使用小写英文、数字和连字符，不要使用空格，例如 `baiji-river-01.jpg`。请自行确认使用权，并保存准确来源和授权信息。

## 5. 图片路径写法

从网站根目录开始写相对路径：

```js
src: "./assets/stories/baiji-river-01.jpg",
```

不要写电脑上的绝对路径，例如 `C:\...`，也不要把文章素材放入 `sources/`。

## 6. 设置图片大小和位置

独立图片支持三种尺寸：

```js
size: "wide"   // 宽图，跨越较宽编辑栏
size: "medium" // 中图
size: "small"  // 小图
```

以及三种对齐方式：

```js
align: "left"
align: "right"
align: "center"
```

比例写成 `宽 / 高`，例如 `"16 / 9"`、`"4 / 5"` 或 `"3 / 2"`。移动端会自动变为适合屏幕的单栏宽度。

## 7. 创建左右图文排版

使用 `imageText`：

```js
{
  type: "imageText",
  image: {
    src: "./assets/stories/file-name.jpg",
    alt: "在这里填写图片内容描述",
    caption: "在这里填写图片说明",
    credit: "在这里填写图片来源",
    aspectRatio: "4 / 5",
  },
  text: "在这里填写与图片并排的正文",
  imageSide: "right",
},
```

`imageSide` 可选 `"left"` 或 `"right"`。在手机上，两种都会自动变为图片在上、文字在下。

## 8. 添加引语和小标题

大号引语：

```js
{
  type: "quote",
  text: "在这里填写引语",
  attribution: "在这里填写引语出处",
},
```

小标题：

```js
{ type: "subheading", text: "在这里填写小标题" },
```

留白分隔线：

```js
{ type: "divider" },
```

## 9. 删除或调整区块

删除 `blocks` 中不需要的完整对象即可。增删或重新排列 `paragraph`、`image`、`imageText`、`quote`、`subheading` 和 `divider` 时，不需要修改任何渲染代码。

资料来源放在文章记录末尾：

```js
sources: [
  { label: "在这里填写资料名称", url: "https://example.com" },
],
```

没有来源时写 `sources: []`。不要填写未经核实的来源。

## 10. 完整占位结构示例

下面只展示结构，不包含正式故事或真实来源：

```js
{
  id: "baiji",
  chapterId: "baiji",
  chapter: "05",
  year: "在这里填写年份",
  title: "在这里填写标题",
  englishName: "Baiji",
  scientificName: "在这里填写学名",
  habitat: "在这里填写栖息地",
  lastLocation: "在这里填写最后记录地点",
  introduction: "在这里填写导语",
  accent: "#728e94",
  blocks: [
    { type: "paragraph", text: "在这里填写正文" },
    {
      type: "image",
      src: "",
      alt: "",
      caption: "在这里填写图片说明",
      credit: "在这里填写图片来源",
      size: "wide",
      align: "center",
      aspectRatio: "16 / 9",
    },
    { type: "subheading", text: "在这里填写小标题" },
    {
      type: "imageText",
      image: {
        src: "",
        alt: "",
        caption: "在这里填写图片说明",
        credit: "在这里填写图片来源",
        aspectRatio: "4 / 5",
      },
      text: "在这里填写与图片并排的正文",
      imageSide: "right",
    },
    {
      type: "quote",
      text: "在这里填写引语",
      attribution: "在这里填写引语出处",
    },
    { type: "divider" },
    {
      type: "image",
      src: "",
      alt: "",
      caption: "在这里填写图片说明",
      credit: "在这里填写图片来源",
      size: "small",
      align: "left",
      aspectRatio: "3 / 2",
    },
  ],
  sources: [
    { label: "在这里填写资料名称", url: "" },
  ],
},
```

保存 `story-content.js` 后刷新浏览器即可看到更新；项目没有构建步骤。
