export async function GET(request: Request) {
    const ACCESS_TOKEN_MAP_BOX = `access_token=${process.env.ACCESS_TOKEN_MAP_BOX}`

    const url = new URL(request.url)

    const searchParams = new URLSearchParams(url.searchParams);
    const local = searchParams.get('local')

    try {
        const data = await fetch(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${local}.json?${ACCESS_TOKEN_MAP_BOX}`
        ).then(response => response.json())

        return new Response(JSON.stringify(data), { status: 200 })
    } catch (error) {
        return new Response(JSON.stringify(error), { status: 500 })
    }
}