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
    year: "1844", // 故事标题区年份
    title: "在这里填写标题", // 杂志文章主标题
    englishName: "Great Auk", // 英文物种名称
    scientificName: " Pinguinus impennis", // 学名
    habitat: "Rocky islands and cold coastal waters of the North Atlantic", // 栖息地
    lastLocation: "Eldey Island, Iceland", // 最后记录地点
    introduction: "The Great Auk was built for the sea, but its final moments took place on land—where a flightless bird, unable to escape human hands, became the subject of one last collection.", // 标题下方的大号导语
    accent: "#9aa58e", // 本篇强调色
    blocks: [
      { type: "paragraph", text: "For centuries, Great Auks moved through the cold waters of the North Atlantic. They ranged from northeastern North America to Iceland, Britain and northern Europe, coming ashore only to breed on remote rocky islands. Their short wings could not lift them into the air, but underwater those wings became powerful paddles. They were fast, deep-diving seabirds, entirely at home among waves and currents." },
      {
        type: "image",
        src: "assets/stories/greatauk_story_distribution_01.jpg",
        alt: "",
        caption: "The historical range of the Great Auk extended across the North Atlantic.",
        credit: "Add image credit here",
        size: "small",
        align: "left",
        aspectRatio: "4 / 5",
      },
      { type: "paragraph", text: "Only a small number of islands offered the conditions they needed: open access from the sea, suitable rock ledges and relative safety from land predators. Great Auks gathered there in dense colonies and laid a single large egg directly on bare rock. This dependence on a few breeding sites made entire colonies accessible at once." },
      { type: "paragraph", text: "Sailors and fishing crews took the birds for meat, oil, bait and feathers. On land, the auks stood upright and moved slowly. They had little defence against people arriving by boat. Generations of harvesting reduced colonies that had once seemed inexhaustible, and some of the largest breeding sites were emptied." },
      { type: "image", src: "assets/stories/greatauk_hero_illustration_04.jpg", alt: "", caption: "A preserved Great Auk specimen—one of the physical records through which the species is now studied.", credit: "Add image credit here", size: "small", align: "right", aspectRatio: "4 / 5" },
      { type: "paragraph", text: "Rarity did not bring safety. As Great Auks disappeared, their skins and eggs became increasingly valuable to private collectors and museums. The bird was no longer pursued only as a resource; it was killed because it had become difficult to obtain. Scientific demand joined commercial exploitation in pushing the species towards its end."},
      { type: "paragraph", text: "" },
      { type: "image", src: "assets/stories/greatauk_story_hunting_01.jpg", alt: "", caption: "Historical illustration of seabirds being hunted from boats in a breeding colony.", credit: "Add image credit here", size: "small", align: "left", aspectRatio: "4 / 5" },
      { type: "paragraph", text: "The hunting scenes preserved in historical illustrations show people entering crowded seabird colonies from small boats. Such images can make abundance look permanent. Yet a species concentrated in a few places can disappear rapidly when those places are repeatedly disturbed and every adult, chick or egg is within reach." },
      { type: "paragraph", text: "In June 1844, hunters landed on Eldey Island and killed the last widely accepted breeding pair of Great Auks. Their single egg was broken during the capture. Later sightings were reported, but no population recovered. What remained were skins, eggs, bones and images—objects collected at the same time the living species was being removed from the world." },
      { type: "media", mediaType: "image", src: "assets/stories/greatauk_hero_illustration_01.jpg", poster: "", alt: "", caption: "An illustrated record of the Great Auk, now known through preserved specimens and archival images.", credit: "Add media credit here", size: "medium", align: "center", aspectRatio: "16 / 9" },
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
    year: "1914", // 故事标题区年份
    title: "在这里填写标题", // 杂志文章主标题
    englishName: "Passenger Pigeon", // 英文物种名称
    scientificName: "Ectopistes migratorius", // 学名
    habitat: "Deciduous forests of eastern and central North America", // 栖息地
    lastLocation: " Cincinnati Zoo, Ohio, United States", // 最后记录地点
    introduction: "The Passenger Pigeon did not vanish because it had always been rare. It vanished after living in numbers so immense that people mistook abundance for permanence.", // 标题下方的大号导语
    accent: "#a79582", // 本篇强调色
    blocks: [
      { type: "paragraph", text: "Passenger Pigeons once travelled across North America in flocks that could contain millions of birds. They fed on acorns, beechnuts and other seasonal foods produced by broad forests. Their survival depended on movement: enormous groups shifted across the landscape, following temporary concentrations of food and gathering in equally vast nesting colonies." },
      {
        type: "image",
        src: "assets/stories/passenger_pigeon_distribution_02.jpg",
        alt: "",
        caption: "The Passenger Pigeon’s historical range covered much of eastern and central North America.",
        credit: "Add image credit here",
        size: "small",
        align: "left",
        aspectRatio: "4 / 5",
      },
      { type: "paragraph", text: "Observers described flocks stretching across the sky and continuing overhead for hours. The birds were intensely social, nesting and roosting in concentrations that had evolved as protection. In a transformed nineteenth-century landscape, however, the same behaviour made them easy to locate. A single colony could bring countless birds within reach of hunters."},
      { type: "paragraph", text: "Market hunting removed pigeons on an industrial scale. Adults were shot, trapped and knocked from nesting trees; young birds were taken from nests. At the same time, logging and agricultural expansion fragmented the forests that produced their food. The species declined faster than many people believed possible." },
      { type: "image", src: "assets/stories/Passenger Pigeon_story_huge_amount_01.jpg", alt: "", caption: "An illustration evokes the enormous flocks—and the organised hunting—that became central to the Passenger Pigeon’s history.", credit: "Add image credit here", size: "small", align: "right", aspectRatio: "4 / 5" },
      { type: "paragraph", text: "By the late nineteenth century, the great flocks had broken apart. Small surviving groups could not simply behave like miniature versions of the former population: the species had evolved around collective movement and mass nesting. Protection arrived unevenly and too late. The last confirmed wild Passenger Pigeon was recorded in 1900." },
      { type: "paragraph", text: "A few birds remained in captivity. At Cincinnati Zoo, breeding attempts failed until only one individual survived. She was named Martha. Photographs of her show an ordinary-looking pigeon standing behind wire, but by then her body carried the entire known future of the species." },
      { type: "image", src: "assets/stories/Passenger Pigeon_hero_Martha_01.jpg", alt: "", caption: "Martha, the last surviving member of the passenger pigeon species Photo courtesy Natural History Museum", credit: "Add image credit here", size: "small", align: "left", aspectRatio: "4 / 5" },
      { type: "paragraph", text: "Martha died on 1 September 1914. Her body was sent to the Smithsonian Institution, where it was preserved. In roughly a century, a population once estimated in the billions had reached zero. Her story is not only about the death of one bird; it is a warning that even the most familiar abundance can be dismantled."},
      { type: "media", mediaType: "image", src: "assets/stories/rom2013_13563_11_0-720x435.jpg", poster: "", alt: "", caption: "A preserved Passenger Pigeon specimen—an individual body representing a species once counted in billions.", credit: "Add media credit here", size: "medium", align: "center", aspectRatio: "16 / 9" },
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
    year: "1936", // 故事标题区年份
    title: "在这里填写标题", // 杂志文章主标题
    englishName: "Thylacine", // 英文物种名称
    scientificName: "Thylacinus cynocephalus", // 学名
    habitat: "Open forests, grasslands and coastal heath of Tasmania", // 栖息地
    lastLocation: "Beaumaris Zoo, Hobart, Tasmania", // 最后记录地点
    introduction: "The last known Thylacine died inside a zoo only weeks after legal protection finally arrived—a delay that turned conservation into remembrance.", // 标题下方的大号导语
    accent: "#ae8c63", // 本篇强调色
    blocks: [
      { type: "paragraph", text: "The Thylacine was the largest carnivorous marsupial to survive into modern times. Its stiff tail, long jaw and dark stripes produced comparisons with wolves and tigers, although it belonged to neither group. Once present on mainland Australia, it survived into recent history only in Tasmania, where it occupied forests, grasslands and coastal country." },
      {
        type: "image",
        src: "assets/stories/tasmanian-tiger-distribution-map_01.jpg",
        alt: "",
        caption: "Historical distribution of the Thylacine, whose final surviving population was confined to Tasmania.",
        credit: "Add image credit here",
        size: "small",
        align: "left",
        aspectRatio: "4 / 5",
      },
      { type: "paragraph", text: "European settlement transformed both the landscape and the animal’s reputation. Farming spread into areas used by Thylacines, and the species was blamed for attacks on sheep and poultry. Evidence was often uncertain, but the image of a livestock killer became politically powerful." },
      { type: "paragraph", text: "Thylacines were trapped, shot and collected. Government and private bounty schemes rewarded their destruction; Tasmania’s official account records 2,063 bounty claims. Habitat change, persecution and capture for zoos placed further pressure on an already declining population. By the early twentieth century, reliable wild records had become rare." },
      { type: "image", src: "assets/stories/Thylacine_the_last_theylacine_01.jpg", alt: "", caption: "The last known captive Thylacine at Beaumaris Zoo in Hobart.", credit: "Add image credit here", size: "small", align: "right", aspectRatio: "4 / 5" },
      { type: "paragraph", text: "The surviving film is brief and silent. It shows a Thylacine pacing, turning and opening its jaws inside an enclosure. These movements have been replayed for generations, but the footage reveals only fragments of the animal’s behaviour. Much of its social life, hunting and communication disappeared before they could be closely studied."},
      { type: "paragraph", text: "Historical hunting images show how the species was framed as an enemy to be removed. By the time attitudes began to change, the remaining population—if any survived in the wild—was too small and scattered to recover. Full legal protection came in July 1936."},
      { type: "image", src: "assets/stories/Thylacine_hunting_theylacine_01.jpg", alt: "", caption: "A historical hunting image reflects the persecution that accelerated the Thylacine’s decline.", credit: "Add image credit here", size: "small", align: "left", aspectRatio: "4 / 5" },
      { type: "paragraph", text: "On 7 September 1936, the last known captive Thylacine died at Beaumaris Zoo. The animal is often called Benjamin, although its identity remain uncertain in the historical record. No later sighting has been scientifically confirmed. The Thylacine now persists through specimens, photographs, film and repeated attempts to see it again." },
      {
        type: "media",
        mediaType: "video",
        src: "assets/video/thylacine-footage.mp4",
        poster: "",
        alt: "Archival footage of the Great Auk habitat",
        caption: "Archival footage of the last known captive Thylacine at Beaumaris Zoo.",
        credit: "在这里填写视频来源",
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
    year: "1987", // 故事标题区年份
    title: "在这里填写标题", // 杂志文章主标题
    englishName: "Kauaʻi ʻōʻō", // 英文物种名称
    scientificName: "Moho braccatus", // 学名
    habitat: "Native wet forest of Kauaʻi, especially the Alakaʻi region", // 栖息地
    lastLocation: "Alakaʻi Swamp, Kauaʻi, Hawaiʻi", // 最后记录地点
    introduction: "The final record of the Kauaʻi ʻōʻō is not a photograph of its death. It is a voice moving through the forest, calling into a space from which no answer returns.", // 标题下方的大号导语
    accent: "#779183", // 本篇强调色
    blocks: [
      { type: "paragraph", text: "The Kauaʻi ʻōʻō was found nowhere outside the island of Kauaʻi. It was a dark forest bird with a curved bill adapted for feeding on nectar, as well as insects and other small foods. Fossil evidence suggests that it once occupied a wider range of habitats before surviving populations became restricted to remote upland forest." },
      {
        type: "image",
        src: "assets/stories/kauai_Oo_distribution_01.gif",
        alt: "",
        caption: "The final known range of the Kauaʻi ʻōʻō contracted into the high, wet forests of Kauaʻi.",
        credit: "Add image credit here",
        size: "small",
        align: "left",
        aspectRatio: "4 / 5",
      },
      { type: "paragraph", text: "For many years, ʻōʻō birds were classified beside Australasian honeyeaters because they evolved similar bills, tongues and feeding behaviour. Later genetic research revealed something more singular: the Hawaiian ʻōʻō and kioea formed their own family, Mohoidae. Every known member of that family is now extinct."},
      { type: "paragraph", text: "Kauaʻi’s forests were altered by clearing, storms and introduced animals. Rats and other non-native predators affected native birds and their nests. Introduced mosquitoes carried avian malaria and pox into habitats where Hawaiian birds had evolved without those diseases. As the population declined, every remaining individual became more isolated." },
      { type: "image", src: "assets/stories/kauai_Oo_specimen_01.jpg", alt: "", caption: "A preserved Kauaʻi ʻōʻō specimen provides physical evidence of a bird no longer present in the forest.", credit: "Add image credit here", size: "small", align: "right", aspectRatio: "4 / 5" },
      { type: "paragraph", text: "When the species was listed as endangered in 1967, only a very small population was believed to remain. Surveys continued in the Alakaʻi forest, where steep terrain, dense vegetation and frequent rain made observation difficult. Researchers sometimes detected the birds by sound before seeing them." },
      { type: "paragraph", text: "The surviving photograph is small and distant, placing the bird within the scale of its forest rather than isolating it as a specimen. It suggests how easily a living individual could disappear among wet branches, moss and shadow—and how much patient listening was required to know it was still there."},
      { type: "image", src: "assets/stories/Kauai_Oo_photo_01.jpg", alt: "", caption: "A rare photograph of a living Kauaʻi ʻōʻō in its forest habitat", credit: "Add image credit here", size: "small", align: "left", aspectRatio: "4 / 5" },
      { type: "paragraph", text: "The last credible sighting occurred in 1987. Later searches, including surveys and mist-netting across its historical range, found no further individuals. A recording preserves the call of a male believed to have been seeking a mate. The sound continues after the population does not: evidence of one bird, one place and an unanswered interval." },
      {
        type: "media",
        mediaType: "embed",
        src: "",
        poster: "",
        title: "Kauaʻi ʻōʻō field recording",
        embedCode: `<iframe src="https://macaulaylibrary.org/asset/228099/embed" width="640" height="300" frameborder="0" allowfullscreen></iframe>`,
        alt: "Kauaʻi ʻōʻō field recording",
        caption: "A surviving field recording of the Kauaʻi ʻōʻō. Listen for the pauses where another bird’s answer might once have followed.",
        credit: "Macaulay Library, Cornell Lab of Ornithology",
        size: "medium",
        align: "center",
        aspectRatio: "640 / 300",
      },
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
    year: "2006", // 故事标题区年份
    title: "在这里填写标题", // 杂志文章主标题
    englishName: "Baiji", // 英文物种名称
    scientificName: "Lipotes vexillifer", // 学名
    habitat: "Middle and lower reaches of the Yangtze River system", // 栖息地
    lastLocation: "Yangtze River, China", // 最后记录地点
    introduction: "For millions of years, the Baiji lived inside one river system. Its disappearance was measured not by a final body, but by six weeks of searching and the silence of an entire waterway.", // 标题下方的大号导语
    accent: "#728e94", // 本篇强调色
    blocks: [
      { type: "paragraph", text: "The Baiji was a freshwater dolphin found only in China’s Yangtze River drainage and the neighbouring Qiantang River. Its pale body, long narrow beak and small eyes were suited to life in turbid water. Sound was essential: echolocation helped the dolphin move, locate prey and interpret a river where vision could offer only limited information." },
      {
        type: "image",
        src: "assets/stories/Baiji_distribution_map_02.jpg",
        alt: "",
        caption: "Historical distribution of the Baiji in the middle and lower Yangtze River system.",
        credit: "Add image credit here",
        size: "small",
        align: "left",
        aspectRatio: "4 / 5",
      },
      { type: "paragraph", text: "The Yangtze was both habitat and corridor. Baiji lived within a changing current shaped by floodplains, tributaries and seasonal movement. During the twentieth century, that river also became an increasingly busy industrial route. Fishing pressure, vessel traffic and large-scale changes to the river intensified around the remaining dolphins." },
      { type: "paragraph", text: "The population fell rapidly. Estimates suggested roughly 400 Baiji remained around 1980, while surveys in the late 1990s counted only thirteen. Accidental capture in fishing gear was probably the main driver of decline, compounded by habitat degradation and other human activity throughout the river." },
      { type: "image", src: "assets/stories/baiji_photo_03.jpg", alt: "", caption: "A Baiji swimming in human care, showing the species’ long beak, rounded forehead and pale body.", credit: "Add image credit here", size: "small", align: "right", aspectRatio: "4 / 5" },
      { type: "paragraph", text: "Qiqi, a male Baiji, was rescued after being injured by fishing equipment in 1980 and lived at the Institute of Hydrobiology in Wuhan until 2002. In human care, researchers could observe a species that was becoming almost impossible to study in the wild. His survival also revealed the gap between caring for one animal and protecting a viable population." },
      { type: "paragraph", text: "Photographs of Qiqi’s health examinations show researchers gathered around a single dolphin. Every measurement could add to scientific knowledge, yet the species’ crisis remained distributed across hundreds of kilometres of river. Protective laws and reserves existed, but harmful fishing practices and habitat pressures were difficult to control at the necessary scale." },
      { type: "image", src: "assets/stories/Baiji-qiqi-health-check-01.jpg", alt: "", caption: "Researchers conduct a health examination of Qiqi during his years in human care.", credit: "Add image credit here", size: "small", align: "left", aspectRatio: "4 / 5" },
      { type: "paragraph", text: "The last verified wild records came in 2001 and 2002. In late 2006, an international team conducted a six-week visual and acoustic survey across the Baiji’s historical range in the main Yangtze channel. They found no evidence that the species survived. The Baiji was judged functionally extinct—a loss produced not by one event, but by pressures repeated across an entire river." },
      { type: "media", mediaType: "image", src: "assets/stories/Baiji_qiqi_photo_02.jpg", poster: "", alt: "", caption: "Qiqi at the Institute of Hydrobiology in Wuhan, where he lived from 1980 until 2002.", credit: "Add media credit here", size: "medium", align: "center", aspectRatio: "16 / 9" },
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
        src: "assets/stories/pinta-island-tortoise-distribution.jpg",
        alt: "",
        caption: "Image placeholder 1 · text wraps on the right",
        credit: "Add image credit here",
        size: "small",
        align: "left",
        aspectRatio: "4 / 5",
      },
      { type: "paragraph", text: LOREM_WRAP_LEFT },
      { type: "paragraph", text: LOREM_FOLLOW },
      { type: "image", src: "assets/stories/Pinta Island Tortoise_lonesome_george_photo 01.jpg", alt: "", caption: "Image placeholder 2 · text wraps on the left", credit: "Add image credit here", size: "small", align: "right", aspectRatio: "4 / 5" },
      { type: "paragraph", text: LOREM_WRAP_RIGHT },
      { type: "paragraph", text: LOREM_FOLLOW },
      { type: "image", src: "assets/stories/Pinta Island Tortoise_lonesome_george_photo02.jpg", alt: "", caption: "Image placeholder 3 · text wraps on the right", credit: "Add image credit here", size: "small", align: "left", aspectRatio: "4 / 5" },
      { type: "paragraph", text: LOREM_WRAP_LEFT },
      {
        type: "media",
        mediaType: "embed",
        src: "",
        poster: "",
        title: "",
        embedCode: `<iframe width="1080" height="608" src="https://www.youtube.com/embed/lYROrqDOd80" title="Attenborough’s Last Encounter with Lonesome George" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
        alt: "",
        caption: "",
        credit: "",
        size: "medium",
        align: "center",
        aspectRatio: "640 / 300",
      },,
    ],
    sources: [], // 资料来源，可增删
  },
];
