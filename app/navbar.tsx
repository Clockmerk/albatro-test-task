import { getServerSession } from "next-auth";
import Link from "next/link";
import SignOutButton from "./_components/SignOutButton/signoutbutton";


export default async function Navbar() {
  const session = await getServerSession()

  return (
    <header className="fixed flex items-center justify-end bg-white w-screen h-10">
      <nav>
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
              <SignOutButton />
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
