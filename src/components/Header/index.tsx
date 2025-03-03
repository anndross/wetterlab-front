"use client";
import Image from "next/image";
import Link from "next/link";
import { ReactNode, useState } from "react";
import { Button } from "@/components/ui/button";
import { Button as CustomButton } from "@/components/ui/Button";
import { Typography } from "@/components/ui/Typography";
import { Menu } from "./Menu";
import { UserDropdown } from "./UserDropdown";
import { useCookies } from "next-client-cookies";

export function Header() {
  const [show, setShow] = useState(false);

  const cookies = useCookies();
  const token = cookies.get("token");

  const Logo = () => (
    <Link href="/">
      <Image
        src="/assets/logo.png"
        width={110}
        height={43}
        alt="Wetterlab"
        title="Wetterlab"
      />
    </Link>
  );

  const HeaderLink = ({
    href,
    children,
  }: {
    href: string;
    children: ReactNode | ReactNode[];
  }) => (
    <Link className="text-black text-base font-normal font-main" href={href}>
      {children}
    </Link>
  );

  return (
    <>
      <header className="bg-white shadow-md w-full fixed top-0 z-50 flex h-[var(--header-height)] justify-between px-default items-center">
        <div className="md:hidden">
          <Logo />
        </div>

        <nav className="md:flex hidden gap-6 items-center">
          <Logo />

          <HeaderLink href="/sobre">Sobre</HeaderLink>
          <HeaderLink href="/servicos">Serviços</HeaderLink>
          <HeaderLink href="/contato">Contato</HeaderLink>
          <HeaderLink href="/blog">Blog</HeaderLink>

          {token && <HeaderLink href="/dashboard">Dashboard</HeaderLink>}
        </nav>

        <div className="md:flex hidden gap-4">
          {!token ? (
            <Link href="/login">
              <Button variant="outline">Login</Button>
            </Link>
          ) : (
            <UserDropdown />
          )}
          <CustomButton>Fale conosco</CustomButton>
        </div>

        <button
          className="md:hidden h-6 w-8 flex flex-col justify-between"
          onClick={() => setShow((prev) => !prev)}
        >
          <div className="w-full h-1 bg-cyan-800" />
          <div className="w-full h-1 bg-cyan-800" />
          <div className="w-full h-1 bg-cyan-800" />
        </button>
      </header>
      <Menu show={show} />
    </>
  );
}
