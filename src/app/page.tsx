import { Card } from "@/components/Card";
import { Carousel } from "@/components/Carousel";
import { Header } from "@/components/Header";
import { Typography } from "@/components/Typography";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col pt-20">
      <Header />
      <section className="w-full h-[calc(100vh-80px)]">
        <Carousel
          slides={[
            <div className="h-full w-full bg-zinc-300" key={0} />,
            <div className="h-full w-full bg-red-700" key={1} />,
            <div className="h-full w-full bg-black" key={2} />,
            <div className="h-full w-full bg-blue-700" key={3} />,
          ]}
        />
      </section>

      <section className="w-full flex px-[5%] py-9 justify-between gap-5 flex-wrap md:flex-nowrap">
        <Card.Root>
          <Card.Title>Institucional</Card.Title>
        </Card.Root>

        <Card.Root>
          <Card.Title>Soluções Energia</Card.Title>
        </Card.Root>

        <Card.Root>
          <Card.Title>Soluções Agro</Card.Title>
        </Card.Root>
      </section>

      <section className="w-full flex px-[5%] py-9 justify-between items-center gap-5">
        <div className="flex flex-col gap-16">
          <div className="flex gap-4 items-center">
            <Image
              src="/assets/light-bulb.png"
              width={60}
              height={60}
              alt="AGRO/ENERGIA"
              title="AGRO/ENERGIA"
            />
            <Typography type="h2">
              Previsões <br /> AGRO/ENERGIA
            </Typography>
          </div>
          <div className="flex gap-4 items-center">
            <Image
              src="/assets/hands.png"
              width={60}
              height={60}
              alt="Indice climático"
              title="Indice climático"
            />
            <Typography type="h2">Indice climático</Typography>
          </div>
          <div className="flex gap-4 items-center">
            <Image
              src="/assets/gears.png"
              width={60}
              height={60}
              alt="Energia"
              title="Energia"
            />
            <Typography type="h2">Dados históricos</Typography>
          </div>
        </div>
        <Image
          src="/assets/chart.png"
          className="w-[50%] h-auto"
          width={900}
          height={420}
          alt=""
          title=""
        />
      </section>

      <section className="flex flex-col justify-center items-center px-[5%] py-8">
        <Typography type="h2">Caracteristicas do produto</Typography>
        <Typography type="p">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Typography>

        <div className="grid grid-cols-2 mt-14 gap-6">
          <Card.Root>
            <Card.Icon
              icon={
                <Image
                  src="/assets/energy.png"
                  width={60}
                  height={60}
                  alt="Energia"
                  title="Energia"
                />
              }
            />
            <Card.Title>Energia</Card.Title>
            <Card.Description>
              A Wetter lab desenvolve modelos preditivos de geração eólica e
              hidrelétrica com alcance temporal, refinamento espacial e acurácia
              muito superiores ao mercado.
            </Card.Description>
          </Card.Root>
          <Card.Root>
            <Card.Icon
              icon={
                <Image
                  src="/assets/researches.png"
                  width={60}
                  height={60}
                  alt="P&D"
                  title="P&D"
                />
              }
            />
            <Card.Title>P&D</Card.Title>
            <Card.Description>
              Realizamos projetos de pesquisa e desenvolvimento em setores
              dependentes do clima como agricultura, energia e planejamento
              urbano.{" "}
            </Card.Description>
          </Card.Root>
          <Card.Root>
            <Card.Icon
              icon={
                <Image
                  src="/assets/agribusiness.png"
                  width={60}
                  height={60}
                  alt="Agronegócio"
                  title="Agronegócio"
                />
              }
            />
            <Card.Title>Agronegócio</Card.Title>
            <Card.Description>
              Além de dados meteorológicos essenciais para o setor, entregamos
              mapas exclusivos de temperatura, chuva e chance de geada com 30
              metros de resolução espacial.
            </Card.Description>
          </Card.Root>
          <Card.Root>
            <Card.Icon
              icon={
                <Image
                  src="/assets/safe.png"
                  width={60}
                  height={60}
                  alt="Seguros"
                  title="Seguros"
                />
              }
            />
            <Card.Title>Seguros</Card.Title>
            <Card.Description>
              Utilizando informação climática de alta precisão e resolução,
              entregamos produtos de risco agrícola e danos à propriedade em
              função de variações do clima.{" "}
            </Card.Description>
          </Card.Root>
        </div>
      </section>

      <section className="flex flex-col justify-center items-center px-[5%] py-8 mt-14">
        <Typography type="h2">Sobre a empresa</Typography>
        <Typography type="p">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Typography>

        <div className="mt-14">
          <Card.Root>
            <Card.Description>
              Bem-vindo à WetterLab, onde nossa missão é [descreva a missão da
              empresa]. Fundada em [ano de fundação], temos orgulho de nossa
              trajetória e crescimento contínuo no setor de [setor de atuação].{" "}
            </Card.Description>

            <Card.Description>
              Nosso compromisso é com a excelência e a satisfação de nossos
              clientes. Trabalhamos incansavelmente para fornecer produtos e
              serviços de alta qualidade, inovadores e que atendam às
              necessidades de um mercado em constante evolução.{" "}
            </Card.Description>

            <Card.Description>
              Em WetterLab, acreditamos em [valores e princípios da empresa,
              como integridade, inovação, sustentabilidade, etc.]. Nossa equipe
              dedicada é formada por profissionais talentosos que compartilham
              nossa visão e trabalham juntos para alcançar objetivos comuns.{" "}
            </Card.Description>

            <Card.Description>
              Agradecemos por nos visitar e esperamos que encontre todas as
              informações que precisa sobre nossos produtos e serviços. Se tiver
              alguma dúvida ou precisar de mais informações, não hesite em nos
              contatar.
            </Card.Description>
          </Card.Root>
        </div>
      </section>
    </main>
  );
}
