'use client'
import { DateRangePicker } from "@nextui-org/date-picker";
import {parseZonedDateTime, parseDate, today, CalendarDate} from "@internationalized/date";
import { useContext, useEffect, useState } from "react";
import stationsContext, { filtersType } from "@/app/dashboard/context";
import dayjs from "dayjs";
export interface DateRangeRickerProps {
  onChange: (dateRangePickerValues: {start: string, end: string}) => void
}

export function DatePicker({onChange}: DateRangeRickerProps) {
  const { filters: {dateRange: {start, end}}, setFilters } = useContext(stationsContext)


  const [value, setValue] = useState<{start: CalendarDate, end: CalendarDate} | null>(null);


  useEffect(() => {
    if(start.length && end.length)
      setValue({
        start: parseDate(start),
        end: parseDate(end),
      })

  }, [start, end])

  return (
    <DateRangePicker
      label="Período"
      labelPlacement="inside"
      className="w-full"
      granularity="day"
      hideTimeZone
      // minValue={parseDate("2024-09-11")}
      // maxValue={parseDate("2024-09-13")}
      value={value}
      errorMessage="Período máximo selecionado"
      isRequired
      onChange={(datePickerValue) => {
        const mappedDate = {
          start: dayjs(datePickerValue.start.toString()).format('YYYY-MM-DD'),
          end: dayjs(datePickerValue.end.toString()).format('YYYY-MM-DD'),
        }

        setFilters((prev: filtersType) => ({...prev, dateRange: mappedDate }))
      }}
    />
  );
}