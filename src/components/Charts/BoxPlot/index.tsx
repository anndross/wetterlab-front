"use client";
import DashboardContext from "@/app/(private)/dashboard/context";
import React, { useContext, useEffect, useState, useTransition } from "react";
import Plot from "react-plotly.js";
import {
  BoxPlotDataResponseType,
  createBoxPlotData,
} from "./services/createBoxPlotData";
import { Spinner } from "@nextui-org/spinner";
import dayjs from "dayjs";
import mappedServicesJSON from "@/data/mappedServices.json";
import {
  ModelsDataType,
  ModelsEnsembleDataType,
  StationsDataType,
} from "@/types/dashboard";

export type BoxPlotDataType = {
  y: number[] | [];
  x: string[] | [];
  type: "box";
  name: string;
  marker: { color: string };
};

export interface ForecastType {
  dates: string[];
  data: BoxPlotDataType[];
}

interface BoxPlotProps {
  resize?: boolean;
}

export const BoxPlot = ({ resize }: BoxPlotProps) => {
  const [forecast, setForecast] = useState<ForecastType>({
    data: [],
    dates: [],
  });
  const [isResizing, setIsResizing] = useState(false);
  const {
    params: {
      location: { coordinate, state, city },
      refTime,
      service,
    },
  } = useContext(DashboardContext);

  const [lat, lon] = coordinate;

  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    function handleLoadForecast() {
      startTransition(async () => {
        const res = await fetch(
          `/api/services/box-plot?lat=${lat}&lon=${lon}&ref-time=${refTime}&service=${service}`,
          {
            cache: "no-store",
          }
        );

        if (!res.ok) return;

        const { data } = await res.json();

        setForecast(data);
      });
    }

    if (lat && lon && refTime && service) handleLoadForecast();
  }, [lat, lon, refTime, service]);

  useEffect(() => {
    setIsResizing(true);
    setTimeout(() => {
      setIsResizing(false);
    }, 200);
  }, [resize]);

  if (isPending || !forecast?.data || isResizing) {
    return (
      <div className="w-full h-full bg-white rounded-3xl relative">
        <Spinner
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          size="lg"
        />
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

  const formattedDates = forecast?.dates.map((date) =>
    dayjs(date).format("MM/YYYY")
  );

  return (
    <Plot
      data={forecast.data}
      layout={{
        title: `${mappedServices[service]} - ${state}, ${city}`,
        xaxis: {
          title: "Datas",
          type: "category", // Configurar eixo X como categórico para lidar com agrupamento
          tickformat: "%d/%m/%Y", // Exemplo: 15/01/2024
          tickvals: forecast.dates, // Os valores reais no eixo
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
