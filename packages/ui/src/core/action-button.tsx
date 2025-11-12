import { Plus, FilePenLine } from "lucide-react";

import { MouseEventHandler, ReactNode } from "react";
import clsx from "clsx";
import { Button } from "@workspace/ui/components/button";

type ActionButtonType = "add" | "edit";

interface ActionButtonProps {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  title: string;
  size?: "icon" | "default";
  type?: ActionButtonType;
  variant?: "default" | "outline";
  disabled?: boolean;
}

/**
 * ActionButton - A smart, reusable action button with icon support.
 * - Shows icon only when size="icon"
 * - Automatically adjusts shape, padding, and variant
 */
const ActionButton = ({
  onClick,
  title,
  size = "default",
  type = "add",
  variant,
  disabled = false,
}: ActionButtonProps) => {
  const icons: Record<ActionButtonType, ReactNode> = {
    add: <Plus className="h-4 w-4" />,
    edit: <FilePenLine className="h-4 w-4" />,
  };

  const isIconOnly = size === "icon";

  return (
    <Button
      type="button"
      onClick={onClick}
      disabled={disabled}
      size={isIconOnly ? "icon" : "default"}
      variant={variant ?? (isIconOnly ? "outline" : "default")}
      aria-label={title}
      className={clsx(
        "transition-all duration-150",
        isIconOnly &&
          "rounded-full p-2 h-9 w-9 flex items-center justify-center"
      )}
    >
      <div className="flex items-center gap-2 justify-center">
        {icons[type]}
        {!isIconOnly && <span className="text-center">{title}</span>}
      </div>
    </Button>
  );
};

export default ActionButton;
