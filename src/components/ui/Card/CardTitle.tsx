import { ChildrenI } from "@/types/children";
import { Typography } from "../Typography";

export function CardTitle({ children }: ChildrenI) {
  return <Typography type="h2">{children}</Typography>;
}
