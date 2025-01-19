"use client";
import React, { useContext, useEffect, useState, useTransition } from "react";
import dynamic from "next/dynamic";
const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });
import { Spinner } from "@nextui-org/spinner";
import { createLineChartData } from "./helpers/createLineChartData";
import { handleStoreZoomInfo } from "./helpers/handleStoreZoomInfo";
import { Config, Layout } from "plotly.js";
import ParamsContext from "@/app/dashboard/context";
import mappedServicesJSON from "@/data/mappedServices.json";

// export interface ForecastType {
//   dates: string[];
//   stations: {
//     x: string[];
//     y: number[];
//   }[];
//   models: {
//     x: string[];
//     y: number[];
//   }[];
// }

interface LineChartProps {
  resize: boolean;
}

export const LineChart = ({ resize }: LineChartProps) => {
  const {
    params: { lat, lon, refTime, service, mean },
  } = useContext(ParamsContext);

  const [forecast, setForecast] = useState<any>();
  const [isPending, startTransition] = useTransition();
  const [isResizing, setIsResizing] = useState(false);

  useEffect(() => {
    function handleLoadForecast() {
      startTransition(async () => {
        const forecast = await fetch(
          `/api/meteor/forecast?latitude=${lat}&longitude=${lon}&ref-time=${refTime}&service=${service}&mean=${mean}`
        ).then((data) => data.json());

        setForecast(forecast);
      });
    }

    if (lat && lon && refTime && service && mean) handleLoadForecast();
  }, [lat, lon, refTime, service, mean]);

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

  const plotData = createLineChartData(forecast.models, forecast.stations);
  console.log("forecast", forecast);

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
