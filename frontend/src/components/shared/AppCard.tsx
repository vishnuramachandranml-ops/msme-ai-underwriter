import type { ReactNode } from "react";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface AppCardProps {
  children: ReactNode;
  className?: string;
}

const AppCard = ({ children, className }: AppCardProps) => {
  return (
    <Card
      className={cn(
        "rounded-2xl border-slate-200 shadow-sm",
        className
      )}
    >
      {children}
    </Card>
  );
};

export default AppCard;