"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function AuthAction(formData: FormData) {
  const email = formData.get("email");

  const api =
    process.env.NODE_ENV === "production"
      ? "http://34.23.51.63:8000/api/erp/login"
      : "http://127.0.0.1:8000/api/erp/login";

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

  const cookieStore = cookies();

  if (token.data) {
    cookieStore.set("token", token.data);

    redirect("/dashboard");
  }

  return "failed";
}
