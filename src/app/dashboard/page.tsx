"use client";
import { PlotlyChart } from "@/components/Chart";
import { DatePicker } from "@/components/DatePicker";
import { GeoMap } from "@/components/GeoMap";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { FaLongArrowAltRight } from "react-icons/fa";
import { ServiceOptions } from "@/components/ServiceOptions";
import { useEffect, useState } from "react";
import ThemeContext, { filtersType, MeteorData } from "./context";
import mappedServicesJSON from "@/data/mappedServices.json";
import { useCookies } from "next-client-cookies";
import { MeanOptions } from "@/components/MeanOptions";
import { Button } from "@nextui-org/button";
import clsx from "clsx";
import { RefTimesOptions } from "@/components/RefTimesOptions";

export default function Dashboard() {
  const [meteorData, setMeteorData] = useState<MeteorData>({
    dates: [],
    stations: [],
    models: [],
  });
  const [filters, setFilters] = useState<filtersType>({
    state: "",
    coordinates: [],
    dateRange: { start: "", end: "" },
    services: ["t"],
    mean: 1,
    refTime: "",
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [showMap, setShowMap] = useState<boolean>(false);

  /**
   * @description useEffect responsável pelo armazenamento dos dados de stations e models com base nos filtros
   */
  useEffect(() => {
    /**
     * @description pega todos os dados de stations com base nos filtros
     */
    async function getStationsDataAndStore() {
      const {
        coordinates: [lat, lon],
        services,
        mean,
        refTime,
      } = filters;

      setLoading(true);

      const forecast = await fetch(
        `http://34.23.51.63:8000/api/meteor/forecast?longitude=${lon}&latitude=${lat}&service=${services[0]}&mean=${mean}&reftime=${refTime}`
      ).then((data) => data.json());
      console.log("forecast", forecast);

      if (
        "dates" in forecast &&
        "models" in forecast &&
        "stations" in forecast
      ) {
        setMeteorData(forecast);
      } else {
        setMeteorData({
          dates: [],
          stations: [],
          models: [],
        });
      }

      setLoading(false);
    }

    if (
      filters.coordinates.length &&
      filters.refTime.length &&
      filters.mean &&
      filters.services
    )
      getStationsDataAndStore();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.coordinates, filters.mean, filters.services, filters.refTime]);

  console.log("filters", filters);
  const mappedServices: { [key: string]: string } = mappedServicesJSON;

  // responsável por recarregar o gráfico quando o layout mudar
  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 100);
  }, [showMap]);

  return (
    <ThemeContext.Provider
      value={{
        loading,
        meteorData,
        setMeteorData,
        filters,
        setFilters,
      }}
    >
      <main className={"w-full flex flex-col p-6 gap-4 bg-slate-50"}>
        <section
          className={clsx({
            "w-full h-20 overflow-hidden grid items-end duration-150 gap-3":
              true,
            "grid-cols-[calc(100%-396px)_384px]": showMap,
            "grid-cols-[calc(95%-12px)_5%]": !showMap,
          })}
        >
          <div className="flex gap-5 h-full">
            <RefTimesOptions />
            <ServiceOptions />
            <MeanOptions />
          </div>

          <Button
            className="w-full min-w-full"
            onClick={() => setShowMap((prev) => !prev)}
          >
            {showMap ? <FaLongArrowAltRight /> : <FaLongArrowAltLeft />}
          </Button>
        </section>

        <section
          className={clsx({
            "w-full h-full overflow-hidden grid duration-150 gap-3": true,
            "grid-cols-[calc(100%-396px)_384px]": showMap,
            "grid-cols-[calc(95%-12px)_5%]": !showMap,
          })}
        >
          <div className="">
            <PlotlyChart />
          </div>
          <div className="w-full h-full overflow-hidden">
            <GeoMap />
          </div>
        </section>
      </main>
    </ThemeContext.Provider>
  );
}

//<Typography variant="subtitle2" gutterBottom color="#3c3c3c">
//Selecione a média:
// </Typography>
