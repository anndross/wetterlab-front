'use client'
import { Chart } from '@/components/Chart';
import {DatePicker} from "@/components/DatePicker";
import { GeoChart } from "@/components/GeoChart";
import { ServiceOptions } from "@/components/ServiceOptions";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import data from '@/data/stations.json'
import { useEffect, useState } from 'react';
import ThemeContext, { filtersType, MeteorData } from './context';
import dayjs from 'dayjs';
import mappedServicesJSON from "@/data/mappedServices.json"
import { useCookies } from 'next-client-cookies';
import { PeriodOptions } from '@/components/PeriodOptions';

export default function Dashboard() {
    const [meteorData, setMeteorData] = useState<MeteorData>({
        dates: [],
        stations: [],
        models: []
    })
    const [filters, setFilters] = useState<filtersType>({
        state: '',
        coordinates: [], 
        dateRange: { start: '', end: '' },
        services: ['t'],
        mean: 1,
    })
    const [loading, setLoading] = useState<boolean>(true)
    const [availableCoordinates, setAvailableCoordinates] = useState<number[][]>([])


    // const [isTheFirstAcess, setIsTheFirstAcess] = useState<any>({})
    const rawStationsData = data

    const cookies = useCookies()

    /**
     * @description useEffect responsável pelo carregamento dos filtros iniciais
     */
    useEffect(() => {
        const token =  cookies.get('token')

        async function getUserInfoAndStore() {
            // const decodedToken = await fetch('http://127.0.0.1:8000/api/erp/decode-token', {
            //     headers: {
            //         'Accept': 'application/json',
            //         'Content-Type': 'application/json'
            //     },
            //     method: 'POST',
            //     body: JSON.stringify({ token: token })
            // }).then(response => response.json())
            const availableCoordinatesData = await fetch('/api/available-services?customer_id=1').then(res => res.ok && res.json())
            
            setAvailableCoordinates(availableCoordinatesData)
            
            const [lat, lon] = availableCoordinatesData[0]

            const { address } = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`).then(response => response.json())
            // setIsTheFirstAcess({lat, lon, city: decodedToken.city})

            setFilters((prev: filtersType) => ({ ...prev, state: address?.municipality?.toUpperCase(), coordinates: availableCoordinatesData[0] }))
        }   

        getUserInfoAndStore()
    }, [cookies])


    /**
     * @description useEffect responsável pelo armazenamento dos dados de stations com base nos filtros
     */
    useEffect(() => {
        /**
         * @description pega todos os dados de stations com base nos filtros
         */
        async function getStationsDataAndStore() {
            const {state, coordinates: [lat, lon], dateRange: { start, end }, services, mean} = filters
            
            setLoading(true)

            const forecast = await fetch(`http://127.0.0.1:8000/api/meteor/forecast?longitude=${lon}&latitude=${lat}&from=${start}&to=${end}&service=${services[0]}&mean=${mean}`).then(data => data.json())
            console.log('forecast', forecast)

            if('dates' in forecast && 'models' in forecast && 'stations' in forecast) {
                setMeteorData(forecast)
            } else {
                setMeteorData({
                    dates: [],
                    stations: [],
                    models: []
                })
            }

            setLoading(false)
        }

        if(
            filters.coordinates.length && 
            filters.dateRange.start.length && 
            filters.dateRange.end.length
        )
            getStationsDataAndStore()

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filters.state, filters.coordinates, filters.dateRange, filters.mean, filters.services])

    console.log('filters', filters)
    const mappedServices: { [key: string]: string } = mappedServicesJSON

    return (
        <ThemeContext.Provider value={{loading, rawStationsData, meteorData, setMeteorData, filters, setFilters, availableCoordinates}}>
            <main className="w-full min-h-[120vh] grid grid-cols-[66%_34%] p-8 gap-7 bg-slate-50">
                <section className='w-full h-full'>
                    <Typography variant="h6" component="h2" color='#000'>Resultados para a pesquisa:</Typography>
                    <ul className='mt-3'>
                        <li className='capitalize'>
                            <Typography variant="subtitle2" gutterBottom color='#000'>Localidade: {filters.state}</Typography>
                        </li>
                        <li>
                            <Typography variant="subtitle2" gutterBottom color='#000'>Período: {dayjs(filters.dateRange.start).format('DD/MM/YYYY')} - {dayjs(filters.dateRange.end).format('DD/MM/YYYY')}</Typography>
                        </li>
                        <li>
                            <Typography variant="subtitle2" gutterBottom color='#000'>Serviço: {mappedServices[filters.services[0]]}</Typography>
                        </li>
                    </ul>

                    <div className='flex flex-col gap-4 my-5'>
                        <ServiceOptions />
                    </div>

                    <div className='grid gap-6 grid-cols-[calc(4%)_calc(96%-24px)]'>
                        <PeriodOptions />
                        <div>
                            <Chart />
                        </div>
                    </div>
                </section>
                <section className="w-full h-full">
                    <div className="flex flex-col w-full mb-8 gap-4">
                        <DatePicker onChange={(value) => {
                            console.log(value)
                        }} />
                    </div>
                    <GeoChart />
                </section>
            </main>
        </ThemeContext.Provider>
    )
}