import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AddExpense() {
    const categories = ["Food", "Transport", "Shopping", "Bills", "Entertainment", "Other"];
    const [form, setForm] = useState({
        date: '',
        type: 'expense',
        category: '',
        amount: '',
        notes: '',
    });
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/');
        }
    }, [navigate]);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:5000/expenses', form, {
                headers: { Authorization: `Bearer ${token}` },
            });
            alert('Expense successfully saved!');
            navigate('/dashboard');
        } catch (err) {
            console.error(err);
            alert('Failed to save expense');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
            <form 
                onSubmit={handleSubmit}
                className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-sm"
            >
                <h2 className="text-2xl font-bold mb-4">Add Expense</h2>

                <label className="block mb-2 text-sm">Date</label>
                <input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    className="border rounded w-full py-2 px-3 mb-4"
                    required
                />

                <label className="block mb-2 text-sm">Type</label>
                <select
                    name="type"
                    value={form.type}
                    onChange={handleChange}
                    className="w-full mb-4 px-3 py-2 border rounded"
                >
                    <option value="expense">Expense</option>
                    <option value="income">Income</option>
                </select>

                <label className="block mb-2 text-sm">Category</label>
                <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className="w-full mb-4 px-3 py-2 border rounded"
                    required
                >
                    <option value="">Select category</option>
                    {categories.map((cat) => (
                        <option key={cat} value={cat}>
                            {cat}
                        </option>
                    ))}
                </select>

                <label className="block mb-2 text-sm">Amount</label>
                <input
                    type="number"
                    name="amount"
                    value={form.amount}
                    onChange={handleChange}
                    className="w-full mb-4 px-3 py-2 border rounded"
                    placeholder="e.g. 20.5"
                    required
                />

                <label className="block mb-2 text-sm">Notes</label>
                <textarea
                    name="notes"
                    value={form.notes}
                    onChange={handleChange}
                    className="w-full mb-4 px-3 py-2 border rounded"
                    placeholder="optional"
                />

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600"
                >
                    Save Expense
                </button>
            </form>

            <button
                onClick={() => navigate('/dashboard')}
                className="text-blue-500 hover:underline"
            >
                Back to Dashboard
            </button>
        </div>
    );
}

export default AddExpense;