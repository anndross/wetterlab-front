"use client";
import { DateRangePicker } from "@nextui-org/date-picker";
import {
  parseZonedDateTime,
  parseDate,
  today,
  CalendarDate,
} from "@internationalized/date";
import { useContext, useEffect, useState } from "react";
import stationsContext, { filtersType } from "@/app/dashboard/context";
import dayjs from "dayjs";
import { I18nProvider } from "@react-aria/i18n";

export function DatePicker() {
  const {
    filters: {
      dateRange: { start, end },
      coordinates: [lat, lon],
    },
    setFilters,
  } = useContext(stationsContext);

  useEffect(() => {
    async function get_inital_dates() {
      const [from, to] = await fetch(
        `http://127.0.0.1:8000/api/meteor/most-recent-period?longitude=${lon}&latitude=${lat}`
      ).then((res) => res.json());

      setFilters((prev: filtersType) => ({
        ...prev,
        dateRange: {
          start: from,
          end: to,
        },
      }));
    }
    if (lat && lon) get_inital_dates();
  }, [lat, lon]);

  return (
    <DateRangePicker
      label="Período"
      labelPlacement="outside"
      value={
        start.length && end.length
          ? {
              start: parseDate(start),
              end: parseDate(end),
            }
          : null
      }
      className="w-64 m-0 !pb-0 justify-end"
      granularity="day"
      hideTimeZone
      // minValue={parseDate("2024-09-11")}
      // maxValue={parseDate("2024-09-13")}
      errorMessage="Período máximo selecionado"
      isRequired
      onChange={(datePickerValue) => {
        const mappedDate = {
          start: dayjs(datePickerValue.start.toString()).format("YYYY-MM-DD"),
          end: dayjs(datePickerValue.end.toString()).format("YYYY-MM-DD"),
        };

        setFilters((prev: filtersType) => ({ ...prev, dateRange: mappedDate }));
      }}
    />
  );
}
