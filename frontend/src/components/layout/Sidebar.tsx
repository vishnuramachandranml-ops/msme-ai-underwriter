import { ShieldCheck } from "lucide-react";

import { navigation } from "@/config/navigation";
import { NavigationSection } from "@/types/sidebar";

import SidebarSection from "./SidebarSection";

const Sidebar = () => {
  const mainItems = navigation.filter(
    (item) => item.section === NavigationSection.MAIN
  );

  const analyticsItems = navigation.filter(
    (item) => item.section === NavigationSection.ANALYTICS
  );

  const systemItems = navigation.filter(
    (item) => item.section === NavigationSection.SYSTEM
  );

  return (
    <aside className="flex h-screen w-64 flex-col border-r border-slate-200 bg-white">
      {/* Logo */}

      <div className="flex items-center gap-3 border-b border-slate-200 px-6 py-6">
        <div className="rounded-xl bg-blue-600 p-2 text-white">
          <ShieldCheck className="h-6 w-6" />
        </div>

        <div>
          <h1 className="text-base font-semibold">
            AI Underwriter
          </h1>

          <p className="text-sm text-slate-500">
            Copilot
          </p>
        </div>
      </div>

      {/* Navigation */}

      <div className="flex-1 space-y-8 overflow-y-auto px-4 py-6">
        <SidebarSection
          title="Main"
          items={mainItems}
        />

        <SidebarSection
          title="Analytics"
          items={analyticsItems}
        />

        <SidebarSection
          title="System"
          items={systemItems}
        />
      </div>

      {/* Footer */}

      <div className="border-t border-slate-200 p-4">
        <div className="rounded-xl bg-slate-50 p-3">
          <p className="text-sm font-semibold">
            Vishnu Ramachandran
          </p>

          <p className="text-xs text-slate-500">
            Senior Underwriter
          </p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;