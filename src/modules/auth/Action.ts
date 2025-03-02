"use server";
import { cookies } from "next/headers";

export async function loginAction(email: string) {
  const api = "http://34.23.51.63:8000/api/erp/login";

  try {
    const response = await fetch(api, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ email }),
    });

    const { data, error } = await response.json();

    const cookieStore = cookies();

    if (error) {
      throw new Error(error);
    }

    if (data) {
      cookieStore.set("token", data);
    }

    return { message: "Login efetuado com sucesso!" };
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    }
    return { error: "Ocorreu um erro desconhecido." };
  }
}
