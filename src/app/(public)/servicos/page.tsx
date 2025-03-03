import { Button } from "@/components/ui/Button";
import { Carousel } from "@/components/ui/Carousel";
import Image from "next/image";

export default function Services() {
  return (
    <main className="w-full min-h-screen p">
      <section className="w-full h-[calc(100vh-80px)]">
        <Carousel
          slides={[<div className="h-full w-full bg-red-700" key={0} />]}
        />
      </section>

      <div className="flex flex-col gap-28 py-16 px-default">
        <section className="flex flex-col gap-10">
          <div className="w-full flex flex-col items-start gap-4">
            <h2 className="text-xl w-1/2 font-semibold text-cyan-600">
              Mia Energia: conheça nossa solução
            </h2>
            <h3 className="text-5xl w-full font-semibold text-cyan-950">
              Transforme as mudanças climáticas em oportunidades de mercado
            </h3>
          </div>

          <p className="text-sm font-normal text-zinc-600 w-3/4">
            As mudanças climáticas afetam o mercado de energia em todo o mundo,
            causando mudanças na demanda, produção e preços de energia. Empresas
            desse setor precisam estar atentos a essas mudanças e tomar medidas
            para se adaptar frente às mudanças nas condições do mercado, por
            isso, o MIA Energia é perfeito para você.
          </p>

          <div className="w-full grid grid-cols-4 gap-14 mt-8">
            <div className="flex items-center gap-6 max-w-60">
              <Image
                src="/assets/connected.png"
                width={60}
                height={60}
                alt="Demanda de energia"
                title="Demanda de energia"
              />
              <p className="text-sm font-normal text-zinc-600">
                Aumento da demanda de energia
              </p>
            </div>
            <div className="flex items-center gap-6 max-w-60">
              <Image
                src="/assets/connected.png"
                width={60}
                height={60}
                alt="Demanda de energia"
                title="Demanda de energia"
              />
              <p className="text-sm font-normal text-zinc-600">
                Aumento da demanda de energia
              </p>
            </div>
            <div className="flex items-center gap-6 max-w-60">
              <Image
                src="/assets/connected.png"
                width={60}
                height={60}
                alt="Demanda de energia"
                title="Demanda de energia"
              />
              <p className="text-sm font-normal text-zinc-600">
                Aumento da demanda de energia
              </p>
            </div>
            <div className="flex items-center gap-6 max-w-60">
              <Image
                src="/assets/connected.png"
                width={60}
                height={60}
                alt="Demanda de energia"
                title="Demanda de energia"
              />
              <p className="text-sm font-normal text-zinc-600">
                Aumento da demanda de energia
              </p>
            </div>
            <div className="flex items-center gap-6 max-w-60">
              <Image
                src="/assets/connected.png"
                width={60}
                height={60}
                alt="Demanda de energia"
                title="Demanda de energia"
              />
              <p className="text-base font-normal text-zinc-700">
                Aumento da demanda de energia
              </p>
            </div>

            <div className="flex items-center gap-6 max-w-60">
              <Image
                src="/assets/connected.png"
                width={60}
                height={60}
                alt="Demanda de energia"
                title="Demanda de energia"
              />
              <p className="text-base font-normal text-zinc-700">
                Aumento da demanda de energia
              </p>
            </div>

            <div className="flex items-center gap-6 max-w-60">
              <Image
                src="/assets/connected.png"
                width={60}
                height={60}
                alt="Demanda de energia"
                title="Demanda de energia"
              />
              <p className="text-base font-normal text-zinc-700">
                Aumento da demanda de energia
              </p>
            </div>
          </div>

          <div className="w-56 mt-8">
            <Button>Faça um teste</Button>
          </div>
        </section>

        <section className="flex justify-between gap-14">
          <div className="w-1/2 flex flex-col gap-6">
            <h2 className="text-3xl font-semibold text-cyan-950">
              Mia Energia: maximizando eficiência e reduzindo custos
            </h2>
            <p className="text-sm font-normal text-zinc-600 w-full">
              Com previsões de longo alcance, as empresas de energia podem
              ajustar a produção de energia para maximizar o uso de fontes
              renováveis, como a energia solar e eólica, quando as condições
              climáticas são favoráveis. As previsões ainda ajudam a prever a
              demanda, permitindo que você ajuste sua produção para atender às
              necessidades dos consumidores com mais eficiência.{" "}
            </p>
          </div>
          <Image
            className="w-1/2 h-auto rounded-md"
            src="/assets/energy-industry.png"
            width={600}
            height={600}
            alt="Indústrias de energia"
            title="Indústrias de energia"
          />
        </section>

        <section className="flex justify-between gap-8">
          <Image
            className="w-1/2 h-auto"
            src="/assets/chart.png"
            width={861}
            height={513}
            alt="Gráfico mia acuracia"
            title="Gráfico mia acuracia"
          />
          <Image
            className="w-1/2 h-auto"
            src="/assets/box-plot.png"
            width={861}
            height={513}
            alt="Gráfico mia vento parque"
            title="Gráfico mia vento parque"
          />
        </section>
      </div>
    </main>
  );
}
