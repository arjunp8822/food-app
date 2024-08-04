import CreateRecipe from "@/app/components/CreateRecipe";
import { getSession } from "@/auth/actions";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await getSession();

  if (!session.isLoggedIn) {
    return redirect("/login");
  }

  return (
    <div>
      <CreateRecipe userId={session.userId} />
    </div>
  );
};

export default page;
