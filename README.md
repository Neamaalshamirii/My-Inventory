# My Inventory

![React](https://img.shields.io/badge/React-17.0.2-blue?logo=react)
![Vite](https://img.shields.io/badge/Vite-7.1.11-yellow?logo=vite)
![License](https://img.shields.io/badge/License-MIT-green)

**My Inventory** is a simple and intuitive web application to manage products, track inventory, and handle orders efficiently. Built with React, Vite, and a custom context-based state management system, it allows users to add, remove, and manage items with ease.

---

## Screenshot

![Screenshot](./screenshot.png)  
*Replace `screenshot.png` with your actual app screenshot.*

---

## Features

- **Add & Remove Items** – Easily manage your inventory by adding new products or removing existing ones.  
- **Track Inventory** – Monitor current stock levels for all items.  
- **Place Orders** – Process orders and automatically update inventory levels.  
- **Reset Data** – Clear all inventory and order data when needed.  
- **User-Friendly Interface** – Clean UI with reusable components like Buttons, Cards, and Inputs.  

---

## Technologies Used

- **React** – Frontend library for building interactive UI.  
- **Vite** – Fast and modern build tool for development.  
- **Context API** – For state management (`StoreContext`) to share inventory and order data across components.  
- **JavaScript & CSS** – Core frontend technologies.  

---

## Installation

### 1. Clone the repository
```bash
git clone https://github.com/Neamaalshamirii/My-Inventory.git
cd My-Inventory


### 2. Install dependencies

npm install

### 3. Start the development server

npm run dev

Open your browser and navigate to http://localhost:5173/
.

**Project Structure**

My-Inventory/
├── public/              # Static assets
├── src/
│   ├── components/      # React components (Dashboard, Navbar, etc.)
│   ├── context/         # StoreContext for global state management
│   ├── ui/              # Reusable UI components (Button, Card, Input)
│   ├── index.css        # Global styles
│   └── main.jsx         # Entry point
├── package.json
└── vite.config.js

**Usage**

1- Navigate to the Dashboard to view current inventory.

2- Add new items by entering a name and quantity, then click Add.

3- Remove items or adjust inventory quantities as needed.

4- Place orders to simulate stock updates.

5- Use Reset Data to clear all inventory and orders.

**Contributing**

Contributions are welcome! Feel free to submit issues or pull requests for improvements or bug fixes.
