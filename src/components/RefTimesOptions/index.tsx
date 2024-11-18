import { Select, SelectSection, SelectItem } from "@nextui-org/select";
import { ChangeEventHandler, useContext, useEffect, useState } from "react";
import stationsContext, { filtersType } from "@/app/dashboard/context";

export function RefTimesOptions() {
  const [refTimes, setRefTimes] = useState<{ value: string; label: string }[]>(
    []
  );
  const [value, setValue] = useState<string>("");

  const { filters, setFilters } = useContext(stationsContext);

  useEffect(() => {
    setFilters((prev: filtersType) => ({
      ...prev,
      refTime: value,
    }));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  useEffect(() => {
    const {
      coordinates: [lat, lon],
      dateRange: { start, end },
    } = filters;

    async function setData() {
      const data = await fetch(
        `http://127.0.0.1:8000/api/meteor/models-reftimes?longitude=${lon}&latitude=${lat}&from=${start}&to=${end}`
      ).then((res) => res.json());

      setRefTimes(data);
    }

    if (lat && lon && start && end) setData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.coordinates, filters.dateRange]);

  const handleSelectionChange = (e: any) => {
    setValue(e.target.value);
  };

  return (
    <Select
      label="Rodada"
      labelPlacement="outside"
      placeholder="Selecione o tempo de rodada"
      className="w-64 !m-0"
      selectedKeys={[value]}
      onChange={handleSelectionChange}
    >
      {refTimes.length
        ? refTimes.map((reftime) => (
            <SelectItem key={reftime.value}>{reftime.label}</SelectItem>
          ))
        : []}
    </Select>
  );
}
