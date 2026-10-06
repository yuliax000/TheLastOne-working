# 三层声音编辑说明

只修改 `data.js`，所有音频放进 `assets/audio/`。以下路径都是示例，
实际放好文件以后再填写；没有文件的字段保持 `""`。

## 两条全局音轨

文件顶部 `globalAudio`：

```js
src: "./assets/audio/global-music.mp3",        // 叙事音乐
volume: 0.35,
atmosphereSrc: "./assets/audio/global-atmosphere.mp3", // 全局环境底音
atmosphereVolume: 0.08,
chapterVolume: 0.18,
crossfadeSeconds: 2.5,
storyVolumeFactor: 0.2,
```

音量都是 0–1（不是剪映的 dB），会与导出文件本身的响度共同影响听感。
音乐和全局底音各自循环，章节切换不重置它们的进度。
请在剪映中分别导出，不要把三层混成一个文件。
导出文件应具有平滑循环接缝；播放器不会自动修复文件首尾的突变。

## 六个章节

在 `species` 中按 id 找到物种，只改该条记录的 `audioSrc`：

```js
audioSrc: "./assets/audio/great-auk-ambient.mp3",
audioVolume: 0.15, // 可选；省略就用上面的 chapterVolume
```

章节 id：`great-auk`、`passenger-pigeon`、`thylacine`、`kauai-oo`、
`baiji`、`lonesome-george`。文件名自定，大小写必须与路径一致。
在开场及结尾，章节环境音渐隐，只留下两条全局音轨。
切换时上一章渐隐暂停，下一章渐入循环；重新进入章节会从其暂停处继续。

## 播放规则

- 点击 Sound on 才开启，不自动播放有声内容。
- Sound off 立即暂停所有背景轨道；再次开启从暂停处继续。
- 打开 Explore Story：章节音渐隐暂停，两条全局音降到原来的 20%。
- 关闭文章：恢复全局音量，恢复当前页面章节音。
- 切到其他浏览器标签：暂停背景音；回来后恢复已开启的声音。
- 无文件路径时控制按钮隐藏；只有章节音、没有全局音时也能启用。
- 文件加载失败会跳过该音轨，不影响其他轨道；修好路径后刷新页面。

文章内的 iframe 仍是独立播放器，不会自动报告播放状态。
打开文章时的背景压低并不等于 iframe 自动混音。若需要完全安静，
可以进入文章前关闭背景声音。保持 habitat 视频静音，避免第四层声音。

保存素材原始链接、作者和许可证，并在 references.html 中注明音频来源。
