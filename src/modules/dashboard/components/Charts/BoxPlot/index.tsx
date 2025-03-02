"use client";
import React, { useCallback, useEffect, useState, useTransition } from "react";
import Plot from "react-plotly.js";
import {
  BoxPlotDataResponseType,
  createBoxPlotData,
} from "./services/createBoxPlotData";
import { Spinner } from "@/components/ui/spinner";
import dayjs from "dayjs";
import mappedServicesJSON from "@/data/mappedServices.json";
import { useDashStore } from "@/modules/dashboard/store";
import { debounce } from "lodash";

export type BoxPlotDataType = {
  y: number[] | [];
  x: string[] | [];
  type: "box";
  name: string;
  marker: { color: string };
};

export interface ForecastType {
  dates: string[];
  stations: any[];
  models: any[];
  models_ensemble: any[];
}

interface BoxPlotProps {
  resize?: boolean;
}

export const BoxPlot = ({ resize }: BoxPlotProps) => {
  const [forecast, setForecast] = useState<any>({
    dates: [],
    stations: [],
    models: [],
    models_ensemble: [],
  });

  const [isResizing, setIsResizing] = useState(false);
  const {
    location: { coordinate, state, city },
    refTime,
    service,
  } = useDashStore((state) => state.params);

  const [lat, lon] = coordinate;

  const [isPending, startTransition] = useTransition();

  const debounceLoadForecast = useCallback(
    debounce(
      (lat, lon, refTime, service) =>
        startTransition(async () => {
          const res = await fetch(
            `/wetterlab/api/meteor/forecast-statistics?lat=${lat}&lon=${lon}&ref-time=${refTime}&service=${service}`,
            {
              cache: "no-store",
            }
          );

          if (!res.ok) return;

          const data = await res.json();

          setForecast(data);
        }),
      1000
    ),
    [] // será criada apenas uma vez inicialmente
  );

  useEffect(() => {
    if (lat && lon && refTime.value && service)
      debounceLoadForecast(lat, lon, refTime.value, service);
  }, [refTime, service]);

  useEffect(() => {
    setIsResizing(true);
    setTimeout(() => {
      setIsResizing(false);
    }, 200);
  }, [resize]);

  if (isPending || !forecast || isResizing) {
    return (
      <div className="w-full h-full bg-white rounded-3xl relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Spinner />
        </div>
      </div>
    );
  }

  const mappedServices: { [key: string]: string } = mappedServicesJSON;
  const servicesLabel: { [key: string]: string } = {
    wspd: "m/s",
    t: "ºC",
    prate: "mm",
    rh: "%",
  };

  const formattedDates = forecast?.dates.map((date: string) =>
    dayjs(date).format("MM/YYYY")
  );

  const { stations, models, models_ensemble } = forecast;

  let boxPlotData: BoxPlotDataResponseType = {
    data: [],
    dates: [],
  };

  try {
    const data = createBoxPlotData(models_ensemble, stations, models);

    boxPlotData = data || { data: [], dates: [] };
  } catch {
    boxPlotData = {
      data: [],
      dates: [],
    };
  }

  return (
    <Plot
      data={boxPlotData.data}
      layout={{
        title: `${mappedServices[service]} - ${state}, ${city}`,
        xaxis: {
          title: "Datas",
          type: "category", // Configurar eixo X como categórico para lidar com agrupamento
          tickformat: "%m/%Y", // Exemplo: 15/01/2024
          tickvals: boxPlotData.dates, // Os valores reais no eixo
          ticktext: formattedDates,
        },
        yaxis: {
          title: servicesLabel[service],
        },
        boxmode: "group", // Agrupa as caixas por data
        showlegend: true, // Exibir legendas
      }}
      config={{
        responsive: true, // Deixar o gráfico responsivo
        modeBarButtonsToRemove: [
          "zoom2d",
          "pan2d",
          "select2d",
          "lasso2d",
          "zoomIn2d",
          "zoomOut2d",
          "autoScale2d",
          "hoverClosestCartesian",
          "hoverCompareCartesian",
        ],
      }}
      style={{ width: "100%", height: "100%" }}
    />
  );
};
