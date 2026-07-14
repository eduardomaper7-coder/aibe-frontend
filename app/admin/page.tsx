"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

type User = {
  id: string;
  email: string;
  approved: boolean;
};

export default function AdminPage() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    supabase
      .from("profiles")
      .select("id, email, approved")
      .then(({ data }) => setUsers((data as User[]) || []));
  }, []);

  const approveUser = async (id: string) => {
    await supabase.from("profiles").update({ approved: true }).eq("id", id);

    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, approved: true } : u))
    );
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Panel de aprobación</h1>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Estado</th>
            <th className="p-2 border">Acción</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td className="border p-2">{u.email}</td>
              <td className="border p-2">
                {u.approved ? "Aprobado" : "Pendiente"}
              </td>
              <td className="border p-2">
                {!u.approved && (
                  <button
                    className="bg-green-600 text-white px-3 py-1 rounded"
                    onClick={() => approveUser(u.id)}
                  >
                    Aprobar
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
