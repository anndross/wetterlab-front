'use client'
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from 'react-leaflet';
// import './styles.css';
import { Icon } from 'leaflet';
import "leaflet/dist/leaflet.css";
import { useContext, useEffect, useState } from 'react';
import stationsContext, { filtersType } from '@/app/dashboard/context';

export type LocationType = { latitude: number; longitude: number }

export const GeoChart = () => {
  const {filters, setFilters} = useContext(stationsContext)
  
  const initialState = {
    center: [-13.0, -56.0] as any,
    zoom: 4.5,
  };
  
  const [state, setState] = useState(initialState)

  useEffect(() => {
    const { coordinates } = filters

    if(coordinates[0] && coordinates[1])
      setState(prev => ({...prev, center: coordinates}))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters])

  const LocationFinderDummy = () => {
    const map = useMapEvents({
      
        click(e) {
          const {lat, lng} = e.latlng

          fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`)
            .then(response => response.json())
            .then(data => setFilters((prev: filtersType) => ({...prev, state: data.address.municipality.toUpperCase(), coordinates: [lat, lng]})))
        },
    });
    return null;
  };

  return (
    <div className='w-full h-full'>
      <MapContainer center={state.center} zoom={state.zoom} scrollWheelZoom={false}>
        <LocationFinderDummy />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={state.center} icon={new Icon({
          iconUrl: '/assets/marker.png',
          iconSize: [30, 30],
        })}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
    </MapContainer>
    </div>
  )
};