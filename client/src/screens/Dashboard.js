import React, { useEffect, useState } from 'react';

function Dashboard() {
  const [expenses, setExpenses] = useState([]);

  const mockExpenses = [
    {
      id: 1,
      date: '2025-05-10',
      type: 'expense',
      category: 'Food',
      amount: 12.5,
      notes: 'Lunch at KFC',
    },
    {
      id: 2,
      date: '2025-05-09',
      type: 'income',
      category: 'Salary',
      amount: 300,
      notes: 'Freelance project',
    },
  ];

  useEffect(() => {
    
    setTimeout(() => {
      setExpenses(mockExpenses);
    }, 500);
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      {expenses.map(expense => (
        <div
          key={expense.id}
          className={`bg-white rounded shadow p-4 mb-4 border-l-4 ${
            expense.type === 'income' ? 'border-green-500' : 'border-red-500'
          }`}
        >
          <div className="flex justify-between">
            <div>
              <p className="font-semibold">{expense.category}</p>
              <p className="text-sm text-gray-500">{expense.notes}</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold">
                {expense.type === 'income' ? '+' : '-'}${expense.amount}
              </p>
              <p className="text-sm text-gray-500">{expense.date}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;