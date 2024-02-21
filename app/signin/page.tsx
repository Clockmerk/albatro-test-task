"use client";
import Image from "next/image";
import Link from "next/link";
import img from "../../public/images/up-arrow.png";
import { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function SignIn() {
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const response = await signIn('credentials', {
      email: formData.get('email'),
      password: formData.get('password'),
      redirect: false,
    });

    if (!response?.error) {
      router.push('/');
      router.refresh();
    }
  };
  return (
    <>
      <div className="flex flex-col min-h-screen items-center justify-center">
        <form
          onSubmit={handleSubmit}
          autoComplete="on"
          className="flex flex-col justify-center items-center  h-full w-[430px] bg-white p-14 rounded-lg *:mt-8 *:w-full"
        >
          <div className="flex flex-col items-center font-medium mb-11">
            <Image src={img} width={45} height={45} alt="Arrow" />
            <p className="text-3xl text-[#0494c4]">Sign In</p>
          </div>

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
            <label className="ml-3 text-[#b1b1b1]" htmlFor="checkbox">
              Keep me signed in
            </label>
          </div>
          <button className="bg-[#0298c9] w-full h-[50px] rounded-full text-white">
            SIGN IN
          </button>
          <Link href="/" className="text-sm text-center text-[#b1b1b1]">
            Forgot Password?
          </Link>
        </form>
        <p className="text-sm text-white mt-11 ">
          Not a Member? <Link href="/signup">Sign Up</Link>
        </p>
      </div>
    </>
  );
}
