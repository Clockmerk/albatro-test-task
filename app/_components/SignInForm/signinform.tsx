"use client";
import Image from "next/image";
import Link from "next/link";
import img from "../../_assets/images/up-arrow.png";
import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import ModalError from "../ModalError/modalerror";

export default function SignInForm() {
  const [error, setError] = useState("");
  const [modal, setModal] = useState(false);
  const router = useRouter()

  if(modal) {
    setTimeout(() => setModal(false), 5000)
  }
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const response = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });
    
    if (!response?.error) {
      router.push("/");
      router.refresh();
    } else {
      setError(response.error);
      setModal(true)
    }
  };

    return (
        <>
        <div className="flex flex-col min-[1024px]:w-[430px] bg-white rounded-lg max-[768px]:mt-16 max-[320px]:w-[90%]">
          <div className="flex flex-col items-center font-[400] mt-14">
            <Image src={img} width={40} height={40} alt="Arrow" />
            <p className="text-3xl text-[#0494c4]">Sign In</p>
          </div>
          <form
            onSubmit={handleSubmit}
            autoComplete="on"
            className="flex flex-col justify-center items-center w-full p-14 max-[320px]:p-8 max-[376px]:p-10 rounded-lg *:mt-8 *:w-full"
          >
            <input name="email" type="email" placeholder="email" required></input>
            <input
              name="password"
              type="password"
              placeholder="password"
              required
            ></input>
            <div className="w-[90%] flex items-center">
              <input
                id="checkbox"
                type="checkbox"
                className="border-1 border-[#ffffff00]"
              ></input>
              <span className="check"></span>
              <label className="ml-3 text-[#b1b1b1]" htmlFor="checkbox">
                Keep me signed in
              </label>
            </div>
            <button className="bg-[#0298c9] w-full h-[50px] rounded-full text-white">
              SIGN IN
            </button>
            <Link href="/" className="text-sm text-center text-[#b1b1b1] min-[321px]:mb-[-20px]">
              Forgot Password?
            </Link>
          </form>
        </div>
        <p className="text-sm text-white mt-11 max-[768px]:mt-4 ">
          Not a Member? <Link href="/signup" className="hover:text-[white] hover:underline">
            Sign up
          </Link>
        </p>
        {modal && <ModalError error={error}/>}
      </>
    )
}