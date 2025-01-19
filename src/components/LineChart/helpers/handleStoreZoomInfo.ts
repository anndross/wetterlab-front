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
  const zoomYElement = document.getElementById("zoom-y");
  if (!zoomXElement || !zoomYElement) return;

  const {
    range: [date1, date2],
  } = data.layout.xaxis;
  const {
    range: [value1, value2],
  } = data.layout.yaxis;

  zoomXElement.textContent =
    date1 && date2
      ? `${dayjs(date1).format("DD/MM/YYYY")} - ${dayjs(date2).format(
          "DD/MM/YYYY"
        )}`
      : "não aplicado";
  zoomYElement.textContent =
    value1 && value2
      ? `${value1.toFixed(2)} - ${value2.toFixed(2)}`
      : "não aplicado";
};
