import Image from "next/image";
import Link from "next/link";

export function Footer() {
    return (
        <footer className="w-full h-fit flex flex-col justify-center gap-8 px-[5%] py-8 bg-slate-900 text-white">
            <div className="w-full flex md:flex-row md:justify-between md:gap-20 items-start flex-col gap-8">
                <Image src="/assets/logo.png" width={200} height={200} alt="Wetterlab" title="Wetterlab" />

                <div className="w-full flex justify-between md:gap-20 gap-8 md:border-0 border-t-2 border-slate-800 pt-8 md:pt-0">
                    <ul className="">
                        <li className="whitespace-nowrap text-base"><Link href="/sobre">Sobre</Link></li> 
                        <li className="whitespace-nowrap text-base"><Link href="/como-funciona">Como funciona</Link></li> 
                        <li className="whitespace-nowrap text-base"><Link href="/servicos">Serviços</Link></li> 
                        <li className="whitespace-nowrap text-base"><Link href="/banco-de-talentos">Banco de talentos</Link></li>
                        <li className="whitespace-nowrap text-base"><Link href="/contato">Contato</Link></li>
                    </ul>

                    <div className="w-full flex md:justify-between md:gap-20 md:flex-row flex-col gap-5">
                        <ul className="">
                            <li className="text-base">Endereço: Rua exemplo, 000 - Sala 000 - Bairro exemplo, São Paulo - SP, 0000-000</li> 
                        </ul>                

                        <div>
                            <p className="text-base">Siga o nosso perfil nas redes sociais</p>

                            <div className="">
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full flex justify-between gap-8 border-t-2 border-slate-800 pt-8">
                <p className="text-base">Wetterlab Tecnologia em Metereologia Ltda. CNPJ: 00.000.000/0000-00</p>
                <p className="text-base">© Copyright 2024 Wetterlab- Todos os direitos reservados.</p> 
            </div>
        </footer>
    )
} 