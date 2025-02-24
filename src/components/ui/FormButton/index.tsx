'use client'
import { useFormStatus } from "react-dom"
import {Button} from "@nextui-org/button";
import { ChildrenI } from "@/types/children";

export function FormButton({children}: ChildrenI) {
    const { pending } = useFormStatus()

    return <Button className="w-full" type="submit" disabled={pending} isLoading={pending}>{children}</Button>
}