import { Select } from "@/components/ui/Select";
import { Chart, useDashStore } from "@/modules/dashboard/store";

type Charts = {
  label: string;
  value: Chart;
};

export function SelectChart() {
  const setParams = useDashStore((state) => state.setParams);

  const charts: Charts[] = [
    { label: "Gráfico de linha", value: "LineChart" },
    { label: "BoxPlot", value: "BoxPlot" },
  ];

  const handleSelectionChange = (selectedItem: Charts | null) => {
    if (!selectedItem) return;

    const value = selectedItem.value;

    setParams({
      chart: value,
    });
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
