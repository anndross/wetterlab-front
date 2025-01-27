import { Select } from "../ui/Select";
import { useContext } from "react";
import DashboardContext, { DashboardType } from "@/app/dashboard/context";

type Charts = {
  label: string;
  value: DashboardType["params"]["chart"];
};

export function SelectChart() {
  const { setParams } = useContext(DashboardContext);

  const charts: Charts[] = [
    { label: "Gráfico de linha", value: "LineChart" },
    { label: "BoxPlot", value: "BoxPlot" },
  ];

  const handleSelectionChange = (selectedItem: Charts | null) => {
    if (!selectedItem) return;

    const value = selectedItem.value;

    setParams((prev) => ({
      ...prev,
      chart: value,
    }));
  };

  return (
    <Select
      label="Gráfico"
      items={charts}
      initialSelectedItem={charts[0]}
      itemToString={(item) => (item ? item.label : "")}
      onChange={handleSelectionChange}
    />
  );
}
