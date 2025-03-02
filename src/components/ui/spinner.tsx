import clsx from "clsx";
import { HTMLProps } from "react";

export interface SpinnerProps {
  className?: HTMLProps<HTMLElement>["className"];
}

export function Spinner({ className }: SpinnerProps) {
  return (
    <div
      className={clsx({
        "w-8 h-8 aspect-square animate-spin rounded-full border-2 border-zinc-200 border-r-cyan-700":
          true,
        [className || ""]: true,
      })}
    />
  );
}
