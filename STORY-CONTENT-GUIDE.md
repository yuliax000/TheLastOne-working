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
  aspectRatio: "16 / 9", // 仅用于图片尚未载入时的空白区域
},
```

图片载入后会保持文件本身的原始宽高比并完整显示，不会裁切。`aspectRatio` 只控制图片为空、尚未载入或加载失败时的空白区域比例。`caption` 或 `credit` 留空时不会留下多余空白。

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

## 7A. 将最后一个媒体替换成图片、视频、音频或 Embed

每篇故事最后一个区块使用通用 `media` 类型。默认是尺寸较克制的居中图片：

```js
{
  type: "media",
  mediaType: "image", // 可改为 "video"、"audio" 或 "embed"
  src: "./assets/stories/file-name.jpg",
  poster: "", // 仅视频需要，可填写视频封面图路径
  alt: "在这里填写媒体内容描述",
  caption: "在这里填写媒体说明",
  credit: "在这里填写媒体来源",
  size: "medium",
  align: "center",
  aspectRatio: "16 / 9",
},
```

替换成视频时，将 `mediaType` 改为 `"video"`，并把 MP4 文件放进 `assets/stories/` 或 `assets/video/`。视频带播放控制，不会自动播放。

替换成音频时，将 `mediaType` 改为 `"audio"`，并把 MP3、WAV 或 OGG 文件放进 `assets/stories/` 或 `assets/audio/`。音频会显示播放器；`poster` 和 `aspectRatio` 对音频不起作用。

使用 Macaulay Library 提供的 Embed 时，可以直接复制完整 iframe。请使用反引号包住代码：

```js
{
  type: "media",
  mediaType: "embed",
  embedCode: `<iframe src="https://macaulaylibrary.org/asset/228099/embed" height="300" width="640" frameborder="0" allowfullscreen></iframe>`,
  title: "Kauaʻi ʻōʻō field recording",
  caption: "在这里填写媒体说明",
  credit: "在这里填写媒体来源",
  size: "medium",
  align: "center",
  aspectRatio: "640 / 300",
},
```

不要把 iframe 放进 `src`。完整代码应放在 `embedCode`，并使用 `` ` `` 而不是普通双引号包住。当前只接受 `https://macaulaylibrary.org/asset/数字/embed` 形式的官方播放器地址。关闭或切换故事时，播放器会停止。

如果路径为空、文件加载失败或 Embed 代码无效，网页会显示对应的占位区域。

## 7B. 添加全局环境音

全局音频设置在根目录的 `data.js` 顶部：

```js
export const globalAudio = {
  src: "./assets/audio/ambient.mp3",
  label: "Ambient soundscape",
  volume: 0.35,
};
```

将音频文件放进 `assets/audio/`，再填写 `src`。`volume` 可填写 `0` 到 `1`。`src` 留空时网页不会显示声音按钮；填写后，右下角会出现 `Sound on`。浏览器要求访客先点击按钮，网站不会强制自动播放声音。

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

删除 `blocks` 中不需要的完整对象即可。增删或重新排列 `paragraph`、`image`、`media`、`imageText`、`quote`、`subheading` 和 `divider` 时，不需要修改任何渲染代码。

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
      type: "media",
      mediaType: "image",
      src: "",
      poster: "",
      alt: "",
      caption: "在这里填写媒体说明",
      credit: "在这里填写媒体来源",
      size: "medium",
      align: "center",
      aspectRatio: "16 / 9",
    },
  ],
  sources: [
    { label: "在这里填写资料名称", url: "" },
  ],
},
```

保存 `story-content.js` 后刷新浏览器即可看到更新；项目没有构建步骤。
