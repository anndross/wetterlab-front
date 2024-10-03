export async function GET(req: Request) {

    if(!req.url) return
     
    const url = new URL(req.url)

    const searchParams = new URLSearchParams(url.searchParams);

    console.log('searchParams', searchParams)
    
    const lat = searchParams.get('latitude')
    const lon = searchParams.get('longitude')
    const from = searchParams.get('from')
    const to = searchParams.get('to')

    if(!lat && !lon) 
        return Response.json({'error': 'O parâmetro latitude e longitude é obrigatório'})
    
    if(!from && !to)
        return Response.json({'error': 'O parâmetro from e to é obrigatório'})

    const endpoints = {
        stations: {
            byCoordinate: `http://127.0.0.1:8000/api/meteor/stations?latitude=-7.337&longitude=-47.46&from=${from}&to=${to}`,
            // byLocation: `http://127.0.0.1:8000/api/meteor/stations?location=${location}&from=${from}&to=${to}` 
        },
        models: {
            byCoordinate: `http://127.0.0.1:8000/api/meteor/models?latitude=-7.337&longitude=-47.46&from=${from}&to=${to}`,
            // byLocation: `http://127.0.0.1:8000/api/meteor/models?location=${location}&from=${from}&to=${to}` 
        }

    }

    const {stations, models} = endpoints

    const promises = []


    promises.push(fetch(stations.byCoordinate).then(res => res.json()))
    promises.push(fetch(models.byCoordinate).then(res => res.json()))

    // if(location) {
    //     promises.push(fetch(stations.byLocation))
    //     promises.push(fetch(models.byLocation))

    // } else {
       
    // }
    console.log(promises)
    const resolvedPromises = await Promise.all(promises) 


    return Response.json(resolvedPromises)
}