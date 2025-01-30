"use client";
import DashboardContext from "@/app/dashboard/context";
import React, { useContext, useEffect, useState, useTransition } from "react";
import Plot from "react-plotly.js";
import { createBoxPlotData } from "./helpers/createBoxPlotData";
import { Spinner } from "@nextui-org/spinner";
import dayjs from "dayjs";
import mappedServicesJSON from "@/data/mappedServices.json";

export type DataType = {
  date: string;
  min: number;
  p25: number;
  median: number;
  p75: number;
  max: number;
};

export interface ForecastType {
  dates: string[];
  stations: DataType[];
  models: DataType[];
}

interface BoxPlotProps {
  resize?: boolean;
}

export const BoxPlot = ({ resize }: BoxPlotProps) => {
  const [forecast, setForecast] = useState<ForecastType>();
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
        const forecast = await fetch(
          `/api/meteor/forecast?latitude=${lat}&longitude=${lon}&ref-time=${refTime}&service=${service}&mean=30`
        ).then((data) => data.json());

        setForecast(forecast);
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

  if (isPending || !forecast?.stations || !forecast.models || isResizing) {
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

  const { data, dates } = createBoxPlotData(
    forecast?.models,
    forecast?.stations
  ) || { data: [], dates: [] };

  const formattedDates = dates.map((date) => dayjs(date).format("MM/YYYY"));

  return (
    <Plot
      data={data}
      layout={{
        title: `${mappedServices[service]} - ${state}, ${city}`,
        xaxis: {
          title: "Datas",
          type: "category", // Configurar eixo X como categórico para lidar com agrupamento
          tickformat: "%d/%m/%Y", // Exemplo: 15/01/2024
          tickvals: dates, // Os valores reais no eixo
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
