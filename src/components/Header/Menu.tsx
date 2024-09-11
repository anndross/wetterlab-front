import clsx from "clsx";
import Link from "next/link";
import { Typography } from "../Typography";

export interface MenuProps {
  show?: boolean;
}

export function Menu({ show = false }: MenuProps) {
  return (
    <nav
      className={clsx({
        "w-full h-screen fixed z-10 duration-300 bg-white flex justify-center items-center top-20":
          true,
        "translate-x-0": show,
        "translate-x-full": !show,
      })}
    >
      <ul className="flex flex-col gap-6 items-center justify-center">
        <Link href="">
          <Typography type="span">Sobre</Typography>
        </Link>
        <Link href="">
          <Typography type="span">Serviços</Typography>
        </Link>
        <Link href="">
          <Typography type="span">Contato</Typography>
        </Link>
        <Link href="">
          <Typography type="span">Blog</Typography>
        </Link>
      </ul>
    </nav>
  );
}
