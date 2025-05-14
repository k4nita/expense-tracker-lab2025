import { Utensils, Car, ShoppingBag, Zap, Film, Home } from "lucide-react";

export const categories = [
  { name: "Food", color: "bg-blue-500/80", icon: <Utensils className="h-4 w-4" /> },
  { name: "Transport", color: "bg-green-500/80", icon: <Car className="h-4 w-4" /> },
  { name: "Shopping", color: "bg-pink-500/80", icon: <ShoppingBag className="h-4 w-4" /> },
  { name: "Bills", color: "bg-yellow-500/80", icon: <Zap className="h-4 w-4" /> },
  { name: "Entertainment", color: "bg-orange-500/80", icon: <Film className="h-4 w-4" /> },
  { name: "Other", color: "bg-purple-500/80", icon: <Home className="h-4 w-4" /> },
];