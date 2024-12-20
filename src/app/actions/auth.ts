"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function AuthAction(formData: FormData) {
  const email = formData.get("email");

  const api = "/api/erp/login";

  const token = await fetch(api, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ email }),
  })
    .then((response) => response.json())
    .then((data) => data);

  console.log(token);

  const cookieStore = cookies();

  if (token.data) {
    cookieStore.set("token", token.data);

    redirect("/dashboard");
  }

  return "failed";
}
