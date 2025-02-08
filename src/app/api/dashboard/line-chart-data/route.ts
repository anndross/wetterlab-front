import backendBasePath from "../../../../../backendBasePath";
import { createLineChartData } from "./services/createLineChartData";

export async function GET(req: Request) {
  try {
    const lat = new URL(req.url).searchParams.get("lat");
    const lon = new URL(req.url).searchParams.get("lon");
    const mean = new URL(req.url).searchParams.get("mean");
    const refTime = new URL(req.url).searchParams.get("ref-time");
    const service = new URL(req.url).searchParams.get("service");

    const { models, stations, models_ensemble } = await fetch(
      `${backendBasePath}/wetterlab/api/meteor/forecast?latitude=${lat}&longitude=${lon}&ref-time=${refTime}&service=${service}&mean=${mean}`
    ).then((data) => data.json());

    const data = createLineChartData(models, stations, models_ensemble);

    return Response.json(data, {
      status: 200,
    });
  } catch (error) {
    const res = {
      message: "Não foi possível consultar os dados para o gráfico de linha",
      error: error,
    };

    console.error(res);

    return Response.json(res, {
      status: 500,
    });
  }
}
