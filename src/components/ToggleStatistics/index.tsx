import { useContext } from "react";
import { Switch } from "../ui/switch";
import DashboardContext from "@/app/(private)/dashboard/context";

export function ToggleStatistics() {
  const { toggleStatistics, setToggleStatistics } =
    useContext(DashboardContext);

  return (
    <div className="h-full flex flex-col items-start justify-start gap-2 mt-2">
      <label
        className="block subpixel-antialiased text-small group-data-[required=true]:after:content-['*'] group-data-[required=true]:after:text-danger group-data-[required=true]:after:ml-0.5 group-data-[invalid=true]:text-danger w-full text-foreground"
        htmlFor="airplane-mode"
      >
        Estatísticas
      </label>
      <Switch
        checked={toggleStatistics}
        onCheckedChange={() => setToggleStatistics((prev) => !prev)}
        id="airplane-mode"
      />
    </div>
  );
}
