import React, { useState } from "react"
import {
  Plus,
  Search,
  MoreHorizontal,
  CreditCard,
  DollarSign,
  Home,
  ShoppingBag,
  Car,
  Film,
  Utensils,
  Zap,
} from "lucide-react"
import { Button } from "../components/ui/common/button"
import { Input } from "../components/ui/form/input"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "../components/ui/layout/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "../components/ui/layout/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/form/select"
import { Label } from "../components/ui/form/label"
import { Tabs, TabsList, TabsTrigger } from "../components/ui/layout/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/popover/dropdown-menu"
import { categories } from "../lib/categoryData"

// Define expense and category types
// Expense object format:
// {
//   id: '1',
//   amount: 25.50,
//   description: 'Coffee',
//   category: 'Food',
//   date: '2025-05-01'
// }


export default function Dashboard() {
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
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("all")

  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0)

  const filteredExpenses = expenses.filter((e) => {
    const matchesSearch = e.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === "All" || e.category === filterCategory

    const expenseDate = new Date(e.date)
    const today = new Date()
    const isToday = expenseDate.toDateString() === today.toDateString()
    const isThisWeek = expenseDate >= new Date(today.setDate(today.getDate() - today.getDay()))
    const isThisMonth =
      expenseDate.getMonth() === new Date().getMonth() &&
      expenseDate.getFullYear() === new Date().getFullYear()

    let matchesTab = true
    if (activeTab === "today") matchesTab = isToday
    else if (activeTab === "week") matchesTab = isThisWeek
    else if (activeTab === "month") matchesTab = isThisMonth

    return matchesSearch && matchesCategory && matchesTab
  })

  const expensesByCategory = categories
    .map((category) => {
      const total = expenses
        .filter((e) => e.category === category.name)
        .reduce((sum, e) => sum + e.amount, 0)
      return { ...category, total }
    })
    .sort((a, b) => b.total - a.total)

  const handleAddExpense = () => {
    if (!newExpense.amount || !newExpense.description) return

    const expense = {
      id: Date.now().toString(),
      amount: parseFloat(newExpense.amount),
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
    setIsAddExpenseOpen(false)
  }

  const handleDeleteExpense = (id: string) => {
    setExpenses(expenses.filter((e) => e.id !== id))
  }

  const getCategoryColor = (name: string) => {
    const category = categories.find((c) => c.name === name)
    return category ? category.color : "bg-gray-500/80"
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
  }

  const getCategoryIcon = (name: string) => {
    const category = categories.find((c) => c.name === name)
    return category ? category.icon : <CreditCard className="h-4 w-4" />
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Expense Tracker</h1>
        <Dialog open={isAddExpenseOpen} onOpenChange={setIsAddExpenseOpen}>
          <DialogTrigger asChild>
            <Button variant="primary" className="flex items-center gap-2">
              <Plus className="h-4 w-4" /> Add Expense
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Expense</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Input
                  id="description"
                  className="col-span-3"
                  value={newExpense.description}
                  onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="amount" className="text-right">
                  Amount
                </Label>
                <Input
                  id="amount"
                  type="number"
                  className="col-span-3"
                  value={newExpense.amount}
                  onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">
                  Category
                </Label>
                <Select
                  value={newExpense.category}
                  onValueChange={(value) => setNewExpense({ ...newExpense, category: value })}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.name} value={category.name}>
                        <div className="flex items-center gap-2">
                          {category.icon}
                          {category.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="date" className="text-right">
                  Date
                </Label>
                <Input
                  id="date"
                  type="date"
                  className="col-span-3"
                  value={newExpense.date}
                  onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleAddExpense} variant="primary">
                Add Expense
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </header>

      <section className="mb-6">
        <Input
          placeholder="Search expenses..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-4"
          icon={<Search className="h-4 w-4" />}
        />
        <Select value={filterCategory} onValueChange={setFilterCategory}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category.name} value={category.name}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </section>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="today">Today</TabsTrigger>
          <TabsTrigger value="week">This Week</TabsTrigger>
          <TabsTrigger value="month">This Month</TabsTrigger>
        </TabsList>
      </Tabs>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Expenses</CardTitle>
            <CardDescription>Overview of your spending</CardDescription>
          </CardHeader>
          <CardContent className="text-3xl font-bold">
            <DollarSign className="inline-block mr-2 h-6 w-6 text-green-500" />
            ${totalExpenses.toFixed(2)}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Expenses by Category</CardTitle>
          </CardHeader>
          <CardContent>
            {expensesByCategory.map((category) => (
              <div key={category.name} className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className={`inline-block rounded-full p-1 ${category.color}`}>
                    {category.icon}
                  </span>
                  <span>{category.name}</span>
                </div>
                <span className="font-semibold">${category.total.toFixed(2)}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            {filteredExpenses.length === 0 ? (
              <p className="text-center text-gray-500">No expenses found.</p>
            ) : (
              filteredExpenses.slice(0, 5).map((expense) => (
                <div key={expense.id} className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className={`inline-block rounded-full p-1 ${getCategoryColor(expense.category)}`}>
                      {getCategoryIcon(expense.category)}
                    </span>
                    <div>
                      <p className="font-semibold">{expense.description}</p>
                      <p className="text-sm text-gray-500">{formatDate(expense.date)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-semibold">${expense.amount.toFixed(2)}</span>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleDeleteExpense(expense.id)}>
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))
            )}
          </CardContent>
          <CardFooter>
            <Button variant="link" onClick={() => setActiveTab("all")}>
              View All
            </Button>
          </CardFooter>
        </Card>
      </section>
    </div>
  )
}