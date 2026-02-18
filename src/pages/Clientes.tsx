import { useState } from "react";
import { Search, Plus, Phone, Mail, MapPin, Car, ChevronRight, Filter, Star } from "lucide-react";

const clientes = [
  {
    id: 1, nome: "Ricardo Mendes", email: "ricardo@email.com", telefone: "(11) 99823-4567",
    cidade: "São Paulo, SP", compras: 3, valorTotal: "R$ 312.000", ultimaCompra: "Jan 2026",
    status: "ativo", rating: 5, preferencia: "SUV",
    historico: [
      { veiculo: "Toyota Corolla 2021", valor: "R$ 88.000", data: "Mar 2023" },
      { veiculo: "Jeep Compass 2022", valor: "R$ 142.000", data: "Jun 2024" },
      { veiculo: "Honda HR-V 2024", valor: "R$ 132.000", data: "Jan 2026" },
    ]
  },
  {
    id: 2, nome: "Fernanda Costa", email: "fernanda@email.com", telefone: "(21) 98765-1234",
    cidade: "Rio de Janeiro, RJ", compras: 1, valorTotal: "R$ 112.000", ultimaCompra: "Fev 2026",
    status: "ativo", rating: 4, preferencia: "Hatch",
    historico: [{ veiculo: "Honda HR-V 2022", valor: "R$ 112.000", data: "Fev 2026" }]
  },
  {
    id: 3, nome: "Marcos Lima", email: "marcos.lima@email.com", telefone: "(31) 97654-3210",
    cidade: "Belo Horizonte, MG", compras: 2, valorTotal: "R$ 393.500", ultimaCompra: "Dez 2025",
    status: "ativo", rating: 5, preferencia: "Pickup",
    historico: [
      { veiculo: "Ford Ranger 2023", valor: "R$ 215.000", data: "Jan 2025" },
      { veiculo: "Jeep Compass 2024", valor: "R$ 178.500", data: "Dez 2025" },
    ]
  },
  {
    id: 4, nome: "Juliana Santos", email: "ju.santos@email.com", telefone: "(41) 96543-2109",
    cidade: "Curitiba, PR", compras: 0, valorTotal: "—", ultimaCompra: "—",
    status: "lead", rating: 3, preferencia: "Sedan",
    historico: []
  },
  {
    id: 5, nome: "Carlos Rocha", email: "carlos.rocha@empresa.com", telefone: "(51) 95432-1098",
    cidade: "Porto Alegre, RS", compras: 4, valorTotal: "R$ 710.000", ultimaCompra: "Fev 2026",
    status: "vip", rating: 5, preferencia: "Coupe",
    historico: []
  },
  {
    id: 6, nome: "Amanda Ferreira", email: "amanda.f@email.com", telefone: "(85) 94321-0987",
    cidade: "Fortaleza, CE", compras: 1, valorTotal: "R$ 95.000", ultimaCompra: "Nov 2025",
    status: "inativo", rating: 3, preferencia: "Sedan",
    historico: [{ veiculo: "Toyota Corolla 2023", valor: "R$ 95.000", data: "Nov 2025" }]
  },
];

const statusConfig: Record<string, { label: string; className: string }> = {
  ativo: { label: "Ativo", className: "bg-success/15 text-success border-success/20" },
  lead: { label: "Lead", className: "bg-accent/15 text-accent border-accent/20" },
  vip: { label: "VIP", className: "bg-primary/15 text-primary border-primary/20" },
  inativo: { label: "Inativo", className: "bg-muted text-muted-foreground border-border" },
};

export default function Clientes() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<typeof clientes[0] | null>(null);
  const [statusFilter, setStatusFilter] = useState("todos");

  const filtered = clientes.filter(c => {
    const matchSearch = c.nome.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "todos" || c.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="flex gap-4 h-full" style={{ minHeight: "calc(100vh - 120px)" }}>
      {/* List */}
      <div className={`flex flex-col ${selected ? "hidden lg:flex lg:w-1/2 xl:w-2/3" : "w-full"} space-y-4`}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Clientes</h1>
            <p className="text-sm text-muted-foreground mt-1">{clientes.length} clientes cadastrados</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg gradient-gold text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity shadow-gold">
            <Plus className="w-4 h-4" />
            Novo Cliente
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar por nome ou e-mail..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm bg-secondary border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <div className="flex gap-2">
            {["todos", "ativo", "lead", "vip", "inativo"].map(s => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-3 py-2 text-xs rounded-lg border transition-colors capitalize ${
                  statusFilter === s
                    ? "bg-primary/20 border-primary/30 text-primary font-medium"
                    : "bg-secondary border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="stat-card rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Cliente</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider hidden md:table-cell">Contato</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider hidden lg:table-cell">Compras</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider hidden xl:table-cell">Total Gasto</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((c) => (
                  <tr
                    key={c.id}
                    onClick={() => setSelected(c)}
                    className={`hover:bg-secondary/30 transition-colors cursor-pointer ${selected?.id === c.id ? "bg-primary/5" : ""}`}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold ${
                          c.status === "vip" ? "gradient-gold text-primary-foreground" : "bg-secondary text-foreground"
                        }`}>
                          {c.nome.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">{c.nome}</p>
                          <p className="text-xs text-muted-foreground">{c.cidade}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <p className="text-xs text-muted-foreground">{c.email}</p>
                      <p className="text-xs text-muted-foreground">{c.telefone}</p>
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      <div className="flex items-center gap-1">
                        <Car className="w-3.5 h-3.5 text-muted-foreground" />
                        <span className="text-sm text-foreground">{c.compras}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden xl:table-cell">
                      <span className="text-sm font-medium text-foreground">{c.valorTotal}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-[11px] px-2 py-0.5 rounded-full border font-medium ${statusConfig[c.status].className}`}>
                        {statusConfig[c.status].label}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Detail Panel */}
      {selected && (
        <div className="w-full lg:w-1/2 xl:w-1/3 stat-card rounded-xl overflow-auto scrollbar-thin animate-fade-in flex-shrink-0">
          <div className="p-5 border-b border-border flex items-center justify-between">
            <h3 className="font-semibold text-foreground">Detalhes do Cliente</h3>
            <button onClick={() => setSelected(null)} className="text-xs text-muted-foreground hover:text-foreground transition-colors">✕ Fechar</button>
          </div>

          <div className="p-5 space-y-5">
            {/* Avatar & name */}
            <div className="flex items-center gap-4">
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-xl font-bold flex-shrink-0 ${
                selected.status === "vip" ? "gradient-gold text-primary-foreground" : "bg-secondary text-foreground"
              }`}>
                {selected.nome.charAt(0)}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-bold text-foreground">{selected.nome}</h2>
                  {selected.status === "vip" && <Star className="w-4 h-4 text-primary fill-primary" />}
                </div>
                <span className={`text-[11px] px-2 py-0.5 rounded-full border font-medium ${statusConfig[selected.status].className}`}>
                  {statusConfig[selected.status].label}
                </span>
              </div>
            </div>

            {/* Contact */}
            <div className="space-y-2">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Contato</p>
              <div className="space-y-2">
                {[
                  { icon: Mail, value: selected.email },
                  { icon: Phone, value: selected.telefone },
                  { icon: MapPin, value: selected.cidade },
                ].map(({ icon: Icon, value }) => (
                  <div key={value} className="flex items-center gap-2 text-sm text-foreground">
                    <Icon className="w-3.5 h-3.5 text-muted-foreground" />
                    {value}
                  </div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-secondary rounded-lg p-3">
                <p className="text-xs text-muted-foreground">Compras</p>
                <p className="text-xl font-bold text-foreground">{selected.compras}</p>
              </div>
              <div className="bg-secondary rounded-lg p-3">
                <p className="text-xs text-muted-foreground">Total Gasto</p>
                <p className="text-lg font-bold text-foreground">{selected.valorTotal}</p>
              </div>
              <div className="bg-secondary rounded-lg p-3">
                <p className="text-xs text-muted-foreground">Preferência</p>
                <p className="text-sm font-semibold text-foreground">{selected.preferencia}</p>
              </div>
              <div className="bg-secondary rounded-lg p-3">
                <p className="text-xs text-muted-foreground">Última Compra</p>
                <p className="text-sm font-semibold text-foreground">{selected.ultimaCompra}</p>
              </div>
            </div>

            {/* History */}
            {selected.historico.length > 0 && (
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">Histórico de Compras</p>
                <div className="space-y-2">
                  {selected.historico.map((h, i) => (
                    <div key={i} className="flex items-center justify-between bg-secondary rounded-lg px-3 py-2.5">
                      <div className="flex items-center gap-2">
                        <Car className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                        <div>
                          <p className="text-xs font-medium text-foreground">{h.veiculo}</p>
                          <p className="text-[11px] text-muted-foreground">{h.data}</p>
                        </div>
                      </div>
                      <span className="text-xs font-semibold text-primary">{h.valor}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-2 pt-2">
              <button className="flex-1 py-2 text-sm rounded-lg gradient-gold text-primary-foreground font-medium hover:opacity-90 transition-opacity">
                Editar
              </button>
              <button className="flex-1 py-2 text-sm rounded-lg bg-secondary border border-border text-foreground font-medium hover:bg-muted transition-colors">
                Nova Venda
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
