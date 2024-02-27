"use client";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignOutButton() {
  const router = useRouter();
  const handleExit = () => {
    signOut();
    router.push("/");
  };
  return <button onClick={handleExit}>Sign Out</button>;
}
