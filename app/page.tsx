"use client";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  return (
    <>
      {session && (
        <div>
          <p>Добро пожаловать в кабинет</p>
          <p>Ваш email: {session?.user?.email}</p>
        </div>
      )}
      {!session && <div>Войдите или зарегистрируйтесь</div>}
    </>
  );
}
