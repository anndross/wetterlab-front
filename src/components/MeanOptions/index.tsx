import { useContext, useEffect } from "react";
import DashboardContext from "@/app/(private)/dashboard/context";
import { Button } from "../ui/button";

export function MeanOptions() {
  const { params, setParams } = useContext(DashboardContext);
  const { mean } = params;

  useEffect(() => {
    setParams((prev: any) => ({
      ...prev,
      mean: 1,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelectPeriod = (value: number) =>
    setParams((prev: any) => ({
      ...prev,
      mean: value,
    }));
  const markSelectedOption = (value: number) => {
    if (mean == value) return "default";

    return "outline";
  };

  return (
    <div className="flex flex-col gap-2 justify-end">
      <span className="block subpixel-antialiased text-small group-data-[required=true]:after:content-['*'] group-data-[required=true]:after:text-danger group-data-[required=true]:after:ml-0.5 group-data-[invalid=true]:text-danger w-full text-foreground">
        Médias
      </span>
      <div className="flex gap-2">
        <Button
          className="min-w-10 w-10"
          onClick={() => handleSelectPeriod(1)}
          variant={markSelectedOption(1)}
          title="Média de 1 dia"
        >
          1d
        </Button>
        <Button
          className="min-w-10 w-10"
          onClick={() => handleSelectPeriod(7)}
          variant={markSelectedOption(7)}
          title="Média de 7 dias"
        >
          7d
        </Button>
        <Button
          className="min-w-10 w-10"
          onClick={() => handleSelectPeriod(15)}
          variant={markSelectedOption(15)}
          title="Média de 15 dias"
        >
          15d
        </Button>
        <Button
          className="min-w-10 w-10"
          onClick={() => handleSelectPeriod(30)}
          variant={markSelectedOption(30)}
          title="Média de 30 dias"
        >
          30d
        </Button>
      </div>
    </div>
  );
}
