import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Mean, useDashStore } from "@/modules/dashboard/store";
import clsx from "clsx";

export function MeanOptions() {
  const { params, setParams } = useDashStore();
  const { mean } = params;

  useEffect(() => {
    setParams({
      mean: 1,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelectPeriod = (value: Mean) =>
    setParams({
      mean: value,
    });

  const markSelectedOption = (value: number) => {
    if (mean == value) return "bg-main text-white hover:bg-main";

    return "bg-white";
  };

  return (
    <div className="flex flex-col gap-2 justify-end">
      <span className="block subpixel-antialiased text-small group-data-[required=true]:after:content-['*'] group-data-[required=true]:after:text-danger group-data-[required=true]:after:ml-0.5 group-data-[invalid=true]:text-danger w-full text-foreground">
        Médias
      </span>
      <div className="flex gap-2">
        <Button
          className={clsx("min-w-10 w-10", markSelectedOption(1))}
          onClick={() => handleSelectPeriod(1)}
          variant="outline"
          title="Média de 1 dia"
        >
          1d
        </Button>
        <Button
          className={clsx("min-w-10 w-10", markSelectedOption(7))}
          onClick={() => handleSelectPeriod(7)}
          variant="outline"
          title="Média de 7 dias"
        >
          7d
        </Button>
        <Button
          className={clsx("min-w-10 w-10", markSelectedOption(15))}
          onClick={() => handleSelectPeriod(15)}
          variant="outline"
          title="Média de 15 dias"
        >
          15d
        </Button>
        <Button
          className={clsx("min-w-10 w-10", markSelectedOption(30))}
          onClick={() => handleSelectPeriod(30)}
          variant="outline"
          title="Média de 30 dias"
        >
          30d
        </Button>
      </div>
    </div>
  );
}
