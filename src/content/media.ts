/** Analyzed photo catalog — paths under /public/media/library */

const L = "/media/library";

export const media = {
  hero: {
    src: `/media/brand/jaipur-signal.svg`,
    alt: "Abstract Jaipur digital systems graphic — presence, enquiries, growth",
  },
  trust: {
    src: `${L}/300-SM1085970.jpg`,
    alt: "Consultant showing a live digital experience to a client",
  },
  promise: {
    src: `${L}/300-ZM1019627.jpg`,
    alt: "Connected network of people and ideas — one partner across the stack",
  },
  promiseSide: {
    src: `${L}/17-SM557211.jpg`,
    alt: "Strategy organized into clear knowledge and delivery",
  },
  problemFind: {
    src: `${L}/300-TJ1085137.jpg`,
    alt: "People across India discovering brands on their phones",
  },
  problemTrust: {
    src: `${L}/12-SM1099570.jpg`,
    alt: "Customer smiling at a phone — trust earned through digital experience",
  },
  problemEnquiry: {
    src: `${L}/1-ZM1012891.jpg`,
    alt: "Online purchase moment — enquiries that convert into action",
  },
  problemBrand: {
    src: `${L}/220-SM501088.jpg`,
    alt: "Brand thinking — coherent signals across every touchpoint",
  },
  problemManual: {
    src: `${L}/399-SM1095445.jpg`,
    alt: "Engineers with tablet beside industrial automation",
  },
  problemData: {
    src: `${L}/220-SM781232.jpg`,
    alt: "Leadership reviewing live charts in a boardroom",
  },
  serviceWeb: {
    src: `${L}/500-SM1124942.jpg`,
    alt: "Building software and websites in a focused workspace",
  },
  serviceMarketing: {
    src: `${L}/220-SM764154.jpg`,
    alt: "Growth trajectory — digital marketing that compounds",
  },
  serviceData: {
    src: `${L}/300-SM931947.jpg`,
    alt: "Analyst reviewing data on a large monitor at night",
  },
  serviceAi: {
    src: `${L}/399-SM1095445.jpg`,
    alt: "Practical AI and automation on the factory floor",
  },
  serviceBrand: {
    src: `${L}/220-SM501088.jpg`,
    alt: "Creative direction and brand coherence",
  },
  serviceTransform: {
    src: `${L}/300-PA1069163.jpg`,
    alt: "Cloud and innovation — digital transformation systems",
  },
  industryJewellery: {
    src: `${L}/220-SM684220.jpg`,
    alt: "Couple trying gold jewellery in a lit showroom",
  },
  industrySchools: {
    src: `${L}/300-SM1068094.jpg`,
    alt: "Teacher and student with a classroom presentation",
  },
  industryCoaching: {
    src: `${L}/300-SM1072773.jpg`,
    alt: "STEM coaching classroom with robotics students",
  },
  industryHealthcare: {
    src: `${L}/300-SM1072050.jpg`,
    alt: "Doctor and nurse with a patient in a hospital corridor",
  },
  industryHospitality: {
    src: `${L}/12-SM1093208.jpg`,
    alt: "Guest using phone and laptop in an upscale lounge",
  },
  industryManufacturing: {
    src: `${L}/20-SM1088758.jpg`,
    alt: "Factory manager on the production floor",
  },
  industryRealEstate: {
    src: `${L}/220-SM705385.jpg`,
    alt: "Couple planning a move with a tablet among boxes",
  },
  industryTemple: {
    src: `${L}/20-HQ368238.jpg`,
    alt: "Temple gopuram — heritage and community trust",
  },
  industryTextiles: {
    src: `/media/brand/textiles-abstract.svg`,
    alt: "Abstract textile weave graphic for handicrafts and exports",
  },
  industryRetail: {
    src: `${L}/19-SM820920.jpg`,
    alt: "Local shopkeeper with digital payments at the counter",
  },
  industryStartup: {
    src: `${L}/300-SM1085013.jpg`,
    alt: "Founder energy in a modern coworking space",
  },
  process: {
    src: `${L}/220-SM1072887.jpg`,
    alt: "Advisory conversation over a laptop outdoors",
  },
  why: {
    src: `${L}/220-SM781232.jpg`,
    alt: "Leadership reviewing live charts in a focused boardroom",
  },
  audit: {
    src: `${L}/16-SM984945.jpg`,
    alt: "Executive reviewing a digital presence on a tablet",
  },
  final: {
    src: `/media/brand/jaipur-signal.svg`,
    alt: "Abstract Jaipur digital systems graphic — starting a partnership",
  },
  gallery: [
    {
      src: `${L}/220-SM993694.jpg`,
      alt: "Family moment — real life behind every digital experience",
    },
    {
      src: `${L}/399-SM1095445.jpg`,
      alt: "Manufacturing and automation partnership",
    },
    {
      src: `${L}/20-HQ368238.jpg`,
      alt: "Temple heritage and community presence",
    },
    {
      src: `${L}/1-SM333690.jpg`,
      alt: "Hospitality and travel experiences",
    },
    {
      src: `${L}/220-SM684188.jpg`,
      alt: "Jewellery showroom consultation",
    },
    {
      src: `${L}/300-TJ1085137.jpg`,
      alt: "Digital India — presence across every context",
    },
  ],
  orbit: [
    { src: `${L}/500-SM1125045.jpg`, alt: "Partnership" },
    { src: `${L}/399-SM1095445.jpg`, alt: "Automation" },
    { src: `${L}/220-SM684220.jpg`, alt: "Jewellery" },
    { src: `${L}/300-SM1072492.jpg`, alt: "Education" },
    { src: `${L}/300-SM1072050.jpg`, alt: "Healthcare" },
    { src: `${L}/19-SM820920.jpg`, alt: "Retail" },
    { src: `${L}/20-HQ368238.jpg`, alt: "Heritage" },
    { src: `${L}/300-SM1085013.jpg`, alt: "Startups" },
  ],
  strip: [
    { src: `${L}/500-SM1125045.jpg`, alt: "" },
    { src: `${L}/220-SM684220.jpg`, alt: "" },
    { src: `${L}/399-SM1095445.jpg`, alt: "" },
    { src: `${L}/300-SM1072050.jpg`, alt: "" },
    { src: `${L}/12-SM1093208.jpg`, alt: "" },
    { src: `${L}/19-SM820920.jpg`, alt: "" },
    { src: `${L}/20-HQ368238.jpg`, alt: "" },
    { src: `${L}/300-SM1085013.jpg`, alt: "" },
    { src: `${L}/1-SM984617.jpg`, alt: "" },
    { src: `${L}/220-SM849390.jpg`, alt: "" },
    { src: `${L}/7-SM1098395.jpg`, alt: "" },
    { src: `${L}/500-SM1125027.jpg`, alt: "" },
  ],
} as const;

export type MediaAsset = { src: string; alt: string };
