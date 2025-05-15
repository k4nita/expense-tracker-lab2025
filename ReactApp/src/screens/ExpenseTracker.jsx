import React from "react";

export default function ExpenseTracker() {
  return (
    <div className="relative min-h-screen bg-white">
      <div className="absolute inset-0 bg-[url('./placeholder.jpg')] bg-cover bg-center opacity-20 mix-blend-overlay pointer-events-none z-0"></div>
      <div className="relative z-10 p-4">
        <h1 className="text-3xl font-bold mb-4">Expense Tracker</h1>
        {/* Expense tracker content goes here */}
      </div>
    </div>
  );
}
