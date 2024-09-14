"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button } from "../Button";
import { Typography } from "../Typography";
import { Menu } from "./Menu";

export function Header() {
  const [show, setShow] = useState(false);

  return (
    <>
      <header className="bg-white w-full fixed top-0 z-20 flex flex-col">
        <div className="w-full h-20 flex justify-between px-[5%] items-center">
          <Link className="md:hidden" href='/'>
            <Image
              src="/assets/logo.png"
              width={138}
              height={54}
              alt="Wetterlab"
              title="Wetterlab"
            />
          </Link>

          <nav className="md:flex hidden gap-6 items-center">
            <Link href='/'>
              <Image
                src="/assets/logo.png"
                width={138}
                height={54}
                alt="Wetterlab"
                title="Wetterlab"
              />
            </Link> 
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
          </nav>

          <div className="md:flex hidden gap-4">
            <Link href="/login">
              <Button>Login</Button>
            </Link>
            <Button variant="secondary">Fale conosco</Button>
          </div>

          <button
            className="md:hidden h-6 w-8 flex flex-col justify-between"
            onClick={() => setShow((prev) => !prev)}
          >
            <div className="w-full h-1 bg-cyan-800" />
            <div className="w-full h-1 bg-cyan-800" />
            <div className="w-full h-1 bg-cyan-800" />
          </button>
        </div>
      </header>
      <Menu show={show} />
    </>
  );
}
