'use client'
import stationsContext from "@/app/dashboard/context";
import { BarChart, LineChart } from "@mui/x-charts";
import { Chart as GoogleChart } from "react-google-charts";
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import dayjs from "dayjs";
import mappedServicesJSON from "@/data/mappedServices.json"
import React, { useContext } from "react";
import {Spinner} from "@nextui-org/spinner";
import customParseFormat from 'dayjs/plugin/customParseFormat.js'
import utc from 'dayjs/plugin/utc.js'
import timezone from 'dayjs/plugin/timezone.js'
dayjs.extend(customParseFormat)
dayjs.extend(utc)
dayjs.extend(timezone)

const datetime = dayjs.unix(1653134400)

export interface ChartProps {
  dateRange: {
    start: string,
    end: string
  }
}

export function Chart() {
  const { meteorData, loading } = useContext(stationsContext)

  // const mappedServices: { [key: string]: string } = mappedServicesJSON

  const datesToTimestamp = meteorData.dates.map((date: string) => {
    const datetime = new Date(date).getTime()
    return datetime / 1000
  })


  const stations = meteorData.stations.map((data: { date: string, value: number }) => data.value)
  const models = meteorData.models.map((data: { date: string, value: number }) => data.value)


  // let stationsByService = []
  // let modelsByService = []

  // if(meteorData.length) {
  //   const [stations, models] = meteorData 

  // datas convertidas para timestamps
  //   const returnValidValue = (value: string | number | boolean) => {
  //     console.log('returnValidValue', value)

  //     if(typeof value === 'number')
  //       return value
    
  //     return 0
  //   }

  //   stationsByService = stations.length ? stations.map((station:any) => returnValidValue(station?.[service]?.value)) : []
  //   modelsByService = models.length ? models.map((model:any) => returnValidValue(model?.[service])) : []
  // }

  const formatTimestampToDate = (timestamp: number) => dayjs.unix(timestamp).tz('UTC').format('DD/MM/YYYY');

  // let stationsByServiceRest: number[] = []
  // let modelsByServiceRest: number[] = []


  // if(modelsByService.length > stationsByService.length) {
  //   const diff = Math.abs(stationsByService.length - modelsByService.length)

  //   const rest = Array(diff).fill('').map(() => 0)

  //   stationsByServiceRest = rest
  // }

  // if(stationsByService.length > modelsByService.length) {
  //   const diff = Math.abs(modelsByService.length - stationsByService.length)

  //   const rest = Array(diff).fill('').map(() => 0)

  //   modelsByServiceRest = rest
  // }

  return (
    <div className="min-w-full min-h-96 bg-white rounded-3xl relative">
      {loading
        ? <Spinner className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" size="lg" />
        : <LineChart
            xAxis={[{ data: datesToTimestamp, label: 'Data', valueFormatter: formatTimestampToDate}]}  
            series={[
              {
                label: 'Observados',
                data: models,  // Dados
                color: "#000"
              },
              {
                label: 'Previsões',
                data: stations,  // Dados
              },
            ]}
            height={400}
          />
      }
    </div>
  );
}
export const data = [
  [
    { type: "date", label: "Date" },
    { type: "number", label: "Value" },
    { id: "i0", type: "number", role: "interval" },
    { id: "i1", type: "number", role: "interval" },
  ],
  [new Date(1996, 1, 1), 1000, 900, 1100],
  [new Date(1997, 1, 1), 1170, 1000, 1300],
  [new Date(1998, 1, 1), 660, 550, 800],
  [new Date(1999, 1, 1), 1030, 900, 1150],
  [new Date(2000, 1, 1), 1200, 1100, 1300],
  [new Date(2001, 1, 1), 940, 870, 1010],
  [new Date(2002, 1, 1), 1170, 1070, 1270],
  [new Date(2003, 1, 1), 660, 600, 720],
  [new Date(2004, 1, 1), 1030, 950, 1110],
  [new Date(2005, 1, 1), 1200, 1100, 1300],
  [new Date(2006, 1, 1), 940, 870, 1010],
  [new Date(2007, 1, 1), 1170, 1070, 1270],
  [new Date(2008, 1, 1), 660, 550, 800],
  [new Date(2009, 1, 1), 1030, 900, 1150],
];

export const options = {
  title: "",
  curveType: "function",
  series: [{ color: "#E7711B" }],
  intervals: { style: "area" }, // Style the intervals as an area
  legend: "none",
  chartArea: { height: "80%", width: "90%" },
  hAxis: { slantedText: false },
  vAxis: { viewWindow: { min: 500, max: 1500 } },
};

export function GoogleChartComponent() {
  return (
    <div className="min-w-full flex items-center justify-center min-h-[700px] bg-white rounded-3xl relative">
      <GoogleChart
        chartType="LineChart"
        width="80%"
        height="400px"
        data={data}
        options={options}
        chartPackages={["corechart", "controls"]}
        controls={[
          {
            controlType: "ChartRangeFilter",
            options: {
              filterColumnIndex: 0,
              ui: {
                chartType: "LineChart",
                chartOptions: {
                  chartArea: { width: "90%", height: "50%" },
                  hAxis: { baselineColor: "none" },
                  intervals: { style: "area" }, // Apply interval styling to the range chart as well
                },
              },
            },
            controlPosition: "bottom",
            controlWrapperParams: {
              state: {
                range: {
                  start: new Date(1997, 1, 1),
                  end: new Date(2002, 1, 1),
                },
              },
            },
          },
        ]}
      />
    </div>
  );
}