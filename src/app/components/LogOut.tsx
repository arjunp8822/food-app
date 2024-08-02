import { logout } from "@/auth/actions";

const LogOut = () => {
  return (
    <form action={logout}>
      <button>Logout</button>
    </form>
  );
};

export default LogOut;
