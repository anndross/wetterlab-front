import { Button } from "@nextui-org/button";
import { useContext, useEffect } from "react";
import ParamsContext from "@/app/dashboard/context";

export function MeanOptions() {
  const { params, setParams } = useContext(ParamsContext);
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
    if (mean == value) return "primary";

    return "default";
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
          color={markSelectedOption(1)}
          title="Média de 1 dia"
        >
          1
        </Button>
        <Button
          className="min-w-10 w-10"
          onClick={() => handleSelectPeriod(7)}
          color={markSelectedOption(7)}
          title="Média de 7 dias"
        >
          7
        </Button>
        <Button
          className="min-w-10 w-10"
          onClick={() => handleSelectPeriod(15)}
          color={markSelectedOption(15)}
          title="Média de 15 dias"
        >
          15
        </Button>
        <Button
          className="min-w-10 w-10"
          onClick={() => handleSelectPeriod(30)}
          color={markSelectedOption(30)}
          title="Média de 30 dias"
        >
          30
        </Button>
      </div>
    </div>
  );
}
