'use client'
import { TemperatureChart } from '@/components/Chart';
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
    const [stationsData, setStationsData] = useState<typeof data>([])
    const [filters, setFilters] = useState<filtersType>({
        state: '',
        coordinates: [], 
        dateRange: { start: '', end: '' },
        services: ['t']
    })

    const rawStationsData = data

    const cookies = useCookies()

    // useEffect responsável pelo carregamento dos filtros iniciais
    useEffect(() => {
        const token =  cookies.get('token')

        async function getUserInfoAndStore() {
            const decodedToken = await fetch('http://127.0.0.1:8000/api/erp/decode-token', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify({ token: token })
            }).then(response => response.json())
    
            

            const [{ lat, lon }] = await fetch(`https://nominatim.openstreetmap.org/search.php?state=${decodedToken.city}&country=${decodedToken.country}&polygon_geojson=1&format=jsonv2`).then(response => response.json())
            
            setFilters({ state: decodedToken.city, coordinates: [lat, lon], dateRange: {start: '2022-1-1', end: '2022-1-15'}, services: ['t'] })
        }   

        getUserInfoAndStore()
    }, [cookies])


    // useEffect responsável pelo armazenamento dos dados de stations com base nos filtros
    useEffect(() => {
        // pega todos os dados de stations com base nos filtros
        async function getStationsDataAndStore() {
            const {coordinates: [lat, lon], dateRange: { start, end }} = filters

            console.log('lat.lon', lat, lon, filters)
            const stationsDataResponse = await fetch(`http://127.0.0.1:8000/api/meteor/stations?latitude=${lat}&longitude=${lon}&from=${start}&to=${end}`)
                .then(response => response.json())

            setStationsData(stationsDataResponse)
        }

        if(
            filters.coordinates.length && 
            filters.dateRange.start.length && 
            filters.dateRange.end.length
        )
            getStationsDataAndStore()

        // // filtro todos os dados pelas coordenadas
        // const filteredDataByLocation = rawStationsData.filter((stationData: typeof rawStationsData[0]) => {
        //     if(
        //         stationData.location === filters.state
        //     ) return stationData
        // })


        // // índice da posição do dia no array
        // const dayIndex = 2

        // const startDateWithoutDay = filters.dateRange.start.split('-').filter((_, i, arr) => i < (arr.length - 1)).join('-')

        // const startDateDayNumber = Number(filters.dateRange.start.split('-')[dayIndex])
        // const endDateDayNumber = Number(filters.dateRange.end.split('-')[dayIndex])

        // const differenceBetween = Math.abs(endDateDayNumber - startDateDayNumber)

        // const rangeDays: string[] = [] 

        // // o + 1 serve para incluir o último dia também (endDate)
        // for(let date = 0; date < differenceBetween + 1; date++) {
        //     const currentDate = startDateDayNumber + date

        //     rangeDays.push(`${startDateWithoutDay}-${currentDate}`)
        // }

        // // filtro todos os dados já filtrados pelas coordenadas pelos dias também
        // const filteredDataByLocationAndDate: typeof data = []
        
        // filteredDataByLocation.forEach(dataByLocation => {
        //     rangeDays.forEach(day => {
        //         if(dataByLocation.datetime === day)
        //             filteredDataByLocationAndDate.push(dataByLocation)
        //     })
        // })

        // setStationsData(filteredDataByLocationAndDate)
    }, [filters])

    console.log('filters', filters)
    // const mappedServices: { [key: string]: string } = mappedServicesJSON

    return (
        <ThemeContext.Provider value={{rawStationsData, stationsData, setStationsData, filters, setFilters}}>
            <main className="w-full min-h-[120vh] grid grid-cols-[66%_34%] p-8 gap-4 bg-slate-50">
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

                    <TemperatureChart />
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
                        <SelectService />
                    </div>
                    <GeoChart />
                </section>
            </main>
        </ThemeContext.Provider>
    )
}