import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Car,
  DollarSign,
  Truck,
  Kanban,
  Zap,
  ChevronLeft,
  ChevronRight,
  Bell,
  Search,
  Menu,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/" },
  { icon: Users, label: "Clientes", path: "/clientes" },
  { icon: Car, label: "Estoque", path: "/estoque" },
  { icon: DollarSign, label: "Financeiro", path: "/financeiro" },
  { icon: Truck, label: "Fornecedores", path: "/fornecedores" },
  { icon: Kanban, label: "Kanban", path: "/kanban" },
  { icon: Zap, label: "Integrações", path: "/integracoes" },
];

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:relative z-50 flex flex-col h-full transition-all duration-300 ease-in-out",
          "border-r border-sidebar-border",
          collapsed ? "w-16" : "w-60",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
        style={{ background: "var(--gradient-sidebar)" }}
      >
        {/* Logo */}
        <div className={cn(
          "flex items-center border-b border-sidebar-border py-4",
          collapsed ? "px-3 justify-center" : "px-5 gap-3"
        )}>
          <div className="flex items-center justify-center w-8 h-8 rounded-lg gradient-gold shadow-gold flex-shrink-0">
            <Car className="w-4 h-4 text-primary-foreground" />
          </div>
          {!collapsed && (
            <div className="animate-fade-in">
              <p className="text-sm font-bold text-foreground leading-tight">AutoCRM</p>
              <p className="text-[10px] text-muted-foreground leading-tight">Revenda Premium</p>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto scrollbar-thin">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-all duration-150",
                  "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  isActive
                    ? "sidebar-link-active font-medium"
                    : "text-sidebar-foreground"
                )}
                title={collapsed ? item.label : undefined}
              >
                <item.icon className={cn(
                  "w-4 h-4 flex-shrink-0",
                  isActive ? "text-primary" : ""
                )} />
                {!collapsed && (
                  <span className="animate-fade-in truncate">{item.label}</span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Collapse button */}
        <div className="p-2 border-t border-sidebar-border">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex items-center justify-center w-full py-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-sidebar-accent transition-colors"
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between px-4 lg:px-6 py-3 border-b border-border bg-card flex-shrink-0">
          <div className="flex items-center gap-3">
            <button
              className="lg:hidden p-2 rounded-md hover:bg-secondary transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <Menu className="w-4 h-4" />
            </button>
            <div className="relative hidden md:flex items-center">
              <Search className="absolute left-3 w-3.5 h-3.5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Buscar clientes, veículos..."
                className="w-64 pl-9 pr-4 py-1.5 text-sm bg-secondary border border-border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="relative p-2 rounded-md hover:bg-secondary transition-colors">
              <Bell className="w-4 h-4 text-muted-foreground" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-primary rounded-full" />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full gradient-gold flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-bold text-primary-foreground">A</span>
              </div>
              <span className="hidden md:block text-sm font-medium text-foreground">Admin</span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto p-4 lg:p-6 scrollbar-thin">
          <div className="animate-fade-in">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
