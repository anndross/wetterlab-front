"use client";
import { Select, SelectItem } from "@nextui-org/select";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import ParamsContext from "@/app/dashboard/context";

type RefTimeType = { value: string; label: string };

export function RefTimeOptions() {
  const [refTimes, setRefTimes] = useState<RefTimeType[]>([]);
  const [value, setValue] = useState<string>("");

  const { params, setParams } = useContext(ParamsContext);
  const { lat, lon } = params;

  useEffect(() => {
    async function handleRefTimes() {
      const data = await fetch(
        `http://34.23.51.63:8000/api/meteor/models-reftimes?longitude=${lon}&latitude=${lat}`
      ).then((res) => res.json());

      if (data.length) {
        setRefTimes(data);
        setValue(data[0].value);

        // TODO: adicionar tipagem
        setParams((prev: any) => ({
          ...prev,
          refTime: data[0].value,
        }));
      }
    }

    if (lat && lon) handleRefTimes();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lat, lon]);

  const handleSelectionChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const eventValue = e.target.value;

    setValue(eventValue);

    // TODO: adicionar tipagem
    setParams((prev: any) => ({
      ...prev,
      refTime: eventValue,
    }));
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
      {refTimes.map((reftime) => (
        <SelectItem key={reftime.value}>{reftime.label}</SelectItem>
      ))}
    </Select>
  );
}
