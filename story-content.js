/**
 * 杂志故事内容编辑区
 *
 * - 只需要修改这个文件，不要修改渲染器。
 * - 图片统一放进 ./assets/stories/，src 示例："./assets/stories/baiji-river.jpg"。
 * - blocks 可以自由增删和排序。
 * - image.size: "wide" | "medium" | "small"
 * - image.align: "left" | "right" | "center"
 * - media.mediaType: "image" | "video" | "audio" | "embed"
 * - embed 可把网站提供的完整 iframe 粘贴进 embedCode（使用反引号）。
 * - imageText.imageSide: "left" | "right"
 * - 图片路径、说明或来源暂时没有内容时保留空字符串 ""。
 */

const LOREM_OPENING = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vitae justo sed erat tempor posuere. Suspendisse potenti, vivamus posuere neque at sem tincidunt, vitae facilisis nisl luctus.";
const LOREM_WRAP_LEFT = "Curabitur feugiat, sapien non consequat tincidunt, lectus arcu faucibus erat, sit amet dignissim nisl augue vel neque. Praesent euismod, velit sed interdum tristique, massa lectus fermentum justo, vitae commodo lacus lorem sed augue.";
const LOREM_WRAP_RIGHT = "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium. Maecenas faucibus mollis interdum, donec ullamcorper nulla non metus auctor fringilla, cras mattis consectetur purus sit amet fermentum.";
const LOREM_FOLLOW = "Nullam quis risus eget urna mollis ornare vel eu leo. Aenean lacinia bibendum nulla sed consectetur. Etiam porta sem malesuada magna mollis euismod, ut fermentum massa justo sit amet risus.";

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
      { type: "paragraph", text: LOREM_OPENING },
      {
        type: "image",
        src: "assets/stories/greatauk_story_distribution_01.jpg",
        alt: "",
        caption: "distribution of Great Auk",
        credit: "Add image credit here",
        size: "small",
        align: "left",
        aspectRatio: "4 / 5",
      },
      { type: "paragraph", text: LOREM_WRAP_LEFT },
      { type: "paragraph", text: LOREM_FOLLOW },
      { type: "image", src: "assets/stories/greatauk_hero_illustration_04.jpg", alt: "", caption: "Great Auk specimen", credit: "Add image credit here", size: "small", align: "right", aspectRatio: "4 / 5" },
      { type: "paragraph", text: LOREM_WRAP_RIGHT },
      { type: "paragraph", text: LOREM_FOLLOW },
      { type: "image", src: "assets/stories/greatauk_story_hunting_01.jpg", alt: "", caption: "Hunting Great Auk illustration", credit: "Add image credit here", size: "small", align: "left", aspectRatio: "4 / 5" },
      { type: "paragraph", text: LOREM_WRAP_LEFT },
      { type: "media", mediaType: "image", src: "assets/stories/greatauk_hero_illustration_01.jpg", poster: "", alt: "", caption: "Illustration of Great Auk", credit: "Add media credit here", size: "medium", align: "center", aspectRatio: "16 / 9" },
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
      { type: "paragraph", text: LOREM_OPENING },
      {
        type: "image",
        src: "assets/stories/passenger_pigeon_distribution_02.jpg",
        alt: "",
        caption: "distribution of Passenger Pigeon",
        credit: "Add image credit here",
        size: "small",
        align: "left",
        aspectRatio: "4 / 5",
      },
      { type: "paragraph", text: LOREM_WRAP_LEFT },
      { type: "paragraph", text: LOREM_FOLLOW },
      { type: "image", src: "assets/stories/Passenger Pigeon_story_huge_amount_01.jpg", alt: "", caption: "Passenger Pigeon illustration", credit: "Add image credit here", size: "small", align: "right", aspectRatio: "4 / 5" },
      { type: "paragraph", text: LOREM_WRAP_RIGHT },
      { type: "paragraph", text: LOREM_FOLLOW },
      { type: "image", src: "assets/stories/Passenger Pigeon_hero_Martha_01.jpg", alt: "", caption: "Martha, the last surviving member of the passenger pigeon species Photo courtesy Natural History Museum", credit: "Add image credit here", size: "small", align: "left", aspectRatio: "4 / 5" },
      { type: "paragraph", text: LOREM_WRAP_LEFT },
      { type: "media", mediaType: "image", src: "assets/stories/rom2013_13563_11_0-720x435.jpg", poster: "", alt: "", caption: "Passenger Pigeon specimen", credit: "Add media credit here", size: "medium", align: "center", aspectRatio: "16 / 9" },
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
      { type: "paragraph", text: LOREM_OPENING },
      {
        type: "image",
        src: "assets/stories/tasmanian-tiger-distribution-map_01.jpg",
        alt: "",
        caption: "Image placeholder 1 · text wraps on the right",
        credit: "Add image credit here",
        size: "small",
        align: "left",
        aspectRatio: "4 / 5",
      },
      { type: "paragraph", text: LOREM_WRAP_LEFT },
      { type: "paragraph", text: LOREM_FOLLOW },
      { type: "image", src: "assets/stories/Thylacine_the_last_theylacine_01.jpg", alt: "", caption: "Image placeholder 2 · text wraps on the left", credit: "Add image credit here", size: "small", align: "right", aspectRatio: "4 / 5" },
      { type: "paragraph", text: LOREM_WRAP_RIGHT },
      { type: "paragraph", text: LOREM_FOLLOW },
      { type: "image", src: "assets/stories/Thylacine_hunting_theylacine_01.jpg", alt: "", caption: "Image placeholder 3 · text wraps on the right", credit: "Add image credit here", size: "small", align: "left", aspectRatio: "4 / 5" },
      { type: "paragraph", text: LOREM_WRAP_LEFT },
      {
        type: "media",
        mediaType: "embed",
        embedCode: `<iframe src="https://example.com/embed/123" title="Embedded media"></iframe>`,
        title: "Embedded media",
        caption: "Media description",
        credit: "Media source",
        size: "medium",
        align: "center",
        aspectRatio: "16 / 9",
      },
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
      { type: "paragraph", text: LOREM_OPENING },
      {
        type: "image",
        src: "",
        alt: "",
        caption: "Image placeholder 1 · text wraps on the right",
        credit: "Add image credit here",
        size: "small",
        align: "left",
        aspectRatio: "4 / 5",
      },
      { type: "paragraph", text: LOREM_WRAP_LEFT },
      { type: "paragraph", text: LOREM_FOLLOW },
      { type: "image", src: "", alt: "", caption: "Image placeholder 2 · text wraps on the left", credit: "Add image credit here", size: "small", align: "right", aspectRatio: "4 / 5" },
      { type: "paragraph", text: LOREM_WRAP_RIGHT },
      { type: "paragraph", text: LOREM_FOLLOW },
      { type: "image", src: "", alt: "", caption: "Image placeholder 3 · text wraps on the right", credit: "Add image credit here", size: "small", align: "left", aspectRatio: "4 / 5" },
      { type: "paragraph", text: LOREM_WRAP_LEFT },
      { type: "media", mediaType: "image", src: "", poster: "", alt: "", caption: "Media placeholder 4 · centered feature media", credit: "Add media credit here", size: "medium", align: "center", aspectRatio: "16 / 9" },
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
      { type: "paragraph", text: LOREM_OPENING },
      {
        type: "image",
        src: "",
        alt: "",
        caption: "Image placeholder 1 · text wraps on the right",
        credit: "Add image credit here",
        size: "small",
        align: "left",
        aspectRatio: "4 / 5",
      },
      { type: "paragraph", text: LOREM_WRAP_LEFT },
      { type: "paragraph", text: LOREM_FOLLOW },
      { type: "image", src: "", alt: "", caption: "Image placeholder 2 · text wraps on the left", credit: "Add image credit here", size: "small", align: "right", aspectRatio: "4 / 5" },
      { type: "paragraph", text: LOREM_WRAP_RIGHT },
      { type: "paragraph", text: LOREM_FOLLOW },
      { type: "image", src: "", alt: "", caption: "Image placeholder 3 · text wraps on the right", credit: "Add image credit here", size: "small", align: "left", aspectRatio: "4 / 5" },
      { type: "paragraph", text: LOREM_WRAP_LEFT },
      { type: "media", mediaType: "image", src: "", poster: "", alt: "", caption: "Media placeholder 4 · centered feature media", credit: "Add media credit here", size: "medium", align: "center", aspectRatio: "16 / 9" },
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
      { type: "paragraph", text: LOREM_OPENING },
      {
        type: "image",
        src: "",
        alt: "",
        caption: "Image placeholder 1 · text wraps on the right",
        credit: "Add image credit here",
        size: "small",
        align: "left",
        aspectRatio: "4 / 5",
      },
      { type: "paragraph", text: LOREM_WRAP_LEFT },
      { type: "paragraph", text: LOREM_FOLLOW },
      { type: "image", src: "", alt: "", caption: "Image placeholder 2 · text wraps on the left", credit: "Add image credit here", size: "small", align: "right", aspectRatio: "4 / 5" },
      { type: "paragraph", text: LOREM_WRAP_RIGHT },
      { type: "paragraph", text: LOREM_FOLLOW },
      { type: "image", src: "", alt: "", caption: "Image placeholder 3 · text wraps on the right", credit: "Add image credit here", size: "small", align: "left", aspectRatio: "4 / 5" },
      { type: "paragraph", text: LOREM_WRAP_LEFT },
      { type: "media", mediaType: "image", src: "", poster: "", alt: "", caption: "Media placeholder 4 · centered feature media", credit: "Add media credit here", size: "medium", align: "center", aspectRatio: "16 / 9" },
    ],
    sources: [], // 资料来源，可增删
  },
];
