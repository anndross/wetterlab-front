import { decodeJWT } from "@/utils/decodeJWT";
import { cookies } from "next/headers";

export function getToken(): string | undefined {
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

export function getUserPayload(): UserPayload | null {
  const token = getToken();

  if (!token?.length) return null;

  const decodedToken: UserPayload = decodeJWT(token);

  return decodedToken;
}
