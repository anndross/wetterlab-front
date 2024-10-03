'use client'
import { Chart } from '@/components/Chart';
import {DatePicker} from "@/components/DatePicker";
import { GeoChart } from "@/components/GeoChart";
import { SelectService } from "@/components/SelectService";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import data from '@/data/stations.json'
import { useEffect, useState } from 'react';
import ThemeContext, { filtersType } from './context';
import dayjs from 'dayjs';
import mappedServicesJSON from "@/data/mappedServices.json"
import { useCookies } from 'next-client-cookies';

export default function Dashboard() {
    const [meteorData, setMeteorData] = useState<typeof data>([])
    const [filters, setFilters] = useState<filtersType>({
        state: '',
        coordinates: [], 
        dateRange: { start: '', end: '' },
        services: ['t']
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

            setFilters({ state: address?.municipality?.toUpperCase(), coordinates: availableCoordinatesData[0], dateRange: {start: '2022-1-1', end: '2022-1-15'}, services: ['t'] })
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
            const {state, coordinates: [lat, lon], dateRange: { start, end }} = filters
            
            // const endpointByCoordinate = `http://127.0.0.1:8000/api/meteor/stations?latitude=${lat}&longitude=${lon}&from=${start}&to=${end}`
            // const endpointByCity = `http://127.0.0.1:8000/api/meteor/stations?location=${state}&from=${start}&to=${end}`


            // const isTheFirstAcessCondition = isTheFirstAcess.lat === lat && isTheFirstAcess.lon === lon && isTheFirstAcess.city === state

            // const currentEndpoint = isTheFirstAcessCondition ? endpointByCity : endpointByCoordinate

            setLoading(true)

            const forecast = await fetch(`/api/forecast?longitude=${lon}&latitude=${lat}&from=${start}&to=${end}`).then(data => data.json())
            console.log('forecast', forecast)

            // const meteorDataResponse = await fetch(currentEndpoint)
            //     .then(response => response.ok && response.json())

            // setIsTheFirstAcess({
            //     lat, 
            //     lon, 
            //     city: state
            // })

            if(forecast.length) {
                setMeteorData(forecast)
            } else {
                setMeteorData([])
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
    }, [filters.state, filters.coordinates, filters.dateRange])

    console.log('filters', filters)
    // const mappedServices: { [key: string]: string } = mappedServicesJSON

    return (
        <ThemeContext.Provider value={{loading, rawStationsData, meteorData, setMeteorData, filters, setFilters, availableCoordinates}}>
            <main className="w-full min-h-[120vh] grid grid-cols-[66%_34%] p-8 gap-7 bg-slate-50">
                <section className='w-full h-full'>
                    <Typography variant="h6" component="h2">Resultados para a pesquisa:</Typography>
                    <ul className='mt-3'>
                        <li className='capitalize'>
                            <Typography variant="subtitle2" gutterBottom>Localidade: {filters.state}</Typography>
                        </li>
                        <li>
                            <Typography variant="subtitle2" gutterBottom>Período: {dayjs(filters.dateRange.start).format('DD/MM/YYYY')} - {dayjs(filters.dateRange.end).format('DD/MM/YYYY')}</Typography>
                        </li>
                        <li>
                            <Typography variant="subtitle2" gutterBottom>Serviço: </Typography>
                        </li>
                    </ul>

                    <div className='mb-5'>
                        <SelectService />
                    </div>

                    <Chart />
                    <div className='flex gap-4 mt-8'>
                        {/* <Card sx={{ minWidth: 275 }}>
                            <CardContent>
                                <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                                    Velocidade do vento
                                </Typography>
                                <Typography variant="h5" component="div">
                                    24km/h
                                </Typography>
                                <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>lorem ipsum</Typography>
                                <Typography variant="body2">
                                lorem ipsum lorem ipsum lorem ipsum
                                    <br />
                                    {'"lorem ipsum"'}
                                </Typography>
                            </CardContent>
                        </Card>
                        <Card sx={{ minWidth: 275 }}>
                            <CardContent>
                                <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                                    Velocidade do vento
                                </Typography>
                                <Typography variant="h5" component="div">
                                    24km/h
                                </Typography>
                                <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>lorem ipsum</Typography>
                                <Typography variant="body2">
                                lorem ipsum lorem ipsum lorem ipsum
                                    <br />
                                    {'"lorem ipsum"'}
                                </Typography>
                            </CardContent>
                        </Card> */}
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