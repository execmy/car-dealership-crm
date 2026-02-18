import { useState } from "react";
import { TrendingUp, TrendingDown, DollarSign, Plus, CheckCircle, Clock, AlertCircle, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const fluxoCaixa = [
  { mes: "Ago", entradas: 320000, saidas: 180000 },
  { mes: "Set", entradas: 450000, saidas: 220000 },
  { mes: "Out", entradas: 390000, saidas: 260000 },
  { mes: "Nov", entradas: 580000, saidas: 290000 },
  { mes: "Dez", entradas: 720000, saidas: 310000 },
  { mes: "Jan", entradas: 610000, saidas: 280000 },
  { mes: "Fev", entradas: 890000, saidas: 340000 },
];

const contasPagar = [
  { id: 1, descricao: "Seguro do Estoque", fornecedor: "Porto Seguro", vencimento: "20/02/2026", valor: "R$ 8.500", status: "pendente", categoria: "Seguro" },
  { id: 2, descricao: "Aluguel do Pátio", fornecedor: "Imobiliária XYZ", vencimento: "15/02/2026", valor: "R$ 22.000", status: "vencida", categoria: "Aluguel" },
  { id: 3, descricao: "Manutenção Frota Serviço", fornecedor: "Auto Service", vencimento: "28/02/2026", valor: "R$ 4.200", status: "pendente", categoria: "Manutenção" },
  { id: 4, descricao: "Software CRM", fornecedor: "Tech Solutions", vencimento: "01/03/2026", valor: "R$ 1.800", status: "pendente", categoria: "Software" },
  { id: 5, descricao: "Salário — Carlos Rodrigues", fornecedor: "Funcionário", vencimento: "05/03/2026", valor: "R$ 5.500", status: "agendada", categoria: "Salário" },
  { id: 6, descricao: "Salário — Ana Silva", fornecedor: "Funcionária", vencimento: "05/03/2026", valor: "R$ 4.800", status: "agendada", categoria: "Salário" },
  { id: 7, descricao: "Salário — Pedro Santos", fornecedor: "Funcionário", vencimento: "05/03/2026", valor: "R$ 6.200", status: "paga", categoria: "Salário" },
];

const contasReceber = [
  { id: 1, descricao: "Venda Honda HR-V", cliente: "Fernanda Costa", vencimento: "25/02/2026", valor: "R$ 112.000", status: "pendente", parcelas: "2/3" },
  { id: 2, descricao: "Venda Toyota Corolla", cliente: "Ricardo Mendes", vencimento: "10/02/2026", valor: "R$ 45.000", status: "recebida", parcelas: "3/3" },
  { id: 3, descricao: "Serviço Funilaria", cliente: "Marcos Lima", vencimento: "18/02/2026", valor: "R$ 3.200", status: "vencida", parcelas: "1/1" },
  { id: 4, descricao: "Financiamento Jeep Compass", cliente: "Juliana Santos", vencimento: "05/03/2026", valor: "R$ 8.500", status: "pendente", parcelas: "1/24" },
  { id: 5, descricao: "Venda BMW 320i", cliente: "Carlos Rocha", vencimento: "15/03/2026", valor: "R$ 149.000", status: "pendente", parcelas: "1/2" },
];

const statusPagar: Record<string, { label: string; className: string; icon: React.ElementType }> = {
  pendente: { label: "Pendente", className: "bg-warning/15 text-warning border-warning/20", icon: Clock },
  vencida: { label: "Vencida", className: "bg-destructive/15 text-destructive border-destructive/20", icon: AlertCircle },
  paga: { label: "Paga", className: "bg-success/15 text-success border-success/20", icon: CheckCircle },
  agendada: { label: "Agendada", className: "bg-accent/15 text-accent border-accent/20", icon: Clock },
};

const statusReceber: Record<string, { label: string; className: string }> = {
  pendente: { label: "Pendente", className: "bg-warning/15 text-warning border-warning/20" },
  recebida: { label: "Recebida", className: "bg-success/15 text-success border-success/20" },
  vencida: { label: "Vencida", className: "bg-destructive/15 text-destructive border-destructive/20" },
};

export default function Financeiro() {
  const [tab, setTab] = useState<"fluxo" | "pagar" | "receber" | "salarios">("fluxo");

  const tabs = [
    { id: "fluxo", label: "Fluxo de Caixa" },
    { id: "pagar", label: "Contas a Pagar" },
    { id: "receber", label: "Contas a Receber" },
    { id: "salarios", label: "Salários" },
  ];

  const salarios = contasPagar.filter(c => c.categoria === "Salário");

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Financeiro</h1>
          <p className="text-sm text-muted-foreground mt-1">Controle financeiro completo</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg gradient-gold text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity shadow-gold">
          <Plus className="w-4 h-4" />
          Novo Lançamento
        </button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Receita do Mês", value: "R$ 890.000", change: "+18%", positive: true, icon: TrendingUp, color: "bg-success/15 text-success" },
          { label: "Despesas do Mês", value: "R$ 340.000", change: "+5%", positive: false, icon: TrendingDown, color: "bg-destructive/15 text-destructive" },
          { label: "Lucro Líquido", value: "R$ 550.000", change: "+26%", positive: true, icon: DollarSign, color: "bg-primary/15 text-primary" },
          { label: "A Receber", value: "R$ 269.700", change: "pendente", positive: true, icon: Clock, color: "bg-warning/15 text-warning" },
        ].map((s) => (
          <div key={s.label} className="stat-card rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${s.color}`}>
                <s.icon className="w-4 h-4" />
              </div>
              <div className={`flex items-center gap-1 text-xs font-medium ${s.positive ? "text-success" : "text-destructive"}`}>
                {s.positive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {s.change}
              </div>
            </div>
            <p className="text-xl font-bold text-foreground">{s.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-secondary rounded-lg p-1 w-fit">
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id as typeof tab)}
            className={`px-4 py-1.5 text-sm rounded-md transition-all ${
              tab === t.id
                ? "bg-card text-foreground font-medium shadow-card"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Fluxo de Caixa */}
      {tab === "fluxo" && (
        <div className="stat-card rounded-xl p-5">
          <h3 className="font-semibold text-foreground mb-4">Fluxo de Caixa — Últimos 7 meses</h3>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={fluxoCaixa}>
              <defs>
                <linearGradient id="entradas" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(142 70% 45%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(142 70% 45%)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="saidas" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(0 72% 55%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(0 72% 55%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 18% 18%)" />
              <XAxis dataKey="mes" tick={{ fontSize: 12, fill: "hsl(220 12% 55%)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "hsl(220 12% 55%)" }} axisLine={false} tickLine={false} tickFormatter={v => `R$${(v/1000).toFixed(0)}k`} />
              <Tooltip
                contentStyle={{ background: "hsl(220 22% 10%)", border: "1px solid hsl(220 18% 18%)", borderRadius: "8px", fontSize: "12px" }}
                formatter={(v: number) => [`R$ ${v.toLocaleString('pt-BR')}`, ""]}
              />
              <Area type="monotone" dataKey="entradas" stroke="hsl(142 70% 45%)" strokeWidth={2} fill="url(#entradas)" name="Entradas" />
              <Area type="monotone" dataKey="saidas" stroke="hsl(0 72% 55%)" strokeWidth={2} fill="url(#saidas)" name="Saídas" />
            </AreaChart>
          </ResponsiveContainer>
          <div className="flex items-center gap-6 mt-2">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <div className="w-3 h-0.5 bg-success rounded" /> Entradas
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <div className="w-3 h-0.5 bg-destructive rounded" /> Saídas
            </div>
          </div>
        </div>
      )}

      {/* Contas a Pagar */}
      {tab === "pagar" && (
        <div className="stat-card rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  {["Descrição", "Fornecedor", "Vencimento", "Categoria", "Valor", "Status", ""].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {contasPagar.map(c => {
                  const s = statusPagar[c.status];
                  const Icon = s.icon;
                  return (
                    <tr key={c.id} className="hover:bg-secondary/30 transition-colors">
                      <td className="px-4 py-3 text-sm font-medium text-foreground">{c.descricao}</td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">{c.fornecedor}</td>
                      <td className="px-4 py-3 text-sm text-foreground">{c.vencimento}</td>
                      <td className="px-4 py-3">
                        <span className="text-xs px-2 py-0.5 rounded bg-secondary text-muted-foreground">{c.categoria}</span>
                      </td>
                      <td className="px-4 py-3 text-sm font-semibold text-foreground">{c.valor}</td>
                      <td className="px-4 py-3">
                        <span className={`flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full border font-medium w-fit ${s.className}`}>
                          <Icon className="w-3 h-3" />
                          {s.label}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {c.status !== "paga" && (
                          <button className="text-xs px-3 py-1 rounded-lg bg-success/15 text-success border border-success/20 hover:bg-success/25 transition-colors font-medium">
                            Baixar
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Contas a Receber */}
      {tab === "receber" && (
        <div className="stat-card rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  {["Descrição", "Cliente", "Vencimento", "Parcela", "Valor", "Status", ""].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {contasReceber.map(c => {
                  const s = statusReceber[c.status];
                  return (
                    <tr key={c.id} className="hover:bg-secondary/30 transition-colors">
                      <td className="px-4 py-3 text-sm font-medium text-foreground">{c.descricao}</td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">{c.cliente}</td>
                      <td className="px-4 py-3 text-sm text-foreground">{c.vencimento}</td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">{c.parcelas}</td>
                      <td className="px-4 py-3 text-sm font-semibold text-foreground">{c.valor}</td>
                      <td className="px-4 py-3">
                        <span className={`text-[11px] px-2 py-0.5 rounded-full border font-medium ${s.className}`}>
                          {s.label}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {c.status === "pendente" && (
                          <button className="text-xs px-3 py-1 rounded-lg bg-success/15 text-success border border-success/20 hover:bg-success/25 transition-colors font-medium">
                            Receber
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Salários */}
      {tab === "salarios" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="stat-card rounded-xl p-4">
              <p className="text-xs text-muted-foreground">Total Folha</p>
              <p className="text-2xl font-bold text-foreground mt-1">R$ 16.500</p>
            </div>
            <div className="stat-card rounded-xl p-4">
              <p className="text-xs text-muted-foreground">Pagos</p>
              <p className="text-2xl font-bold text-success mt-1">R$ 6.200</p>
            </div>
            <div className="stat-card rounded-xl p-4">
              <p className="text-xs text-muted-foreground">A Pagar</p>
              <p className="text-2xl font-bold text-warning mt-1">R$ 10.300</p>
            </div>
          </div>
          <div className="stat-card rounded-xl overflow-hidden">
            <div className="px-5 py-4 border-b border-border">
              <h3 className="font-semibold text-foreground">Folha de Pagamento — Março 2026</h3>
            </div>
            <div className="divide-y divide-border">
              {salarios.map(s => {
                const st = statusPagar[s.status];
                const Icon = st.icon;
                return (
                  <div key={s.id} className="flex items-center justify-between px-5 py-4 hover:bg-secondary/30 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center text-sm font-bold text-foreground">
                        {s.descricao.split("—")[1]?.trim().charAt(0) || "F"}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{s.descricao.split("—")[1]?.trim()}</p>
                        <p className="text-xs text-muted-foreground">Vencimento: {s.vencimento}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold text-foreground">{s.valor}</span>
                      <span className={`flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full border font-medium ${st.className}`}>
                        <Icon className="w-3 h-3" />
                        {st.label}
                      </span>
                      {s.status !== "paga" && (
                        <button className="text-xs px-3 py-1.5 rounded-lg gradient-gold text-primary-foreground font-medium hover:opacity-90 transition-opacity">
                          Pagar
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
