import React from "react";

export default function Input({ label, value, onChange, type = "text", placeholder }) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-sm font-medium text-gray-700">{label}</label>
      )}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      />
    </div>
  );
}
