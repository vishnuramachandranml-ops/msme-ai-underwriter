import { Bell } from "lucide-react";

import { Button } from "@/components/ui/button";

interface NotificationButtonProps {
  count?: number;
}

const NotificationButton = ({
  count = 0,
}: NotificationButtonProps) => {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="relative rounded-xl hover:bg-slate-100"
    >
      <Bell className="h-5 w-5 text-slate-600" />

      {count > 0 && (
        <span
          className="
            absolute
            -right-0.5
            -top-0.5
            flex
            h-4
            w-4
            items-center
            justify-center
            rounded-full
            bg-red-500
            text-[9px]
            font-semibold
            text-white
          "
        >
          {count > 9 ? "9+" : count}
        </span>
      )}
    </Button>
  );
};

export default NotificationButton;