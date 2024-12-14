"use client";
import { PlotlyChart } from "@/components/Chart";
import { DatePicker } from "@/components/DatePicker";
import { GeoChart } from "@/components/GeoChart";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { FaLongArrowAltRight } from "react-icons/fa";
import { ServiceOptions } from "@/components/ServiceOptions";
import data from "@/data/stations.json";
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
  const [availableCoordinates, setAvailableCoordinates] = useState<number[][]>(
    []
  );
  const [showMap, setShowMap] = useState<boolean>(false);

  // const [isTheFirstAcess, setIsTheFirstAcess] = useState<any>({})

  const cookies = useCookies();

  /**
   * @description useEffect responsável pelo carregamento dos filtros iniciais
   */
  useEffect(() => {
    const token = cookies.get("token");

    async function getUserInfoAndStore() {
      const availableCoordinatesData = await fetch(
        "http://127.0.0.1:8000/api/erp/available-services?customer_id=1"
      ).then((res) => res.ok && res.json());
      const reverseAvailableCoordinatesData =
        availableCoordinatesData.services[0].locations.map(
          (location: number[]) => location.reverse()
        );

      setAvailableCoordinates(reverseAvailableCoordinatesData);

      const [lat, lon] = reverseAvailableCoordinatesData?.[0];

      const { address } = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
      ).then((response) => response.json());

      setFilters((prev: filtersType) => ({
        ...prev,
        state: address?.municipality?.toUpperCase(),
        coordinates: reverseAvailableCoordinatesData[0],
      }));
    }

    getUserInfoAndStore();
  }, [cookies]);

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
        `http://127.0.0.1:8000/api/meteor/forecast?longitude=${lon}&latitude=${lat}&service=${services[0]}&mean=${mean}&reftime=${refTime}`
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
        availableCoordinates,
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
            <GeoChart />
          </div>
        </section>
      </main>
    </ThemeContext.Provider>
  );
}

//<Typography variant="subtitle2" gutterBottom color="#3c3c3c">
//Selecione a média:
// </Typography>
