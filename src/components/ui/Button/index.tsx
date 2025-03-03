import { ChildrenI } from "@/types/children";
import { Button as ButtonUI } from "@/components/ui/button";

export interface ButtonProps extends ChildrenI {}

export function Button({ children }: ButtonProps) {
  return (
    <ButtonUI
      className="bg-main text-white hover:text-black hover:bg-slate-200"
      variant="outline"
    >
      {children}
    </ButtonUI>
  );
}
