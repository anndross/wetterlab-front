"use server";

import { decodeJWT } from "@/utils/decodeJWT";
import { cookies } from "next/headers";

export async function getToken(): Promise<string | undefined> {
  const token = cookies().get("token")?.value;

  return token;
}

type UserPayload = {
  address: string;
  city: string;
  company_name: string;
  contact_name: string;
  country: string;
  customer_id: number;
  email: string;
  phone: string;
  postal_code: string;
  exp: number;
};

export async function getUserPayload(): Promise<UserPayload | null> {
  const token = await getToken();

  if (!token?.length) return null;

  const decodedToken: UserPayload = decodeJWT(token);

  return decodedToken;
}
