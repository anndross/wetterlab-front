"use client";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
} from "@nextui-org/dropdown";
import { Button } from "@nextui-org/button";
import { useCookies } from "next-client-cookies";
import { useEffect, useState } from "react";
import { CiUser } from "react-icons/ci";
import { decodeJWT } from "@/utils/decodeJWT";

export function UserDropdown() {
  const iconClasses =
    "text-xl text-default-500 pointer-events-none flex-shrink-0";

  const cookies = useCookies();
  const [user, setUser] = useState<any>({});

  const token = cookies.get("token");

  useEffect(() => {
    if (token) {
      const decodedToken = decodeJWT(token);

      setUser(decodedToken);
    }
  }, [token]);

  return (
    <Dropdown
      showArrow
      classNames={{
        base: "before:bg-default-200", // change arrow background
        content: "py-1 px-1 border border-default-200 bg-white",
      }}
    >
      <DropdownTrigger>
        <Button variant="flat" isIconOnly color="default">
          <CiUser />
        </Button>
      </DropdownTrigger>
      <DropdownMenu variant="faded" aria-label="Dropdown menu with description">
        <DropdownSection title="Informações">
          <DropdownItem description="E-mail" className="text-black">
            {user?.email}
          </DropdownItem>
          <DropdownItem description="Corporação" className="text-black">
            {user?.company_name}
          </DropdownItem>
          <DropdownItem description="País" className="text-black">
            {user?.country}
          </DropdownItem>
          <DropdownItem description="Localidade" className="text-black">
            {user?.city}
          </DropdownItem>
          <DropdownItem description="Endereço" className="text-black">
            {user?.address}
          </DropdownItem>
          <DropdownItem>
            <Button
              onClick={() => {
                cookies.remove("token");
                window.location.reload();
              }}
            >
              Sair
            </Button>
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
}
