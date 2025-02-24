import Image from "next/image";
import { FaUser } from "react-icons/fa";
import { AuthAction } from "@/app/(public)/actions/auth";
import { FormButton } from "@/components/ui/FormButton";

export default function Login() {
  return (
    <div className="relative flex flex-col justify-center h-screen overflow-hidden bg-gray-300">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-md md:max-w-lg flex flex-col items-center justify-center gap-6">
        <Image
          src="/assets/logo.png"
          width={200}
          height={200}
          alt="Wetterlab"
          title="Wetterlab"
        />

        <form className="space-y-4 w-full" action={AuthAction}>
          <div>
            <label className="label" htmlFor="login-email">
              <span className="text-base label-text">Email</span>
            </label>
            <div className="flex h-9">
              <div className="h-full w-10 border flex items-center justify-center">
                <FaUser color="#7f7f7f" />
              </div>
              <input
                type="email"
                name="email"
                className="text-black w-full h-full input input-bordered rounded-none input-primary bg-white"
                required
                id="login-email"
                placeholder="company@domain.com"
              />
            </div>
          </div>

          {/* <div>
                        <label className="label" htmlFor="login-password">
                            <span className="text-base label-text">Senha</span>
                        </label>
                        <div className="flex h-9">
                            <div className="h-full w-10 border flex items-center justify-center">
                                <IoLockClosed />
                            </div>
                            <input type="password" className="w-full h-full input input-bordered rounded-none input-primary bg-white" id="login-password" />
                        </div>
                    </div> */}
          <div className="mt-4 w-full">
            <FormButton>Login</FormButton>
          </div>
        </form>
      </div>
    </div>
  );
}
