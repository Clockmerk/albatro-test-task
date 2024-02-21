"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <div className="fixed flex items-center justify-end bg-white w-screen h-10">
      <ul className="flex justify-end *:mr-4">
        {!session && (
          <li>
            <Link href="/">Home</Link>
          </li>
        )}
        {!session && (
          <li>
            <Link href="/signin">Authorization</Link>
          </li>
        )}
        {session && (
          <li>
            <button onClick={() => signOut()}>Sign Out</button>
          </li>
        )}
      </ul>
    </div>
  );
}
