"use client"

import { useState } from "react"
import {
  Plus,
  Search,
  MoreHorizontal,
  CreditCard,
  DollarSign,
  X,
  Moon,
  Sun,
  Wallet,
  Calendar,
  Utensils,
  Car,
  ShoppingBag,
  Zap,
  Film,
  Home,
} from "lucide-react"
import { Button } from "../components/ui/common/button"
import { Input } from "../components/ui/form/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "../components/ui/layout/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/form/select"
import { Label } from "../components/ui/form/label"
import { Tabs, TabsList, TabsTrigger } from "../components/ui/layout/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/common/avatar"

export default function Dashboard() {
  const [darkMode, setDarkMode] = useState(false)

  // Sample categories with colors and icons
  const categories = [
    { name: "Food", color: "bg-blue-500/80", icon: <Utensils className="h-4 w-4" /> },
    { name: "Transport", color: "bg-green-500/80", icon: <Car className="h-4 w-4" /> },
    { name: "Shopping", color: "bg-pink-500/80", icon: <ShoppingBag className="h-4 w-4" /> },
    { name: "Bills", color: "bg-yellow-500/80", icon: <Zap className="h-4 w-4" /> },
    { name: "Entertainment", color: "bg-orange-500/80", icon: <Film className="h-4 w-4" /> },
    { name: "Other", color: "bg-purple-500/80", icon: <Home className="h-4 w-4" /> },
  ]

  const [expenses, setExpenses] = useState([
    { id: "1", amount: 45.99, description: "Grocery Shopping", category: "Food", date: "2025-03-05" },
    { id: "2", amount: 12.5, description: "Bus Ticket", category: "Transport", date: "2025-03-04" },
    { id: "3", amount: 89.99, description: "New Shoes", category: "Shopping", date: "2025-03-03" },
    { id: "4", amount: 150.0, description: "Electricity Bill", category: "Bills", date: "2025-03-06" },
    { id: "5", amount: 35.0, description: "Movie Tickets", category: "Entertainment", date: "2025-03-07" },
  ])

  const [newExpense, setNewExpense] = useState({
    amount: "",
    description: "",
    category: "Food",
    date: new Date().toISOString().split("T")[0],
  })

  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("All")
  const [showAddExpenseForm, setShowAddExpenseForm] = useState(false)
  const [activeTab, setActiveTab] = useState("all")
  const [activeDropdownId, setActiveDropdownId] = useState(null)

  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0)

  const filteredExpenses = expenses.filter((e) => {
    const matchesSearch = e.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === "All" || e.category === filterCategory

    const expenseDate = new Date(e.date)
    const today = new Date()
    const isToday = expenseDate.toDateString() === today.toDateString()
    const isThisWeek = expenseDate >= new Date(today.setDate(today.getDate() - today.getDay()))
    const isThisMonth =
      expenseDate.getMonth() === new Date().getMonth() && expenseDate.getFullYear() === new Date().getFullYear()

    let matchesTab = true
    if (activeTab === "today") matchesTab = isToday
    else if (activeTab === "week") matchesTab = isThisWeek
    else if (activeTab === "month") matchesTab = isThisMonth

    return matchesSearch && matchesCategory && matchesTab
  })

  const expensesByCategory = categories
    .map((category) => {
      const total = expenses.filter((e) => e.category === category.name).reduce((sum, e) => sum + e.amount, 0)
      return { ...category, total }
    })
    .sort((a, b) => b.total - a.total)

  const handleAddExpense = () => {
    if (!newExpense.amount || !newExpense.description) return

    const expense = {
      id: Date.now().toString(),
      amount: Number.parseFloat(newExpense.amount),
      description: newExpense.description,
      category: newExpense.category,
      date: newExpense.date,
    }

    setExpenses([expense, ...expenses])
    setNewExpense({
      amount: "",
      description: "",
      category: "Food",
      date: new Date().toISOString().split("T")[0],
    })
    setShowAddExpenseForm(false)
  }

  const handleDeleteExpense = (id) => {
    setExpenses(expenses.filter((e) => e.id !== id))
    setActiveDropdownId(null)
  }

  const getCategoryColor = (name) => {
    const category = categories.find((c) => c.name === name)
    return category ? category.color : "bg-gray-500/80"
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
  }

  const getCategoryIcon = (name) => {
    const category = categories.find((c) => c.name === name)
    return category ? category.icon : <CreditCard className="h-4 w-4" />
  }

  const toggleTheme = () => {
    setDarkMode(!darkMode)
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-200 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <header
        className={`sticky top-0 z-10 ${
          darkMode ? "bg-gray-800/80 border-gray-700" : "bg-white/80 border-gray-200"
        } backdrop-blur-sm border-b`}
      >
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Wallet className={`h-5 w-5 ${darkMode ? "text-white" : "text-gray-900"}`} />
            <h1 className={`text-xl font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>ExpenseTracker</h1>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="icon"
              className={`rounded-full ${
                darkMode
                  ? "bg-gray-800 text-white border-gray-700 hover:bg-gray-700"
                  : "bg-white text-gray-900 border-gray-200 hover:bg-gray-100"
              }`}
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <Button
              variant="primary"
              className={`flex items-center gap-2 rounded-full px-3 ${
                darkMode ? "bg-gray-800 text-white hover:bg-gray-700" : "bg-white text-black hover:bg-gray-100"
              }`}
              onClick={() => setShowAddExpenseForm(!showAddExpenseForm)}
            >
              {showAddExpenseForm ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
              <span className="hidden sm:inline">{showAddExpenseForm ? "Cancel" : "Add Expense"}</span>
            </Button>
            <Avatar
              className={`h-9 w-9 border-2 ${darkMode ? "border-gray-700 bg-gray-800" : "border-gray-200 bg-white"}`}
            >
              <AvatarImage src="/placeholder.svg?height=36&width=36" alt="User" />
              <AvatarFallback className={darkMode ? "text-white" : "text-gray-900"}>U</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {showAddExpenseForm && (
          <Card className={`mb-6 ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}>
            <CardHeader>
              <CardTitle className={darkMode ? "text-white" : "text-gray-900"}>Add New Expense</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="description" className={darkMode ? "text-gray-300" : "text-gray-700"}>
                    Description
                  </Label>
                  <Input
                    id="description"
                    value={newExpense.description}
                    onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
                    placeholder="What did you spend on?"
                    className={
                      darkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-200 text-gray-900"
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="amount" className={darkMode ? "text-gray-300" : "text-gray-700"}>
                    Amount
                  </Label>
                  <div className="relative">
                    <DollarSign
                      className={`absolute left-3 top-2.5 h-4 w-4 ${darkMode ? "text-gray-400" : "text-gray-500"}`}
                    />
                    <Input
                      id="amount"
                      type="number"
                      value={newExpense.amount}
                      onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                      placeholder="0.00"
                      className={`pl-9 ${darkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-200 text-gray-900"}`}
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="category" className={darkMode ? "text-gray-300" : "text-gray-700"}>
                    Category
                  </Label>
                  <Select
                    value={newExpense.category}
                    onValueChange={(value) => setNewExpense({ ...newExpense, category: value })}
                  >
                    <SelectTrigger
                      className={
                        darkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-200 text-gray-900"
                      }
                    >
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent
                      className={
                        darkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-200 text-gray-900"
                      }
                    >
                      {categories.map((category) => (
                        <SelectItem key={category.name} value={category.name}>
                          <div className="flex items-center gap-2">
                            <div className={`w-3 h-3 rounded-full ${category.color}`}></div>
                            <span>{category.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="date" className={darkMode ? "text-gray-300" : "text-gray-700"}>
                    Date
                  </Label>
                  <div className="relative">
                    <Calendar
                      className={`absolute left-3 top-2.5 h-4 w-4 ${darkMode ? "text-gray-400" : "text-gray-500"}`}
                    />
                    <Input
                      id="date"
                      type="date"
                      value={newExpense.date}
                      onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })}
                      className={`pl-9 ${darkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-200 text-gray-900"}`}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button
                onClick={() => setShowAddExpenseForm(false)}
                variant="outline"
                className={
                  darkMode
                    ? "border-gray-700 text-gray-300 hover:bg-gray-700"
                    : "border-gray-200 text-gray-700 hover:bg-gray-100"
                }
              >
                Cancel
              </Button>
              <Button
                onClick={handleAddExpense}
                variant="primary"
                className={
                  darkMode ? "bg-gray-700 hover:bg-gray-600 text-white" : "bg-gray-900 hover:bg-gray-800 text-white"
                }
              >
                Add Expense
              </Button>
            </CardFooter>
          </Card>
        )}

        <section className="mb-6">
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <div className="relative flex-grow">
              <Search className={`absolute left-3 top-2.5 h-4 w-4 ${darkMode ? "text-gray-400" : "text-gray-500"}`} />
              <Input
                placeholder="Search expenses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`pl-9 ${darkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-200 text-gray-900"}`}
              />
            </div>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger
                className={`w-full sm:w-48 ${darkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-200 text-gray-900"}`}
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent
                className={
                  darkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-200 text-gray-900"
                }
              >
                <SelectItem value="All">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.name} value={category.name}>
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${category.color}`}></div>
                      <span>{category.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
            <TabsList className={darkMode ? "bg-gray-800" : "bg-gray-100"}>
              <TabsTrigger
                value="all"
                className={
                  darkMode ? "data-[state=active]:bg-gray-700 text-white" : "data-[state=active]:bg-white text-gray-900"
                }
              >
                All
              </TabsTrigger>
              <TabsTrigger
                value="today"
                className={
                  darkMode ? "data-[state=active]:bg-gray-700 text-white" : "data-[state=active]:bg-white text-gray-900"
                }
              >
                Today
              </TabsTrigger>
              <TabsTrigger
                value="week"
                className={
                  darkMode ? "data-[state=active]:bg-gray-700 text-white" : "data-[state=active]:bg-white text-gray-900"
                }
              >
                This Week
              </TabsTrigger>
              <TabsTrigger
                value="month"
                className={
                  darkMode ? "data-[state=active]:bg-gray-700 text-white" : "data-[state=active]:bg-white text-gray-900"
                }
              >
                This Month
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card className={darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}>
            <CardHeader>
              <CardTitle className={darkMode ? "text-white" : "text-gray-900"}>Total Expenses</CardTitle>
              <CardDescription className={darkMode ? "text-gray-400" : "text-gray-500"}>
                Overview of your spending
              </CardDescription>
            </CardHeader>
            <CardContent className={`text-3xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
              <DollarSign className="inline-block mr-2 h-6 w-6 text-green-500" />${totalExpenses.toFixed(2)}
            </CardContent>
          </Card>

          <Card className={darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}>
            <CardHeader>
              <CardTitle className={darkMode ? "text-white" : "text-gray-900"}>Expenses by Category</CardTitle>
            </CardHeader>
            <CardContent>
              {expensesByCategory.map((category) => (
                <div key={category.name} className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className={`inline-block rounded-full p-1 ${category.color}`}>{category.icon}</span>
                    <span className={darkMode ? "text-white" : "text-gray-900"}>{category.name}</span>
                  </div>
                  <span className={`font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>
                    ${category.total.toFixed(2)}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className={darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}>
            <CardHeader>
              <CardTitle className={darkMode ? "text-white" : "text-gray-900"}>Recent Expenses</CardTitle>
            </CardHeader>
            <CardContent>
              {filteredExpenses.length === 0 ? (
                <p className={`text-center ${darkMode ? "text-gray-400" : "text-gray-500"}`}>No expenses found.</p>
              ) : (
                filteredExpenses.slice(0, 5).map((expense) => (
                  <div key={expense.id} className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className={`inline-block rounded-full p-1 ${getCategoryColor(expense.category)}`}>
                        {getCategoryIcon(expense.category)}
                      </span>
                      <div>
                        <p className={`font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>
                          {expense.description}
                        </p>
                        <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                          {formatDate(expense.date)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>
                        ${expense.amount.toFixed(2)}
                      </span>
                      <div className="relative">
                        <Button
                          variant="ghost"
                          size="sm"
                          className={`p-0 ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                          onClick={() => setActiveDropdownId(activeDropdownId === expense.id ? null : expense.id)}
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                        {activeDropdownId === expense.id && (
                          <div
                            className={`absolute right-0 mt-1 w-32 rounded-md shadow-lg ring-1 ring-opacity-5 z-50 ${
                              darkMode ? "bg-gray-800 ring-gray-700" : "bg-white ring-black"
                            }`}
                          >
                            <div className="py-1" role="menu" aria-orientation="vertical">
                              <button
                                className={`block w-full text-left px-4 py-2 text-sm ${
                                  darkMode ? "text-gray-300 hover:bg-gray-700" : "text-gray-700 hover:bg-gray-100"
                                }`}
                                onClick={() => handleDeleteExpense(expense.id)}
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
            <CardFooter>
              <Button
                variant="link"
                onClick={() => setActiveTab("all")}
                className={darkMode ? "text-gray-300" : "text-gray-700"}
              >
                View All
              </Button>
            </CardFooter>
          </Card>
        </section>
      </main>
    </div>
  )
}
