import Image from "next/image";
import { FaUser } from "react-icons/fa";
import { IoLockClosed } from "react-icons/io5";

export default function Login() {
    return (
        <div className="relative flex flex-col justify-center h-screen overflow-hidden">
            <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-lg flex flex-col items-center justify-center gap-6">
                <Image src="/assets/logo.png" width={200} height={200} alt="Wetterlab" title="Wetterlab" />

                <p className="text-gray-600 text-base">Não tem uma conta? <a className="text-cyan-700 no-underline" href="#">Crie agora</a>, leva apenas alguns cliques.</p>
                <form className="space-y-4 w-full">
                    <div>
                        <label className="label" htmlFor="login-email">
                            <span className="text-base label-text">Email</span>
                        </label>
                        <div className="flex h-9">
                            <div className="h-full w-10 border flex items-center justify-center">
                                <FaUser />
                            </div>
                            <input type="email" className="w-full h-full input input-bordered rounded-none input-primary bg-white" id="login-email" />
                        </div>                    
                    </div>

                    <div>
                        <label className="label" htmlFor="login-password">
                            <span className="text-base label-text">Senha</span>
                        </label>
                        <div className="flex h-9">
                            <div className="h-full w-10 border flex items-center justify-center">
                                <IoLockClosed />
                            </div>
                            <input type="password" className="w-full h-full input input-bordered rounded-none input-primary bg-white" id="login-password" />
                        </div>
                    </div>
                    <a href="#" className="text-xs text-gray-600 hover:underline hover:text-blue-600">Forget Password?</a>
                    <div>
                        <button className="btn btn-primary">Login</button>
                    </div>
                </form>
            </div>
        </div>
    )
}