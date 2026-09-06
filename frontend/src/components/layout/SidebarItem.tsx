import { NavLink } from "react-router-dom";
import type { NavigationItem } from "@/types/navigation";

interface SidebarItemProps {
  item: NavigationItem;
}

const SidebarItem = ({ item }: SidebarItemProps) => {
  const Icon = item.icon;

  return (
    <NavLink
      to={item.path}
      className={({ isActive }) =>
        [
          "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
          isActive
            ? "bg-blue-600 text-white shadow-sm"
            : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
        ].join(" ")
      }
    >
      <Icon className="h-5 w-5 flex-shrink-0" />

      <span>{item.title}</span>
    </NavLink>
  );
};

export default SidebarItem;