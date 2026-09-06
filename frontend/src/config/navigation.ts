import type { NavigationItem } from "@/types/navigation";
import { NavigationSection } from "@/types/sidebar";

import {
  LayoutDashboard,
  ClipboardCheck,
  BriefcaseBusiness,
  FileText,
  Settings,
  ShieldAlert,
} from "lucide-react";

export const navigation: NavigationItem[] = [
  {
    title: "Dashboard",
    path: "/",
    icon: LayoutDashboard,
    section: NavigationSection.MAIN,
  },
  {
    title: "Assessments",
    path: "/assessments",
    icon: ClipboardCheck,
    section: NavigationSection.MAIN,
  },
  {
    title: "Portfolio",
    path: "/portfolio",
    icon: BriefcaseBusiness,
    section: NavigationSection.MAIN,
  },
  {
    title: "Watchlist",
    path: "/watchlist",
    icon: ShieldAlert,
    section: NavigationSection.ANALYTICS,
  },
  {
    title: "Reports",
    path: "/reports",
    icon: FileText,
    section: NavigationSection.ANALYTICS,
  },
  {
    title: "Settings",
    path: "/settings",
    icon: Settings,
    section: NavigationSection.SYSTEM,
  },
];