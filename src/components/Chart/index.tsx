'use client'
import stationsContext from "@/app/dashboard/context";
import { BarChart, LineChart } from "@mui/x-charts";
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import dayjs from "dayjs";
import mappedServicesJSON from "@/data/mappedServices.json"
import { useContext } from "react";

const xAxisData = [
  new Date("2023-12-04"),
  new Date("2023-12-05"),
  new Date("2023-12-06"),
  new Date("2023-12-07"),
  new Date("2023-12-08"),
  new Date("2023-12-09"),
  new Date("2023-12-10"),
  new Date("2023-12-11"),
  new Date("2023-12-12"),
  new Date("2023-12-13"),
  new Date("2023-12-14"),
  new Date("2023-12-15"),
  new Date("2023-12-16"),
  new Date("2023-12-17"),
  new Date("2023-12-18"),
  new Date("2023-12-19"),
  new Date("2023-12-10"),
  new Date("2023-12-14"),
  new Date("2023-12-15"),
  new Date("2023-12-16"),
  new Date("2023-12-17"),
  new Date("2023-12-18"),
  new Date("2023-12-19"),
];

const seriesData = [
  [43, 38, 36, 30, 37, 43, 44, 31, 28, 27, 27, 33, 40, 35, 40],
  [31, 28, 27, 27, 33, 40, 35, 43, 38, 36, 30, 37, 43, 44, 23],
];

const data = {
    "2023-12-01": [40, 30], 
    "2023-12-02": [40, 30], 
    "2023-12-03": [40, 30], 
    "2023-12-04": [40, 30], 
    "2023-12-05": [38, 28], 
    "2023-12-06": [40, 30], 
    "2023-12-07": [40, 30], 
    "2023-12-08": [40, 30],
    "2023-12-09": [40, 30], 
    "2023-12-10": [38, 28], 
    "2023-12-11": [40, 30], 
    "2023-12-12": [40, 30], 
    "2023-12-13": [40, 30], 
    "2023-12-14": [40, 30], 
    "2023-12-15": [40, 30], 
    "2023-12-16": [40, 30], 
    "2023-12-17": [40, 30], 
    "2023-12-18": [40, 30], 
    "2023-12-19": [40, 30], 
    "2023-12-20": [40, 30], 
    "2023-12-21": [40, 30], 
    "2023-12-22": [40, 30], 
    "2023-12-23": [40, 30], 
    "2023-12-24": [40, 30], 
    "2023-12-25": [40, 30], 
    "2023-12-26": [40, 30], 
    "2023-12-27": [40, 30], 
    "2023-12-28": [40, 30], 
    "2023-12-29": [40, 30], 
    "2023-12-30": [40, 30], 
}


export interface TemperatureChartProps {
  dateRange: {
    start: string,
    end: string
  }
}

export function TemperatureChart() {
  const { stationsData, filters } = useContext(stationsContext)

  console.log('stationsData Chart', stationsData, filters)
  // const [service] = filters.services

  // const mappedServices: { [key: string]: string } = mappedServicesJSON

  // const xAxisData = stationsData.map(data => new Date(data.datetime))

  // const yAxisData = stationsData.map(data => data.t.value) 
  // // valueFormatter: (timestamp) => {
  // //   const date = new Date(timestamp);
  // //   return date.toLocaleDateString("pt-BR", { day: '2-digit', month: '2-digit', year: 'numeric' });
  // // }

  // const chartSetting = {
  //   yAxis: [
  //     {
  //       label: mappedServices?.[service] || 'YAXIS',
  //     },
  //   ],
  //   height: 500,
  // };

  // const dates = stationsData.map(data => {
  //     return new Date(data.datetime).getTime()
  // })

  // const dataset = stationsData.map(data => data[service])

  // console.log('dataset', dates, dataset)

  return (
    <div>
    {/* <LineChart
      xAxis={[{ data: dates, label: 'Data'}]}  // Datas convertidas para timestamps
      series={[
        {
          label: "Temperatura (°C)",
          data: [21.5, 22.3, 23.0],  // Dados de temperatura
        },
      ]}
      height={400}
    /> */}
    </div>
  );
}