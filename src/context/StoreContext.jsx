import React, { createContext, useContext, useState, useEffect } from "react";

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [inventory, setInventory] = useState([]);
  const [orders, setOrders] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false); // ✅ Prevent premature saving

  // 🧩 Load saved data from localStorage on first render
  useEffect(() => {
    const savedInventory = localStorage.getItem("inventory");
    const savedOrders = localStorage.getItem("orders");

    if (savedInventory) {
      setInventory(JSON.parse(savedInventory));
    } else {
      // Default demo data with prices
      setInventory([
        { id: 1, name: "Apples", quantity: 30, price: 1.5 },
        { id: 2, name: "Bananas", quantity: 50, price: 0.75 },
        { id: 3, name: "Oranges", quantity: 40, price: 1.2 },
      ]);
    }

    if (savedOrders) setOrders(JSON.parse(savedOrders));

    // ✅ Mark data as loaded
    setDataLoaded(true);
  }, []);

  // 💾 Auto-save whenever inventory changes (but only after initial load)
  useEffect(() => {
    if (dataLoaded) {
      localStorage.setItem("inventory", JSON.stringify(inventory));
    }
  }, [inventory, dataLoaded]);

  // 💾 Auto-save whenever orders change (but only after initial load)
  useEffect(() => {
    if (dataLoaded) {
      localStorage.setItem("orders", JSON.stringify(orders));
    }
  }, [orders, dataLoaded]);

  // ➕ Add new item (fixed to save price)
  const addItem = (name, quantity, price) => {
    if (!name || quantity <= 0 || price <= 0) return;
    const newItem = {
      id: Date.now(),
      name,
      quantity: parseInt(quantity, 10),
      price: parseFloat(price), // ✅ save price
    };
    setInventory((prev) => [...prev, newItem]);
  };

  // ❌ Remove item
  const removeItem = (id) => {
    setInventory((prev) => prev.filter((item) => item.id !== id));
  };

  // 📦 Place order (fixed to save item price)
  const placeOrder = (id, amount) => {
    const item = inventory.find((i) => i.id === id);
    if (!item || amount <= 0 || item.quantity < amount) return;

    const updatedInventory = inventory.map((i) =>
      i.id === id ? { ...i, quantity: i.quantity - amount } : i
    );
    setInventory(updatedInventory);

    setOrders((prev) => [
      ...prev,
      {
        id: Date.now(),
        item: item.name,
        quantity: amount,
        price: item.price, // ✅ store price per item
        date: new Date().toISOString(),
      },
    ]);
  };

  // 🧹 Reset everything
  const resetData = () => {
    setInventory([]);
    setOrders([]);
    localStorage.removeItem("inventory");
    localStorage.removeItem("orders");
  };

  return (
    <StoreContext.Provider
      value={{
        inventory,
        addItem,
        removeItem,
        placeOrder,
        orders,
        resetData,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
