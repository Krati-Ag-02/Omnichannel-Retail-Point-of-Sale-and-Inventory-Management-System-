import { Outlet } from "react-router-dom"
import { AppSidebar } from "../components/app-sidebar"

export default function MainLayout() {
  return (
    <div className="flex min-h-screen bg-[#020617] text-white">
      <AppSidebar />

      <main className="flex-1 overflow-y-auto">
        <header className="
          h-16
          border-b border-white/10
          bg-[#081120]
          flex items-center
          px-6
        ">
          <h1 className="text-xl font-semibold">
            RetailOS
          </h1>
        </header>

        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  )
}