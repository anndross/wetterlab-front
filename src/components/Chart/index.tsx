'use client'
import stationsContext from "@/app/dashboard/context";
import { BarChart, LineChart } from "@mui/x-charts";
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import dayjs from "dayjs";
import mappedServicesJSON from "@/data/mappedServices.json"
import { useContext } from "react";
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