// frontend/src/pages/Users.jsx
import React, { useEffect, useState } from "react";
import API from "../../api"; // Axios instance

export default function Users() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "" });
  const [loading, setLoading] = useState(false);

  // Fetch all users from backend
  const fetchUsers = async () => {
    try {
      const res = await API.get("/users");
      setUsers(res.data);
    } catch (err) {
      console.error("GET /users error:", err);
      alert("Failed to fetch users. Check backend connection.");
    }
  };

  // Create a new user
  const createUser = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password || !form.role) {
      return alert("All fields are required");
    }

    setLoading(true);
    try {
      const res = await API.post("/users", form);
      setUsers([...users, res.data]); // Add new user to state
      setForm({ name: "", email: "", password: "", role: "" }); // Reset form
    } catch (err) {
      console.error("POST /users error:", err.response?.data || err.message);
      alert(err.response?.data?.error || "Error creating user");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-4">Users</h1>

      {/* Create User Form */}
      <form className="mb-6 space-y-3" onSubmit={createUser}>
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border p-2 w-full rounded"
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="border p-2 w-full rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="border p-2 w-full rounded"
        />
        <input
          type="text"
          placeholder="Role"
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
          className="border p-2 w-full rounded"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Creating..." : "Create User"}
        </button>
      </form>

      {/* Users List */}
      <div>
        <h2 className="text-xl font-semibold mb-2">All Users</h2>
        {users.length === 0 ? (
          <p>No users found.</p>
        ) : (
          <ul className="space-y-2">
            {users.map((u) => (
              <li
                key={u.id}
                className="border-b py-2 flex justify-between items-center"
              >
                <span>
                  {u.name} ({u.email}) - <span className="font-medium">{u.role}</span>
                </span>
                <span className="text-gray-500 text-sm">
                  ID: {u.id} | Created: {new Date(u.created_at).toLocaleDateString()}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}