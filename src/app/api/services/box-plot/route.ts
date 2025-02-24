import { ModelsEnsembleDataType } from "@/types/dashboard";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const lat = searchParams.get("lat");
    const lon = searchParams.get("lon");
    const refTime = searchParams.get("ref-time");
    const service = searchParams.get("service");

    const basePath =
      process.env.NODE_ENV === "production"
        ? "http://34.23.51.63"
        : "http://127.0.0.1:8000";

    const res = await fetch(
      `${basePath}/api/meteor/forecast-statistics?lat=${lat}&lon=${lon}&ref-time=${refTime}&service=${service}`
    );

    const { stations, models, models_ensemble } = await res.json();

    const boxPlotData = createBoxPlotData(models_ensemble, models, stations);

    return new Response(JSON.stringify({ data: boxPlotData }), {
      status: 200,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Algo deu errado", error: error }),
      {
        status: 500,
      }
    );
  }
}

type BoxPlotDataType = {
  y: number[] | [];
  x: string[] | [];
  type: "box";
  name: string;
  marker: { color: string };
};

interface BoxPlotDataResponseType {
  data: BoxPlotDataType[];
  dates: Date[] | string[];
}

function createBoxPlotData(
  modelsEnsemble: ModelsEnsembleDataType[] | undefined,
  models: ModelsEnsembleDataType[] | undefined,
  stations: ModelsEnsembleDataType[] | undefined
): BoxPlotDataResponseType {
  if (!modelsEnsemble?.length || !models?.length || !stations?.length)
    throw new Error("Dados inválidos");

  const modelsEnsembleTrace: BoxPlotDataType = {
    y: [],
    x: [],
    type: "box",
    name: "Previsões Ensemble",
    marker: { color: "#5C7285" },
  };

  const modelsTrace: BoxPlotDataType = {
    y: [],
    x: [],
    type: "box",
    name: "Previsões",
    marker: { color: "#CD5C08" },
  };

  const stationsTrace: BoxPlotDataType = {
    y: [],
    x: [],
    type: "box",
    name: "Observados",
    marker: { color: "#35374B" },
  };

  for (let i = 0; i < modelsEnsemble.length; i++) {
    const modelsEnsembleByIndex = modelsEnsemble[i];
    const modelsByIndex = models[i];
    const stationsByIndex = stations[i];

    const getValues = (value: ModelsEnsembleDataType) => {
      return Object.values(value).filter((e) => typeof e !== "string");
    };

    const values1 = getValues(modelsEnsembleByIndex);
    const values2 = getValues(modelsByIndex);
    const values3 = getValues(stationsByIndex);

    const axisX = `${modelsEnsembleByIndex.date},`
      .repeat(values1.length)
      .split(",")
      .filter((date) => {
        return !!new Date(date).getDate();
      });

    modelsEnsembleTrace.y = [...modelsEnsembleTrace.y, ...values1];
    modelsEnsembleTrace.x = [...modelsEnsembleTrace.x, ...axisX];

    modelsTrace.y = [...modelsTrace.y, ...values2];
    modelsTrace.x = [...modelsTrace.x, ...axisX];

    stationsTrace.y = [...stationsTrace.y, ...values3];
    stationsTrace.x = [...stationsTrace.x, ...axisX];
  }

  return {
    data: [modelsEnsembleTrace, modelsTrace, stationsTrace],
    dates: modelsEnsembleTrace.x,
  };
}
