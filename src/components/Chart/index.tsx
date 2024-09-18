'use client'
import { LineChart } from "@mui/x-charts";
import dayjs from "dayjs";

const xAxisData = [
  new Date("2023-12-04"),
  new Date("2023-12-05"),
  new Date("2023-12-06"),
  new Date("2023-12-07"),
  new Date("2023-12-08"),
  new Date("2023-12-09"),
  new Date("2023-12-10"),
];
const seriesData = [
  [43, 38, 36, 30, 37, 43, 44],
  [31, 28, 27, 27, 33, 40, 35],
];


export function TemperatureChart() {
  return (
    <div>
      <LineChart
        xAxis={[
          {
            label: "Data",
            data: xAxisData,
            tickInterval: xAxisData,
            scaleType: "time",
            valueFormatter: (date) => dayjs(date).format("MMM D"),
          },
        ]}
        yAxis={[{ label: "Temperatura (°C)" }]}
        series={[
          { label: "Máxima", data: seriesData[0] },
          { label: "Mínima", data: seriesData[1] },
        ]}
        height={400}
      />
    </div>
  );
}