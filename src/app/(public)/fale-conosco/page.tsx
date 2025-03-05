import { Button } from "@/components/ui/button";
import Image from "next/image";
import { IoLogoWhatsapp } from "react-icons/io5";

export default function TalkToUs() {
  return (
    <main className="bg-zinc-100 w-full h-[calc(100vh-var(--header-height))] flex gap-10 items-start pt-[10%] justify-start px-default">
      <div className="w-1/2 gap-10 flex flex-col items-start">
        <h1 className="text-4xl leading-snug text-left text-cyan-950 font-semibold">
          Fale conosco!
          <br />
          A nossa equipe de vendas
          <br />
          terá o prazer de atender você!
        </h1>
        <p className="w-1/2 text-base text-zinc-600">
          Clique em iniciar conversa e você será direcionado para falar com um
          de nossos atendentes.
        </p>
      </div>
      <div className="w-64 h-64 flex flex-col gap-10 items-center justify-center">
        <div className="w-28 h-28 p-3 shadow-sm border border-zinc-200 box-border flex items-center justify-center rounded-full bg-white">
          <Image
            className="w-full h-auto"
            src="/assets/logo.png"
            width={150}
            height={150}
            title="Wetterlab"
            alt="Wetterlab"
          />
        </div>

        <Button variant="outline">
          Iniciar conversa <IoLogoWhatsapp color="green" />
        </Button>
      </div>
    </main>
  );
}
