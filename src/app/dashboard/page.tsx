"use client";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { FaLongArrowAltRight } from "react-icons/fa";
import { ServiceOptions } from "@/components/ServiceOptions";
import { ReactNode, useState } from "react";
import DashboardContext, { DashboardType } from "./context";
import { MeanOptions } from "@/components/MeanOptions";
import { Button } from "@nextui-org/button";
import clsx from "clsx";
import { RefTimeOptions } from "@/components/RefTimeOptions";
import dynamic from "next/dynamic";
import { LineChart } from "@/components/LineChart";
import { BoxPlot } from "@/components/BoxPlot";
import { SelectChart } from "@/components/SelectChart";
const GeoMapNoSSR = dynamic(
  () => import("@/components/GeoMap").then((module) => module.GeoMap),
  {
    ssr: false,
  }
);

const BoxPlotNoSSR = dynamic(
  () => import("@/components/BoxPlot").then((module) => module.BoxPlot),
  {
    ssr: false,
  }
);
const LineChartNoSSR = dynamic(
  () => import("@/components/LineChart").then((module) => module.LineChart),
  {
    ssr: false,
  }
);

type ChartType = {
  [key in DashboardType["params"]["chart"]]: ReactNode;
};

export default function Dashboard() {
  const [params, setParams] = useState<DashboardType["params"]>({
    lat: null,
    lon: null,
    refTime: "",
    mean: 1,
    service: "wspd",
    chart: "LineChart",
  });

  const chart: ChartType = {
    LineChart: <LineChartNoSSR />,
    BoxPlot: <BoxPlotNoSSR />,
  };

  return (
    <DashboardContext.Provider
      value={{
        params,
        setParams,
      }}
    >
      <main className={"w-full h-screen flex flex-col p-6 gap-4 bg-slate-50"}>
        <section
          className={clsx({
            "w-full h-20 grid items-end duration-150 gap-3": true,
          })}
        >
          <div className="flex gap-5 h-full">
            <SelectChart />
            <RefTimeOptions />
            <ServiceOptions />
            <MeanOptions />
            <GeoMapNoSSR />
          </div>
        </section>

        <section
          className={clsx({
            "w-full h-full overflow-hidden grid duration-150 gap-3": true,
          })}
        >
          <div className="flex flex-col">{chart[params.chart]}</div>
        </section>
      </main>
    </DashboardContext.Provider>
  );
}
