"use client";
import DashboardContext from "@/app/dashboard/context";
import React, { useContext, useEffect, useState, useTransition } from "react";
import Plot from "react-plotly.js";
import { createBoxPlotData } from "./helpers/createBoxPlotData";
import { Spinner } from "@nextui-org/spinner";

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

export const BoxPlot = () => {
  const [forecast, setForecast] = useState<ForecastType>();
  const {
    params: { lat, lon, refTime, service },
  } = useContext(DashboardContext);

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

  if (isPending || !forecast?.stations || !forecast.models) {
    return (
      <div className="w-full h-full bg-white rounded-3xl relative">
        <Spinner
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          size="lg"
        />
      </div>
    );
  }

  const boxPlotData =
    createBoxPlotData(forecast?.models, forecast?.stations) || [];

  return (
    <Plot
      data={boxPlotData}
      layout={{
        title: "Box Plot com Datas no Eixo X",
        xaxis: {
          title: "Datas",
          type: "category", // Configurar eixo X como categórico para lidar com agrupamento
        },
        yaxis: {
          title: "Valores",
        },
        boxmode: "group", // Agrupa as caixas por data
        showlegend: true, // Exibir legendas
      }}
      config={{
        responsive: true, // Deixar o gráfico responsivo
      }}
      style={{ width: "100%", height: "100%" }}
    />
  );
};
