"use server";
import axios from "axios";
import { cookies } from "next/headers";

export async function loginAction(email: string) {
  const api = "http://34.23.51.63:8000/api/erp/login";

  try {
    const { data: responseData } = await axios.post(api, { email });

    const { data, error } = responseData;

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
