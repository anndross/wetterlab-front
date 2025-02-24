import { StaticImageData } from "next/image";
import { ElementType, ReactNode } from "react";

export interface CardIconProps {
  icon: ReactNode;
}

export function CardIcon({ icon }: CardIconProps) {
  return <div>{icon}</div>;
}
