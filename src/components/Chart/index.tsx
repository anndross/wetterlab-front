"use client";
import React, { useContext } from "react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import Plot from "react-plotly.js";
import { Spinner } from "@nextui-org/spinner";
import stationsContext from "@/app/dashboard/context";
import mappedServicesJSON from "@/data/mappedServices.json";

dayjs.extend(customParseFormat);
dayjs.extend(utc);
dayjs.extend(timezone);

export const PlotlyChart = () => {
  const { meteorData, loading, filters } = useContext(stationsContext);

  const preparePlotData = (data: any[], baseConfig: any) =>
    data.map((item, index) => ({
      ...item,
      ...baseConfig[index],
    }));

  const plotData = [
    ...preparePlotData(meteorData.stations, [
      { type: "scatter", mode: "lines+markers", name: "Observados", line: { color: "#1f77b4" } },
      { type: "scatter", mode: "none", fill: "tonexty", name: "Variação inferior", fillcolor: "rgba(0, 150, 255, 0.2)" },
      { type: "scatter", mode: "none", fill: "tonexty", name: "Variação superior", fillcolor: "rgba(0, 150, 255, 0.2)" },
    ]),
    ...preparePlotData(meteorData.models, [
      { type: "scatter", mode: "lines+markers", name: "Previsões", line: { color: "#000" } },
      { type: "scatter", mode: "none", fill: "tonexty", name: "Variação inferior", fillcolor: "rgba(255, 127, 14, 0.2)" },
      { type: "scatter", mode: "none", fill: "tonexty", name: "Variação superior", fillcolor: "rgba(255, 127, 14, 0.2)" },
    ]),
  ];

  const handleStoreZoomInfo = (data: any) => {
    console.log(data)

    if (typeof document === "undefined") return;



    const zoomXElement = document.getElementById("zoom-x");
    const zoomYElement = document.getElementById("zoom-y");
    if (!zoomXElement || !zoomYElement) return;

    const filteredData = data.data.filter((data: any) => {
      return data.name.toLowerCase() === 'observados' || data.name.toLowerCase() === 'previsões'
    })

    const { range: [date1, date2] } = data.layout.xaxis;
    const { range: [value1, value2] } = data.layout.yaxis;

    zoomXElement.textContent = date1 && date2 ? `${dayjs(date1).format('DD/MM/YYYY')} - ${dayjs(date2).format('DD/MM/YYYY')}` : "não aplicado";
    zoomYElement.textContent = value1 && value2 ? `${value1.toFixed(2)} - ${value2.toFixed(2)}` : "não aplicado";
  };

  const mappedServices: { [key: string]: string } = mappedServicesJSON;
  const servicesLabel: { [key: string]: string } = { wspd: "m/s", t: "ºC", prate: "mm", rh: "%" };



  const layout: any = {
    title: mappedServices[filters.services[0]],
    xaxis: { title: "Data", fixedrange: false },
    yaxis: { title: servicesLabel[filters.services[0]], fixedrange: false },
    showlegend: true,
    legend: { orientation: "h", y: -0.3, x: 0.5, xanchor: "center", yanchor: "top" },
  };

  const config: any = {
    responsive: true,
    // modeBarButtonsToRemove: [
    //   "zoom2d",
    //   "pan2d",
    //   "select2d",
    //   "lasso2d",
    //   "zoomIn2d",
    //   "zoomOut2d",
    //   "autoScale2d",
    //   "hoverClosestCartesian",
    //   "hoverCompareCartesian",
    // ],
    displayModeBar: true,
    locale: "pt-BR",
    displaylogo: false,
  };

  return (
    <div className="w-full h-full bg-white rounded-3xl relative">
      {loading || !plotData.length ? (
        <Spinner className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" size="lg" />
      ) : (
        <>
          <div className="absolute top-4 left-4 z-10 flex flex-col">
            <span className="text-xs font-semibold text-zinc-700">
              Zoom X: <span className="font-normal" id="zoom-x">não aplicado</span>
            </span>
            <span className="text-xs font-semibold text-zinc-700">
              Zoom Y: <span className="font-normal" id="zoom-y">não aplicado</span>
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
        </>
      )}
    </div>
  );
};
