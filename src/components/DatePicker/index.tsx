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

  const defaultStartDate = "2019-01-01"
  const defaultEndDate = "2019-02-08"


  useEffect(() => {
    setFilters((prev: filtersType) => ({
      ...prev,
      dateRange: {
        start: defaultStartDate,
        end: defaultEndDate,
      }
    }))

  }, [])

  return (
    <DateRangePicker
      label="Período"
      labelPlacement="inside"
      defaultValue={{
        start: parseDate(defaultStartDate),
        end: parseDate(defaultEndDate),
      }}
      className="w-full"
      granularity="day"
      hideTimeZone
      // minValue={parseDate("2024-09-11")}
      // maxValue={parseDate("2024-09-13")}
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