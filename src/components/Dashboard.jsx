import React, { useState, useMemo } from "react";
import { useStore } from "../context/StoreContext";
import Button from "../ui/Button";
import Card from "../ui/Card";
import Input from "../ui/Input";

export default function Dashboard() {
  const { inventory, addItem, removeItem, placeOrder, orders, resetData } = useStore();

  const [newItem, setNewItem] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [orderQty, setOrderQty] = useState({});

  // 🧮 Derived stats
  const totalProducts = inventory.length;
  const totalOrders = orders.length;
  const totalRevenue = useMemo(
    () => orders.reduce((sum, o) => sum + o.quantity * (o.price || 0), 0),
    [orders]
  );
  const totalStockValue = useMemo(
    () => inventory.reduce((sum, i) => sum + i.quantity * (i.price || 0), 0),
    [inventory]
  );

  // 💡 Add item handler
  const handleAddItem = () => {
    if (!newItem || !quantity || !price) return;
    addItem(newItem, parseInt(quantity), parseFloat(price));
    setNewItem("");
    setQuantity("");
    setPrice("");
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10 p-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold text-blue-700">📊 Inventory Dashboard</h1>
        <Button onClick={resetData} color="red">
          Reset All Data
        </Button>
      </div>

      {/* 🧩 Mini Stats Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card title="Total Products" value={totalProducts} />
        <Card title="Total Orders" value={totalOrders} />
        <Card title="Total Revenue ($)" value={totalRevenue.toFixed(2)} />
        <Card title="Stock Value ($)" value={totalStockValue.toFixed(2)} />
      </div>

      {/* ➕ Add Item Section */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
          ➕ Add New Item
        </h2>
        <div className="grid sm:grid-cols-4 gap-3">
          <Input label="Item Name" value={newItem} onChange={setNewItem} />
          <Input label="Quantity" value={quantity} onChange={setQuantity} type="number" />
          <Input label="Price ($)" value={price} onChange={setPrice} type="number" />
          <div className="flex items-end">
            <Button onClick={handleAddItem}>Add Item</Button>
          </div>
        </div>
      </div>

      {/* 📦 Inventory + Orders */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Inventory Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">🏷️ Inventory</h2>
          {inventory.length === 0 ? (
            <p className="text-gray-500 text-center py-6">No items in inventory.</p>
          ) : (
            <table className="min-w-full border-collapse text-sm">
              <thead>
                <tr className="border-b bg-gray-100 text-gray-700">
                  <th className="text-left p-2">Item</th>
                  <th className="text-left p-2">Qty</th>
                  <th className="text-left p-2">Price</th>
                  <th className="text-center p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {inventory.map((item) => (
                  <tr key={item.id} className="border-b hover:bg-blue-50 transition">
                    <td className="p-2 font-medium">{item.name}</td>
                    <td className="p-2">{item.quantity}</td>
                    <td className="p-2">${item.price}</td>
                    <td className="p-2 text-center space-x-2">
                      <input
                        type="number"
                        min="1"
                        placeholder="Qty"
                        value={orderQty[item.id] || ""}
                        onChange={(e) =>
                          setOrderQty({
                            ...orderQty,
                            [item.id]: e.target.value,
                          })
                        }
                        className="border rounded px-2 py-1 w-16"
                      />
                      <Button
                        color="green"
                        onClick={() =>
                          placeOrder(item.id, parseInt(orderQty[item.id] || 0))
                        }
                      >
                        Order
                      </Button>
                      <Button color="red" onClick={() => removeItem(item.id)}>
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Orders Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">🧾 Orders</h2>
          {orders.length === 0 ? (
            <p className="text-gray-500 text-center py-6">No orders yet.</p>
          ) : (
            <ul className="divide-y divide-gray-200">
              {orders.map((order) => (
                <li
                  key={order.id}
                  className="py-3 flex justify-between items-center text-sm hover:bg-gray-50 transition"
                >
                  <span>
                    <strong>{order.item}</strong> — {order.quantity} pcs
                  </span>
                  <span className="text-gray-500 text-xs">
                    ${order.price * order.quantity} •{" "}
                    {new Date(order.date).toLocaleTimeString()}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
