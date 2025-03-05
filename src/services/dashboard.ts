import axios from "axios";
import { getUserPayload } from "@/services/user";

type GetAvailableCoordinatesResponse = {
  data: number[][];
};

export async function getAvailableCoordinates(): Promise<
  GetAvailableCoordinatesResponse["data"] | null
> {
  const userPayload = getUserPayload();

  if (!userPayload) return null;

  const { customer_id } = userPayload;

  if (!userPayload) return null;

  try {
    const { data }: GetAvailableCoordinatesResponse = await axios.get(
      `/wetterlab/api/erp/available-services?customer_id=${customer_id}`
    );

    if (!data) throw new Error("Ocorreu um erro na requisição.");

    return data;
  } catch {
    return null;
  }
}

type GetCoordinateAddressResponse = {
  address: {
    state: string;
    city: string;
    city_district: string;
  };
};

export async function getCoordinateAddress(
  coordinate: [number, number]
): Promise<GetCoordinateAddressResponse | null> {
  const [lat, lon] = coordinate;

  try {
    const { data } = await axios.get<GetCoordinateAddressResponse>(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
    );

    if (!data) throw new Error("Ocorreu um erro na requisição.");

    return data;
  } catch {
    return null;
  }
}
