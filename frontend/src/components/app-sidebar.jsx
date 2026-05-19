import {
  LayoutDashboard,
  Package,
  Receipt,
  ShoppingCart,
} from "lucide-react"

import { NavLink } from "react-router-dom"

export function AppSidebar() {
  const items = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Products",
      url: "/products",
      icon: Package,
    },
    {
      title: "Orders",
      url: "/orders",
      icon: Receipt,
    },
    {
      title: "POS",
      url: "/pos",
      icon: ShoppingCart,
    },
  ]

  return (
    <aside
      className="
        w-72
        bg-[#081120]
        border-r border-white/10
        min-h-screen
        p-6
      "
    >
      <div className="mb-10">
        <h1 className="text-3xl font-bold">
          RetailOS
        </h1>

        <p className="text-sm text-slate-400 mt-2">
          Retail Management
        </p>
      </div>

      <nav className="space-y-2">
        {items.map((item) => (
          <NavLink
            key={item.title}
            to={item.url}
            className={({ isActive }) =>
              `
                flex items-center gap-3
                rounded-xl
                px-4 py-3
                text-sm font-medium
                transition-all
                ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-slate-300 hover:bg-white/5"
                }
              `
            }
          >
            <item.icon size={18} />

            {item.title}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}