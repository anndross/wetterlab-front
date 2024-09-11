'use client'
import { useState } from 'react';
import { Chart } from 'react-google-charts';


export type LocationType = { latitude: number; longitude: number }

export const GeoChart = () => {
  // Estado para armazenar as coordenadas selecionadas
  const [selectedLocation, setSelectedLocation] = useState<LocationType | null>(null);

  // Dados do mapa
  const mapData = [
    ['Lat', 'Long', 'Nome'],
    [-12.9714, -38.5014, 'Bahia'],
    [-3.119, -60.0217, 'Amazonas'],
    [-23.5505, -46.6333, 'São Paulo'],  // Coordenadas de São Paulo (capital do estado)
  ];

  // Opções do mapa
  const mapOptions = {
    region: 'BR', // Define a região do Brasil
    colorAxis: { colors: ['#e5f5e0', '#31a354'] },
    backgroundColor: '#f0f0f0',
    legend: 'none',
    tooltip: { trigger: 'none' }
  };

  const handleMapClick = (e: any) => {
    console.log(e)
    // const { latitude, longitude } = e.latLng;
    // setSelectedLocation({ latitude, longitude });
  };

  return (
    <div>
      <Chart
        width={'100%'}
        height={'500px'}
        chartType="GeoChart"
        data={mapData}
        options={mapOptions}
        chartEvents={[
          {
            eventName: 'select',
            callback: handleMapClick, 
          },
        ]}
      />
      {selectedLocation && (
        <div>
          <h3>Coordenadas Selecionadas</h3>
          <p>Latitude: {selectedLocation.latitude}</p>
          <p>Longitude: {selectedLocation.longitude}</p>
        </div>
      )}
    </div>
  );
};