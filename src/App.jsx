
import React from "react";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import { StoreProvider } from "./context/StoreContext";

function App() {
  return (
    <StoreProvider>
      <div className="min-h-screen bg-gray-50 p-6">
        <Navbar />
        <Dashboard />
      </div>
    </StoreProvider>
  );
}

export default App;

