'use client'
import { DateRangePicker } from "@nextui-org/date-picker";
import {parseZonedDateTime, parseDate, today} from "@internationalized/date";
import { useContext } from "react";
import stationsContext, { filtersType } from "@/app/dashboard/context";

export interface DateRangeRickerProps {
  onChange: (dateRangePickerValues: {start: string, end: string}) => void
}

export function DatePicker({onChange}: DateRangeRickerProps) {
  const { setFilters } = useContext(stationsContext)

  return (
    <DateRangePicker
      defaultValue={{
        start: parseZonedDateTime("2022-01-01T00:45[America/Sao_Paulo]"),
        end: parseZonedDateTime("2022-01-15T11:15[America/Sao_Paulo]"),
      }}
      label="Período"
      labelPlacement="inside"
      className="w-full"
      granularity="day"
      hideTimeZone
      // minValue={parseDate("2024-09-11")}
      // maxValue={parseDate("2024-09-13")}
      errorMessage="Período máximo selecionado"
      isRequired
      onChange={(datePickerValue) => {
        const mappedDate = {
          start: `${datePickerValue.start.year}-${datePickerValue.start.month}-${datePickerValue.start.day}`,
          end: `${datePickerValue.end.year}-${datePickerValue.end.month}-${datePickerValue.end.day}`,
        }

        setFilters((prev: filtersType) => ({...prev, dateRange: mappedDate }))
      }}
    />
  );
}