"use client";
import { DateRangePicker } from "@nextui-org/date-picker";
import {
  parseZonedDateTime,
  parseDate,
  today,
  CalendarDate,
  parseAbsoluteToLocal,
} from "@internationalized/date";
import { useContext, useEffect, useState } from "react";
import stationsContext, { filtersType } from "@/app/dashboard/context";
import dayjs from "dayjs";
import { I18nProvider } from "@react-aria/i18n";
import { NextUIProvider } from "@nextui-org/react";
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
    <I18nProvider locale="en-GB">
      <DateRangePicker
        label="Período"
        labelPlacement="outside"
        value={
          start.length && end.length
            ? {
              start: parseAbsoluteToLocal(`${start}T00:00:00Z`),
              end: parseAbsoluteToLocal(`${end}T00:00:00Z`),
            }
            : null
        }
        className="w-64 m-0 !pb-0 justify-end"
        granularity="day"
        hideTimeZone
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
    </I18nProvider>
  );
}
