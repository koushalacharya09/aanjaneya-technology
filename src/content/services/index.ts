import { serviceAiAutomation } from "./ai-automation";
import { serviceBrandingCreative } from "./branding-creative";
import { serviceDataScienceAnalytics } from "./data-science-analytics";
import { serviceDigitalMarketingSeo } from "./digital-marketing-seo";
import { serviceDigitalTransformation } from "./digital-transformation";
import { serviceWebsiteSoftware } from "./website-software-development";

export const allServices = [
  serviceWebsiteSoftware,
  serviceDigitalMarketingSeo,
  serviceDataScienceAnalytics,
  serviceAiAutomation,
  serviceBrandingCreative,
  serviceDigitalTransformation,
] as const;

export type ServiceSlug = (typeof allServices)[number]["slug"];

export {
  serviceAiAutomation,
  serviceBrandingCreative,
  serviceDataScienceAnalytics,
  serviceDigitalMarketingSeo,
  serviceDigitalTransformation,
  serviceWebsiteSoftware,
};

export function getService(slug: string) {
  return allServices.find((service) => service.slug === slug);
}