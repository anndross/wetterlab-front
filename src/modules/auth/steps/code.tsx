"use client";
import { FaUser } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { Spinner } from "@/components/ui/spinner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useRouter } from "next/navigation";

interface IFormInputs {
  code: number;
}

const CodeFormSchema = z.object({
  code: z
    .number({
      required_error: "O código é obrigatório.",
      invalid_type_error: "Deve ser um número.",
    })
    .int()
    .refine((val) => `${val}`.length === 6, "Deve ter 6 digitos."),
});

export function CodeStep() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: zodResolver(CodeFormSchema),
  });

  return (
    <form
      className="space-y-4 w-full"
      onSubmit={handleSubmit((data) => {
        if (data.code)
          startTransition(async () => {
            router.push("/dashboard");
          });
      })}
    >
      <div>
        <label className="label" htmlFor="code">
          <span className="text-base text-zinc-600">Código</span>
        </label>
        <div className="flex h-9 my-2">
          <div className="h-full w-10 border flex items-center justify-center">
            <FaUser color="#7f7f7f" />
          </div>
          <input
            {...register("code", { required: true })}
            id="code"
            className="text-black w-full h-full indent-2 border border-zinc-200 rounded-none input-primary bg-white"
            placeholder="Digite o código enviado no seu email"
          />
        </div>
        <span className="text-red-600 text-sm">
          {errors.code && errors.code.message}
        </span>
      </div>

      <div className="mt-4 w-full">
        <Button variant="secondary" className="w-full gap-4" type="submit">
          Enviar
          {isPending && <Spinner className="!h-4 !w-4" />}
        </Button>
      </div>
    </form>
  );
}
