// frontend/src/pages/Payments.jsx

import React, { useEffect, useState } from "react";
import API from "../../api";

export default function Payments() {

  const [payments, setPayments] = useState([]);

  const fetchPayments = async () => {

    try {

      const res = await API.get("/payments");
      setPayments(res.data);

    } catch (err) {

      console.error(err);
      alert("Failed to fetch payments");

    }

  };

  useEffect(() => {
    fetchPayments();
  }, []);

  return (

    <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded">

      <h1 className="text-2xl font-bold mb-6">Payments</h1>

      {payments.length === 0 ? (
        <p>No payments yet.</p>
      ) : (

        <table className="w-full border">

          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">User</th>
              <th className="p-2 border">Course</th>
              <th className="p-2 border">Amount</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Date</th>
            </tr>
          </thead>

          <tbody>

            {payments.map((p) => (

              <tr key={p.id}>

                <td className="p-2 border">{p.user_name}</td>
                <td className="p-2 border">{p.course_title}</td>
                <td className="p-2 border">₹{p.amount}</td>
                <td className="p-2 border">{p.status}</td>
                <td className="p-2 border">
                  {new Date(p.paid_at).toLocaleString()}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      )}

    </div>

  );
}