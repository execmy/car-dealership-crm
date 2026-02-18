import { useState } from "react";
import { Search, Plus, Car, MapPin, Calendar, Tag, ChevronRight, Filter } from "lucide-react";

const veiculos = [
  { id: 1, marca: "Toyota", modelo: "Corolla XEI", ano: 2023, cor: "Branco Pérola", km: 15200, preco: "R$ 98.500", status: "disponivel", localizacao: "Pátio A - Vaga 12", placa: "ABC-1234", combustivel: "Flex", cambio: "Automático", categoria: "Sedan" },
  { id: 2, marca: "Honda", modelo: "HR-V EXL", ano: 2022, cor: "Cinza Metálico", km: 28000, preco: "R$ 112.000", status: "reservado", localizacao: "Pátio A - Vaga 08", placa: "DEF-5678", combustivel: "Flex", cambio: "CVT", categoria: "SUV" },
  { id: 3, marca: "Jeep", modelo: "Compass Limited", ano: 2024, cor: "Preto Cosmos", km: 3200, preco: "R$ 189.900", status: "disponivel", localizacao: "Pátio B - Vaga 02", placa: "GHI-9012", combustivel: "Flex", cambio: "Automático", categoria: "SUV" },
  { id: 4, marca: "Ford", modelo: "Ranger XLT", ano: 2023, cor: "Prata Lunar", km: 22500, preco: "R$ 218.000", status: "vendido", localizacao: "Saída", placa: "JKL-3456", combustivel: "Diesel", cambio: "Automático", categoria: "Pickup" },
  { id: 5, marca: "Volkswagen", modelo: "Polo TSI", ano: 2023, cor: "Azul Biscay", km: 8100, preco: "R$ 84.900", status: "disponivel", localizacao: "Pátio C - Vaga 05", placa: "MNO-7890", combustivel: "Flex", cambio: "Automático", categoria: "Hatch" },
  { id: 6, marca: "BMW", modelo: "320i Sport", ano: 2022, cor: "Preto Safira", km: 31000, preco: "R$ 298.000", status: "manutencao", localizacao: "Oficina", placa: "PQR-1122", combustivel: "Gasolina", cambio: "Automático", categoria: "Sedan" },
  { id: 7, marca: "Mercedes-Benz", modelo: "GLA 200", ano: 2023, cor: "Branco Polar", km: 19400, preco: "R$ 315.000", status: "disponivel", localizacao: "Pátio B - Vaga 07", placa: "STU-3344", combustivel: "Flex", cambio: "Automático", categoria: "SUV" },
  { id: 8, marca: "Chevrolet", modelo: "Onix Plus LTZ", ano: 2024, cor: "Vermelho Chili", km: 500, preco: "R$ 92.000", status: "disponivel", localizacao: "Pátio A - Vaga 15", placa: "VWX-5566", combustivel: "Flex", cambio: "Automático", categoria: "Sedan" },
];

const statusConfig: Record<string, { label: string; dot: string; className: string }> = {
  disponivel: { label: "Disponível", dot: "bg-success", className: "bg-success/15 text-success border-success/20" },
  reservado: { label: "Reservado", dot: "bg-warning", className: "bg-warning/15 text-warning border-warning/20" },
  vendido: { label: "Vendido", dot: "bg-muted-foreground", className: "bg-muted text-muted-foreground border-border" },
  manutencao: { label: "Manutenção", dot: "bg-destructive", className: "bg-destructive/15 text-destructive border-destructive/20" },
};

const marcaColors: Record<string, string> = {
  Toyota: "bg-red-900/30 text-red-300",
  Honda: "bg-blue-900/30 text-blue-300",
  Jeep: "bg-emerald-900/30 text-emerald-300",
  Ford: "bg-indigo-900/30 text-indigo-300",
  Volkswagen: "bg-cyan-900/30 text-cyan-300",
  BMW: "bg-purple-900/30 text-purple-300",
  "Mercedes-Benz": "bg-slate-700/30 text-slate-300",
  Chevrolet: "bg-yellow-900/30 text-yellow-300",
};

export default function Estoque() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("todos");
  const [view, setView] = useState<"grid" | "table">("grid");
  const [selected, setSelected] = useState<typeof veiculos[0] | null>(null);

  const filtered = veiculos.filter(v => {
    const matchSearch = `${v.marca} ${v.modelo} ${v.placa}`.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "todos" || v.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const counts = {
    total: veiculos.length,
    disponivel: veiculos.filter(v => v.status === "disponivel").length,
    reservado: veiculos.filter(v => v.status === "reservado").length,
    manutencao: veiculos.filter(v => v.status === "manutencao").length,
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Estoque de Veículos</h1>
          <p className="text-sm text-muted-foreground mt-1">{veiculos.length} veículos cadastrados</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg gradient-gold text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity shadow-gold">
          <Plus className="w-4 h-4" />
          Novo Veículo
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: "Total", value: counts.total, color: "text-foreground" },
          { label: "Disponíveis", value: counts.disponivel, color: "text-success" },
          { label: "Reservados", value: counts.reservado, color: "text-warning" },
          { label: "Manutenção", value: counts.manutencao, color: "text-destructive" },
        ].map((s) => (
          <div key={s.label} className="stat-card rounded-xl p-4 text-center">
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar por modelo, placa..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm bg-secondary border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {["todos", "disponivel", "reservado", "manutencao", "vendido"].map(s => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-2 text-xs rounded-lg border transition-colors capitalize ${
                statusFilter === s
                  ? "bg-primary/20 border-primary/30 text-primary font-medium"
                  : "bg-secondary border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {statusConfig[s]?.label || "Todos"}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
        {filtered.map((v) => (
          <div
            key={v.id}
            onClick={() => setSelected(selected?.id === v.id ? null : v)}
            className={`stat-card rounded-xl p-4 cursor-pointer transition-all ${
              selected?.id === v.id ? "border-primary/40 bg-primary/5" : ""
            }`}
          >
            {/* Car Icon Area */}
            <div className="h-28 rounded-lg bg-secondary flex items-center justify-center mb-3 relative overflow-hidden">
              <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-primary to-transparent" />
              <Car className="w-16 h-16 text-muted-foreground" />
              <div className={`absolute top-2 right-2 w-2 h-2 rounded-full ${statusConfig[v.status].dot}`} />
            </div>

            <div className="space-y-2">
              <div className="flex items-start justify-between">
                <div>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${marcaColors[v.marca] || "bg-secondary text-muted-foreground"}`}>
                    {v.marca}
                  </span>
                  <h3 className="font-semibold text-foreground text-sm mt-1">{v.modelo}</h3>
                </div>
                <span className={`text-[11px] px-2 py-0.5 rounded-full border font-medium ${statusConfig[v.status].className}`}>
                  {statusConfig[v.status].label}
                </span>
              </div>

              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{v.ano}</span>
                <span>{v.km.toLocaleString('pt-BR')} km</span>
                <span>{v.cor.split(" ")[0]}</span>
              </div>

              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin className="w-3 h-3 flex-shrink-0" />
                <span className="truncate">{v.localizacao}</span>
              </div>

              <div className="flex items-center justify-between pt-1 border-t border-border">
                <span className="text-sm font-bold text-primary">{v.preco}</span>
                <span className="text-xs text-muted-foreground">{v.placa}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Detail modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm" onClick={() => setSelected(null)}>
          <div className="stat-card rounded-xl p-6 w-full max-w-md animate-fade-in" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-foreground">{selected.marca} {selected.modelo}</h3>
              <button onClick={() => setSelected(null)} className="text-muted-foreground hover:text-foreground">✕</button>
            </div>
            <div className="h-32 rounded-lg bg-secondary flex items-center justify-center mb-4">
              <Car className="w-20 h-20 text-muted-foreground" />
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              {[
                ["Ano", selected.ano],
                ["Km", `${selected.km.toLocaleString('pt-BR')} km`],
                ["Cor", selected.cor],
                ["Placa", selected.placa],
                ["Câmbio", selected.cambio],
                ["Combustível", selected.combustivel],
                ["Categoria", selected.categoria],
                ["Localização", selected.localizacao],
              ].map(([label, value]) => (
                <div key={String(label)} className="bg-secondary rounded-lg px-3 py-2">
                  <p className="text-xs text-muted-foreground">{label}</p>
                  <p className="font-medium text-foreground">{value}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-xl font-bold text-primary">{selected.preco}</span>
              <div className="flex gap-2">
                <button className="px-4 py-2 text-sm rounded-lg bg-secondary border border-border text-foreground font-medium hover:bg-muted transition-colors">Editar</button>
                <button className="px-4 py-2 text-sm rounded-lg gradient-gold text-primary-foreground font-medium hover:opacity-90 transition-opacity">Vender</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
