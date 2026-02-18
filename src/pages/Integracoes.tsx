import { useState } from "react";
import { Zap, CheckCircle, AlertCircle, ExternalLink, Play, Settings, Activity, ArrowRight, Copy, Check } from "lucide-react";

const webhooks = [
  {
    id: 1,
    nome: "Novo Lead → Notificação WhatsApp",
    descricao: "Quando um novo cliente for cadastrado, envia mensagem automática via WhatsApp",
    trigger: "Novo cliente cadastrado",
    acao: "WhatsApp Business API",
    status: "ativo",
    ultimaExecucao: "há 2 minutos",
    execucoes: 1247,
    erros: 3,
    url: "https://n8n.seudominio.com/webhook/novo-lead",
  },
  {
    id: 2,
    nome: "Venda Fechada → Email Parabéns",
    descricao: "Ao fechar uma venda, envia e-mail de parabéns personalizado ao cliente",
    trigger: "Status do lead = Fechado",
    acao: "SMTP / Gmail",
    status: "ativo",
    ultimaExecucao: "há 15 minutos",
    execucoes: 342,
    erros: 0,
    url: "https://n8n.seudominio.com/webhook/venda-fechada",
  },
  {
    id: 3,
    nome: "Conta Vencendo → Alerta Financeiro",
    descricao: "3 dias antes do vencimento, alerta a equipe financeira por Telegram",
    trigger: "Vencimento em 3 dias",
    acao: "Telegram Bot",
    status: "ativo",
    ultimaExecucao: "há 1 hora",
    execucoes: 89,
    erros: 1,
    url: "https://n8n.seudominio.com/webhook/alerta-financeiro",
  },
  {
    id: 4,
    nome: "Estoque Baixo → Requisição Compra",
    descricao: "Quando um modelo específico tiver menos de 2 unidades, cria requisição automática",
    trigger: "Estoque < 2 unidades",
    acao: "E-mail + Planilha Google",
    status: "pausado",
    ultimaExecucao: "há 3 dias",
    execucoes: 24,
    erros: 0,
    url: "https://n8n.seudominio.com/webhook/estoque-baixo",
  },
  {
    id: 5,
    nome: "Follow-up Automático",
    descricao: "7 dias sem contato → envia lembrete automático para o vendedor responsável",
    trigger: "Lead inativo há 7 dias",
    acao: "Slack + WhatsApp",
    status: "rascunho",
    ultimaExecucao: "—",
    execucoes: 0,
    erros: 0,
    url: "",
  },
];

const statusConfig: Record<string, { label: string; className: string; dot: string }> = {
  ativo: { label: "Ativo", className: "bg-success/15 text-success border-success/20", dot: "bg-success" },
  pausado: { label: "Pausado", className: "bg-warning/15 text-warning border-warning/20", dot: "bg-warning" },
  rascunho: { label: "Rascunho", className: "bg-muted text-muted-foreground border-border", dot: "bg-muted-foreground" },
};

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button onClick={handleCopy} className="text-muted-foreground hover:text-foreground transition-colors">
      {copied ? <Check className="w-3.5 h-3.5 text-success" /> : <Copy className="w-3.5 h-3.5" />}
    </button>
  );
}

export default function Integracoes() {
  const [tab, setTab] = useState<"automacoes" | "config">("automacoes");

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Integrações N8N</h1>
          <p className="text-sm text-muted-foreground mt-1">Automações e fluxos de trabalho</p>
        </div>
        <a
          href="https://n8n.io"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary border border-border text-sm font-medium text-foreground hover:bg-muted transition-colors"
        >
          <ExternalLink className="w-4 h-4" />
          Abrir N8N
        </a>
      </div>

      {/* Status cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Automações Ativas", value: webhooks.filter(w => w.status === "ativo").length, icon: Zap, color: "text-primary bg-primary/15" },
          { label: "Execuções Totais", value: webhooks.reduce((a, w) => a + w.execucoes, 0).toLocaleString('pt-BR'), icon: Activity, color: "text-success bg-success/15" },
          { label: "Erros (7 dias)", value: webhooks.reduce((a, w) => a + w.erros, 0), icon: AlertCircle, color: "text-destructive bg-destructive/15" },
          { label: "Sucesso", value: "99.7%", icon: CheckCircle, color: "text-accent bg-accent/15" },
        ].map(s => (
          <div key={s.label} className="stat-card rounded-xl p-4">
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-3 ${s.color}`}>
              <s.icon className="w-4 h-4" />
            </div>
            <p className="text-2xl font-bold text-foreground">{s.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Setup guide */}
      <div className="stat-card rounded-xl p-5 border border-primary/20">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg gradient-gold flex items-center justify-center flex-shrink-0">
            <Zap className="w-5 h-5 text-primary-foreground" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-foreground mb-1">Como integrar com N8N</h3>
            <p className="text-sm text-muted-foreground mb-4">Configure seu N8N para receber eventos do CRM via webhooks ou enviar dados via HTTP Request.</p>
            <div className="space-y-3">
              {[
                { step: "1", text: "Configure o URL base do seu N8N na seção Configurações abaixo" },
                { step: "2", text: "Crie um Workflow no N8N com um nó Webhook como trigger" },
                { step: "3", text: "Copie o URL do webhook e cole na automação desejada" },
                { step: "4", text: "Teste a automação clicando em ▶ Executar" },
              ].map(item => (
                <div key={item.step} className="flex items-center gap-3 text-sm">
                  <div className="w-6 h-6 rounded-full gradient-gold flex items-center justify-center text-xs font-bold text-primary-foreground flex-shrink-0">
                    {item.step}
                  </div>
                  <span className="text-foreground">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-secondary rounded-lg p-1 w-fit">
        {[{ id: "automacoes", label: "Automações" }, { id: "config", label: "Configurações" }].map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id as typeof tab)}
            className={`px-4 py-1.5 text-sm rounded-md transition-all ${
              tab === t.id ? "bg-card text-foreground font-medium shadow-card" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Automações */}
      {tab === "automacoes" && (
        <div className="space-y-3">
          {webhooks.map(w => {
            const s = statusConfig[w.status];
            return (
              <div key={w.id} className="stat-card rounded-xl p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <div className={`mt-0.5 w-2.5 h-2.5 rounded-full flex-shrink-0 ${s.dot} ${w.status === "ativo" ? "animate-pulse-gold" : ""}`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-semibold text-foreground text-sm">{w.nome}</h3>
                        <span className={`text-[11px] px-2 py-0.5 rounded-full border font-medium ${s.className}`}>{s.label}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{w.descricao}</p>

                      <div className="flex items-center gap-3 mt-2 flex-wrap text-xs">
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <span className="font-medium text-foreground">{w.trigger}</span>
                          <ArrowRight className="w-3 h-3" />
                          <span className="font-medium text-foreground">{w.acao}</span>
                        </div>
                      </div>

                      {w.url && (
                        <div className="flex items-center gap-2 mt-2 bg-secondary rounded-md px-2 py-1.5 w-fit max-w-full">
                          <span className="text-[11px] text-muted-foreground font-mono truncate">{w.url}</span>
                          <CopyButton text={w.url} />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2 flex-shrink-0">
                    <div className="flex items-center gap-1">
                      <button className="p-1.5 rounded-md hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors" title="Configurar">
                        <Settings className="w-3.5 h-3.5" />
                      </button>
                      {w.status !== "rascunho" && (
                        <button className="p-1.5 rounded-md hover:bg-success/15 text-muted-foreground hover:text-success transition-colors" title="Executar">
                          <Play className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">{w.execucoes} execuções</p>
                      {w.erros > 0 && <p className="text-[11px] text-destructive">{w.erros} erros</p>}
                      <p className="text-[11px] text-muted-foreground">{w.ultimaExecucao}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          <button className="w-full py-3 border border-dashed border-border rounded-xl text-sm text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors flex items-center justify-center gap-2">
            <Zap className="w-4 h-4" />
            Nova Automação
          </button>
        </div>
      )}

      {/* Config */}
      {tab === "config" && (
        <div className="stat-card rounded-xl p-5 space-y-4">
          <h3 className="font-semibold text-foreground">Configurações da Integração</h3>
          <div className="space-y-4">
            {[
              { label: "URL do N8N", placeholder: "https://n8n.seudominio.com", type: "text" },
              { label: "API Key do N8N", placeholder: "••••••••••••••••", type: "password" },
              { label: "Webhook Base URL", placeholder: "https://n8n.seudominio.com/webhook", type: "text" },
            ].map(field => (
              <div key={field.label}>
                <label className="block text-xs font-medium text-muted-foreground mb-1.5">{field.label}</label>
                <input
                  type={field.type}
                  placeholder={field.placeholder}
                  className="w-full px-3 py-2 text-sm bg-secondary border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
            ))}
            <div className="flex items-center justify-between pt-2">
              <button className="px-4 py-2 text-sm rounded-lg bg-secondary border border-border text-foreground font-medium hover:bg-muted transition-colors">
                Testar Conexão
              </button>
              <button className="px-4 py-2 text-sm rounded-lg gradient-gold text-primary-foreground font-medium hover:opacity-90 transition-opacity">
                Salvar Configurações
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
