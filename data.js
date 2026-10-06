// 三层音频：文件放 assets/audio/；空路径表示不使用，不会请求空文件。
// 点击 Sound on 后播放。音乐和全局底音不随章节重新开始。
export const globalAudio = {
  src: "assets/audio/global-music.mp3", // 叙事音乐，例如 "./assets/audio/global-music.mp3"
  label: "Ambient soundscape",
  volume: 0.35, // 音乐音量：0–1
  atmosphereSrc: "assets/audio/global-atmosphere.mp3", // 全局环境底音，例如 "./assets/audio/global-atmosphere.mp3"
  atmosphereVolume: 0.08, // 全局环境底音音量：0–1
  chapterVolume: 0.18, // 各章环境音默认音量：0–1
  crossfadeSeconds: 2.5, // 章节环境音交叉淡化时间（秒）
  storyVolumeFactor: 0.2, // 打开文章时，两条全局音轨降到原音量的 20%
};

export const species = [
  // 每章 audioSrc 填环境音路径；可以加 audioVolume: 0.15 单独调整该章。
  // 例：audioSrc: "./assets/audio/great-auk-ambient.mp3"
  // Media paths are optional. Put files in assets/audio or assets/video, then
  // replace an empty string below with e.g. "./assets/video/great-auk-habitat.mp4".
  // Hero portraits accept landscape or portrait images. Use portraitFit "cover"
  // to fill the frame or "contain" to show the complete image. Adjust the focal
  // point with portraitPosition, e.g. "center center", "25% center", or "right top".
  // Add the short source shown below each portrait in portraitCredit. Leave it
  // empty to hide the line; keep the complete RMIT Harvard entry in references.html.
  {
    id: "great-auk",
    storyId: "great-auk",
    index: "01",
    year: 1844,
    name: "Great Auk",
    individualName: "The final pair",
    scientificName: "Pinguinus impennis",
    location: "Eldey Island · North Atlantic",
    summary:
      "On a remote Icelandic island, the last known breeding pair were killed beside their single egg—ending centuries of life across the North Atlantic.",
    detail:
      "The Great Auk once gathered in immense colonies across the North Atlantic. Flightless and unafraid of people, it was taken for meat, feathers, oil and specimens until only a final pair remained on Eldey Island.",
    cause: "Hunting, egg collecting and commercial exploitation",
    accent: "#9aa58e",
    habitatLabel: "",
    portraitLabel: "",
    portraitImage: "/assets/images/greatauk.jpg",
    portraitFit: "contain",
    portraitPosition: "30% center",
    portraitCredit: "Illustration reproduced from Hale (2017), courtesy of Sacristy Press.",
    archiveLabel: "",
    habitatVideo: "assets/video/greatAukHabitat1.mp4",
    audioSrc: "assets/audio/great-auk-chapter.mp3",
    videoSrc: "",
    sourceLabel: "",

  },
  {
    id: "passenger-pigeon",
    storyId: "passenger-pigeon",
    index: "02",
    year: 1914,
    name: "Passenger Pigeon",
    individualName: "Martha",
    scientificName: "Ectopistes migratorius",
    location: "Cincinnati · United States",
    summary:
      "A bird once counted in billions ended with Martha, alone at Cincinnati Zoo, after industrial hunting and forest loss dismantled its enormous flocks.",
    detail:
      "Passenger Pigeon flocks once darkened North American skies for hours. Industrial hunting and forest loss collapsed the vast social populations on which the species depended. Martha died at Cincinnati Zoo in 1914.",
    cause: "Commercial hunting and habitat loss",
    accent: "#a79582",
    habitatLabel: "",
    portraitLabel: "",
    portraitImage: "assets/images/Martha_last_passenger_pigeon_1912.jpg",
    portraitFit: "cover",
    portraitPosition: "center center",
    portraitCredit: "Martha, the last Passenger Pigeon · Photograph by Enno Meyer via Biodiversity Heritage Library · Public domain",
    archiveLabel: "",
    habitatVideo: "assets/video/passengerPigeonHabitat.mp4",
    audioSrc: "assets/audio/passenger-pigeon-2.mp3",
    // audioVolume: 0.38,
    videoSrc: "",
    sourceLabel: "",
  },
  {
    id: "thylacine",
    storyId: "thylacine",
    index: "03",
    year: 1936,
    name: "Thylacine",
    individualName: "The Last Captive Thylacine",
    scientificName: "Thylacinus cynocephalus",
    location: "Hobart · Tasmania",
    summary:
      "Hunted as a threat to livestock, the Thylacine received legal protection only weeks before the last known captive animal died in Hobart.",
    detail:
      "Persecution encouraged by a government bounty intensified the decline of Tasmania's largest marsupial predator. The final known captive animal died at Beaumaris Zoo, only weeks after legal protection began.",
    cause: "Bounty hunting, persecution and ecological pressure",
    accent: "#ae8c63",
    habitatLabel: "Tasmanian bushland · habitat image placeholder",
    portraitLabel: "The last captive Thylacine · historical illustration",
    portraitImage: "assets/images/thylacine_historical_illustration_01.jpg",
    portraitFit: "contain",
    portraitPosition: "center center",
    portraitCredit: "Thylacinus cynocephalus, Henry Constantine Richter, from John Gould’s The Mammals of Australia, vol. 1, 1863 · Royal Society of Tasmania",
    archiveLabel: "Beaumaris Zoo film · video placeholder",
    habitatVideo: "assets/video/ThylacineHabitatHatbitat.mp4",
    audioSrc: "assets/audio/thylacine-chapter-2.mp3",
    videoSrc: "",
    sourceLabel: "",
  },
  {
    id: "kauai-oo",
    storyId: "kauai-oo",
    index: "04",
    year: 1987,
    name: "Kauaʻi ʻōʻō",
    individualName: "A surviving voice",
    scientificName: "Moho braccatus",
    location: "Alakaʻi Swamp · Kauaʻi",
    summary:
      "Last credibly recorded in the wild in 1987, the Kauaʻi ʻōʻō survives in photographs, specimens and sound. A recording made in 1986 preserves its song within the Alakaʻi forest.",
    detail:
      "Often shared online as the last male calling for a missing mate, Jim Jacobi’s May 1986 recording documents an adult of unknown sex, with playback used. The archive does not confirm that it was the final bird or its final song.",
    cause: "Habitat loss, invasive species, disease and storms",
    accent: "#779183",
    habitatLabel: "",
    portraitLabel: "Kauaʻi ʻōʻō · species illustration",
    portraitImage: "assets/images/kauai_Oo_illustration_01.jpg",
    portraitFit: "contain",
    portraitPosition: "50% center",
    portraitCredit: "",
    archiveLabel: "",
    habitatVideo: "assets/video/kauaiOoHabitat.mp4",
    audioSrc: "assets/audio/kauaiOo-chapter.mp3",
    videoSrc: "",
    sourceLabel: "",
  },
  {
    id: "baiji",
    storyId: "baiji",
    index: "05",
    year: 2006,
    name: "Baiji",
    individualName: "Qiqi",
    scientificName: "Lipotes vexillifer",
    location: "Yangtze River · China",
    summary:
      "Qiqi survived for decades in human care while the wild population disappeared. In 2006, a six-week Yangtze survey found no Baiji.",
    detail:
      "The Baiji evolved within the Yangtze for millions of years. Entanglement, vessel traffic, fishing pressure and river development transformed its habitat. The 2006 survey led researchers to declare it functionally extinct.",
    cause: "Bycatch, vessel traffic, fishing and river development",
    accent: "#728e94",
    habitatLabel: "",
    portraitLabel: "",
    portraitImage: "assets/images/baiji_illustration_03.jpg",
    portraitFit: "contain",
    portraitPosition: "center center",
    portraitCredit: "Baiji illustration · Nature Picture Library · Image 01330872",
    archiveLabel: "",
    habitatVideo: "assets/video/BaijiHabitat.mp4",
    audioSrc: "assets/audio/baiji-chapter.mp3",
    videoSrc: "",
    sourceLabel: "",
  },
  {
    id: "lonesome-george",
    storyId: "pinta-tortoise",
    index: "06",
    year: 2012,
    name: "Lonesome George",
    individualName: "Lonesome George",
    scientificName: "Chelonoidis abingdonii",
    location: "Pinta Island · Galápagos",
    summary:
      "For forty years, Lonesome George lived as the last known Pinta tortoise—a visible reminder that protecting one individual cannot restore a vanished population.",
    detail:
      "Introduced goats devastated Pinta Island vegetation after earlier exploitation had reduced its tortoises. George became a global conservation symbol, but breeding attempts produced no surviving offspring.",
    cause: "Historic exploitation and introduced goats",
    accent: "#9b8c67",
    habitatLabel: "Pinta Island · habitat image placeholder",
    portraitLabel: "Lonesome George · individual portrait placeholder",
    portraitImage: "assets/images/george_illustartion.jpg",
    portraitFit: "contain",
    portraitPosition: "center center",
    portraitCredit: "",
    archiveLabel: "Pinta habitat change · archive placeholder",
    habitatVideo: "assets/video/PintaHabitat.mp4",
    audioSrc: "assets/audio/pinta-chapter.mp3",
    videoSrc: "",
    sourceLabel: "Source and image credit to be added",
  },
];

export const recentExtinctions = [
  {
    id: "bramble-cay-melomys",
    year: 2016,
    name: "Bramble Cay Melomys",
    image: "./assets/images/Bramble-cay-melomys.e9eb5a2.width-1200.221d46b.jpg",
    status: "Provisional timeline entry — verify before publication",
  },
  {
    id: "christmas-island-pipistrelle",
    year: 2017,
    name: "Christmas Island Pipistrelle",
    image: "./assets/images/CI-pipistrelle-photo-by-Chris-Tidemann.jpg",
    status: "Provisional timeline entry — verify before publication",
  },

  {
    id: "chinese-paddlefish",
    year: 2022,
    name: "Chinese Paddlefish",
    image: "./assets/images/146bce87-1d93-4b6b-a407-33218d2cede3_e552936f.webp",
    status: "Provisional timeline entry — verify before publication",
  },
  {
    id: "bachmans-warbler",
    year: 2023,
    name: "Bachman’s Warbler",
    image: "./assets/images/bachmans-warbler.jpg",
    status: "Declared extinct by the US Fish and Wildlife Service in 2023",
  },
  {
    id: "slender-billed-curlew",
    year: 2025,
    name: "Slender-billed Curlew",
    image: "./assets/images/Slender-billed-Curlew-Morocco-2-Chris-Gomersall-rspb-images.com_.webp",
    status: "Proposal placeholder — status and year require verification",
  },
];
