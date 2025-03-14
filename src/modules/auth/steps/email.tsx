"use client";
import { FaUser } from "react-icons/fa";
import { loginAction } from "@/modules/auth/Action";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { Spinner } from "@/components/ui/spinner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useRouter } from "next/navigation";

interface IFormInputs {
  email: string;
}

const LoginFormSchema = z.object({
  email: z
    .string()
    .nonempty("O email é obrigatório.")
    .email("Deve ser um email válido."),
});

export function EmailStep() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors },
    setError,
  } = useForm<IFormInputs>({
    resolver: zodResolver(LoginFormSchema),
  });

  return (
    <form
      className="space-y-4 w-full"
      onSubmit={handleSubmit((data) => {
        if (data.email)
          startTransition(async () => {
            const response = await loginAction(data.email);

            if (response?.error) setError("email", { message: response.error });

            router.push("/dashboard");
          });
      })}
    >
      <div>
        <label className="label" htmlFor="email">
          <span className="text-base text-zinc-600">Email</span>
        </label>
        <div className="flex h-9 my-2">
          <div className="h-full w-10 border flex items-center justify-center">
            <FaUser color="#7f7f7f" />
          </div>
          <input
            {...register("email", { required: true })}
            id="email"
            className="text-black w-full h-full indent-2 border border-zinc-200 rounded-none input-primary bg-white"
            placeholder="email@empresa.com.br"
          />
        </div>
        <span className="text-red-600 text-sm">
          {errors.email && errors.email.message}
        </span>
      </div>

      <div className="mt-4 w-full">
        <Button variant="secondary" className="w-full gap-4" type="submit">
          Entrar
          {isPending && <Spinner className="!h-4 !w-4" />}
        </Button>
      </div>
    </form>
  );
}
