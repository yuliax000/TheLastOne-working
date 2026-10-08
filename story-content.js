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
        credit: "Historical distribution of the Great Auk, reproduced from Thomas et al. (2017).",
        size: "small",
        align: "left",
        aspectRatio: "4 / 5",
      },
      { type: "paragraph", text: "Only a small number of islands offered the conditions they needed: open access from the sea, suitable rock ledges and relative safety from land predators. Great Auks gathered there in dense colonies and laid a single large egg directly on bare rock. This dependence on a few breeding sites made entire colonies accessible at once." },
      { type: "paragraph", text: "Sailors and fishing crews took the birds for meat, oil, bait and feathers. On land, the auks stood upright and moved slowly. They had little defence against people arriving by boat. Generations of harvesting reduced colonies that had once seemed inexhaustible, and some of the largest breeding sites were emptied." },
      { type: "image", src: "assets/stories/greatauk_hero_illustration_04.jpg", alt: "", caption: "A preserved Great Auk specimen—one of the physical records through which the species is now studied.", credit: "Great Auk specimen. Image courtesy of Cincinnati Museum Center.", size: "small", align: "right", aspectRatio: "4 / 5" },
      { type: "paragraph", text: "Rarity did not bring safety. As Great Auks disappeared, their skins and eggs became increasingly valuable to private collectors and museums. The bird was no longer pursued only as a resource; it was killed because it had become difficult to obtain. Scientific demand joined commercial exploitation in pushing the species towards its end."},
      { type: "paragraph", text: "" },
      { type: "image", src: "assets/stories/greatauk_story_hunting_01.jpg", alt: "", caption: "Historical illustration of seabirds being hunted from boats in a breeding colony.", credit: "Great Auks, John James Audubon and Robert Havell Jr., 1836 · National Maritime Historical Society", size: "small", align: "left", aspectRatio: "4 / 5" },
      { type: "paragraph", text: "The hunting scenes preserved in historical illustrations show people entering crowded seabird colonies from small boats. Such images can make abundance look permanent. Yet a species concentrated in a few places can disappear rapidly when those places are repeatedly disturbed and every adult, chick or egg is within reach." },
      { type: "paragraph", text: "In June 1844, hunters landed on Eldey Island and killed the last widely accepted breeding pair of Great Auks. Their single egg was broken during the capture. Later sightings were reported, but no population recovered. What remained were skins, eggs, bones and images—objects collected at the same time the living species was being removed from the world." },
      { type: "media", mediaType: "image", src: "assets/stories/greatauk_hero_illustration_01.jpg", poster: "", alt: "", caption: "An illustrated record of the Great Auk, now known through preserved specimens and archival images.", credit: "Great Auks, John James Audubon and Robert Havell Jr., 1836. Courtesy of the National Maritime Historical Society.", size: "medium", align: "center", aspectRatio: "16 / 9" },
    ],
    sources: [
      {
        label: "Audubon, JJ & Havell, R Jr 1836, Great Auks [illustration], National Maritime Historical Society, accessed 5 October 2026",
        url: "https://seahistory.org/sea-history-for-kids/great-auks/"
      },
      {
        label: "BirdLife International n.d., Great Auk Pinguinus impennis species factsheet, BirdLife DataZone, accessed 5 October 2026",
        url: "https://datazone.birdlife.org/species/factsheet/great-auk-pinguinus-impennis"
      },
      {
        label: "Farrington, H 2025, ‘Mystery solved! Is this the last Great Auk? Part 2’, Cincinnati Museum Center, 13 October, accessed 5 October 2026",
        url: "https://www.cincymuseum.org/2025/10/13/mystery-solved-is-this-the-last-great-auk-part-2/"
      },
      {
        label: "Hale, WG 2017, ‘The last egg of the Great Auk’, Sacristy Press, 4 May, accessed 5 October 2026",
        url: "https://www.sacristy.co.uk/blogs/blog/the-last-egg-of-the-great-auk"
      },
      {
        label: "National Maritime Historical Society n.d., ‘Great Auk’, Sea History for Kids, accessed 5 October 2026",
        url: "https://seahistory.org/sea-history-for-kids/great-auks/"
      },
      {
        label: "O’Connell, T 2008, ‘The Great Auk egg’, The Waterthrush Blog, 15 July, accessed 5 October 2026",
        url: "https://eatmorecookies.wordpress.com/2008/07/15/the-great-auk-egg/"
      },
      {
        label: "Thomas, JE, Carvalho, GR, Haile, J, Martin, MD, Samaniego Castruita, JA, Niemann, J, Sinding, M-HS, Sandoval-Velasco, M, Rawlence, NJ, Fuller, E, Fjeldså, J, Hofreiter, M, Stewart, JR, Gilbert, MTP & Knapp, M 2017, ‘An “Aukward” tale: a genetic approach to discover the whereabouts of the last Great Auks’, Genes, vol. 8, no. 6, article 164, accessed 5 October 2026",
        url: "https://doi.org/10.3390/genes8060164"
      },
      {
        label: "Yorkshire Museum n.d., ‘Extinct Auks’, Yorkshire Museum, accessed 5 October 2026",
        url: "https://www.yorkshiremuseum.org.uk/collections/collections-highlights/extinct-auks/"
      }
    ],// 资料来源，可增删
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
        credit: "Passenger Pigeon distribution map. BirdLife International / BirdLife DataZone. Map data © OpenStreetMap contributors.",
        size: "small",
        align: "left",
        aspectRatio: "4 / 5",
      },
      { type: "paragraph", text: "Observers described flocks stretching across the sky and continuing overhead for hours. The birds were intensely social, nesting and roosting in concentrations that had evolved as protection. In a transformed nineteenth-century landscape, however, the same behaviour made them easy to locate. A single colony could bring countless birds within reach of hunters."},
      { type: "paragraph", text: "Market hunting removed pigeons on an industrial scale. Adults were shot, trapped and knocked from nesting trees; young birds were taken from nests. At the same time, logging and agricultural expansion fragmented the forests that produced their food. The species declined faster than many people believed possible." },
      { type: "image", src: "assets/stories/Passenger Pigeon_story_huge_amount_01.jpg", alt: "", caption: "An illustration evokes the enormous flocks—and the organised hunting—that became central to the Passenger Pigeon’s history.", credit: "Shooting Wild Pigeons in Northern Louisiana, Smith Bennett, 1875. Public domain.", size: "small", align: "right", aspectRatio: "4 / 5" },
      { type: "paragraph", text: "By the late nineteenth century, the great flocks had broken apart. Small surviving groups could not simply behave like miniature versions of the former population: the species had evolved around collective movement and mass nesting. Protection arrived unevenly and too late. The last confirmed wild Passenger Pigeon was recorded in 1900." },
      { type: "paragraph", text: "A few birds remained in captivity. At Cincinnati Zoo, breeding attempts failed until only one individual survived. She was named Martha. Photographs of her show an ordinary-looking pigeon standing behind wire, but by then her body carried the entire known future of the species." },
      { type: "image", src: "assets/stories/Passenger Pigeon_hero_Martha_01.jpg", alt: "", caption: "Martha, the last surviving member of the passenger pigeon species Photo courtesy Natural History Museum", credit: "Martha, the last surviving Passenger Pigeon. Photo courtesy Natural History Museum, via Smithsonian Magazine.", size: "small", align: "left", aspectRatio: "4 / 5" },
      { type: "paragraph", text: "Martha died on 1 September 1914. Her body was sent to the Smithsonian Institution, where it was preserved. In roughly a century, a population once estimated in the billions had reached zero. Her story is not only about the death of one bird; it is a warning that even the most familiar abundance can be dismantled."},
      { type: "media", mediaType: "image", src: "assets/stories/rom2013_13563_11_0-720x435.jpg", poster: "", alt: "", caption: "A pair of mounted Passenger Pigeons at the Royal Ontario Museum—individual bodies representing a species once counted in billions.", credit: "Mounted Passenger Pigeon specimens · Royal Ontario Museum · Reproduced via Alliance for the Chesapeake Bay", size: "medium", align: "center", aspectRatio: "16 / 9" },
    ],
      sources: [
  {
    label: "Alliance for the Chesapeake Bay 2024, ‘An empty sky: the plight of the Passenger Pigeon’, 7 May, accessed 5 October 2026",
    url: "https://www.allianceforthebay.org/2024/05/an-empty-sky-the-plight-of-the-passenger-pigeon/"
  },
  {
    label: "BirdLife International n.d., Passenger Pigeon Ectopistes migratorius species factsheet, BirdLife DataZone, accessed 5 October 2026",
    url: "https://datazone.birdlife.org/species/factsheet/passenger-pigeon-ectopistes-migratorius"
  },
  {
    label: "Blockstein, DE 2020, ‘Passenger Pigeon (Ectopistes migratorius), version 1.0’, Birds of the World, Cornell Lab of Ornithology, accessed 5 October 2026",
    url: "https://doi.org/10.2173/bow.paspig.01"
  },
  {
    label: "Caton, E n.d., ‘Passenger pigeon: how the world’s most common bird went extinct’, Natural History Museum, accessed 5 October 2026",
    url: "https://www.nhm.ac.uk/discover/passenger-pigeon-how-the-worlds-most-common-bird-went-extinct.html"
  },
  {
    label: "Musch, N 2023, ‘The birds that turned day into night’, Heroes, Heroines, and History, 29 November, accessed 5 October 2026",
    url: "https://www.hhhistory.com/2023/11/the-birds-that-turned-day-into-night.html"
  },
  {
    label: "Noija, M n.d., ‘Audubon painted the pigeons, observed the flocks and took notes’, Heritage Prints, accessed 5 October 2026",
    url: "https://www.heritage-prints.com/why-did-the-passenger-pigeon-become-extinct/"
  },
  {
    label: "Stromberg, J 2011, ‘Martha, the world’s last Passenger Pigeon’, Smithsonian Magazine, 1 September, accessed 5 October 2026",
    url: "https://www.smithsonianmag.com/smithsonian-institution/martha-the-worlds-last-passenger-pigeon-67196038/"
  }
], // 资料来源，可增删
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
    introduction: "The last known Thylacine died in captivity on 7 September 1936—the same year the species finally received legal protection. By then, protection could preserve only a memory.", // 标题下方的大号导语
    accent: "#ae8c63", // 本篇强调色
    blocks: [
      { type: "paragraph", text: "The Thylacine was the largest carnivorous marsupial to survive into modern times. Its long body, stiff tail and dark stripes inspired comparisons with wolves and tigers, although it was related to neither. Fossils and Aboriginal rock art show that the species once lived across Australia and New Guinea. Its last surviving population occupied Tasmania’s dry forests, wetlands and grasslands." },
      {
        type: "image",
        src: "assets/stories/tasmanian-tiger-distribution-map_01.jpg",
        alt: "",
        caption: "The Thylacine once lived across Australia and New Guinea, but its last surviving population was confined to Tasmania.",
        credit: "Thylacine habitat distribution map · Trishan’s Oz",
        size: "small",
        align: "left",
        aspectRatio: "4 / 5",
      },
      { type: "paragraph", text: "European settlement transformed both the landscape and the animal’s reputation. After sheep were introduced to Tasmania, Thylacines were blamed for livestock losses. Although the extent of these attacks was often exaggerated, the image of a dangerous predator became politically powerful. Thylacines were trapped, shot and collected while their habitat was increasingly fragmented." },
      { type: "paragraph", text: "In 1888, the Tasmanian Government introduced a bounty of one pound for an adult Thylacine. By the time the scheme ended in 1909, official records showed that 2,184 bounties had been paid. Hunting, habitat destruction and possible disease continued to reduce the remaining population. By the early twentieth century, reliable sightings in the wild had become rare." },
      { type: "image", src: "assets/stories/Thylacine_the_last_theylacine_01.jpg", alt: "", caption: "One of the last Thylacines held at Beaumaris Zoo in Hobart, photographed in 1933.", credit: "Tasmanian Archive and Heritage Office · Reproduced via Rare Historical Photos", size: "small", align: "right", aspectRatio: "4 / 5" },
      { type: "paragraph", text: "The final known wild Thylacine was captured in the Florentine Valley in 1933 and sold to Beaumaris Zoo in Hobart. For decades, this animal was widely described as a male named “Benjamin”. Research into zoo and museum records now indicates that the animal was female and was never known by that name during her lifetime."},
      { type: "paragraph", text: "The surviving films show a Thylacine pacing along a fence, turning towards the camera and opening its jaws inside a small enclosure. These brief images have been replayed for generations, but they reveal only fragments of the animal’s behaviour. Its movements, relationships and sounds in the wild disappeared before they could be closely documented."},
      { type: "image", src: "assets/stories/Thylacine_hunting_theylacine_01.jpg", alt: "", caption: "A Tasmanian hunter with a recently killed Thylacine, 1925.", credit: "Photographer unknown · Reproduced via Rare Historical Photos", size: "small", align: "left", aspectRatio: "4 / 5" },
      { type: "paragraph", text: "The last known Thylacine died at Beaumaris Zoo on 7 September 1936, only weeks after the species received legal protection. No later sighting has been conclusively verified. Today, the Thylacine survives through skins, skeletons, photographs and a few minutes of archival film—a record of an animal studied most carefully only after it was almost gone." },
      {
        type: "media",
        mediaType: "video",
        src: "assets/video/thylacine-footage.mp4",
        poster: "",
        alt: "",
        caption: "Archival footage of a captive Thylacine at Beaumaris Zoo, Hobart, filmed in 1932.",
        credit: "Australian Screen / National Film and Sound Archive of Australia",
        size: "medium",
        align: "center",
        aspectRatio: "16 / 9",
      },
    ],
    sources: [
  {
    label:
        "Australian Screen n.d., ‘Tasmanian Tiger Footage (1932)’, Australian Screen, National Film and Sound Archive of Australia, accessed 5 October 2026",
    url: "https://aso.gov.au/titles/historical/tasmanian-tiger-footage/clip1/"
  },
  {
    label:
        "Department of Natural Resources and Environment Tasmania 2021, ‘Tasmanian Tiger’, 18 November, accessed 5 October 2026",
    url: "https://nre.tas.gov.au/wildlife-management/fauna-of-tasmania/mammals/carnivorous-marsupials-and-bandicoots/tasmanian-tiger"
  },
  {
    label:
        "Dunlevie, J 2022, ‘Stop calling the last thylacine Benjamin, Tasmanian tiger researcher says’, ABC News, 6 December, accessed 5 October 2026",
    url: "https://www.abc.net.au/news/2022-12-06/benjamin-thylacine-tasmanian-tiger-naming-myth-persists/101734442"
  },
  {
    label:
        "Hansen, A 2022, ‘Stories from the Royal Society of Tasmania Art Collection: 3. A curious note’, Royal Society of Tasmania, 1 April, accessed 5 October 2026",
    url: "https://rst.org.au/stories-from-the-royal-society-of-tasmania-art-collection-3-a-curious-note/"
  },
  {
    label:
        "National Film and Sound Archive of Australia n.d., ‘Tasmanian Tiger: Last Footage of a Thylacine’, NFSA, accessed 5 October 2026",
    url: "https://www.nfsa.gov.au/collection/item/tasmanian-tiger-last-footage-thylacine"
  },
  {
    label:
        "Rare Historical Photos 2025, ‘Thylacine: Rare photos of the last Tasmanian tiger, 1910–1933’, updated 1 November, accessed 5 October 2026",
    url: "https://rarehistoricalphotos.com/thylacine-photos-last-tasmanian-tiger/"
  },
  {
    label:
        "Trishan’s Oz n.d., ‘Tasmanian Tiger (Thylacine)’, accessed 5 October 2026",
    url: "https://trishansoz.com/trishansoz/animals/tasmanian-tiger-thylacine.html"
  }
],// 资料来源，可增删
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
    introduction: "The Kauaʻi ʻōʻō disappeared without a documented final moment. What remains are specimens, brief images and recordings made while the species was already close to extinction.", // 标题下方的大号导语
    accent: "#779183", // 本篇强调色
    blocks: [
      { type: "paragraph", text: "The Kauaʻi ʻōʻō was found only on the Hawaiian island of Kauaʻi. It fed on nectar, fruit, insects and snails, moving through the forest with a long, curved bill. Historically widespread across the island, its remaining population eventually became restricted to the dense upland forests of the Alakaʻi region." },
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
      { type: "paragraph", text: "Kauaʻi’s native forests were altered by habitat loss, introduced mammals and disease. Rats and other predators threatened native birds and their nests, while introduced mosquitoes carried diseases to species that had evolved without them. Hurricanes also damaged the high-elevation forest where the last Kauaʻi ʻōʻō survived."},
      { type: "paragraph", text: "By the late twentieth century, very few individuals remained. Researchers searched the remote valleys of the Alakaʻi, where dense vegetation, steep terrain and frequent rain made the birds difficult to observe. Specimens and photographs preserve the bird’s appearance, but little was recorded about its breeding behaviour." },
      { type: "image", src: "assets/stories/kauai_Oo_specimen_01.jpg", alt: "", caption: "A preserved Kauaʻi ʻōʻō specimen provides physical evidence of a bird no longer present in the forest.", credit: "Add image credit here", size: "small", align: "right", aspectRatio: "4 / 5" },
      { type: "paragraph", text: "The surviving photographs offer only brief glimpses of the Kauaʻi ʻōʻō in its forest habitat. Preserved specimens reveal its curved bill and distinctive plumage, but much of its behaviour remains poorly documented. Together, these records preserve fragments of a bird that can no longer be observed in the wild." },
      { type: "paragraph", text: "The last credible sighting of the Kauaʻi ʻōʻō was reported in 1987. Extensive later surveys, including searches and mist-netting within its former range, found no further individuals. In 2023, the United States formally removed the species from the endangered species list because it was considered extinct."},
      { type: "image", src: "assets/stories/Kauai_Oo_photo_01.jpg", alt: "", caption: "A rare photograph of a living Kauaʻi ʻōʻō in its forest habitat", credit: "Add image credit here", size: "small", align: "left", aspectRatio: "4 / 5" },
      { type: "paragraph", text: "Online, the Kauaʻi ʻōʻō’s song is often shared as the voice of the last male calling for a mate who would never answer. That story gives the recording a powerful emotional meaning, but its details are not confirmed by the archive. This recording was made by Jim Jacobi in May 1986; the bird’s sex is listed as unknown, and playback was used. What it preserves with certainty is the song of a species approaching extinction." },
      {
        type: "media",
        mediaType: "embed",
        src: "",
        poster: "",
        title: "Kauaʻi ʻōʻō field recording",
        embedCode: `<iframe src="https://macaulaylibrary.org/asset/228099/embed" width="640" height="300" frameborder="0" allowfullscreen></iframe>`,
        alt: "Kauaʻi ʻōʻō field recording",
        caption: "a surviving recording from May 1986.",
        credit: "Macaulay Library, Cornell Lab of Ornithology",
        size: "medium",
        align: "center",
        aspectRatio: "640 / 300",
      },
    ],
    sources: [
      {
        label:
            "BirdLife International n.d., ‘Kauai Oo Moho braccatus species factsheet’, BirdLife DataZone, accessed 5 October 2026",
        url: "https://datazone.birdlife.org/species/factsheet/kauai-oo-moho-braccatus"
      },
      {
        label:
            "Cornell Lab of Ornithology n.d., ‘Kauai Oo’, eBird, accessed 5 October 2026",
        url: "https://ebird.org/species/kauoo/L679395"
      },
      {
        label:
            "Hawaiʻi Division of Forestry and Wildlife n.d., ‘Kauaʻi ʻōʻō’, Department of Land and Natural Resources, accessed 5 October 2026",
        url: "https://dlnr.hawaii.gov/wildlife/birds/kauai-oo/"
      },
      {
        label:
            "Jacobi, J 1986, ‘Kauai Oo song, ML228099’ [sound recording], Macaulay Library, Cornell Lab of Ornithology, May, accessed 5 October 2026",
        url: "https://macaulaylibrary.org/asset/228099"
      },

      {
        label:
            "US Fish and Wildlife Service 2023, ‘Removing 21 species from the list of endangered and threatened wildlife due to extinction’, Federal Register, 17 October, accessed 5 October 2026",
        url: "https://www.fws.gov/sites/default/files/federal_register_document/2023-22377.pdf"
      }
    ], // 资料来源，可增删
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
        credit: "Baiji distribution map · Reproduced via Animal Database, Fandom · Original creator unverified",
        size: "small",
        align: "left",
        aspectRatio: "4 / 5",
      },
      { type: "paragraph", text: "The Yangtze was both habitat and corridor. Baiji lived within a changing current shaped by floodplains, tributaries and seasonal movement. During the twentieth century, that river also became an increasingly busy industrial route. Fishing pressure, vessel traffic and large-scale changes to the river intensified around the remaining dolphins." },
      { type: "paragraph", text: "The population fell rapidly. Estimates suggested roughly 400 Baiji remained around 1980, while surveys in the late 1990s counted only thirteen. Accidental capture in fishing gear was probably the main driver of decline, compounded by habitat degradation and other human activity throughout the river." },
      { type: "image", src: "assets/stories/baiji_photo_03.jpg", alt: "", caption: "A Baiji swimming in human care, showing the species’ long beak, rounded forehead and pale body.", credit: "Baiji photograph · Reproduced via Whale and Dolphin Conservation", size: "small", align: "right", aspectRatio: "4 / 5" },
      { type: "paragraph", text: "Qiqi, a male Baiji, was rescued after being injured by fishing equipment in 1980 and lived at the Institute of Hydrobiology in Wuhan until 2002. In human care, researchers could observe a species that was becoming almost impossible to study in the wild." },
      { type: "paragraph", text: "Qiqi became more than a research subject. He became a celebrated animal in China, appearing on postage stamps and television, and serving as a mascot for sporting and cultural events. Visitors from China and abroad came to see him, making this one dolphin a familiar face for a species most people would never encounter in the wild. His fame brought attention to the baiji—but public recognition alone could not secure its future in the Yangtze." },
      { type: "paragraph", text: "Photographs of Qiqi’s health examinations show researchers gathered around a single dolphin. Every measurement could add to scientific knowledge, yet the species’ crisis remained distributed across hundreds of kilometres of river. Protective laws and reserves existed, but harmful fishing practices and habitat pressures were difficult to control at the necessary scale." },
      { type: "image", src: "assets/stories/Baiji-qiqi-health-check-01.jpg", alt: "", caption: "Researchers conduct a health examination of Qiqi during his years in human care.", credit: "Qiqi during a health examination · Institute of Hydrobiology, Chinese Academy of Sciences", size: "small", align: "left", aspectRatio: "4 / 5" },
      { type: "paragraph", text: "In November and December 2006, an international team conducted a six-week visual and acoustic survey across the Baiji’s historical range in the main Yangtze channel. No Baiji were detected, leading the researchers to conclude that the species was probably extinct." },
      { type: "media", mediaType: "image", src: "assets/stories/Baiji_qiqi_photo_02.jpg", poster: "", alt: "", caption: "Qiqi at the Institute of Hydrobiology in Wuhan, where he lived from 1980 until 2002.", credit: "Qiqi · Photograph by Roland Seitre · Via Wikimedia Commons / Extinction Archives", size: "medium", align: "center", aspectRatio: "16 / 9" },
    ],
    sources: [
      {
        label: "Animal Database contributors n.d., ‘Baiji’, Animal Database, Fandom, accessed 6 October 2026",
        url: "https://animals.fandom.com/wiki/Baiji"
      },
      {
        label: "Extinction Archives n.d., ‘Baiji’, accessed 6 October 2026",
        url: "https://www.extinctionarchives.com/en/extinct-animals/baiji/"
      },
      {
        label: "Institute of Hydrobiology, Chinese Academy of Sciences n.d., ‘怀念白鱀豚“淇淇”’ [Remembering the baiji Qiqi], text reproduced from Institute of Hydrobiology Bulletin, 2002, no. 11, accessed 6 October 2026",
        url: "https://ihb.cas.cn/kxcb_1/kxcb/202103/t20210312_5973794.html"
      },
      {
        label: "Nature Picture Library n.d., ‘Illustration of Yangtze River dolphin / Chinese river dolphin / baiji’ [illustration], image 01330872, accessed 6 October 2026",
        url: "https://www.naturepl.com/stock-photo-illustration-of-yangtze-river-dolphin-chinese-river-dolphin-baiji-nature-image01330872.html"
      },
      {
        label: "Turvey, ST, Pitman, RL, Taylor, BL, Barlow, J, Akamatsu, T, Barrett, LA, Zhao, X, Reeves, RR, Stewart, BS, Wang, K, Wei, Z, Zhang, X, Pusser, LT, Richlen, M, Brandon, JR & Wang, D 2007, ‘First human-caused extinction of a cetacean species?’, Biology Letters, vol. 3, no. 5, pp. 537–540",
        url: "https://doi.org/10.1098/rsbl.2007.0292"
      },
      {
        label: "Whale and Dolphin Conservation n.d., ‘Baiji’, Whale and Dolphin Conservation Australia, accessed 6 October 2026",
        url: "https://au.whales.org/whales-dolphins/species-guide/baiji/"
      }
    ], // 资料来源，可增删
  },

  // ============================================================
  // 06 · PINTA ISLAND TORTOISE
  // ============================================================
  {
    id: "pinta-tortoise", // 稳定故事 ID，请不要修改
    chapterId: "lonesome-george", // 对应首页章节 ID，请不要修改
    chapter: "06", // 章节编号
    year: "2012", // 故事标题区年份
    title: "在这里填写标题", // 杂志文章主标题
    englishName: "Pinta Island Tortoise", // 英文物种名称
    scientificName: "Chelonoidis abingdonii", // 学名
    habitat: "Dry and transitional vegetation of Pinta Island, Galápagos", // 栖息地
    lastLocation: "Tortoise Breeding and Rearing Center, Puerto Ayora, Santa Cruz Island", // 最后记录地点
    introduction: "For decades, Lonesome George was the last known pure Pinta Island tortoise. His care became an international conservation effort, but protecting one survivor could not replace a lost population.", // 标题下方的大号导语
    accent: "#9b8c67", // 本篇强调色
    blocks: [
      { type: "paragraph", text: "The Pinta Island tortoise belonged to a single island in the northern Galápagos. Its distinctive saddleback shell rose above the neck, leaving room to reach vegetation. From the lowlands to the greener highlands, Pinta was its entire natural home. Losing that island’s population meant losing a species found nowhere else in the wild." },
      {
        type: "image",
        src: "assets/stories/pinta-island-tortoise-distribution.jpg",
        alt: "Map showing the historical range of the Pinta Island tortoise",
        caption: "Pinta Island was the entire natural range of the Pinta giant tortoise.",
        credit: "Distribution map: Reptiles of Ecuador (Arteaga & Guayasamin, 2020).",
        size: "small",
        align: "left",
        aspectRatio: "4 / 5",
      },
      { type: "paragraph", text: "During the nineteenth century, whalers and other mariners removed tortoises from Pinta. A population once described as common became increasingly rare. This was not a sudden disappearance: repeated harvesting gradually reduced the number of animals left to reproduce, until the island’s tortoises were believed to be gone." },
      { type: "paragraph", text: "Introduced goats added another pressure. They competed for vegetation and transformed the habitat on which the remaining tortoises depended. Hunting had depleted the animals; habitat damage made survival harder. Together, these changes left Pinta without a healthy tortoise population long before George became known to the world."},
      { type: "image", src: "assets/stories/Pinta Island Tortoise_lonesome_george_photo 01.jpg", alt: "Lonesome George in side profile with his neck raised", caption: "Lonesome George, the last known pure Pinta Island tortoise, in human care in the Galápagos.", credit: "Photo: Anthony G. Jepson, via Charles Darwin Foundation. Colour treatment adjusted for this website.", size: "small", align: "right", aspectRatio: "4 / 5" },
      { type: "paragraph", text: "In 1971, Hungarian scientist József Vágvölgyi found a living tortoise on Pinta. The animal was later brought to the breeding centre on Santa Cruz in the early 1970s and became known as Lonesome George. Searches continued, but another pure Pinta tortoise was never confirmed. His survival offered hope, without resolving the absence of a mate of his own species." },
      { type: "paragraph", text: "For decades, George lived under close care. Breeding attempts paired him with females from other Galápagos tortoise populations, first from Isabela and later from Española. None produced surviving offspring. The photographs show a living animal eating and moving through his enclosure, while behind those ordinary moments lay an extraordinary effort to prevent his species from disappearing." },
      { type: "image", src: "assets/stories/Pinta Island Tortoise_lonesome_george_photo02.jpg", alt: "Lonesome George eating green leaves in a rocky enclosure", caption: "Lonesome George feeding at the breeding centre on Santa Cruz Island.", credit: "Photo: Alizon Llerena, Charles Darwin Foundation, 2005–2007.", size: "small", align: "left", aspectRatio: "4 / 5" },
      { type: "paragraph", text: "George died on 24 June 2012, marking the extinction of the Pinta Island tortoise as a species. Yet its genetic legacy did not disappear completely: tortoises with mixed Pinta ancestry have been identified on Isabela Island. They are not surviving pure Pinta tortoises, but they offer a different starting point for conservation. George’s death closed one story, without ending every possibility connected to it." },
      {
        type: "media",
        mediaType: "embed",
        src: "",
        poster: "",
        title: "",
        embedCode: `<iframe width="1080" height="608" src="https://www.youtube.com/embed/lYROrqDOd80" title="Attenborough’s Last Encounter with Lonesome George" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
        alt: "",
        caption: "Archival video of Lonesome George with David Attenborough.",
        credit: "",
        size: "medium",
        align: "center",
        aspectRatio: "640 / 300",
      },,
    ],
    sources: [
      {
        label: "Arteaga, A & Guayasamin, JM 2020, ‘Chelonoidis abingdonii’, in A Arteaga, L Bustamante & J Vieira (eds), Reptiles of Ecuador: Life in the middle of the world, accessed 6 October 2026",
        url: "https://www.reptilesofecuador.com/chelonoidis_abingdonii.html"
      },
      {
        label: "Charles Darwin Foundation n.d., ‘Galapagos Species Database: Chelonoidis abingdonii’, dataZone, accessed 6 October 2026",
        url: "https://datazone.darwinfoundation.org/en/checklist/?species=5266"
      },
      {
        label: "Jepson, AG n.d., Lonesome George [photograph], Charles Darwin Foundation, accessed 6 October 2026",
        url: "https://datazone.darwinfoundation.org/images/checklist/AnthonyGJepson_76_lonesome_george.jpg"
      },
      {
        label: "Llerena, A 2005–2007, Chelonoidis abingdonii, Pinta Galapagos Tortoise [photograph], Charles Darwin Foundation, accessed 6 October 2026",
        url: "https://datazone.darwinfoundation.org/images/checklist/Solitario_jorge2005_18.jpg"
      },
      {
        label: "Patterson, M n.d., Lonesome George [acrylic painting], Artists for Conservation, accessed 6 October 2026",
        url: "https://www.artistsforconservation.org/artists/4355/portfolio/lonesome-george-31262"
      }
    ],
  },
];
