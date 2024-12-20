"use client";
import React, { useContext, useEffect, useState, useTransition } from "react";
import dynamic from "next/dynamic";
const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });
import { Spinner } from "@nextui-org/spinner";
import { Forecast } from "@/app/dashboard/context";
import { preparePlotData } from "./utils/preparePlotData";
import { handleStoreZoomInfo } from "./utils/handleStoreZoomInfo";
import { Config, Layout } from "plotly.js";
import ParamsContext from "@/app/dashboard/context";
import mappedServicesJSON from "@/data/mappedServices.json";

export const PlotlyChart = () => {
  const { params } = useContext(ParamsContext);
  const { lat, lon, refTime, service, mean } = params;

  const [forecast, setForecast] = useState<Forecast>();
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    function handleLoadForecast() {
      startTransition(async () => {
        const forecast = await fetch(
          `/api/meteor/forecast?latitude=${lat}&longitude=${lon}&reftime=${refTime}&service=${service}&mean=${mean}`
        ).then((data) => data.json());

        setForecast(forecast);
      });
    }

    if (lat && lon && refTime && service && mean) handleLoadForecast();
  }, [lat, lon, refTime, service, mean]);

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

  const plotData = [
    ...preparePlotData(forecast.stations, [
      {
        type: "scatter",
        mode: "lines+markers",
        name: "Observados",
        line: { color: "#1f77b4" },
      },
      {
        type: "scatter",
        mode: "none",
        fill: "tonexty",
        name: "Variação inferior",
        fillcolor: "rgba(0, 150, 255, 0.2)",
      },
      {
        type: "scatter",
        mode: "none",
        fill: "tonexty",
        name: "Variação superior",
        fillcolor: "rgba(0, 150, 255, 0.2)",
      },
    ]),
    ...preparePlotData(forecast.models, [
      {
        type: "scatter",
        mode: "lines+markers",
        name: "Previsões",
        line: { color: "#000" },
      },
      {
        type: "scatter",
        mode: "none",
        fill: "tonexty",
        name: "Variação inferior",
        fillcolor: "rgba(255, 127, 14, 0.2)",
      },
      {
        type: "scatter",
        mode: "none",
        fill: "tonexty",
        name: "Variação superior",
        fillcolor: "rgba(255, 127, 14, 0.2)",
      },
    ]),
  ];

  const mappedServices: { [key: string]: string } = mappedServicesJSON;
  const servicesLabel: { [key: string]: string } = {
    wspd: "m/s",
    t: "ºC",
    prate: "mm",
    rh: "%",
  };

  const layout: Partial<Layout> = {
    title: mappedServices[service],
    xaxis: { title: "Data", fixedrange: false },
    yaxis: { title: servicesLabel[service], fixedrange: false },
    showlegend: true,
    legend: {
      orientation: "h",
      y: -0.3,
      x: 0.5,
      xanchor: "center",
      yanchor: "top",
    },
  };

  const config: Partial<Config> = {
    responsive: true,
    displayModeBar: true,
    locale: "pt-BR",
    displaylogo: false,
    autosizable: true,
  };

  return (
    <div className="w-full h-full bg-white rounded-3xl relative">
      <div className="absolute top-4 left-4 z-10 flex flex-col">
        <span className="text-xs font-semibold text-zinc-700">
          Zoom X:{" "}
          <span className="font-normal" id="zoom-x">
            não aplicado
          </span>
        </span>
        <span className="text-xs font-semibold text-zinc-700">
          Zoom Y:{" "}
          <span className="font-normal" id="zoom-y">
            não aplicado
          </span>
        </span>
      </div>

      <Plot
        data={plotData}
        layout={layout}
        onUpdate={handleStoreZoomInfo}
        config={config}
        useResizeHandler={true}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
};

// const servicesLabel: { [key: string]: string } = {
//   wspd: "m/s",
//   t: "ºC",
//   prate: "mm",
//   rh: "%",
// };
