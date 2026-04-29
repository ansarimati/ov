"use client";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useAuthStore } from "@/store/auth-store";
import {
  Activity,
  LayoutDashboard,
  Users,
  UserCheck,
  MapPin,
  Swords,
  Trophy,
  Radio,
  Settings,
  LogOut,
  Menu,
  X
} from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/matches", label: "Matches", icon: Swords },
  { href: "/dashboard/teams", label: "Teams", icon: Users },
  { href: "/dashboard/players", label: "Players", icon: UserCheck },
  { href: "/dashboard/venues", label: "Venues", icon: MapPin },
  { href: "/dashboard/tournaments", label: "Tournaments", icon: Trophy },
  { href: "/dashboard/live", label: "Live Matches", icon: Radio },
  { href: "/dashboard/settings", label: "Settings", icon: Settings }
];

export default function DashboardLayout ({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated, fetchMe, logout } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
    } else {
      fetchMe();
    }
  }, [isAuthenticated]);

  const handleLogout = () => {
    logout();
    router.push("/login");
  }

  if (!isAuthenticated) return null;

  return (
    <div className="flex h-screen bg-black">
      {/* Mobile overlay */}
      {
        sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/60 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )
      }

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-zinc-950 border-r border-white/10 flex flex-col transform transition-transform lg:translate-x-0
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
          <Link href={"/dashboard"} className="flex items-center gap-2" >
            <Activity className="h-6 w-6 text-emerald-400" />
            <span className="text-lg font-bold text-white">CrickCast</span>
          </Link>
          <button className="lg:hidden text-zinc-400 hover:text-white" onClick={() => setSidebarOpen(false)}>
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navbar */}
        <nav className="flex px-3 py-4 space-y-1 overflow-y-auto">
          {
            navItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href))
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                  isActive
                    ? "bg-emerald-500/10 text-emerald-400"
                    : "text-zinc-400 hover:text-white hover:bg-white/5"
                }`}
                >
                  <item.icon className="h-4.5 w-4.5" />
                  {item.label}
                  {item.label === "Live Matches" && (
                    <span className="ml-auto h-2 w-2 bg-red-500 rounded-full animate-pulse"></span>
                  )}
                </Link>
              )
            })
          }
        </nav>

        {/* User info */}
        <div className="border-t border-white/10 p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-9 w-9 bg-emerald-500/20 rounded-full flex items-center justify-center text-emerald-400 font-semibold text-sm">
              { user?.name?.charAt(0)?.toUpperCase() || "U" }
            </div>
            <div className="flex min-w-0">
              <p className="text-sm font-medium text-white truncate">{user?.name}</p>
              <p className="text-xs text-zinc-500 truncate">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flx items-center gap-2 w-full px-3 py-2 text-sm text-zinc-400 hover:text-red-400 hover:bg-red-500/5 rounded-lg transition"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="flex items-center justify-between px-6 py-3 border-b border-white/10 bg-zinc-950/80 backdrop-blur-sm">
          <button className="lg:hidden text-zinc-400 hover:text-white" onClick={() => setSidebarOpen(true)}>
            <Menu className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-2">
            <span className="text-xs px-2 py-0.5 bg-emerald-500/10 text-emerald-400 rounded-full font-medium uppercase">
              { user?.subscription?.plan || "free" }
            </span>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6">
          { children }
        </main>
      </div>
    </div>
  )

}