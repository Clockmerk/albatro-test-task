import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";

export default async function Home() {
  const session = await getServerSession()
  return (
    <>
      {session && (
        <div className="bg-white rounded p-6 text-center">
          <p>Добро пожаловать в кабинет.</p>
          <p>Ваш email: {session?.user?.email}</p>
        </div>
      )}
      {!session && <div className="bg-white rounded p-6 text-center">Войдите или зарегистрируйтесь.</div>}
    </>
  );
}
