"use client";
import Image from "next/image";
import Link from "next/link";
import img from "../../_assets/images/up-arrow.png";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ModalError from "../ModalError/modalerror";
import { signIn } from "next-auth/react";
import ModalSuccess from "../ModalSuccess/modalsuccess";
import { yupResolver } from "@hookform/resolvers/yup"
import { SubmitHandler, useForm } from "react-hook-form"
import { FormSignUpT } from "../../_constants/types";
import { schema } from "../../_constants/schema";

export default function SignUpForm() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [modalE, setModalE] = useState(false);
  const [modalS, setModalS] = useState(false);
  const router = useRouter();

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
  });

  if (modalE) {
    setTimeout(() => setModalE(false), 10000);
  }

  useEffect(() => {
    setTimeout(() => setModalS(false), 3000);
    if (!modalS && success) {
      router.push("/");
      router.refresh();
    }
  }, [modalS, router, success]);

  const onSubmit: SubmitHandler<FormSignUpT> = async (data) => {
    try {
      const response = await fetch(
        `https://jwt-bearer-auth1.p.rapidapi.com/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-RapidAPI-Key":
              "4784a1a94bmsh302f4d201e222bep1d6334jsn1ecde5ce575d",
            "X-RapidAPI-Host": "jwt-bearer-auth1.p.rapidapi.com",
          },
          body: JSON.stringify({...data}),
        }
      );
      if (response.ok) {
        //const data = await response.json(); Backend не имеет ответа в формате JSON
        const res = await signIn("credentials", {
          email: data.email,
          password: data.password,
          redirect: false,
        });
        if (!res?.error) {
          setSuccess("Успешная регистрация, авторизируемся...");
          setModalS(true);
        }
      }
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.errors);
      }
    } catch (error) {
      const { message } = (await error) as Error;
      setError(message);
      setModalE(true);
    }
  }

  return (
    <>
      <div className="flex flex-col min-[1024px]:w-[430px] bg-white rounded-lg maxmax-[768px]:mt-16 max-[320px]:w-[90%]">
        <div className="flex flex-col items-center font-[400] mt-14">
          <Image src={img} width={40} height={40} alt="Arrow" />
          <p className="text-3xl text-[#0494c4]">Sign Up</p>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          autoComplete="on"
          className="flex flex-col justify-center items-center w-full p-14 max-[320px]:p-8 max-[376px]:p-10 rounded-lg *:mt-8 *:w-full"
          noValidate
        >
          <input {...register("email")} type="email" placeholder="email" required></input>
          <p className="formErrors">{errors.email?.message}</p>
          <input
            {...register("password")}
            type="password"
            placeholder="password"
            required
          ></input>
          <p className="formErrors">{errors.password?.message}</p>
          <input {...register("role")} type="text" placeholder="role" required></input>
          <p className="formErrors">{errors.role?.message}</p>

          <button type="submit" className="bg-[#0298c9] w-full h-[50px] rounded-full text-white">
            SIGN UP
          </button>
        </form>
      </div>
      <p className="text-sm text-white mt-11 max-[768px]:mt-4 ">
        Already a Member?{" "}
        <Link href="/signin" className="hover:text-[white] hover:underline">
          Sign in
        </Link>
      </p>
      {modalE && <ModalError error={error} />}
      {modalS && <ModalSuccess text={success} />}
    </>
  );
}
