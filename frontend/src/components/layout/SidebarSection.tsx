import SidebarItem from "./SidebarItem";

import type { NavigationItem } from "@/types/navigation";

interface SidebarSectionProps {
  title: string;
  items: NavigationItem[];
}

const SidebarSection = ({
  title,
  items,
}: SidebarSectionProps) => {
  return (
    <section className="space-y-2">
      <p className="px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
        {title}
      </p>

      <div className="space-y-1">
        {items.map((item) => (
          <SidebarItem
            key={item.path}
            item={item}
          />
        ))}
      </div>
    </section>
  );
};

export default SidebarSection;