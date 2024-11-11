'use client'
import stationsContext, { filtersType } from "@/app/dashboard/context";
// import { BarChart, LineChart } from "@mui/x-charts";
import { Chart as GoogleChart } from "react-google-charts";
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import dayjs from "dayjs";
import mappedServicesJSON from "@/data/mappedServices.json"
import React, { useContext, useEffect, useRef } from "react";
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

// export function Chart() {
//   const { meteorData, loading } = useContext(stationsContext)

//   // const mappedServices: { [key: string]: string } = mappedServicesJSON

//   const datesToTimestamp = meteorData.dates.map((date: string) => {
//     const datetime = new Date(date).getTime()
//     return datetime / 1000
//   })


//   const stations = meteorData.stations.map((data: { date: string, value: number }) => data.value)
//   const models = meteorData.models.map((data: { date: string, value: number }) => data.value)


//   // let stationsByService = []
//   // let modelsByService = []

//   // if(meteorData.length) {
//   //   const [stations, models] = meteorData 

//   // datas convertidas para timestamps
//   //   const returnValidValue = (value: string | number | boolean) => {
//   //     console.log('returnValidValue', value)

//   //     if(typeof value === 'number')
//   //       return value
    
//   //     return 0
//   //   }

//   //   stationsByService = stations.length ? stations.map((station:any) => returnValidValue(station?.[service]?.value)) : []
//   //   modelsByService = models.length ? models.map((model:any) => returnValidValue(model?.[service])) : []
//   // }

//   const formatTimestampToDate = (timestamp: number) => dayjs.unix(timestamp).tz('UTC').format('DD/MM/YYYY');

//   // let stationsByServiceRest: number[] = []
//   // let modelsByServiceRest: number[] = []


//   // if(modelsByService.length > stationsByService.length) {
//   //   const diff = Math.abs(stationsByService.length - modelsByService.length)

//   //   const rest = Array(diff).fill('').map(() => 0)

//   //   stationsByServiceRest = rest
//   // }

//   // if(stationsByService.length > modelsByService.length) {
//   //   const diff = Math.abs(modelsByService.length - stationsByService.length)

//   //   const rest = Array(diff).fill('').map(() => 0)

//   //   modelsByServiceRest = rest
//   // }

//   return (
//     <div className="min-w-full min-h-96 bg-white rounded-3xl relative">
//       {loading
//         ? <Spinner className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" size="lg" />
//         : <LineChart
//             xAxis={[{ data: datesToTimestamp, label: 'Data', valueFormatter: formatTimestampToDate}]}  
//             series={[
//               {
//                 label: 'Observados',
//                 data: models,  // Dados
//               },
//               {
//                 label: 'Previsões',
//                 data: stations,  // Dados
//                 color: "#000"
//               },
//             ]}
//             height={400}
//           />
//       }
//     </div>
//   );
// }
import Plot from 'react-plotly.js';
import Plotly from 'plotly.js';


export const PlotlyChart = () => {
  const { meteorData, loading, setFilters } = useContext(stationsContext)

  function randomNumber(num: number) {
    const min = num / 1.2;
    const max = num * 1.2;
    
    return {
        min: min,
        max: max,
    };
}

  const stations = meteorData.stations.reduce((acc: any, previousValue: any) => {
    const {min, max} = randomNumber(previousValue.value)

    acc[0].y.push(previousValue.value)
    acc[1].y.push(min)
    acc[2].y.push(max)

    acc[0].x.push(new Date(previousValue.date))
    acc[1].x.push(new Date(previousValue.date))
    acc[2].x.push(new Date(previousValue.date))


    return acc
  }, [
      {
        x: [],
        y: [],
        type: 'scatter',
        mode: 'lines+markers',
        name: 'Previsões',
        line: { color: '#1f77b4' },
      },
      {
        x: [],
        y: [], // Limite inferior da Linha 1
        fill: 'tonexty',
        type: 'scatter',
        mode: 'none',
        name: 'Variação inferior das previsões',
        fillcolor: 'rgba(0, 150, 255, 0.2)',
      },
      {
        x: [],
        y: [], // Limite superior da Linha 1
        fill: 'tonexty',
        type: 'scatter',
        mode: 'none',
        name: 'Variação superior das previsões',
        fillcolor: 'rgba(0, 150, 255, 0.2)',
      },
  ])


  const models = meteorData.models.reduce((acc: any, previousValue: any) => {
    const {min, max} = randomNumber(previousValue.value)

    acc[0].y.push(previousValue.value)
    acc[1].y.push(min)
    acc[2].y.push(max)

    acc[0].x.push(new Date(previousValue.date))
    acc[1].x.push(new Date(previousValue.date))
    acc[2].x.push(new Date(previousValue.date))


    return acc
  }, [
      {
        x: [],
        y: [],
        type: 'scatter',
        mode: 'lines+markers',
        name: 'Observados',
        line: { color: '#000' },
      },
      {
        x: [],
        y: [], // Limite inferior da Linha 2
        fill: 'tonexty',
        type: 'scatter',
        mode: 'none',
        name: 'Variação superior dos observados',
        fillcolor: 'rgba(255, 127, 14, 0.2)',
      },
      {
        x: [],
        y: [], // Limite superior da Linha 2
        fill: 'tonexty',
        type: 'scatter',
        mode: 'none',
        name: 'Variação inferior dos observados',
        fillcolor: 'rgba(255, 127, 14, 0.2)',
      },
  ])


  const plotData = [
    // Primeira linha com intervalo de confiança
    ...stations,
  
    // Segunda linha com intervalo de confiança
    ...models
  ];

  console.log('plotData', plotData, loading)

  const isRelayouting = useRef(false)

  const handleRelayout = (event: any) => {
    console.log(dayjs('handleRelayout', event["xaxis.range[0]"]).format('DD/MM/YYYY'))
    console.log('handleRelayout', event)
    // Verifique se o relayout está sendo acionado pela própria atualização de estado
    if (isRelayouting.current) {
      return; // Ignora o evento se o relayout já está em andamento
    }

    // Salve os intervalos x e y do evento
    const xRange = event["xaxis.range[0]"];
    const yRange = event["yaxis.range"];

    // Atualize o estado com os novos valores de zoom
    setFilters((prev: filtersType) => ({
      ...prev,
      zoom: {
        x: {
          from: dayjs(event["xaxis.range[0]"]).format('DD/MM/YYYY'),
          to: dayjs(event["xaxis.range[1]"]).format('DD/MM/YYYY'),
        },
        y: {
          from: event["yaxis.range[0]"],
          to: event["yaxis.range[0]"]
        }
      }
    }));

    // Evite o loop infinito configurando o flag para verdadeiro
    isRelayouting.current = true;

    if (isRelayouting.current) {
      Plotly.relayout('plotly-js', event);
    }
    // Simula a alteração do layout com os novos valores
    setTimeout(() => {
      isRelayouting.current = false; // Resetando o flag após a alteração
    }, 10);
  };


  var icon1 = {

    'width': 500,
  
    'height': 600,
  
    'path': 'M224 512c35.32 0 63.97-28.65 63.97-64H160.03c0 35.35 28.65 64 63.97 64zm215.39-149.71c-19.32-20.76-55.47-51.99-55.47-154.29 0-77.7-54.48-139.9-127.94-155.16V32c0-17.67-14.32-32-31.98-32s-31.98 14.33-31.98 32v20.84C118.56 68.1 64.08 130.3 64.08 208c0 102.3-36.15 133.53-55.47 154.29-6 6.45-8.66 14.16-8.61 21.71.11 16.4 12.98 32 32.1 32h383.8c19.12 0 32-15.6 32.1-32 .05-7.55-2.61-15.27-8.61-21.71z'
  
  }
  const downloadImage = () => {
    Plotly.downloadImage('plotly-js', {
      format: 'png',  // Formatos disponíveis: 'jpeg', 'png', 'svg', 'webp'
      filename: 'grafico-plotly',
      height: 600,
      width: 800,
    });
  };

  return (
    <div className="min-w-full min-h-[550px] bg-white rounded-3xl relative">
      {loading || !plotData[0].x.length || !plotData[3].y.length
        ? <Spinner className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" size="lg" />
        : <Plot
            data={plotData}
            divId="plotly-js"
            layout={{
              title: 'Dados dos observados e previsões',
              xaxis: { title: 'Data' },
              yaxis: { title: 'Valores' },
              showlegend: true,
              legend: {
                orientation: 'h', // Orienta a legenda horizontalmente
                y: -0.3, // Move a legenda para baixo do gráfico
                x: 0.5, // Centraliza a legenda na horizontal
                xanchor: 'center', // Âncora horizontal no centro
                yanchor: 'top', // Âncora vertical no topo para evitar sobreposição
              },
            }}
            config={{
              responsive: true,
              modeBarButtonsToRemove: [
                'zoom2d', 'pan2d', 'select2d', 'lasso2d', 'zoomIn2d', 'zoomOut2d', 
                'autoScale2d', 'hoverClosestCartesian', 'hoverCompareCartesian',
              ], // Remove todos os botões indesejados
              displayModeBar: true,
              locale: 'pt-br',
              displaylogo: false, // Remove o logo do Plotly
            }}
            onRelayout={handleRelayout}
            // on
            useResizeHandler={true}
            style={{ width: '100%', height: '100%' }}
          />
      }
    </div>
  )
}

import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Area, ReferenceArea } from 'recharts';
import { Slider } from '@mui/material';

const data = [
  { name: 'Jan', value: 30, confidenceLow: 25, confidenceHigh: 35 },
  { name: 'Feb', value: 40, confidenceLow: 35, confidenceHigh: 45 },
  { name: 'Mar', value: 35, confidenceLow: 30, confidenceHigh: 40 },
  { name: 'Apr', value: 50, confidenceLow: 45, confidenceHigh: 55 },
  { name: 'May', value: 55, confidenceLow: 50, confidenceHigh: 60 },
  { name: 'Jun', value: 60, confidenceLow: 55, confidenceHigh: 65 },
];

export const Chart = () => {
  const [range, setRange] = useState([0, data.length - 1]);
  const [zoomArea, setZoomArea] = useState<any>(null);

  const handleRangeChange = (event: any, newValue: any) => {
    setRange(newValue);
  };

  const onMouseDown = (e: any) => {
    setZoomArea({ x1: e.activeLabel });
  };

  const onMouseMove = (e: any) => {
    if (zoomArea) {
      setZoomArea((prev: any) => ({ ...prev, x2: e.activeLabel }));
    }
  };

  const onMouseUp = () => {
    if (zoomArea && zoomArea.x1 && zoomArea.x2) {
      const startIndex = data.findIndex((d) => d.name === zoomArea.x1);
      const endIndex = data.findIndex((d) => d.name === zoomArea.x2);
      setRange([Math.min(startIndex, endIndex), Math.max(startIndex, endIndex)]);
    }
    setZoomArea(null);
  };

  const filteredData = data.slice(range[0], range[1] + 1);

  return (
    <div>
      <LineChart
        width={600}
        height={300}
        data={filteredData}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        {/* Intervalo de confiança */}
        <Area
          type="monotone"
          dataKey="confidenceLow"
          data={filteredData}
          stroke="none"
          fill="rgba(0, 150, 255, 0.2)"
        />
        <Area
          type="monotone"
          dataKey="confidenceHigh"
          data={filteredData}
          stroke="none"
          fill="rgba(0, 150, 255, 0.2)"
        />
        {/* Linha principal */}
        <Line type="monotone" dataKey="value" stroke="#8884d8" />
        {/* Área de zoom */}
        {zoomArea && (
          <ReferenceArea x1={zoomArea.x1} x2={zoomArea.x2} strokeOpacity={0.3} />
        )}
      </LineChart>

      {/* Slider de filtro de range */}
      <Slider
        value={range}
        onChange={handleRangeChange}
        min={0}
        max={data.length - 1}
        valueLabelDisplay="auto"
      />
    </div>
  );
};


import { ResponsiveLine } from '@nivo/line';


const dataNivo = [
  {
    id: 'Main Line',
    data: [
      { x: 'Jan', y: 30 },
      { x: 'Feb', y: 40 },
      { x: 'Mar', y: 35 },
      { x: 'Apr', y: 50 },
      { x: 'May', y: 55 },
      { x: 'Jun', y: 60 },
    ],
  },
  {
    id: 'Confidence Low',
    data: [
      { x: 'Jan', y: 25 },
      { x: 'Feb', y: 35 },
      { x: 'Mar', y: 30 },
      { x: 'Apr', y: 45 },
      { x: 'May', y: 50 },
      { x: 'Jun', y: 55 },
    ],
  },
  {
    id: 'Confidence High',
    data: [
      { x: 'Jan', y: 35 },
      { x: 'Feb', y: 45 },
      { x: 'Mar', y: 40 },
      { x: 'Apr', y: 55 },
      { x: 'May', y: 60 },
      { x: 'Jun', y: 65 },
    ],
  },
];

export const LineChartWithConfidenceAndRange = () => {
  const [range, setRange] = useState([0, dataNivo[0].data.length - 1]);

  const handleRangeChange = (event: any, newValue: any) => {
    setRange(newValue);
  };

  const filteredData = dataNivo.map((line) => ({
    ...line,
    data: line.data.slice(range[0], range[1] + 1),
  }));

  return (
    <div style={{ height: 400 }}>
      <ResponsiveLine
        data={filteredData}
        xScale={{ type: 'point' }}
        yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: false }}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          legend: 'Time',
          legendOffset: 36,
          legendPosition: 'middle',
        }}
        axisLeft={{
          legend: 'Value',
          legendOffset: -40,
          legendPosition: 'middle',
        }}
        lineWidth={2}
        enableArea={true}
        areaOpacity={0.1}
        colors={['#8884d8', 'rgba(0, 150, 255, 0.2)', 'rgba(0, 150, 255, 0.2)']}
        pointSize={8}
        pointBorderWidth={2}
        useMesh={true}
      />

      {/* Slider para controle de range */}
      <Slider
        value={range}
        onChange={handleRangeChange}
        min={0}
        max={dataNivo[0].data.length - 1}
        valueLabelDisplay="auto"
      />
    </div>
  );
};




// 'use client'
// import stationsContext from "@/app/dashboard/context";
// import { BarChart, LineChart } from "@mui/x-charts";
// import { Chart as GoogleChart } from "react-google-charts";
// import { axisClasses } from '@mui/x-charts/ChartsAxis';
// import dayjs from "dayjs";
// import mappedServicesJSON from "@/data/mappedServices.json"
// import React, { useContext } from "react";
// import {Spinner} from "@nextui-org/spinner";
// import customParseFormat from 'dayjs/plugin/customParseFormat.js'
// import utc from 'dayjs/plugin/utc.js'
// import timezone from 'dayjs/plugin/timezone.js'
// dayjs.extend(customParseFormat)
// dayjs.extend(utc)
// dayjs.extend(timezone)

// const datetime = dayjs.unix(1653134400)

// export interface ChartProps {
//   dateRange: {
//     start: string,
//     end: string
//   }
// }

// export function Chart() {
//   const { meteorData, loading } = useContext(stationsContext)

//   // const mappedServices: { [key: string]: string } = mappedServicesJSON

//   const datesToTimestamp = meteorData.dates.map((date: string) => {
//     const datetime = new Date(date).getTime()
//     return datetime / 1000
//   })


//   const data = meteorData.stations.map((data: { date: string, value: number }, i) => {
//     const random1 = Math.min(Math.random() * (40 - 10) + 10, data.value);
//     const random2 = Math.max(Math.random() * (30 - 20) + 20, data.value);


//     return [new Date(data.date), data.value, random1, random2]
//   })
//   const googleChartData = [
//     [
//       { type: "date", label: "Date" },
//       { type: "number", label: "Value" },
//       // { type: "number", label: "Value" },
//       { id: "i0", type: "number", role: "interval" },
//       { id: "i1", type: "number", role: "interval" },
//     ],
//     ...data
//   ];
//   console.log('googleChartData', googleChartData)

//   // let stationsByService = []
//   // let modelsByService = []

//   if(meteorData.length) {
//     const [stations, models] = meteorData 

//   // datas convertidas para timestamps
//   //   const returnValidValue = (value: string | number | boolean) => {
//   //     console.log('returnValidValue', value)

//   //     if(typeof value === 'number')
//   //       return value
    
//   //     return 0
//   //   }

//   //   stationsByService = stations.length ? stations.map((station:any) => returnValidValue(station?.[service]?.value)) : []
//   //   modelsByService = models.length ? models.map((model:any) => returnValidValue(model?.[service])) : []
//   // }

//   const formatTimestampToDate = (timestamp: number) => dayjs.unix(timestamp).tz('UTC').format('DD/MM/YYYY');

//   // let stationsByServiceRest: number[] = []
//   // let modelsByServiceRest: number[] = []


//   // if(modelsByService.length > stationsByService.length) {
//   //   const diff = Math.abs(stationsByService.length - modelsByService.length)

//   //   const rest = Array(diff).fill('').map(() => 0)

//   //   stationsByServiceRest = rest
//   // }

//   // if(stationsByService.length > modelsByService.length) {
//   //   const diff = Math.abs(modelsByService.length - stationsByService.length)

//   //   const rest = Array(diff).fill('').map(() => 0)

//   //   modelsByServiceRest = rest
//   // }
//   // const options = {
//   //   title: "Line Chart with Two Series and Intervals",
//   //   curveType: "function",
//   //   series: [
//   //     { color: "#E7711B" },
//   //     { color: "#4374E0" },
//   //   ],
//   //   intervals: { style: "area" },
//   //   legend: "bottom",
//   //   chartArea: { height: "80%", width: "90%" },
//   //   hAxis: { slantedText: false },
//   //   vAxis: { viewWindow: { min: 500, max: 1500 } },
//   // };
//   console.log(googleChartData)

//   const options = {
//     title: "",
//     curveType: "function",
//     series: [{ color: "#E7711B" }],
//     intervals: { style: "area" }, // Style the intervals as an area
//     legend: "none",
//     chartArea: { height: "80%", width: "90%" },
//     hAxis: { slantedText: false, format: "dd MMM yyyy" }, 
//     vAxis: { viewWindow: { min: 500, max: 1500 } },
//   };

//   // return (
//   //   <div className="min-w-full flex items-center justify-center min-h-[700px] bg-white rounded-3xl relative">
//   //     {loading
//   //       ? <Spinner className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" size="lg" />

//   //       : <GoogleChart
//   //           chartType="LineChart"
//   //           width="80%"
//   //           height="400px"
//   //           data={googleChartData}
//   //           options={options}
//   //           chartPackages={["corechart", "controls"]}
//   //           controls={[
//   //             {
//   //               controlType: "ChartRangeFilter",
//   //               options: {
//   //                 filterColumnIndex: 0,
//   //                 ui: {
//   //                   chartType: "LineChart",
//   //                   chartOptions: {
//   //                     chartArea: { width: "90%", height: "50%" },
//   //                     hAxis: { baselineColor: "none" },
//   //                     intervals: { style: "area" }, // Apply interval styling to the range chart as well
//   //                   },
//   //                 },
//   //               },
//   //               controlPosition: "bottom",
//   //               controlWrapperParams: {
//   //                 state: {
//   //                   range: {
//   //                     start: new Date(1997, 1, 1),
//   //                     end: new Date(2002, 1, 1),
//   //                   },
//   //                 },
//   //               },
//   //             },
//   //           ]}
//   //         />
//   //     }
//   //   </div>
//   // );

//   return (
//     <div className="min-w-full min-h-96 bg-white rounded-3xl relative">
//       {loading
//         ? <Spinner className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" size="lg" />
//         : <LineChart
//             xAxis={[{ data: datesToTimestamp, label: 'Data', valueFormatter: formatTimestampToDate}]}  
//             series={[
//               {
//                 label: 'Observados',
//                 data: models,  // Dados
//                 color: "#000"
//               },
//               {
//                 label: 'Previsões',
//                 data: stations,  // Dados
//               },
//             ]}
//             height={400}
//           />
//       }
//     </div>
//   );
// }
// export const data = [
//   [
//     { type: "date", label: "Date" },
//     { type: "number", label: "Value" },
//     { type: "number", label: "Value" },
//   ],
//   [new Date(1996, 1, 1), 1000, 0, 0],
//   [new Date(1997, 1, 1), 1170, 1000, 1300],
//   [new Date(1998, 1, 1), 660, 550, 800],
//   [new Date(1999, 1, 1), 1030, 900, 1150],
//   [new Date(2000, 1, 1), 1200, 1100, 1300],
//   [new Date(2001, 1, 1), 940, 870, 1010],
//   [new Date(2002, 1, 1), 1170, 1070, 1270],
//   [new Date(2003, 1, 1), 660, 600, 720],
//   [new Date(2004, 1, 1), 1030, 950, 1110],
//   [new Date(2005, 1, 1), 1200, 1100, 1300],
//   [new Date(2006, 1, 1), 940, 870, 1010],
//   [new Date(2007, 1, 1), 1170, 1070, 1270],
//   [new Date(2008, 1, 1), 660, 550, 800],
//   [new Date(2009, 1, 1), 1030, 900, 1150],
// ];

// export const options = {
//   title: "",
//   curveType: "function",
//   series: [{ color: "#E7711B" }],
//   intervals: { style: "area" }, // Style the intervals as an area
//   legend: "none",
//   chartArea: { height: "80%", width: "90%" },
//   hAxis: { slantedText: false },
//   vAxis: { viewWindow: { min: 500, max: 1500 } },
// };

// export function GoogleChartComponent() {
//   return (
//     <div className="min-w-full flex items-center justify-center min-h-[700px] bg-white rounded-3xl relative">
//       <GoogleChart
//         chartType="LineChart"
//         width="80%"
//         height="400px"
//         data={data}
//         options={options}
//         chartPackages={["corechart", "controls"]}
//         controls={[
//           {
//             controlType: "ChartRangeFilter",
//             options: {
//               filterColumnIndex: 0,
//               ui: {
//                 chartType: "LineChart",
//                 chartOptions: {
//                   chartArea: { width: "90%", height: "50%" },
//                   hAxis: { baselineColor: "none" },
//                   intervals: { style: "area" }, // Apply interval styling to the range chart as well
//                 },
//               },
//             },
//             controlPosition: "bottom",
//             controlWrapperParams: {
//               state: {
//                 range: {
//                   start: new Date(1997, 1, 1),
//                   end: new Date(2002, 1, 1),
//                 },
//               },
//             },
//           },
//         ]}
//       />
//     </div>
//   );
// }