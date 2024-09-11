import { ChildrenI } from "@/types/children";
import clsx from "clsx";

export interface ButtonProps extends ChildrenI {
  variant?: "primary" | "secondary";
}

export function Button({ children, variant = "primary" }: ButtonProps) {
  return (
    <button
      className={clsx({
        "p-2 min-w-20 text-base font-light duration-300": true,
        "bg-white text-cyan-700 font-normal": variant === "primary",
        "bg-cyan-700 rounded-3xl border border-cyan-700 text-white hover:bg-white hover:text-cyan-700":
          variant === "secondary",
      })}
    >
      {children}
    </button>
  );
}
