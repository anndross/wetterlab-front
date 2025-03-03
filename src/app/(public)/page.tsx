import { Carousel } from "@/components/ui/Carousel";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <main className="flex flex-col">
      <section className="w-full h-[calc(100vh-var(--header-height))]">
        <Carousel
          slides={[
            <div className="h-full w-full bg-zinc-300" key={0} />,
            <div className="h-full w-full bg-red-700" key={1} />,
            <div className="h-full w-full bg-black" key={2} />,
            <div className="h-full w-full bg-blue-700" key={3} />,
          ]}
        />
      </section>

      <section className="w-full h-auto flex px-default py-16 justify-between gap-9 flex-wrap md:flex-nowrap">
        <div className="h-full w-auto flex flex-col gap-4">
          <h2 className="text-2xl font-semibold text-cyan-950">
            Institucional
          </h2>
          <p className="text-sm font-light text-zinc-700">
            Lorem Ipsum is simply dummy text of the printing and typesetting
          </p>
        </div>
        <div className="h-full w-auto flex flex-col gap-4">
          <h2 className="text-2xl font-semibold text-cyan-950">
            Soluções Energia
          </h2>
          <p className="text-sm font-light text-zinc-700">
            Lorem Ipsum is simply dummy text of the printing and typesetting
          </p>
        </div>
        <div className="h-full w-auto flex flex-col gap-4">
          <h2 className="text-2xl font-semibold text-cyan-950">
            Soluções Agro
          </h2>
          <p className="text-sm font-light text-zinc-700">
            Lorem Ipsum is simply dummy text of the printing and typesetting
          </p>
        </div>
      </section>

      <div className="w-full px-default">
        <Separator className="bg-zinc-300 my-6" />
      </div>

      <section className="w-full flex px-default py-16 justify-between items-center gap-5">
        <div className="flex flex-col gap-16">
          <div className="flex gap-4 items-center">
            {/* <Image
              src="/assets/light-bulb.png"
              width={60}
              height={60}
              alt="AGRO/ENERGIA"
              title="AGRO/ENERGIA"
            /> */}
            <div className="max-w-72 flex flex-col gap-2">
              <h2 className="text-2xl font-semibold text-cyan-950">
                Previsões AGRO/ENERGIA
              </h2>

              <p className="text-base text-zinc-600">
                Lorem Ipsum is simply dummy text of the printing and typesetting
              </p>
            </div>
          </div>
          <div className="flex gap-4 items-center">
            {/* <Image
              src="/assets/hands.png"
              width={60}
              height={60}
              alt="Indice climático"
              title="Indice climático"
            /> */}
            <div className="max-w-72 flex flex-col gap-2">
              <h2 className="text-2xl font-semibold text-cyan-950">
                Indice climático
              </h2>

              <p className="text-base text-zinc-600">
                Lorem Ipsum is simply dummy text of the printing and typesetting
              </p>
            </div>
          </div>
          <div className="flex gap-4 items-center">
            {/* <Image
              src="/assets/gears.png"
              width={60}
              height={60}
              alt="Energia"
              title="Energia"
            /> */}
            <div className="max-w-72 flex flex-col gap-2">
              <h2 className="text-2xl font-semibold text-cyan-950">
                Dados históricos
              </h2>

              <p className="text-base text-zinc-600">
                Lorem Ipsum is simply dummy text of the printing and typesetting
              </p>
            </div>
          </div>
        </div>
        <Image
          src="/assets/new-chart.png"
          className="w-[50%] h-auto"
          width={861}
          height={513}
          alt=""
          title=""
        />
      </section>

      <div className="w-full px-default">
        <Separator className="bg-zinc-300 my-6" />
      </div>

      <SectionCards />

      <div className="w-full px-default">
        <Separator className="bg-zinc-300 my-6" />
      </div>

      <section className="flex flex-col justify-center items-start px-default py-20">
        <div className="w-1/2 flex flex-col gap-8">
          <h2 className="text-5xl text-cyan-950 font-bold">Sobre a empresa </h2>
        </div>

        <div className="mt-14">
          <p className="text-base text-zinc-600">
            Contrary to popular belief, Lorem Ipsum is not simply random text.
            It has roots in a piece of classical Latin literature from 45 BC,
            making it over 2000 years old. Richard McClintock, a Latin professor
            at Hampden-Sydney College in Virginia, looked up one of the more
            obscure Latin words, consectetur, from a Lorem Ipsum passage, and
            going through the cites of the word in classical literature,
            discovered the undoubtable source. Lorem Ipsum comes from sections
            treatise on the theory of ethics, very popular during the comes from
            a line in section 1.10.32.
          </p>
        </div>
      </section>
    </main>
  );
}

interface CardProps {
  image: {
    url: string;
    alt: string;
    title: string;
  };
  title: string;
  description: string;
}

function SectionCards() {
  const Card = ({ image, title, description }: CardProps) => {
    return (
      <div className="w-full h-auto gap-6 pb-6 flex flex-col p-2 border shadow-md bg-white hover:-translate-y-4 hover:shadow-2xl duration-500 rounded-md">
        <Image
          className="w-full object-cover max-h-[350px] rounded-t-sm"
          src={image.url}
          width={626}
          height={428}
          alt={image.alt}
          title={image.title}
        />
        <div className="w-full p-6 flex flex-col items-start gap-4">
          <h2 className="text-2xl font-semibold text-cyan-950">{title}</h2>

          <p className="text-base text-zinc-600">{description}</p>
        </div>
      </div>
    );
  };

  return (
    <section className="flex flex-col justify-center items-start px-default py-20 gap-2">
      <div className="w-1/2 flex flex-col gap-8">
        <h2 className="text-5xl text-cyan-950 font-bold">
          Caracteristicas do Produto
        </h2>
        <p className="w-full text-base font-normal text-zinc-700">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>

      <div className="grid grid-cols-2 mt-14 gap-6">
        <div className="flex flex-col gap-6 mt-10">
          <Card
            image={{
              url: "/assets/new-energy.png",
              alt: "",
              title: "",
            }}
            title="Energia"
            description="A Wetterlab desenvolve modelos preditivos de geração eólica e hidrelétrica com alcance temporal, refinamento espacial e acurácia muito superiores ao mercado."
          />
          <Card
            image={{
              url: "/assets/p&d.png",
              alt: "",
              title: "",
            }}
            title="P&D"
            description="Realizamos projetos de pesquisa e desenvolvimento em setores
                dependentes do clima como agricultura, energia e planejamento
                urbano."
          />
        </div>

        <div className="flex flex-col gap-6 -mt-10">
          <Card
            image={{
              url: "/assets/agro.png",
              alt: "",
              title: "",
            }}
            title="Agronegócio"
            description="Além de dados meteorológicos essenciais para o setor, entregamos
                mapas exclusivos de temperatura, chuva e chance de geada com 30
                metros de resolução espacial."
          />
          <Card
            image={{
              url: "/assets/new-safe.png",
              alt: "",
              title: "",
            }}
            title="Seguros"
            description="Utilizando informação climática de alta precisão e resolução,
          entregamos produtos de risco agrícola e danos à propriedade em
          função de variações do clima."
          />
        </div>
      </div>
    </section>
  );
}
