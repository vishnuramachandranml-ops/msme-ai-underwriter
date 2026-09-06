import type { LucideIcon } from "lucide-react";
import type { NavigationSection } from "./sidebar";

export interface NavigationItem {
  title: string;
  path: string;
  icon: LucideIcon;
  section: NavigationSection;
}