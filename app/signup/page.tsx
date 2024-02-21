"use client";
import Image from "next/image";
import Link from "next/link";
import img from "../../public/images/up-arrow.png";

export default function SignUp() {


  return (
    <>
      <div className="flex flex-col min-h-screen items-center justify-center">
        <form
          autoComplete="on"
          className="flex flex-col items-center h-full w-[430px] bg-white p-14 rounded-lg *:mt-8 *:w-full"
        >
          <div className="flex flex-col items-center font-medium">
            <Image src={img} width={45} height={45} alt="Arrow" />
            <p className="text-3xl text-[#0494c4]">Sign Up</p>
          </div>

          <input name="email" type="email" placeholder="email" required></input>
          <input
            name="password"
            type="password"
            placeholder="password"
            required
          ></input>
          <input name="text" type="text" placeholder="role" required></input>
          <button className="bg-[#0298c9] w-full h-[50px] rounded-full text-white">
            SIGN UP
          </button>
        </form>
        <p className="text-sm text-white mt-11">
          Already a Member? <Link href="/signin">Sign In</Link>
        </p>
      </div>
    </>
  );
}
