import React from "react";

export default function Card({ title, value }) {
  return (
    <div className="bg-white shadow-md rounded-2xl p-4 flex flex-col items-center text-center border">
      <h3 className="text-gray-600 text-sm">{title}</h3>
      <p className="text-2xl font-semibold text-blue-600">{value}</p>
    </div>
  );
}
