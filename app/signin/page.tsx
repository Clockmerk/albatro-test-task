import { redirect } from "next/navigation";
import SignInForm from "../_components/SignInForm/signinform";
import { getServerSession } from "next-auth";

export default async function SignIn() {
  const session = await getServerSession();

  if (session?.user?.email) {
    redirect("/");
  }

  return <SignInForm />;
}
