import { getSession } from "@/auth/actions";
import { redirect } from "next/navigation";
import React from "react";
import { getAllUsers } from "../actions/actions";

const AdminPage = async () => {
  const session = await getSession();

  if (!session.isLoggedIn || !session.isAdmin) {
    return redirect("/login");
  }

  const users = await getAllUsers();

  return (
    <div>
      <h1>Admin Page</h1>
      <table>
        <thead>
          <tr className="text-left border">
            <th className="p-1 border border-gray-300">ID</th>
            <th className="p-1 border border-gray-300">Email</th>
            <th className="p-1 border border-gray-300">Admin</th>
            <th className="p-1 border border-gray-300">Recipe Count</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => (
            <tr key={user.id}>
              <td className="p-1 border border-gray-300">{user.id}</td>
              <td className="p-1 border border-gray-300">{user.email}</td>
              <td className="p-1 border border-gray-300">
                {user.isAdmin.toString()}
              </td>
              <td className="p-1 border border-gray-300">
                {user._count.recipes}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPage;
