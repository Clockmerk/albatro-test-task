import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import SignUpForm from "../_components/SignUpForm/signupform";

export default async function SignUp() {
  const session = await getServerSession()

  if (session?.user?.email) {
    redirect("/")
  }
  return (
    <SignUpForm/>
  );
}
