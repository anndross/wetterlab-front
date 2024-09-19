'use client'
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from 'react-leaflet';
// import './styles.css';
import { Icon } from 'leaflet';
import "leaflet/dist/leaflet.css";
import { useContext, useState } from 'react';
import stationsContext, { filtersType } from '@/app/dashboard/context';

export type LocationType = { latitude: number; longitude: number }

export const GeoChart = () => {
  const initialState = {
    center: [-13.0, -56.0] as any,
    zoom: 4.5,
  };


  const [state, setState] = useState(initialState)
  const {setFilters} = useContext(stationsContext)

  const LocationFinderDummy = () => {
    const map = useMapEvents({
      
        click(e) {
          const {lat, lng} = e.latlng

          setState((prev) => ({...prev, center: [e.latlng.lat, e.latlng.lng] }));
          
          fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`)
            .then(response => response.json())
            .then(data => setFilters((prev: filtersType) => ({...prev, state: data.address.state.toUpperCase()})))
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