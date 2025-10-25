import React from "react";

export default function Button({ children, onClick, color = "blue" }) {
  const colorMap = {
    blue: "bg-blue-500 hover:bg-blue-600",
    red: "bg-red-500 hover:bg-red-600",
    green: "bg-green-500 hover:bg-green-600",
  };
  const colorClasses = colorMap[color] || colorMap.blue;

  return (
    <button
      onClick={onClick}
      className={`${colorClasses} text-white px-4 py-2 rounded-xl transition`}
    >
      {children}
    </button>
  );
}
