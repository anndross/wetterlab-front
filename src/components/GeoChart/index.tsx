'use client'
import { MapContainer, Marker, Popup, TileLayer, Circle, useMapEvents } from 'react-leaflet';
// import './styles.css';
import { Icon, LatLngExpression } from 'leaflet';
import "leaflet/dist/leaflet.css";
import { useContext, useEffect, useState } from 'react';
import stationsContext, { filtersType } from '@/app/dashboard/context';

export type LocationType = { latitude: number; longitude: number }

export const GeoChart = () => {
  const {filters, setFilters, availableCoordinates} = useContext(stationsContext)
  
  const initialState = {
    center: [-7.337, -47.46] as any,
    zoom: 7,
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
          console.log()
          const latWithLessPrecision = Number(lat.toFixed(6))
          const lngWithLessPrecision = Number(lng.toFixed(6))

          fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latWithLessPrecision}&lon=${lngWithLessPrecision}`)
            .then(response => response.json())
            .then(data => setFilters((prev: filtersType) => ({...prev, state: data.address?.municipality?.toUpperCase(), coordinates: [latWithLessPrecision, lngWithLessPrecision]})))
        },
    });
    return null;
  };

  return (
    <div className='w-96 h-full'>
      <MapContainer center={state.center} zoom={state.zoom} scrollWheelZoom={false}>
        <LocationFinderDummy />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {availableCoordinates.length && availableCoordinates.map((location: number[]) => {
          return (
            <Circle
              key={`${location}`}
              weight={10}
              color={'#f25e40'}
              center={location.reverse() as LatLngExpression}
              radius={5}

            >
            </Circle>
          )
        })}

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