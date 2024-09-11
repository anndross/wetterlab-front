import { ChildrenI } from "@/types/children";
import { Typography } from "../Typography";

export function CardDescription({ children }: ChildrenI) {
  return <Typography type="p">{children}</Typography>;
}
