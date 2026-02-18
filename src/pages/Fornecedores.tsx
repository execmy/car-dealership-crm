import { useState } from "react";
import { Search, Plus, Phone, Mail, Globe, Star, Package, ChevronRight } from "lucide-react";

const fornecedores = [
  {
    id: 1, nome: "Auto Import Brasil", cnpj: "12.345.678/0001-90", categoria: "Importação",
    contato: "Paulo Henrique", email: "paulo@autoimport.com.br", telefone: "(11) 3344-5566",
    cidade: "São Paulo, SP", rating: 5, status: "ativo", pedidosMes: 8, valorMes: "R$ 2.1M",
    produtos: ["Veículos Importados", "Peças", "Acessórios"],
  },
  {
    id: 2, nome: "Seguradora Porto Seguro", cnpj: "61.198.164/0001-60", categoria: "Seguro",
    contato: "Maria Santos", email: "comercial@portoseguro.com.br", telefone: "(11) 3003-9048",
    cidade: "São Paulo, SP", rating: 4, status: "ativo", pedidosMes: 1, valorMes: "R$ 8.500",
    produtos: ["Seguro de Estoque", "Seguro Frota"],
  },
  {
    id: 3, nome: "Auto Service Mecânica", cnpj: "78.901.234/0001-12", categoria: "Manutenção",
    contato: "Carlos Brito", email: "carlos@autoservice.com", telefone: "(11) 2234-8877",
    cidade: "São Paulo, SP", rating: 4, status: "ativo", pedidosMes: 4, valorMes: "R$ 15.200",
    produtos: ["Manutenção Preventiva", "Revisão", "Funilaria"],
  },
  {
    id: 4, nome: "Banco Votorantim", cnpj: "59.588.111/0001-03", categoria: "Financiamento",
    contato: "Renata Alves", email: "renata@bv.com.br", telefone: "(11) 4000-1234",
    cidade: "São Paulo, SP", rating: 5, status: "ativo", pedidosMes: 12, valorMes: "R$ 850.000",
    produtos: ["Financiamento PF", "Financiamento PJ", "Consórcio"],
  },
  {
    id: 5, nome: "Tech Detailing", cnpj: "23.456.789/0001-45", categoria: "Serviços",
    contato: "André Lima", email: "contato@techdetailing.com", telefone: "(11) 9988-7766",
    cidade: "São Paulo, SP", rating: 3, status: "inativo", pedidosMes: 0, valorMes: "R$ 0",
    produtos: ["Polimento", "Higienização", "Cristalização"],
  },
  {
    id: 6, nome: "Grupo Caoa", cnpj: "60.782.502/0001-71", categoria: "Distribuidor",
    contato: "Luís Faria", email: "luisfaria@caoa.com.br", telefone: "(11) 5566-3344",
    cidade: "São Paulo, SP", rating: 5, status: "ativo", pedidosMes: 15, valorMes: "R$ 4.8M",
    produtos: ["Hyundai", "Chery", "Caoa Chery"],
  },
];

const categoriaColors: Record<string, string> = {
  Importação: "bg-indigo-900/30 text-indigo-300 border-indigo-800/30",
  Seguro: "bg-blue-900/30 text-blue-300 border-blue-800/30",
  Manutenção: "bg-orange-900/30 text-orange-300 border-orange-800/30",
  Financiamento: "bg-emerald-900/30 text-emerald-300 border-emerald-800/30",
  Serviços: "bg-purple-900/30 text-purple-300 border-purple-800/30",
  Distribuidor: "bg-yellow-900/30 text-yellow-300 border-yellow-800/30",
};

export default function Fornecedores() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<typeof fornecedores[0] | null>(null);
  const [statusFilter, setStatusFilter] = useState("todos");

  const filtered = fornecedores.filter(f => {
    const matchSearch = f.nome.toLowerCase().includes(search.toLowerCase()) ||
      f.categoria.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "todos" || f.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="flex gap-4" style={{ minHeight: "calc(100vh - 120px)" }}>
      <div className={`flex flex-col ${selected ? "hidden lg:flex lg:w-1/2 xl:w-2/3" : "w-full"} space-y-4`}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Fornecedores</h1>
            <p className="text-sm text-muted-foreground mt-1">{fornecedores.length} fornecedores cadastrados</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg gradient-gold text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity shadow-gold">
            <Plus className="w-4 h-4" />
            Novo Fornecedor
          </button>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar por nome ou categoria..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm bg-secondary border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <div className="flex gap-2">
            {["todos", "ativo", "inativo"].map(s => (
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map(f => (
            <div
              key={f.id}
              onClick={() => setSelected(selected?.id === f.id ? null : f)}
              className={`stat-card rounded-xl p-4 cursor-pointer transition-all ${selected?.id === f.id ? "border-primary/40 bg-primary/5" : ""}`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-base font-bold text-foreground flex-shrink-0">
                    {f.nome.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-sm">{f.nome}</h3>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded border font-medium ${categoriaColors[f.categoria] || "bg-secondary text-muted-foreground border-border"}`}>
                      {f.categoria}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`w-3 h-3 ${i < f.rating ? "text-primary fill-primary" : "text-muted-foreground"}`} />
                  ))}
                </div>
              </div>

              <div className="space-y-1.5 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 flex-shrink-0" />
                  <span className="truncate">{f.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>{f.telefone}</span>
                </div>
              </div>

              <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                <div>
                  <p className="text-xs text-muted-foreground">Pedidos/mês</p>
                  <p className="text-sm font-semibold text-foreground">{f.pedidosMes}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">Volume/mês</p>
                  <p className="text-sm font-semibold text-primary">{f.valorMes}</p>
                </div>
                <span className={`text-[11px] px-2 py-0.5 rounded-full border font-medium ${
                  f.status === "ativo" ? "bg-success/15 text-success border-success/20" : "bg-muted text-muted-foreground border-border"
                }`}>
                  {f.status === "ativo" ? "Ativo" : "Inativo"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail */}
      {selected && (
        <div className="w-full lg:w-1/2 xl:w-1/3 stat-card rounded-xl overflow-auto scrollbar-thin animate-fade-in flex-shrink-0">
          <div className="p-5 border-b border-border flex items-center justify-between">
            <h3 className="font-semibold text-foreground">Detalhes do Fornecedor</h3>
            <button onClick={() => setSelected(null)} className="text-xs text-muted-foreground hover:text-foreground">✕ Fechar</button>
          </div>
          <div className="p-5 space-y-5">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center text-xl font-bold text-foreground flex-shrink-0">
                {selected.nome.charAt(0)}
              </div>
              <div>
                <h2 className="font-bold text-foreground">{selected.nome}</h2>
                <p className="text-xs text-muted-foreground mt-0.5">CNPJ: {selected.cnpj}</p>
                <span className={`text-[10px] px-1.5 py-0.5 rounded border font-medium ${categoriaColors[selected.categoria] || ""}`}>
                  {selected.categoria}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Contato</p>
              {[
                { icon: Mail, value: selected.email },
                { icon: Phone, value: selected.telefone },
                { icon: Globe, value: selected.cidade },
              ].map(({ icon: Icon, value }) => (
                <div key={value} className="flex items-center gap-2 text-sm text-foreground">
                  <Icon className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
                  {value}
                </div>
              ))}
              <div className="flex items-center gap-2 text-sm text-foreground">
                <span className="text-xs text-muted-foreground">Responsável:</span>
                {selected.contato}
              </div>
            </div>

            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Produtos/Serviços</p>
              <div className="flex flex-wrap gap-2">
                {selected.produtos.map(p => (
                  <span key={p} className="text-xs px-2 py-1 rounded-lg bg-secondary border border-border text-foreground">
                    {p}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-secondary rounded-lg p-3">
                <p className="text-xs text-muted-foreground">Pedidos/mês</p>
                <p className="text-xl font-bold text-foreground">{selected.pedidosMes}</p>
              </div>
              <div className="bg-secondary rounded-lg p-3">
                <p className="text-xs text-muted-foreground">Volume/mês</p>
                <p className="text-lg font-bold text-primary">{selected.valorMes}</p>
              </div>
            </div>

            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Avaliação</p>
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`w-5 h-5 ${i < selected.rating ? "text-primary fill-primary" : "text-muted-foreground"}`} />
                ))}
                <span className="text-sm text-muted-foreground ml-2">{selected.rating}/5</span>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button className="flex-1 py-2 text-sm rounded-lg gradient-gold text-primary-foreground font-medium hover:opacity-90 transition-opacity">
                Editar
              </button>
              <button className="flex-1 py-2 text-sm rounded-lg bg-secondary border border-border text-foreground font-medium hover:bg-muted transition-colors">
                Novo Pedido
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
