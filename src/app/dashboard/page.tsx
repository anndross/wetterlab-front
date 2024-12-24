"use client";
import { PlotlyChart } from "@/components/Chart";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { FaLongArrowAltRight } from "react-icons/fa";
import { ServiceOptions } from "@/components/ServiceOptions";
import { useState } from "react";
import ParamsContext, { ParamsType } from "./context";
import { MeanOptions } from "@/components/MeanOptions";
import { Button } from "@nextui-org/button";
import clsx from "clsx";
import { RefTimeOptions } from "@/components/RefTimeOptions";
import dynamic from "next/dynamic";
const GeoMapNoSSR = dynamic(
  () => import("@/components/GeoMap").then((module) => module.GeoMap),
  {
    ssr: false,
  }
);

export default function Dashboard() {
  const [resize, setResize] = useState(false);

  const [params, setParams] = useState<ParamsType["params"]>({
    lat: null,
    lon: null,
    refTime: "",
    mean: 1,
    service: "wspd",
  });

  return (
    <ParamsContext.Provider
      value={{
        params,
        setParams,
      }}
    >
      <main className={"w-full flex flex-col p-6 gap-4 bg-slate-50"}>
        <section
          className={clsx({
            "w-full h-20 grid items-end duration-150 gap-3": true,
            "grid-cols-[calc(100%-396px)_384px]": resize,
            "grid-cols-[calc(95%-12px)_5%]": !resize,
          })}
        >
          <div className="flex gap-5 h-full">
            <RefTimeOptions />
            <ServiceOptions />
            <MeanOptions />
          </div>

          <Button
            className="w-full min-w-full"
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
          <div className="">
            <PlotlyChart resize={resize} />
          </div>
          <div className="w-full h-full overflow-hidden">
            <GeoMapNoSSR />
          </div>
        </section>
      </main>
    </ParamsContext.Provider>
  );
}
