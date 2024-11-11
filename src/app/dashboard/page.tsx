'use client'
import { Chart, LineChartWithConfidenceAndRange, PlotlyChart } from '@/components/Chart';
import {DatePicker} from "@/components/DatePicker";
import { GeoChart } from "@/components/GeoChart";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { FaLongArrowAltRight } from "react-icons/fa";
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
import { Button } from "@nextui-org/button";
import clsx from 'clsx';
import { RefTimesOptions } from '@/components/RefTimesOptions';

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
        refTime: '',
        zoom: {
            y: {
                from: '',
                to: ''
            },
            x: {
                from: '',
                to: ''
            }
        }
    })
    const [loading, setLoading] = useState<boolean>(true)
    const [availableCoordinates, setAvailableCoordinates] = useState<number[][]>([])
    const [showMap, setShowMap] = useState<boolean>(false)


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
     * @description useEffect responsável pelo armazenamento dos dados de stations e models com base nos filtros
     */
    useEffect(() => {
        /**
         * @description pega todos os dados de stations com base nos filtros
         */
        async function getStationsDataAndStore() {
            const {state, coordinates: [lat, lon], dateRange: { start, end }, services, mean, refTime} = filters
            
            setLoading(true)

            const forecast = await fetch(`http://127.0.0.1:8000/api/meteor/forecast?longitude=${lon}&latitude=${lat}&from=${start}&to=${end}&service=${services[0]}&mean=${mean}&reftime=${refTime}`).then(data => data.json())
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
    }, [filters.state, filters.coordinates, filters.dateRange, filters.mean, filters.services, filters.refTime])

    console.log('filters', filters)
    const mappedServices: { [key: string]: string } = mappedServicesJSON

    // responsável por recarregar o gráfico quando o layout mudar
    useEffect(() => {
        setLoading(true)

        setTimeout(() => {
            setLoading(false)
        }, 200)

    }, [showMap])

    return (
        <ThemeContext.Provider value={{loading, rawStationsData, meteorData, setMeteorData, filters, setFilters, availableCoordinates}}>
            <main 
                className={"w-full min-h-[120vh] flex flex-col p-8 gap-2 bg-slate-50 overflow-hidden"}
            >
                <section className='w-full h-full flex justify-between items-end'>
                    {/* Informações dos filtros e seletor de serviço */}
                    <div className=''>
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
                            <li>
                                <Typography variant="subtitle2" gutterBottom color='#000'>
                                    Zoom X: {filters.zoom.x.from} - {filters.zoom.x.to}
                                </Typography>
                            </li>
                            <li>
                                <Typography variant="subtitle2" gutterBottom color='#000'>
                                    Zoom Y: {filters.zoom.y.from} - {filters.zoom.y.to}
                                </Typography>
                            </li>
                        </ul>

                        <div className='flex gap-8 mt-4'>
                            <div className='flex flex-col gap-1'>
                                <Typography variant="subtitle2" gutterBottom color='#3c3c3c'>Selecione o serviço:</Typography>
                                <ServiceOptions />
                            </div>

                            <div className='flex flex-col gap-1'>
                                <Typography variant="subtitle2" gutterBottom color='#3c3c3c'>Selecione a média:</Typography>
                                <PeriodOptions />
                            </div>
                        </div>
                    </div>

                    {/* Calendário */}
                    <div className={clsx({
                        "flex flex-col gap-2 items-end": true,
                    })}>
                        <div className='flex gap-2'>
                            <RefTimesOptions />
                            <DatePicker onChange={(value) => {
                                console.log(value)
                            }} />
                        </div>
                        <Button className='w-12 min-w-12 max-w-12' onClick={() => setShowMap((prev) => !prev)}>
                            { showMap ? <FaLongArrowAltRight /> : <FaLongArrowAltLeft />}
                        </Button>
                    </div>
                </section>

                {/* Seletor de médias + gráfico + mapa */}
                <section className={clsx({
                    "w-full h-full overflow-hidden grid duration-150 gap-3": true,
                    "grid-cols-[calc(100%-396px)_384px]": showMap,
                    "grid-cols-[calc(95%-12px)_5%]": !showMap
                })}>
                    <div className='flex flex-col w-full gap-3'>
                        {/* <Chart />
                        <LineChartWithConfidenceAndRange /> */}
                        <PlotlyChart />
                        {/* <GoogleChartComponent /> */}
                    </div>
                    <div className='w-full h-full overflow-hidden'>
                        <GeoChart />
                    </div>
                </section>
            </main>
        </ThemeContext.Provider>
    )
}