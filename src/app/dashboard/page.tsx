import { TemperatureChart } from '@/components/Chart';
import DatePicker from "@/components/DatePicker";
import { GeoChart } from "@/components/GeoChart";
import { SelectPlace } from "@/components/SelectPlace";

export default function Dashboard() {
    return (
        <main className="w-full min-h-screen grid grid-cols-[60%_40%] p-8">
            <TemperatureChart />
            <div></div>
            <div className="w-full h-full">
                <div className="flex w-full justify-between">
                    <SelectPlace />
                    <DatePicker />
                </div>
            <GeoChart />
            </div>
        </main>
    )
}