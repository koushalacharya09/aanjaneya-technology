import { industryCoachingInstitutes } from "./coaching-institutes";
import { industryHealthcare } from "./healthcare";
import { industryHospitality } from "./hospitality";
import { industryJewellery } from "./jewellery";
import { industryLogisticsEcommerce } from "./logistics-ecommerce";
import { industryManufacturing } from "./manufacturing";
import { industryProfessionalServices } from "./professional-services";
import { industryRealEstate } from "./real-estate";
import { industryRetailLocalBusiness } from "./retail-local-business";
import { industrySchoolsColleges } from "./schools-colleges";
import { industryStartups } from "./startups";
import { industryTemplesReligiousTrusts } from "./temples-religious-trusts";
import { industryTextilesExports } from "./textiles-exports";

export { industryCoachingInstitutes } from "./coaching-institutes";
export { industryHealthcare } from "./healthcare";
export { industryHospitality } from "./hospitality";
export { industryJewellery } from "./jewellery";
export { industryLogisticsEcommerce } from "./logistics-ecommerce";
export { industryManufacturing } from "./manufacturing";
export { industryProfessionalServices } from "./professional-services";
export { industryRealEstate } from "./real-estate";
export { industryRetailLocalBusiness } from "./retail-local-business";
export { industrySchoolsColleges } from "./schools-colleges";
export { industryStartups } from "./startups";
export { industryTemplesReligiousTrusts } from "./temples-religious-trusts";
export { industryTextilesExports } from "./textiles-exports";

export const industries = [
  industryJewellery,
  industryTextilesExports,
  industrySchoolsColleges,
  industryCoachingInstitutes,
  industryHealthcare,
  industryHospitality,
  industryManufacturing,
  industryRealEstate,
  industryTemplesReligiousTrusts,
  industryRetailLocalBusiness,
  industryProfessionalServices,
  industryLogisticsEcommerce,
  industryStartups,
] as const;

export type IndustryContent = (typeof industries)[number];
export type IndustryContentSlug = IndustryContent["slug"];

export function getIndustry(slug: string): IndustryContent | undefined {
  return industries.find((industry) => industry.slug === slug);
}
