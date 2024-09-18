'use client'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
// import './styles.css';
import { Icon } from 'leaflet';
import "leaflet/dist/leaflet.css";

export type LocationType = { latitude: number; longitude: number }

export const GeoChart = () => {
  const state = {
    center: [51.505, -0.091] as any,
    zoom: 13,
  };

  return (
    <div className='w-full h-full'>
      <MapContainer center={[51.505, -0.09]} zoom={13}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[51.505, -0.09]} icon={new Icon({
          iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
          iconUrl: require('leaflet/dist/images/marker-icon.png'),
          shadowUrl: require('leaflet/dist/images/marker-shadow.png')
        })}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
    </MapContainer>
    </div>
  )
};