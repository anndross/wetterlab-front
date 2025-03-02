import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(customParseFormat);
dayjs.extend(utc);
dayjs.extend(timezone);

export const handleStoreZoomInfo = (data: any) => {
  if (typeof document === "undefined") return;

  const zoomXElement = document.getElementById("zoom-x");

  if (!zoomXElement) return;

  const {
    range: [date1, date2],
  } = data?.layout?.xaxis;

  zoomXElement.textContent =
    date1 && date2
      ? `${dayjs(date1).format("DD/MM/YYYY")} - ${dayjs(date2).format(
          "DD/MM/YYYY"
        )}`
      : "não aplicado";
};
