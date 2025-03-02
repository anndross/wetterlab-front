import { Switch } from "@/components/ui/switch";
import { useDashStore } from "@/modules/dashboard/store";

export function ToggleStatistics() {
  const {
    params: { enableStatistics },
    setParams,
  } = useDashStore();

  return (
    <div className="h-full flex flex-col items-start justify-start gap-2 p-1">
      <label
        className="block subpixel-antialiased text-small group-data-[required=true]:after:content-['*'] group-data-[required=true]:after:text-danger group-data-[required=true]:after:ml-0.5 group-data-[invalid=true]:text-danger w-full text-foreground"
        htmlFor="statistics"
      >
        Estatísticas
      </label>
      <Switch
        className="data-[state=checked]:bg-main"
        checked={enableStatistics}
        onCheckedChange={() =>
          setParams({ enableStatistics: !enableStatistics })
        }
        id="statistics"
      />
    </div>
  );
}
