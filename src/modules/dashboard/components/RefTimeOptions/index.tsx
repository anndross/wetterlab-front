"use client";
import React, { useEffect, useState, useTransition } from "react";
import { Select } from "../../../../components/ui/Select";
import { useDashStore } from "../../store";

export function RefTimeOptions() {
  const [refTimes, setRefTimes] = useState<any[]>([]);

  const { params, setParams } = useDashStore();
  const [isPending, startTransition] = useTransition();

  const {
    location: { coordinate },
    refTime,
  } = params;

  const [lat, lon] = coordinate;

  useEffect(() => {
    function handleRefTimes() {
      startTransition(async () => {
        const data = await fetch(
          `/wetterlab/api/meteor/models-ref-times?lon=${lon}&lat=${lat}`
        ).then((res) => res.json());

        if (data.length) {
          setRefTimes(data);

          setParams({
            refTime: {
              value: data[0].value,
              // Essa variável está vindo junto com o ref-time pois
              // os ref-times podem vir iguais para uma coordenada diferente,
              // e a requisição do gráfico deve acontecer apenas quando o ref-time
              // completa sua request, e não a coordenada. Por isso, está sendo enviada
              // a coordenada respectiva, para alterar o estado
              // e o useEffect ser ativado caso o ref-time
              // seja igual ao anterior
              respectiveCoordinate: [lat, lon],
            },
          });
        }
      });
    }

    if (lat && lon) handleRefTimes();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lat, lon]);

  const handleSelectionChange = (
    selectedItem: { value: string; label: string } | null
  ) => {
    if (!selectedItem) return;
    const value = selectedItem.value;

    setParams({
      refTime: {
        value: value,
        respectiveCoordinate: [lat, lon],
      },
    });
  };

  return (
    <Select
      label="Rodadas"
      items={refTimes}
      id="ref-times"
      selectedItem={refTimes.find((time) => time.value === refTime.value)}
      initialSelectedItem={refTimes[0]}
      onChange={handleSelectionChange}
      itemToString={(item) => (item ? item.label : "")}
      isPending={isPending}
    />
  );
}
