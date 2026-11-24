import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  Bot,
  BookOpen,
  Briefcase,
  Building2,
  Code2,
  Factory,
  Gem,
  GraduationCap,
  HeartPulse,
  Landmark,
  Palette,
  Rocket,
  Search,
  Shirt,
  Store,
  RefreshCw,
  Truck,
  UtensilsCrossed,
} from "lucide-react";

import type { IndustrySlug, ServiceSlug } from "@/content/site";

export const serviceIcons: Record<ServiceSlug, LucideIcon> = {
  "website-software-development": Code2,
  "digital-marketing-seo": Search,
  "data-science-analytics": BarChart3,
  "ai-automation": Bot,
  "branding-creative": Palette,
  "digital-transformation": RefreshCw,
};

export const industryIcons: Record<IndustrySlug, LucideIcon> = {
  jewellery: Gem,
  "textiles-exports": Shirt,
  "schools-colleges": GraduationCap,
  "coaching-institutes": BookOpen,
  healthcare: HeartPulse,
  hospitality: UtensilsCrossed,
  manufacturing: Factory,
  "real-estate": Building2,
  "temples-religious-trusts": Landmark,
  "retail-local-business": Store,
  "professional-services": Briefcase,
  "logistics-ecommerce": Truck,
  startups: Rocket,
};