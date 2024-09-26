'use client'
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownSection, DropdownItem} from "@nextui-org/dropdown";
import { Button } from "@nextui-org/button"
import { useCookies } from 'next-client-cookies';
import { useEffect, useState } from "react";
import { CiUser } from "react-icons/ci";

export function UserDropdown() {
  const iconClasses = "text-xl text-default-500 pointer-events-none flex-shrink-0";


  const cookies = useCookies();
    const [user, setUser] = useState<any>({})

    const token =  cookies.get('token')

  useEffect(() => {

    async function getUserInfoAndStore() {
        const decodedToken = await fetch('http://127.0.0.1:8000/api/erp/decode-token', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({ token: token })
        }).then(response => response.json())

        setUser(decodedToken)
    }

    if(token) getUserInfoAndStore()
  }, [token])


  console.log(user)

  return (
    <Dropdown
      showArrow
      classNames={{
        base: "before:bg-default-200", // change arrow background
        content: "py-1 px-1 border border-default-200 bg-white",
      }}
    >
      <DropdownTrigger>
        <Button 
          variant="flat" 
          isIconOnly
          color="default"
        >
         <CiUser />
        </Button>
      </DropdownTrigger>
      <DropdownMenu variant="faded" aria-label="Dropdown menu with description">
      <DropdownSection title="Informações">  
          <DropdownItem
            description="E-mail"
          >
            {user?.email}
          </DropdownItem>
          <DropdownItem
            description="Corporação"
          >
            {user?.company_name}
          </DropdownItem>
          <DropdownItem
            description="País"
          >
            {user?.country}
          </DropdownItem>
          <DropdownItem
            description="Localidade"
          >
            {user?.city}
          </DropdownItem>
          <DropdownItem
            description="Endereço"
          >
            {user?.address}
          </DropdownItem>
          <DropdownItem>
            <Button onClick={() => {
              cookies.remove('token')
              window.location.reload()
            }}>
              Sair
            </Button>
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
}