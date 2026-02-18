import { 
  Car, Users, DollarSign, TrendingUp, TrendingDown, 
  ArrowUpRight, ArrowDownRight, Package, Clock, CheckCircle,
  AlertCircle, BarChart3, Calendar
} from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

const areaData = [
  { mes: "Ago", vendas: 42000, metas: 50000 },
  { mes: "Set", vendas: 68000, metas: 55000 },
  { mes: "Out", vendas: 55000, metas: 60000 },
  { mes: "Nov", vendas: 81000, metas: 65000 },
  { mes: "Dez", vendas: 93000, metas: 70000 },
  { mes: "Jan", vendas: 74000, metas: 75000 },
  { mes: "Fev", vendas: 112000, metas: 80000 },
];

const barData = [
  { tipo: "SUV", qtd: 12 },
  { tipo: "Sedan", qtd: 8 },
  { tipo: "Hatch", qtd: 15 },
  { tipo: "Pickup", qtd: 6 },
  { tipo: "Coupe", qtd: 4 },
];

const recentSales = [
  { cliente: "Ricardo Mendes", veiculo: "Toyota Corolla 2023", valor: "R$ 95.000", status: "concluida", avatar: "R" },
  { cliente: "Fernanda Costa", veiculo: "Honda HR-V 2022", valor: "R$ 112.000", status: "pendente", avatar: "F" },
  { cliente: "Marcos Lima", veiculo: "Jeep Compass 2024", valor: "R$ 178.500", status: "concluida", avatar: "M" },
  { cliente: "Juliana Santos", veiculo: "VW Polo 2023", valor: "R$ 82.000", status: "negociacao", avatar: "J" },
  { cliente: "Carlos Rocha", veiculo: "Ford Ranger 2023", valor: "R$ 215.000", status: "concluida", avatar: "C" },
];

const alerts = [
  { type: "warning", msg: "3 veículos com documentação vencendo esta semana" },
  { type: "error", msg: "Conta a pagar: R$ 45.000 vence amanhã" },
  { type: "success", msg: "Meta mensal atingida! 112% de performance" },
  { type: "info", msg: "5 leads novos aguardando contato" },
];

function StatCard({ icon: Icon, label, value, change, positive, color }: {
  icon: React.ElementType; label: string; value: string; change: string; positive: boolean; color: string;
}) {
  return (
    <div className="stat-card rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${color}`}>
          <Icon className="w-5 h-5" />
        </div>
        <div className={`flex items-center gap-1 text-xs font-medium ${positive ? "text-success" : "text-destructive"}`}>
          {positive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
          {change}
        </div>
      </div>
      <p className="text-2xl font-bold text-foreground mb-1">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  );
}

const statusConfig: Record<string, { label: string; className: string }> = {
  concluida: { label: "Concluída", className: "bg-success/15 text-success border-success/20" },
  pendente: { label: "Pendente", className: "bg-warning/15 text-warning border-warning/20" },
  negociacao: { label: "Negociação", className: "bg-accent/15 text-accent border-accent/20" },
};

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">Visão geral do desempenho — Fevereiro 2026</p>
      </div>

      {/* Alerts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {alerts.map((a, i) => (
          <div key={i} className={`flex items-start gap-2.5 p-3 rounded-lg border text-xs ${
            a.type === "warning" ? "bg-warning/10 border-warning/20 text-warning" :
            a.type === "error" ? "bg-destructive/10 border-destructive/20 text-destructive" :
            a.type === "success" ? "bg-success/10 border-success/20 text-success" :
            "bg-accent/10 border-accent/20 text-accent"
          }`}>
            {a.type === "warning" && <AlertCircle className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />}
            {a.type === "error" && <AlertCircle className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />}
            {a.type === "success" && <CheckCircle className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />}
            {a.type === "info" && <Clock className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />}
            <span>{a.msg}</span>
          </div>
        ))}
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={DollarSign} label="Receita no mês" value="R$ 1,12M" change="+18%" positive={true} color="bg-primary/15 text-primary" />
        <StatCard icon={Car} label="Veículos vendidos" value="34" change="+12%" positive={true} color="bg-accent/15 text-accent" />
        <StatCard icon={Users} label="Novos clientes" value="28" change="+8%" positive={true} color="bg-success/15 text-success" />
        <StatCard icon={Package} label="Estoque atual" value="127" change="-3%" positive={false} color="bg-warning/15 text-warning" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 stat-card rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-foreground">Vendas vs Meta</h3>
              <p className="text-xs text-muted-foreground">Últimos 7 meses</p>
            </div>
            <BarChart3 className="w-4 h-4 text-muted-foreground" />
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={areaData}>
              <defs>
                <linearGradient id="vendas" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(43 90% 52%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(43 90% 52%)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="metas" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(213 80% 55%)" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="hsl(213 80% 55%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 18% 18%)" />
              <XAxis dataKey="mes" tick={{ fontSize: 11, fill: "hsl(220 12% 55%)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "hsl(220 12% 55%)" }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v/1000}k`} />
              <Tooltip
                contentStyle={{ background: "hsl(220 22% 10%)", border: "1px solid hsl(220 18% 18%)", borderRadius: "8px", fontSize: "12px" }}
                formatter={(v: number) => [`R$ ${v.toLocaleString('pt-BR')}`, ""]}
              />
              <Area type="monotone" dataKey="vendas" stroke="hsl(43 90% 52%)" strokeWidth={2} fill="url(#vendas)" name="Vendas" />
              <Area type="monotone" dataKey="metas" stroke="hsl(213 80% 55%)" strokeWidth={2} fill="url(#metas)" name="Meta" strokeDasharray="4 2" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="stat-card rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-foreground">Por Segmento</h3>
              <p className="text-xs text-muted-foreground">Vendas no mês</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={barData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 18% 18%)" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 11, fill: "hsl(220 12% 55%)" }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="tipo" tick={{ fontSize: 11, fill: "hsl(220 12% 55%)" }} axisLine={false} tickLine={false} width={40} />
              <Tooltip contentStyle={{ background: "hsl(220 22% 10%)", border: "1px solid hsl(220 18% 18%)", borderRadius: "8px", fontSize: "12px" }} />
              <Bar dataKey="qtd" fill="hsl(43 90% 52%)" radius={[0, 4, 4, 0]} name="Vendas" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Sales */}
      <div className="stat-card rounded-xl">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <div>
            <h3 className="font-semibold text-foreground">Vendas Recentes</h3>
            <p className="text-xs text-muted-foreground">Últimas transações</p>
          </div>
          <button className="text-xs text-primary hover:text-primary/80 transition-colors font-medium">
            Ver todas →
          </button>
        </div>
        <div className="divide-y divide-border">
          {recentSales.map((sale, i) => (
            <div key={i} className="flex items-center justify-between px-5 py-3.5 hover:bg-secondary/30 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full gradient-gold flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-bold text-primary-foreground">{sale.avatar}</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{sale.cliente}</p>
                  <p className="text-xs text-muted-foreground">{sale.veiculo}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-foreground">{sale.valor}</span>
                <span className={`text-[11px] px-2 py-0.5 rounded-full border font-medium ${statusConfig[sale.status].className}`}>
                  {statusConfig[sale.status].label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
