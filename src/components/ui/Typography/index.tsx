import { ChildrenI } from "@/types/children";

export interface TypographyProps extends ChildrenI {
  type: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "strong";
}

export function Typography({ type, children }: TypographyProps) {
  const mappedNodes = {
    h1: <h1 className="">{children}</h1>,
    h2: <h2 className="text-2xl font-medium text-zinc-700">{children}</h2>,
    h3: <h3 className="">{children}</h3>,
    h4: <h4 className="">{children}</h4>,
    h5: <h5 className="">{children}</h5>,
    h6: <h6 className="">{children}</h6>,
    p: <p className="text-base text-slate-500 font-light">{children}</p>,
    span: <span className="">{children}</span>,
    strong: <strong className="">{children}</strong>,
  };

  return mappedNodes[type];
}
