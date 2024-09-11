'use client'
import { Chart } from "react-google-charts";

export const data = [
    ["Year", "Sales", "Expenses"],
    ["2014", 1000, 400],
    ["2015", 1170, 460],
    ["2016", 660, 1120],
    ["2017", 1030, 540],
];

export const options = {
    title: "Company Performance",
    curveType: "function",
    legend: { position: "bottom" },
};

const MyChartComponent = () => {
    return (
        <Chart
            chartType="LineChart"
            width="100%"
            height="400px"
            data={data}
            options={options}
        />
    );
};

export default MyChartComponent;
