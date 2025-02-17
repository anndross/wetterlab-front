"use client";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { FaLongArrowAltRight } from "react-icons/fa";
import { ServiceOptions } from "@/components/ServiceOptions";
import { ReactNode, useState } from "react";
import DashboardContext, { DashboardType } from "./context";
import { MeanOptions } from "@/components/MeanOptions";
import clsx from "clsx";
import { RefTimeOptions } from "@/components/RefTimeOptions";
import { SelectChart } from "@/components/SelectChart";
import dynamic from "next/dynamic";
import { ToggleStatistics } from "@/components/ToggleStatistics";
import { Button } from "@/components/ui/button";
const GeoMapNoSSR = dynamic(
  () => import("@/components/GeoMap").then((module) => module.GeoMap),
  {
    ssr: false,
  }
);

const BoxPlotNoSSR = dynamic(
  () => import("@/components/Charts/BoxPlot").then((module) => module.BoxPlot),
  {
    ssr: false,
  }
);
const LineChartNoSSR = dynamic(
  () =>
    import("@/components/Charts/LineChart").then((module) => module.LineChart),
  {
    ssr: false,
  }
);

type ChartType = {
  [key in DashboardType["params"]["chart"]]: ReactNode;
};

export default function Dashboard() {
  const [resize, setResize] = useState(false);
  const [toggleStatistics, setToggleStatistics] = useState(true);

  const [params, setParams] = useState<DashboardType["params"]>({
    location: {
      coordinate: [null, null],
      state: "",
      city: "",
    },
    refTime: "",
    mean: 1,
    service: "wspd",
    chart: "LineChart",
  });

  const chart: ChartType = {
    LineChart: <LineChartNoSSR resize={resize} />,
    BoxPlot: <BoxPlotNoSSR resize={resize} />,
  };

  return (
    <DashboardContext.Provider
      value={{
        params,
        setParams,
        toggleStatistics,
        setToggleStatistics,
      }}
    >
      <main className={"w-full h-screen flex flex-col p-6 gap-4 bg-slate-50"}>
        <section
          className={clsx({
            "w-full h-20 grid items-end duration-150 gap-3": true,
            "grid-cols-[calc(100%-396px)_384px]": resize,
            "grid-cols-[calc(95%-12px)_5%]": !resize,
          })}
        >
          <div className="flex gap-5 h-full">
            <SelectChart />
            <RefTimeOptions />
            <ServiceOptions />
            {params.chart === "LineChart" && <MeanOptions />}
            {params.chart === "LineChart" && <ToggleStatistics />}
          </div>

          <Button
            className="w-full min-w-full"
            variant="outline"
            onClick={() => setResize((prev) => !prev)}
          >
            {resize ? <FaLongArrowAltRight /> : <FaLongArrowAltLeft />}
          </Button>
        </section>

        <section
          className={clsx({
            "w-full h-full overflow-hidden grid duration-150 gap-3": true,
            "grid-cols-[calc(100%-396px)_384px]": resize,
            "grid-cols-[calc(95%-12px)_5%]": !resize,
          })}
        >
          <div className="flex flex-col">{chart[params.chart]}</div>
          <div className="w-full h-full overflow-hidden">
            <GeoMapNoSSR />
          </div>
        </section>
      </main>
    </DashboardContext.Provider>
  );
}
