"use client";
import { useFormStatus } from "react-dom";
import { ChildrenI } from "@/types/children";
import { Button } from "../button";

export function FormButton({ children }: ChildrenI) {
  const { pending } = useFormStatus();

  return (
    <Button
      variant="outline"
      className="w-full"
      type="submit"
      disabled={pending}
    >
      {children}
    </Button>
  );
}
