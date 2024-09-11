import MyChartComponent from "@/components/Chart";
import { GeoChart } from "@/components/GeoChart";

export default function Dashboard() {
    return (
        <main>
            <MyChartComponent />
            <GeoChart />
        </main>
    )
}