"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { decodeJWT } from "@/utils/decodeJWT";
import { useCookies } from "next-client-cookies";
import { useEffect, useState } from "react";
import { CiUser } from "react-icons/ci";

export function UserDropdown() {
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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <CiUser />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-auto">
        <DropdownMenuLabel>Minha conta</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>Email: {user?.email}</DropdownMenuItem>
          <DropdownMenuItem>Corporação: {user?.company_name}</DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuLabel>Endereço</DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DropdownMenuItem>País: {user?.country}</DropdownMenuItem>
          <DropdownMenuItem>Cidade: {user?.city}</DropdownMenuItem>
          <DropdownMenuItem>Rua: {user?.address}</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Button
            variant="outline"
            onClick={() => {
              cookies.remove("token");
              window.location.reload();
            }}
          >
            Sair
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
