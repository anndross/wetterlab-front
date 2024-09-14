import { Button } from "@/components/Button";
import { Carousel } from "@/components/Carousel";
import Image from "next/image";

export default function Services() {
    return (
        <main className="w-full min-h-screen p">
            <section className="w-full h-[calc(100vh-80px)]">
                <Carousel
                    slides={[
                        <div className="h-full w-full bg-red-700" key={0} />
                    ]}
                />
            </section>

            <div className="flex flex-col gap-28 py-16 px-[5%]">
                <section className="flex flex-col gap-8">
                    <p className="text-base font-semibold text-zinc-700">Mia Energia: conheça nossa solução</p>
                    <h2 className="text-3xl font-semibold text-zinc-700">Transforme as mudanças climáticas em oportunidades de mercado</h2>
                    <p className="text-sm font-normal text-zinc-700 w-3/4">As mudanças climáticas afetam o mercado de energia em todo o mundo, causando mudanças na demanda, produção e preços de energia. Empresas desse setor precisam estar atentos a essas mudanças e tomar medidas para se adaptar frente às mudanças nas condições do mercado, por isso, o MIA Energia é perfeito para você.</p>

                    <div className="flex gap-x-32 gap-y-10 flex-wrap mt-4">
                        <div className="flex items-center gap-6 max-w-60">
                            <Image src="/assets/connected.png" width={60} height={60} alt="Demanda de energia" title="Demanda de energia"/>
                            <p className="text-base font-normal text-zinc-700">Aumento da demanda de energia</p>
                        </div>

                        <div className="flex items-center gap-6 max-w-60">
                            <Image src="/assets/connected.png" width={60} height={60} alt="Demanda de energia" title="Demanda de energia"/>
                            <p className="text-base font-normal text-zinc-700">Aumento da demanda de energia</p>
                        </div>
  
                        <div className="flex items-center gap-6 max-w-60">
                            <Image src="/assets/connected.png" width={60} height={60} alt="Demanda de energia" title="Demanda de energia"/>
                            <p className="text-base font-normal text-zinc-700">Aumento da demanda de energia</p>
                        </div>
  
                        <div className="flex items-center gap-6 max-w-60">
                            <Image src="/assets/connected.png" width={60} height={60} alt="Demanda de energia" title="Demanda de energia"/>
                            <p className="text-base font-normal text-zinc-700">Aumento da demanda de energia</p>
                        </div>
                    </div>

                    <div className="w-56 mt-8">
                        <Button variant="secondary">Faça um teste</Button>
                    </div>
                </section>

                <section className="flex justify-between gap-8">
                    <div className="w-1/2 flex flex-col gap-6">
                        <h2 className="text-3xl font-semibold text-zinc-700">Mia Energia: maximizando eficiência e reduzindo custos</h2>
                        <p className="text-sm font-normal text-zinc-700 w-3/4">Com previsões de longo alcance, as empresas de energia podem ajustar a produção de energia para maximizar o uso de fontes renováveis, como a energia solar e eólica, quando as condições climáticas são favoráveis. As previsões ainda ajudam a prever a demanda, permitindo que você ajuste sua produção para atender às necessidades dos consumidores com mais eficiência. </p>
                    </div>
                    <Image className="w-1/2 h-auto rounded-md" src="/assets/energy-industry.png" width={600} height={600} alt="Indústrias de energia" title="Indústrias de energia"/>
                </section>

                <section className="flex justify-between gap-8">
                    <Image className="w-1/2 h-auto" src="/assets/dash-image.png" width={600} height={600} alt="Gráfico mia acuracia" title="Gráfico mia acuracia" />
                    <Image className="w-1/2 h-auto" src="/assets/dash-image-2.png" width={600} height={600} alt="Gráfico mia vento parque" title="Gráfico mia vento parque" />
                </section>
            </div>
        </main>
    )
}