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
  const { stationsData, filters, loading } = useContext(stationsContext)

  const [service] = filters.services
  
  const mappedServices: { [key: string]: string } = mappedServicesJSON

  // datas convertidas para timestamps
  const dates = stationsData.map(data => {
      const datetime = new Date(data.datetime.$date).getTime()
      console.log(datetime)
      return datetime / 1000
  })



  const dataset = stationsData.map(data => data?.[service]?.value)

  console.log('Chart', stationsData, filters, dates, dataset)

  return (
    <div className="min-w-full min-h-96 bg-white rounded-lg relative">
      {loading
        ? <Spinner className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" size="lg" />
        : <LineChart
            xAxis={[{ data: dates, label: 'Data', valueFormatter: (timestamp) => {
              const date = dayjs.unix(timestamp);

              return date.tz('UTC').format('DD/MM/YYYY');
            }}]}  
            series={[
              {
                label: mappedServices[service],
                data: dataset,  // Dados
              },
            ]}
            height={400}
          />
      }
    </div>
  );
}