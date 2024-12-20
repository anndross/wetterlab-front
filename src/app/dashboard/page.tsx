"use client";
import { PlotlyChart } from "@/components/Chart";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { FaLongArrowAltRight } from "react-icons/fa";
import { ServiceOptions } from "@/components/ServiceOptions";
import { useState } from "react";
import ParamsContext from "./context";
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

  const [params, setParams] = useState({
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
            "w-full h-20 overflow-hidden grid items-end duration-150 gap-3":
              true,
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
            <PlotlyChart />
          </div>
          <div className="w-full h-full overflow-hidden">
            <GeoMapNoSSR />
          </div>
        </section>
      </main>
    </ParamsContext.Provider>
  );
}

// export default function Dashboard() {
//   const [meteorData, setMeteorData] = useState<MeteorData>({
//     dates: [],
//     stations: [],
//     models: [],
//   });
//   const [filters, setFilters] = useState<filtersType>({
//     state: "",
//     coordinates: [],
//     dateRange: { start: "", end: "" },
//     services: ["t"],
//     mean: 1,
//     refTime: "",
//   });
//   const [loading, setLoading] = useState<boolean>(true);
//   const [resize, setResize] = useState<boolean>(false);

//   /**
//    * @description useEffect responsável pelo armazenamento dos dados de stations e models com base nos filtros
//    */
//   useEffect(() => {
//     /**
//      * @description pega todos os dados de stations com base nos filtros
//      */
//     async function getStationsDataAndStore() {
//       const {
//         coordinates: [lat, lon],
//         services,
//         mean,
//         refTime,
//       } = filters;

//       setLoading(true);

//       const forecast = await fetch(
//         `/api/meteor/forecast?longitude=${lon}&latitude=${lat}&service=${services[0]}&mean=${mean}&reftime=${refTime}`
//       ).then((data) => data.json());
//       console.log("forecast", forecast);

//       if (
//         "dates" in forecast &&
//         "models" in forecast &&
//         "stations" in forecast
//       ) {
//         setMeteorData(forecast);
//       } else {
//         setMeteorData({
//           dates: [],
//           stations: [],
//           models: [],
//         });
//       }

//       setLoading(false);
//     }

//     if (
//       filters.coordinates.length &&
//       filters.refTime.length &&
//       filters.mean &&
//       filters.services
//     )
//       getStationsDataAndStore();

//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [filters.coordinates, filters.mean, filters.services, filters.refTime]);

//   console.log("filters", filters);
//   const mappedServices: { [key: string]: string } = mappedServicesJSON;

//   // responsável por recarregar o gráfico quando o layout mudar
//   useEffect(() => {
//     setLoading(true);

//     setTimeout(() => {
//       setLoading(false);
//     }, 100);
//   }, [resize]);

//   return (
//     <ParamsContext.Provider
//       value={{
//         loading,
//         meteorData,
//         setMeteorData,
//         filters,
//         setFilters,
//       }}
//     >
//       <main className={"w-full flex flex-col p-6 gap-4 bg-slate-50"}>
//         <section
//           className={clsx({
//             "w-full h-20 overflow-hidden grid items-end duration-150 gap-3":
//               true,
//             "grid-cols-[calc(100%-396px)_384px]": resize,
//             "grid-cols-[calc(95%-12px)_5%]": !resize,
//           })}
//         >
//           <div className="flex gap-5 h-full">
//             <RefTimesOptions />
//             <ServiceOptions />
//             <MeanOptions />
//           </div>

//           <Button
//             className="w-full min-w-full"
//             onClick={() => setResize((prev) => !prev)}
//           >
//             {resize ? <FaLongArrowAltRight /> : <FaLongArrowAltLeft />}
//           </Button>
//         </section>

//         <section
//           className={clsx({
//             "w-full h-full overflow-hidden grid duration-150 gap-3": true,
//             "grid-cols-[calc(100%-396px)_384px]": resize,
//             "grid-cols-[calc(95%-12px)_5%]": !resize,
//           })}
//         >
//           <div className="">
//             <PlotlyChart />
//           </div>
//           <div className="w-full h-full overflow-hidden">
//             <GeoMap />
//           </div>
//         </section>
//       </main>
//     </ParamsContext.Provider>
//   );
// }
