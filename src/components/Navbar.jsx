import React from "react";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white px-6 py-4 shadow-md flex justify-between items-center rounded-2xl mb-6">
      <h1 className="text-xl font-bold">📦 Inventory Tracker</h1>
      <div className="flex gap-4">
        <button className="bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded-lg">
          Dashboard
        </button>
        <button className="bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded-lg">
          Orders
        </button>
      </div>
    </nav>
  );
}
