/**
 * 杂志故事内容编辑区
 *
 * - 只需要修改这个文件，不要修改渲染器。
 * - 图片统一放进 ./assets/stories/，src 示例："./assets/stories/baiji-river.jpg"。
 * - blocks 可以自由增删和排序。
 * - image.size: "wide" | "medium" | "small"
 * - image.align: "left" | "right" | "center"
 * - imageText.imageSide: "left" | "right"
 * - 图片路径、说明或来源暂时没有内容时保留空字符串 ""。
 */

export const stories = [
  // ============================================================
  // 01 · GREAT AUK
  // ============================================================
  {
    id: "great-auk", // 稳定故事 ID，请不要修改
    chapterId: "great-auk", // 对应首页章节 ID，请不要修改
    chapter: "01", // 章节编号
    year: "在这里填写年份", // 故事标题区年份
    title: "在这里填写标题", // 杂志文章主标题
    englishName: "Great Auk", // 英文物种名称
    scientificName: "在这里填写学名", // 学名
    habitat: "在这里填写栖息地", // 栖息地
    lastLocation: "在这里填写最后记录地点", // 最后记录地点
    introduction: "在这里填写导语", // 标题下方的大号导语
    accent: "#9aa58e", // 本篇强调色
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
      { type: "quote", text: "在这里填写引语", attribution: "在这里填写引语出处" },
      { type: "divider" },
    ],
    sources: [{ label: "在这里填写资料名称", url: "" }], // 资料来源，可增删
  },

  // ============================================================
  // 02 · PASSENGER PIGEON
  // ============================================================
  {
    id: "passenger-pigeon", // 稳定故事 ID，请不要修改
    chapterId: "passenger-pigeon", // 对应首页章节 ID，请不要修改
    chapter: "02", // 章节编号
    year: "在这里填写年份", // 故事标题区年份
    title: "在这里填写标题", // 杂志文章主标题
    englishName: "Passenger Pigeon", // 英文物种名称
    scientificName: "在这里填写学名", // 学名
    habitat: "在这里填写栖息地", // 栖息地
    lastLocation: "在这里填写最后记录地点", // 最后记录地点
    introduction: "在这里填写导语", // 标题下方的大号导语
    accent: "#a79582", // 本篇强调色
    blocks: [
      { type: "paragraph", text: "在这里填写正文" },
      {
        type: "image",
        src: "",
        alt: "",
        caption: "在这里填写图片说明",
        credit: "在这里填写图片来源",
        size: "medium",
        align: "left",
        aspectRatio: "3 / 2",
      },
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
        imageSide: "left",
      },
      { type: "subheading", text: "在这里填写小标题" },
    ],
    sources: [], // 资料来源，可增删
  },

  // ============================================================
  // 03 · THYLACINE
  // ============================================================
  {
    id: "thylacine", // 稳定故事 ID，请不要修改
    chapterId: "thylacine", // 对应首页章节 ID，请不要修改
    chapter: "03", // 章节编号
    year: "在这里填写年份", // 故事标题区年份
    title: "在这里填写标题", // 杂志文章主标题
    englishName: "Thylacine", // 英文物种名称
    scientificName: "在这里填写学名", // 学名
    habitat: "在这里填写栖息地", // 栖息地
    lastLocation: "在这里填写最后记录地点", // 最后记录地点
    introduction: "在这里填写导语", // 标题下方的大号导语
    accent: "#ae8c63", // 本篇强调色
    blocks: [
      { type: "paragraph", text: "在这里填写正文" },
      {
        type: "image",
        src: "",
        alt: "",
        caption: "在这里填写图片说明",
        credit: "在这里填写图片来源",
        size: "small",
        align: "right",
        aspectRatio: "3 / 2",
      },
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
      { type: "quote", text: "在这里填写引语", attribution: "在这里填写引语出处" },
    ],
    sources: [], // 资料来源，可增删
  },

  // ============================================================
  // 04 · KAUAʻI ʻŌʻŌ
  // ============================================================
  {
    id: "kauai-oo", // 稳定故事 ID，请不要修改
    chapterId: "kauai-oo", // 对应首页章节 ID，请不要修改
    chapter: "04", // 章节编号
    year: "在这里填写年份", // 故事标题区年份
    title: "在这里填写标题", // 杂志文章主标题
    englishName: "Kauaʻi ʻōʻō", // 英文物种名称
    scientificName: "在这里填写学名", // 学名
    habitat: "在这里填写栖息地", // 栖息地
    lastLocation: "在这里填写最后记录地点", // 最后记录地点
    introduction: "在这里填写导语", // 标题下方的大号导语
    accent: "#779183", // 本篇强调色
    blocks: [
      { type: "subheading", text: "在这里填写小标题" },
      { type: "paragraph", text: "在这里填写正文" },
      {
        type: "image",
        src: "",
        alt: "",
        caption: "在这里填写图片说明",
        credit: "在这里填写图片来源",
        size: "wide",
        align: "left",
        aspectRatio: "16 / 9",
      },
      { type: "divider" },
    ],
    sources: [], // 资料来源，可增删
  },

  // ============================================================
  // 05 · BAIJI
  // ============================================================
  {
    id: "baiji", // 稳定故事 ID，请不要修改
    chapterId: "baiji", // 对应首页章节 ID，请不要修改
    chapter: "05", // 章节编号
    year: "在这里填写年份", // 故事标题区年份
    title: "在这里填写标题", // 杂志文章主标题
    englishName: "Baiji", // 英文物种名称
    scientificName: "在这里填写学名", // 学名
    habitat: "在这里填写栖息地", // 栖息地
    lastLocation: "在这里填写最后记录地点", // 最后记录地点
    introduction: "在这里填写导语", // 标题下方的大号导语
    accent: "#728e94", // 本篇强调色
    blocks: [
      { type: "paragraph", text: "在这里填写正文" },
      {
        type: "image",
        src: "",
        alt: "",
        caption: "在这里填写图片说明",
        credit: "在这里填写图片来源",
        size: "medium",
        align: "center",
        aspectRatio: "16 / 9",
      },
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
      { type: "quote", text: "在这里填写引语", attribution: "在这里填写引语出处" },
    ],
    sources: [], // 资料来源，可增删
  },

  // ============================================================
  // 06 · PINTA ISLAND TORTOISE
  // ============================================================
  {
    id: "pinta-tortoise", // 稳定故事 ID，请不要修改
    chapterId: "lonesome-george", // 对应首页章节 ID，请不要修改
    chapter: "06", // 章节编号
    year: "在这里填写年份", // 故事标题区年份
    title: "在这里填写标题", // 杂志文章主标题
    englishName: "Pinta Island Tortoise", // 英文物种名称
    scientificName: "在这里填写学名", // 学名
    habitat: "在这里填写栖息地", // 栖息地
    lastLocation: "在这里填写最后记录地点", // 最后记录地点
    introduction: "在这里填写导语", // 标题下方的大号导语
    accent: "#9b8c67", // 本篇强调色
    blocks: [
      { type: "paragraph", text: "在这里填写正文" },
      {
        type: "image",
        src: "",
        alt: "",
        caption: "在这里填写图片说明",
        credit: "在这里填写图片来源",
        size: "small",
        align: "center",
        aspectRatio: "3 / 2",
      },
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
        imageSide: "left",
      },
      { type: "divider" },
    ],
    sources: [], // 资料来源，可增删
  },
];
