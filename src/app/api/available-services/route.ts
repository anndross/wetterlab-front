export async function GET(req: Request) {
    const mockCoordinates = [
        [ -47.92583465576172, -15.789443969726562 ],

    ]


    const url= new URL(req.url)

    const searchParams = new URLSearchParams(url.searchParams)

    const customerId = searchParams.get('customer_id')

    const data = await fetch(`http://127.0.0.1:8000/api/erp/available-services?customer_id=${customerId}`).then(response => response.json())


    const coordinates = data.services[0].locations.map((location: number[]) => location.reverse())

    return Response.json(coordinates)
}