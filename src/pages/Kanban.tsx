import { useState } from "react";
import { Plus, MoreHorizontal, Car, User, Calendar, DollarSign, Tag } from "lucide-react";

interface Card {
  id: number;
  title: string;
  client: string;
  vehicle: string;
  value: string;
  date: string;
  priority: "alta" | "media" | "baixa";
  avatar: string;
}

interface Column {
  id: string;
  title: string;
  color: string;
  cards: Card[];
}

const initialColumns: Column[] = [
  {
    id: "prospeccao",
    title: "Prospecção",
    color: "bg-muted-foreground",
    cards: [
      { id: 1, title: "Interesse em SUV compacto", client: "Beatriz Moura", vehicle: "Honda HR-V 2023", value: "R$ 115.000", date: "15 Fev", priority: "baixa", avatar: "B" },
      { id: 2, title: "Troca de pickup antiga", client: "Rafael Souza", vehicle: "Ford Ranger 2024", value: "R$ 230.000", date: "18 Fev", priority: "media", avatar: "R" },
      { id: 3, title: "Primeiro carro novo", client: "Letícia Farias", vehicle: "VW Polo 2024", value: "R$ 88.000", date: "20 Fev", priority: "baixa", avatar: "L" },
    ]
  },
  {
    id: "contato",
    title: "Primeiro Contato",
    color: "bg-accent",
    cards: [
      { id: 4, title: "Test drive agendado", client: "Rodrigo Pinto", vehicle: "Toyota Corolla 2024", value: "R$ 102.000", date: "14 Fev", priority: "media", avatar: "R" },
      { id: 5, title: "Simulação de financiamento", client: "Cláudia Neves", vehicle: "Jeep Renegade 2023", value: "R$ 142.000", date: "16 Fev", priority: "alta", avatar: "C" },
    ]
  },
  {
    id: "proposta",
    title: "Proposta Enviada",
    color: "bg-warning",
    cards: [
      { id: 6, title: "Negociação entrada + parcelas", client: "Gustavo Lima", vehicle: "BMW X1 2022", value: "R$ 285.000", date: "12 Fev", priority: "alta", avatar: "G" },
      { id: 7, title: "Aguardando aprovação crédito", client: "Sandra Melo", vehicle: "Chevrolet Onix 2024", value: "R$ 72.000", date: "13 Fev", priority: "media", avatar: "S" },
      { id: 8, title: "Contra-proposta recebida", client: "Fábio Azevedo", vehicle: "Mercedes GLA 2023", value: "R$ 318.000", date: "15 Fev", priority: "alta", avatar: "F" },
    ]
  },
  {
    id: "negociacao",
    title: "Em Negociação",
    color: "bg-primary",
    cards: [
      { id: 9, title: "Definindo extras e adicionais", client: "Patrícia Ramos", vehicle: "Jeep Compass 2024", value: "R$ 185.000", date: "11 Fev", priority: "alta", avatar: "P" },
      { id: 10, title: "Aguardando aprovação gerente", client: "Lucas Barros", vehicle: "Ford Mustang 2022", value: "R$ 420.000", date: "10 Fev", priority: "alta", avatar: "L" },
    ]
  },
  {
    id: "fechado",
    title: "Fechado",
    color: "bg-success",
    cards: [
      { id: 11, title: "Venda concluída com sucesso", client: "Ricardo Mendes", vehicle: "Toyota Corolla 2023", value: "R$ 95.000", date: "08 Fev", priority: "media", avatar: "R" },
      { id: 12, title: "Entrega agendada para 20/02", client: "Marcos Lima", vehicle: "Jeep Compass 2024", value: "R$ 178.500", date: "07 Fev", priority: "baixa", avatar: "M" },
      { id: 13, title: "Documentação em processamento", client: "Carlos Rocha", vehicle: "BMW 320i", value: "R$ 298.000", date: "05 Fev", priority: "media", avatar: "C" },
    ]
  },
];

const priorityConfig = {
  alta: { label: "Alta", className: "bg-destructive/15 text-destructive border-destructive/20" },
  media: { label: "Média", className: "bg-warning/15 text-warning border-warning/20" },
  baixa: { label: "Baixa", className: "bg-success/15 text-success border-success/20" },
};

function KanbanCard({ card }: { card: Card }) {
  const p = priorityConfig[card.priority];
  return (
    <div className="kanban-card rounded-lg p-3 cursor-grab active:cursor-grabbing">
      <div className="flex items-start justify-between mb-2">
        <h4 className="text-sm font-medium text-foreground leading-tight pr-2">{card.title}</h4>
        <button className="text-muted-foreground hover:text-foreground transition-colors flex-shrink-0">
          <MoreHorizontal className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="space-y-1.5 text-xs text-muted-foreground mb-3">
        <div className="flex items-center gap-1.5">
          <User className="w-3 h-3 flex-shrink-0" />
          <span className="truncate">{card.client}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Car className="w-3 h-3 flex-shrink-0 text-primary" />
          <span className="truncate text-foreground/80">{card.vehicle}</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 text-xs font-semibold text-primary">
          <DollarSign className="w-3 h-3" />
          {card.value}
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
            <Calendar className="w-3 h-3" />
            {card.date}
          </div>
          <span className={`text-[10px] px-1.5 py-0.5 rounded-full border font-medium ${p.className}`}>
            {p.label}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function Kanban() {
  const [columns] = useState<Column[]>(initialColumns);

  const totalValue = initialColumns.flatMap(c => c.cards).reduce((acc, card) => {
    const v = parseFloat(card.value.replace(/[^0-9]/g, ""));
    return acc + v;
  }, 0);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Pipeline de Vendas</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {initialColumns.flatMap(c => c.cards).length} negociações · 
            Pipeline total: <span className="text-primary font-medium">R$ {(totalValue / 1000).toFixed(0)}K</span>
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg gradient-gold text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity shadow-gold">
          <Plus className="w-4 h-4" />
          Nova Oportunidade
        </button>
      </div>

      {/* Board */}
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin">
        {columns.map((col) => (
          <div key={col.id} className="flex-shrink-0 w-72">
            {/* Column Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className={`w-2.5 h-2.5 rounded-full ${col.color}`} />
                <span className="text-sm font-semibold text-foreground">{col.title}</span>
                <span className="text-xs text-muted-foreground bg-secondary rounded-full px-2 py-0.5">
                  {col.cards.length}
                </span>
              </div>
              <button className="text-muted-foreground hover:text-foreground transition-colors">
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Column value */}
            <div className="mb-2 px-1">
              <span className="text-xs text-muted-foreground">
                Total: <span className="text-foreground font-medium">
                  R$ {(col.cards.reduce((a, c) => a + parseFloat(c.value.replace(/[^0-9]/g, "")), 0) / 1000).toFixed(0)}K
                </span>
              </span>
            </div>

            {/* Cards */}
            <div className="space-y-2.5 min-h-32">
              {col.cards.map(card => (
                <KanbanCard key={card.id} card={card} />
              ))}
            </div>

            {/* Add card */}
            <button className="w-full mt-3 py-2 text-xs text-muted-foreground hover:text-foreground border border-dashed border-border hover:border-primary/30 rounded-lg transition-colors flex items-center justify-center gap-1">
              <Plus className="w-3 h-3" />
              Adicionar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
