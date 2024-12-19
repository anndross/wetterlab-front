import { Select, SelectItem } from "@nextui-org/select";
import { useContext, useEffect, useState } from "react";
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
    } = filters;

    async function setData() {
      const data = await fetch(
        `http://34.23.51.63:8000/api/meteor/models-reftimes?longitude=${lon}&latitude=${lat}`
      ).then((res) => res.json());

      if (data.length) setValue(data[0].value);

      setRefTimes(data);
    }

    if (lat && lon) setData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.coordinates]);

  const handleSelectionChange = (e: any) => {
    setValue(e.target.value);
  };

  return (
    <Select
      label="Rodadas"
      labelPlacement="outside"
      placeholder="Selecione a rodada"
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
