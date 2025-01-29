"use client";
import React, { useContext, useEffect, useState, useTransition } from "react";
import DashboardContext from "@/app/dashboard/context";
import { Select } from "../ui/Select";

export function RefTimeOptions() {
  const [refTimes, setRefTimes] = useState<any[]>([]);

  const { params, setParams } = useContext(DashboardContext);
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
          `/api/meteor/models-ref-times?longitude=${lon}&latitude=${lat}`
        ).then((res) => res.json());

        if (data.length) {
          setRefTimes(data);

          setParams((prev: any) => ({
            ...prev,
            refTime: data[0].value,
          }));
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

    setParams((prev) => ({
      ...prev,
      refTime: value,
    }));
  };

  return (
    <Select
      label="Rodadas"
      items={refTimes}
      id="ref-times"
      selectedItem={refTimes.find((time) => time.value === refTime)}
      initialSelectedItem={refTimes[0]}
      onChange={handleSelectionChange}
      itemToString={(item) => (item ? item.label : "")}
      isPending={isPending}
    />
  );
}
