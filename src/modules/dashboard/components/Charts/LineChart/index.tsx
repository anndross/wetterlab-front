"use client";
import React, { useCallback, useEffect, useState, useTransition } from "react";
import dynamic from "next/dynamic";
const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });
import { Spinner } from "@/components/ui/spinner";
import { createLineChartData } from "./services/createLineChartData";
import { handleStoreZoomInfo } from "./services/handleStoreZoomInfo";
import { Config, Layout } from "plotly.js";
import mappedServicesJSON from "@/data/mappedServices.json";
import { useDashStore } from "@/modules/dashboard/store";
import { debounce } from "lodash";

interface LineChartProps {
  resize?: boolean;
}

export const LineChart = ({ resize }: LineChartProps) => {
  const {
    location: { coordinate, state, city },
    refTime,
    service,
    mean,
    enableStatistics,
  } = useDashStore((state) => state.params);

  const [lat, lon] = coordinate;

  const [forecast, setForecast] = useState<any>();
  const [plotData, setPlotData] = useState<any>();
  const [isPending, startTransition] = useTransition();
  const [isResizing, setIsResizing] = useState(false);

  const debounceLoadForecast = useCallback(
    debounce(
      (lat, lon, refTime, service, mean) =>
        startTransition(async () => {
          const res = await fetch(
            `/wetterlab/api/meteor/forecast?lat=${lat}&lon=${lon}&ref-time=${refTime}&service=${service}&mean=${mean}`,
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
    if (lat && lon && refTime.value && service && mean)
      debounceLoadForecast(lat, lon, refTime.value, service, mean);
  }, [refTime, service, mean]);

  useEffect(() => {
    setIsResizing(true);
    setTimeout(() => {
      setIsResizing(false);
    }, 200);
  }, [resize]);

  useEffect(() => {
    if (forecast?.models?.length) {
      const data = createLineChartData(
        forecast.models,
        forecast.stations,
        forecast.models_ensemble,
        enableStatistics
      );

      setPlotData(data);
    }
  }, [enableStatistics, forecast]);

  if (isPending || !forecast?.stations || !forecast.models || isResizing) {
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

  const layout: Partial<Layout> = {
    title: `${mappedServices[service]} - ${state}, ${city}`,
    xaxis: {
      title: "Data",
      type: "date", // Garante que o eixo X reconhece os valores como datas
      tickformat: "%d/%m/%Y", // Exemplo: 15/01/2024
      fixedrange: false,
    },
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
    displayModeBar: true,
    locale: "pt-BR",
    displaylogo: false,
    autosizable: true,
  };

  return (
    <div className="w-full h-full bg-white rounded-3xl relative">
      <div className="absolute top-4 left-4 z-10 flex flex-col">
        <span className="text-xs font-semibold text-zinc-700">
          Período:{" "}
          <span className="font-normal" id="zoom-x">
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
