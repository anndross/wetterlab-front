'use client'
import stationsContext, { filtersType, ZoomInfo } from "@/app/dashboard/context";
// import { BarChart, LineChart } from "@mui/x-charts";
import { Chart as GoogleChart } from "react-google-charts";
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import dayjs from "dayjs";
import mappedServicesJSON from "@/data/mappedServices.json"
import React, { useContext, useEffect, useMemo, useRef } from "react";
import {Spinner} from "@nextui-org/spinner";
import customParseFormat from 'dayjs/plugin/customParseFormat.js'
import utc from 'dayjs/plugin/utc.js'
import timezone from 'dayjs/plugin/timezone.js'
dayjs.extend(customParseFormat)
dayjs.extend(utc)
dayjs.extend(timezone)

export interface ChartProps {
  dateRange: {
    start: string,
    end: string
  }
}


import Plot from 'react-plotly.js';
import Plotly from 'plotly.js';

export const PlotlyChart = () => {
  const { meteorData, loading, setZoomInfo, zoomInfo } = useContext(stationsContext)

  const stations: any = meteorData.stations
  
  stations[0] = {
    ...stations[0],
    type: 'scatter',
    mode: 'lines+markers',
    name: 'Previsões',
    line: { color: '#1f77b4' },
  }

  stations[1] = {
    ...stations[1],
    fill: 'tonexty',
    type: 'scatter',
    mode: 'none',
    name: 'Variação inferior das previsões',
    fillcolor: 'rgba(0, 150, 255, 0.2)',
  }

  stations[2] = {
    ...stations[2],
    fill: 'tonexty',
    type: 'scatter',
    mode: 'none',
    name: 'Variação superior das previsões',
    fillcolor: 'rgba(0, 150, 255, 0.2)',
  }

  const models: any = meteorData.models
  
  models[0] = {
    ...models[0],
    type: 'scatter',
    mode: 'lines+markers',
    name: 'Observados',
    line: { color: '#000' },
  }

  models[1] = {
    ...models[1],
    fill: 'tonexty',
    type: 'scatter',
    mode: 'none',
    name: 'Variação inferior dos observados',
    fillcolor: 'rgba(255, 127, 14, 0.2)',
  }

  models[2] = {
    ...models[2],
    fill: 'tonexty',
    type: 'scatter',
    mode: 'none',
    name: 'Variação superior dos observados',
    fillcolor: 'rgba(255, 127, 14, 0.2)',
  }

  const plotData = [...stations, ...models]
  console.log('plotData', plotData)

  function handleStoreZoomInfo(data: any) {
    console.log(data)
    const newZoomInfo = {
      x: {
        from: data["xaxis.range[0]"] ? dayjs(data["xaxis.range[0]"]).format('DD/MM/YYYY') : zoomInfo.x.from,
        to: data["xaxis.range[1]"] ? dayjs(data["xaxis.range[1]"]).format('DD/MM/YYYY') : zoomInfo.x.to,
      },
      y: {
        from: data["yaxis.range[0]"] ? Number(data["yaxis.range[0]"].toFixed(2)) : zoomInfo.y.from,
        to: data["yaxis.range[1]"] ? Number(data["yaxis.range[1]"].toFixed(2)) : zoomInfo.y.to,
      },
    };

    if(!document) return

    const zoomXElement = document.getElementById('zoom-x')
    const zoomYElement = document.getElementById('zoom-y')
    
    if(!zoomXElement || !zoomYElement) return

    if (data["xaxis.autorange"] === true || data["xaxis.showspikes"] === false)
      zoomXElement.innerHTML = `Zoom X: nenhum zoom foi aplicado`

    if (data["yaxis.autorange"] === true || data["yaxis.showspikes"] === false)
      zoomYElement.innerHTML = `Zoom X: nenhum zoom foi aplicado`
     
    if(data["xaxis.range[0]"] && data["xaxis.range[1]"])
      zoomXElement.innerHTML = `Zoom X: ${newZoomInfo.x.from} - ${newZoomInfo.x.to}`

    if(data["yaxis.range[0]"] && data["yaxis.range[1]"])
      zoomYElement.innerHTML = `Zoom Y: ${newZoomInfo.y.from} - ${newZoomInfo.y.to}`
  }

  const layout: any = {
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
  }

  const config: any = {
    responsive: true,
    modeBarButtonsToRemove: [
      'zoom2d', 'pan2d', 'select2d', 'lasso2d', 'zoomIn2d', 'zoomOut2d', 
      'autoScale2d', 'hoverClosestCartesian', 'hoverCompareCartesian',
    ], // Remove todos os botões indesejados
    displayModeBar: true,
    locale: 'pt-br',
    displaylogo: false, // Remove o logo do Plotly
  }

  const css = { width: '100%', height: '100%' }

  console.log('teste')
  // Uso no componente principal
  return (
    <div className="min-w-full min-h-[550px] bg-white rounded-3xl relative">
      {loading || !plotData.length
        ? <Spinner className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" size="lg" />
        : <Plot data={plotData} layout={layout} onRelayout={handleStoreZoomInfo} config={config} useResizeHandler={true} style={{ width: '100%', height: '100%' }} /> 
      }
    </div>
  );
}

