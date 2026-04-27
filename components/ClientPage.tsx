"use client";

import { useEffect, useState } from "react";

/* ══════════════════════════════════════════════════════
   SHARED: Logo Icon (triple chevron arrows)
══════════════════════════════════════════════════════ */

function Arrows({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 90 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path d="M4 4 L24 30 L4 56"  stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M30 4 L50 30 L30 56" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M56 4 L76 30 L56 56" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ══════════════════════════════════════════════════════
   HOOK: scroll-triggered animations
══════════════════════════════════════════════════════ */

function useObserver() {
  useEffect(() => {
    const els = document.querySelectorAll(".observe");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ══════════════════════════════════════════════════════
   NAV
══════════════════════════════════════════════════════ */

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = [
    { href: "#servicos",    label: "Serviços" },
    { href: "#metodologia", label: "Metodologia" },
    { href: "#processo",    label: "Processo" },
    { href: "#maturidade",  label: "Maturidade" },
  ];

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "glass-nav py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <Arrows className="w-9 h-6 text-[#0000ff] transition-transform duration-300 group-hover:translate-x-0.5" />
          <span className="text-white font-black text-xl tracking-tight leading-none">
            <span className="text-[#0000ff]">N</span>extPlatform
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-white/60 hover:text-white text-sm font-medium transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contato"
            className="bg-[#0000ff] hover:bg-[#0000cc] text-white text-sm font-bold px-5 py-2.5 rounded-full transition-all duration-200 hover:scale-105 hover:shadow-[0_0_20px_rgba(0,0,255,0.4)]"
          >
            Falar com CEO
          </a>
        </div>

        {/* Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-1"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          <span className={`block w-6 h-0.5 bg-white origin-center transition-all duration-300 ${open ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${open ? "opacity-0 scale-x-0" : ""}`} />
          <span className={`block w-6 h-0.5 bg-white origin-center transition-all duration-300 ${open ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden glass-nav border-t border-white/10 px-6 py-5 flex flex-col gap-4">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-white/70 text-base font-medium" onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
          <a href="#contato" className="bg-[#0000ff] text-white font-bold px-5 py-3.5 rounded-full text-center mt-2" onClick={() => setOpen(false)}>
            Falar com CEO
          </a>
        </div>
      )}
    </nav>
  );
}

/* ══════════════════════════════════════════════════════
   HERO
══════════════════════════════════════════════════════ */

function Hero() {
  return (
    <section className="relative min-h-screen bg-[#0a0a0a] flex items-center overflow-hidden">
      {/* Background decorations */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <Arrows className="absolute top-16 right-10 w-48 h-32 text-white/[0.025] animate-float" />
        <Arrows className="absolute top-1/2 right-4  w-28 h-18 text-[#0000ff]/10  animate-float-2" />
        <Arrows className="absolute bottom-24 right-1/3 w-36 h-24 text-white/[0.02] animate-float-slow" />
        <Arrows className="absolute top-1/3 left-2  w-20 h-14 text-[#0000ff]/[0.07] animate-float-2" />
        {/* Glow */}
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-[#0000ff]/[0.05] rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-[300px] h-[300px] bg-[#0000ff]/[0.04] rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 pt-28 pb-20 w-full">
        <div className="max-w-4xl">
          {/* Tag */}
          <div className="inline-flex items-center gap-2 bg-[#0000ff]/10 border border-[#0000ff]/30 rounded-full px-4 py-1.5 mb-10">
            <span className="w-2 h-2 rounded-full bg-[#0000ff] animate-pulse-dot" />
            <span className="text-[#0000ff] text-sm font-semibold">Kanban Maturity Model</span>
          </div>

          {/* Headline */}
          <h1 className="text-[clamp(3rem,9vw,6rem)] font-black text-white leading-[0.92] tracking-tight mb-8">
            Vamos
            <br />
            transformar
            <br />
            sua <span className="text-[#0000ff]">Ideia</span>
            <br />
            em Realidade
          </h1>

          {/* Sub */}
          <p className="text-white/45 text-lg md:text-xl max-w-lg mb-12 leading-relaxed">
            Metodologia comprovada para entregar software de qualidade em{" "}
            <span className="text-white font-semibold">1 a 2 semanas</span>.
            Da descoberta ao deploy com previsibilidade total.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#metodologia"
              className="inline-flex items-center justify-center gap-2.5 bg-[#0000ff] hover:bg-[#0000cc] text-white font-bold px-8 py-4 rounded-full transition-all duration-200 hover:scale-105 hover:shadow-[0_0_32px_rgba(0,0,255,0.45)] text-base"
            >
              Conhecer Metodologia
              <Arrows className="w-5 h-3" />
            </a>
            <a
              href="#contato"
              className="inline-flex items-center justify-center gap-2 bg-transparent hover:bg-white/5 text-white border border-white/20 hover:border-white/40 font-bold px-8 py-4 rounded-full transition-all duration-200 text-base"
            >
              Falar com Gerson →
            </a>
          </div>

          {/* Stats */}
          <div className="flex gap-10 mt-16 pt-10 border-t border-white/10">
            {[
              { value: "1–2", label: "Semanas p/ entrega" },
              { value: "7",   label: "Frentes de serviço" },
              { value: "3",   label: "Níveis de maturidade" },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-3xl font-black text-white">{s.value}</div>
                <div className="text-white/35 text-xs mt-1 font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/25">
        <span className="text-[10px] tracking-[0.2em] uppercase font-medium">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-white/25 to-transparent" />
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   SERVICES
══════════════════════════════════════════════════════ */

const SERVICES = [
  { n: "01", icon: "🔍", title: "Product Discovery",       desc: "Imersão no problema, estudo de público-alvo e definição de hipóteses com Matriz CSD." },
  { n: "02", icon: "📊", title: "Gestão de Projetos",       desc: "Portfolio omnichannel com Design Sprint, Design Thinking e alinhamento executivo." },
  { n: "03", icon: "💡", title: "Open Innovation",          desc: "Hackathons, Science Fair, conexão com Labs e fundos de investimento." },
  { n: "04", icon: "⭐", title: "Customer Success (NPS)",   desc: "Gestão de times com NPS, melhoria contínua da metodologia e alinhamento de expectativas." },
  { n: "05", icon: "🚀", title: "Entrega de Tecnologia",    desc: "Apps, Web, Cloud, integrações e chatbots com qualidade embutida no desenvolvimento." },
  { n: "06", icon: "☁️", title: "DevOps & Cloud",           desc: "Sustentação, monitoria, gestão de configuração, CI/CD pipeline e infraestrutura." },
  { n: "07", icon: "🧠", title: "Dados & Open IA",          desc: "Analytics, KPIs, métricas de fluxo e inteligência artificial aplicada ao negócio." },
];

function Services() {
  return (
    <section id="servicos" className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="observe">
            <span className="text-[#0000ff] text-xs font-bold uppercase tracking-[0.18em]">O que oferecemos</span>
            <h2 className="text-5xl md:text-6xl font-black text-[#0a0a0a] mt-3 leading-tight">
              7 frentes de
              <br />
              transformação
            </h2>
          </div>
          <p className="observe d2 text-[#0a0a0a]/45 max-w-xs text-sm leading-relaxed">
            Da estratégia ao deploy, entregamos valor em cada etapa da jornada digital da sua empresa.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {SERVICES.map((s, i) => (
            <div
              key={s.n}
              className={`observe d${Math.min(i + 1, 7)} svc-card rounded-2xl p-7 cursor-default
                ${i === 0 ? "bg-[#0000ff] !border-transparent" : "bg-[#0a0a0a]/[0.025]"}`}
            >
              <span className="text-3xl mb-5 block">{s.icon}</span>
              <span className={`text-[10px] font-black uppercase tracking-widest mb-1 block ${i === 0 ? "text-white/50" : "text-[#0000ff]"}`}>
                {s.n}
              </span>
              <h3 className={`text-base font-black mb-2 leading-snug ${i === 0 ? "text-white" : "text-[#0a0a0a]"}`}>
                {s.title}
              </h3>
              <p className={`text-sm leading-relaxed ${i === 0 ? "text-white/65" : "text-[#0a0a0a]/45"}`}>
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   METHODOLOGY LEVELS
══════════════════════════════════════════════════════ */

const LEVELS = [
  {
    tag: "Nível 1",
    title: "Outsourcing",
    sub: "Focado em Times",
    dark: true,
    blue: false,
    features: ["Kanban Board de Delivery", "Transparência emergente", "Competência & iniciativa", "PS Manager + Squad Lead", "Tech Lead + Delivery Team"],
    result: "Processo emergente",
  },
  {
    tag: "Nível 2",
    title: "Squad Digital",
    sub: "Orientado ao Consumidor",
    dark: false,
    blue: true,
    features: ["Discovery + Delivery Board", "Ritos com cadência fixa", "Qualidade embutida (BDD)", "UX + Product Manager", "Customer awareness"],
    result: "Delivery previsível",
  },
  {
    tag: "Nível 3",
    title: "Success Way",
    sub: "Ajustado ao Propósito",
    dark: true,
    blue: false,
    features: ["Kanban Board aprimorado", "OKRs + Métricas de fluxo", "Roadmap + Release Plan", "Service Design + Growth", "Processo consistente"],
    result: "Antifrágil",
  },
];

function Methodology() {
  return (
    <section id="metodologia" className="py-28 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16 observe">
          <span className="text-[#0000ff] text-xs font-bold uppercase tracking-[0.18em]">Metodologia KMM</span>
          <h2 className="text-5xl md:text-6xl font-black text-white mt-3 leading-tight">
            3 níveis de{" "}
            <span className="text-[#0000ff]">maturidade</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {LEVELS.map((lv, i) => (
            <div
              key={lv.tag}
              className={`observe d${i + 1} relative overflow-hidden rounded-2xl p-8 border transition-transform duration-300 hover:scale-[1.015]
                ${lv.blue ? "bg-[#0000ff] border-[#0000ff]" : "bg-white/[0.03] border-white/10"}`}
            >
              {/* Decorative arrows */}
              <Arrows className="absolute -right-5 -bottom-3 w-28 h-18 text-white/[0.06]" />

              <span className={`text-[10px] font-black uppercase tracking-widest block mb-1 ${lv.blue ? "text-white/50" : "text-[#0000ff]"}`}>
                {lv.tag}
              </span>
              <h3 className="text-3xl font-black text-white mt-1">{lv.title}</h3>
              <p className="text-white/45 text-sm mt-1">{lv.sub}</p>

              <ul className="mt-8 space-y-3">
                {lv.features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <span className={`mt-[5px] w-1.5 h-1.5 rounded-full flex-shrink-0 ${lv.blue ? "bg-white/50" : "bg-[#0000ff]"}`} />
                    <span className="text-white/70 text-sm">{f}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 pt-6 border-t border-white/10">
                <span className="text-white/35 text-[10px] uppercase tracking-widest">Resultado</span>
                <p className="text-white font-bold mt-1">{lv.result}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   PRODUCT DISCOVERY PROCESS
══════════════════════════════════════════════════════ */

const STEPS = [
  {
    n: "01",
    title: "Estudo de Público-Alvo",
    desc: "Imersão no problema com desk research e entrevistas qualitativas. Observamos padrões e compilamos personas com a Matriz CSD.",
    items: ["Desk Research", "Entrevistas qualitativas", "Observação de padrões", "Compilação de personas", "Definição de hipóteses"],
  },
  {
    n: "02",
    title: "Escopo de Funcionalidades",
    desc: "Identificamos quem vai usar, em que contexto e hardware. Analisamos o mercado e definimos as funcionalidades-chave que geram valor.",
    items: ["Análise de contexto", "Benchmarking de mercado", "Funcionalidades-chave", "Proposta de valor", "Sustentação técnica"],
  },
  {
    n: "03",
    title: "Montagem do MVP",
    desc: "Customer Journey, Sketch/Wireframe e MVP de Alta Fidelidade com identidade visual para testar hipóteses com usuários reais.",
    items: ["Customer Journey Map", "Sketch & Wireframe", "Protótipo alta fidelidade", "Identidade visual aplicada", "Validação com usuários"],
  },
];

function Process() {
  return (
    <section id="processo" className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-20 observe">
          <span className="text-[#0000ff] text-xs font-bold uppercase tracking-[0.18em]">Metodologia | Fase 1</span>
          <h2 className="text-5xl md:text-6xl font-black text-[#0a0a0a] mt-3 leading-tight">
            Product
            <br />
            Discovery
          </h2>
          <div className="w-14 h-1 bg-[#0000ff] mt-6 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {STEPS.map((s, i) => (
            <div key={s.n} className={`observe d${i + 1}`}>
              <div className="w-16 h-16 rounded-2xl bg-[#0000ff] flex items-center justify-center mb-6">
                <span className="text-white font-black text-xl">{s.n}</span>
              </div>
              <h3 className="text-xl font-black text-[#0a0a0a] mb-4">{s.title}</h3>
              <p className="text-[#0a0a0a]/45 text-sm leading-relaxed mb-6">{s.desc}</p>
              <ul className="space-y-2.5">
                {s.items.map((it) => (
                  <li key={it} className="flex items-center gap-3 text-sm text-[#0a0a0a]/65">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0000ff] flex-shrink-0" />
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   MATURITY SCALE (KMM 0–6)
══════════════════════════════════════════════════════ */

const MAT = [
  { n: 0, label: "Inconsciente",       state: "FRÁGIL",     col: "border-red-400/60",    ring: "bg-red-400/10"    },
  { n: 1, label: "Focado em Times",    state: "FRÁGIL",     col: "border-red-400/60",    ring: "bg-red-400/10"    },
  { n: 2, label: "Orientado ao Cliente", state: "RESILIENTE", col: "border-yellow-400/60", ring: "bg-yellow-400/10" },
  { n: 3, label: "Ajustado ao Propósito", state: "RESILIENTE", col: "border-yellow-400/60", ring: "bg-yellow-400/10" },
  { n: 4, label: "Riscos Protegidos",  state: "ROBUSTO",    col: "border-green-400/70",  ring: "bg-green-400/10"  },
  { n: 5, label: "Líder de Mercado",   state: "ANTIFRÁGIL", col: "border-[#0000ff]/80",  ring: "bg-[#0000ff]/10"  },
  { n: 6, label: "Feita para Durar",   state: "ANTIFRÁGIL", col: "border-[#0000ff]",     ring: "bg-[#0000ff]/15"  },
];

const STATE_COLOR: Record<string, string> = {
  FRÁGIL:     "text-red-400",
  RESILIENTE: "text-yellow-400",
  ROBUSTO:    "text-green-400",
  ANTIFRÁGIL: "text-[#0000ff]",
};

function Maturity() {
  return (
    <section id="maturidade" className="py-28 bg-[#0a0a0a] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16 observe">
          <span className="text-[#0000ff] text-xs font-bold uppercase tracking-[0.18em]">Kanban Maturity Model</span>
          <h2 className="text-5xl md:text-6xl font-black text-white mt-3 leading-tight">
            Modelo de
            <br />
            Maturidade
          </h2>
        </div>

        {/* Gradient bar */}
        <div className="observe hidden md:block h-px w-full rounded-full mb-8 bg-gradient-to-r from-red-400 via-yellow-400 via-green-400 to-[#0000ff] opacity-25" />

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
          {MAT.map((m, i) => (
            <div key={m.n} className={`observe d${Math.min(i + 1, 7)} mat-item text-center p-4 rounded-2xl border ${m.col} ${m.ring} bg-white/[0.02] cursor-default`}>
              <div className={`w-14 h-14 rounded-full border-2 ${m.col} flex items-center justify-center mx-auto mb-3 transition-all duration-300`}>
                <span className="text-xl font-black text-white">{m.n}</span>
              </div>
              <div className={`text-[10px] font-black uppercase tracking-wider mb-1 ${STATE_COLOR[m.state]}`}>{m.state}</div>
              <div className="text-white text-xs font-semibold leading-tight">{m.label}</div>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-5 mt-10 pt-8 border-t border-white/10">
          {[
            { s: "FRÁGIL",     c: "bg-red-400"     },
            { s: "RESILIENTE", c: "bg-yellow-400"   },
            { s: "ROBUSTO",    c: "bg-green-400"    },
            { s: "ANTIFRÁGIL", c: "bg-[#0000ff]"    },
          ].map((x) => (
            <div key={x.s} className="flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full ${x.c}`} />
              <span className="text-white/40 text-xs font-medium">{x.s}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   BENEFITS
══════════════════════════════════════════════════════ */

const BENEFITS = [
  "Prever riscos com antecedência",
  "Adaptação às mudanças de escopo de negócio",
  "Maior qualidade nas entregas",
  "Maior produtividade do time",
  "Ritos de melhoria contínua ao final de cada entrega",
  "Correções de bugs com esforço reduzido",
  "Retorno do investimento em menor tempo",
];

const PIPELINE = [
  "Inception Release Plan",
  "Planning Meeting",
  "Design Sprint",
  "Daily Kanban Meeting",
  "Develop Wrap & Review",
  "Demo Meeting",
  "Deliverable ✓",
];

function Benefits() {
  return (
    <section className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          {/* Left */}
          <div>
            <div className="observe">
              <span className="text-[#0000ff] text-xs font-bold uppercase tracking-[0.18em]">Por que escolher</span>
              <h2 className="text-5xl md:text-6xl font-black text-[#0a0a0a] mt-3 leading-tight">
                Software em{" "}
                <span className="text-[#0000ff]">1–2</span>
                <br />
                semanas
              </h2>
              <div className="w-14 h-1 bg-[#0000ff] mt-6 mb-10 rounded-full" />
            </div>

            <ul className="space-y-4">
              {BENEFITS.map((b, i) => (
                <li key={b} className={`observe d${Math.min(i + 1, 7)} flex items-start gap-4`}>
                  <div className="w-6 h-6 rounded-full bg-[#0000ff] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 12 10">
                      <path d="M1 5L4.5 8.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <span className="text-[#0a0a0a]/65 text-sm leading-relaxed">{b}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right – Pipeline */}
          <div className="observe d2">
            <h3 className="text-xl font-black text-[#0a0a0a] mb-8">Pipeline de entrega</h3>
            <div className="space-y-2">
              {PIPELINE.map((step, i) => (
                <div key={step} className="flex items-center gap-4">
                  <div className="w-9 h-9 rounded-full bg-[#0000ff] flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs font-black">{i + 1}</span>
                  </div>
                  <div className="flex-1 bg-[#0a0a0a]/[0.04] border border-[#0a0a0a]/[0.06] rounded-xl px-4 py-2.5">
                    <span className="text-[#0a0a0a] font-semibold text-sm">{step}</span>
                  </div>
                  {i < PIPELINE.length - 1 && (
                    <svg className="w-4 h-4 text-[#0000ff] flex-shrink-0" fill="none" viewBox="0 0 16 16">
                      <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
              ))}
            </div>

            {/* Dual Track */}
            <div className="mt-8 p-6 rounded-2xl bg-[#0a0a0a]/[0.03] border border-[#0a0a0a]/10">
              <h4 className="text-[#0a0a0a] font-black mb-4 text-sm uppercase tracking-widest">Dual Track</h4>
              <div className="space-y-4">
                <div>
                  <p className="text-[#0000ff] text-[10px] font-black uppercase tracking-widest mb-2">Discovery</p>
                  <div className="flex flex-wrap gap-1.5">
                    {["Backlog", "Priorizado", "Refinamento", "Prototipação", "Técnico"].map((t) => (
                      <span key={t} className="text-[11px] bg-[#0000ff] text-white px-2.5 py-1 rounded-lg font-semibold">{t}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-[#0a0a0a] text-[10px] font-black uppercase tracking-widest mb-2">Delivery</p>
                  <div className="flex flex-wrap gap-1.5">
                    {["P/Dev", "In Progress", "Testing", "Production"].map((t) => (
                      <span key={t} className="text-[11px] bg-[#0a0a0a] text-white px-2.5 py-1 rounded-lg font-semibold">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   CONTACT / FOOTER
══════════════════════════════════════════════════════ */

function Contact() {
  return (
    <section id="contato" className="py-28 bg-[#0a0a0a] relative overflow-hidden">
      {/* Decorations */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <Arrows className="absolute bottom-16 right-10 w-72 h-44 text-white/[0.025] animate-float" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#0000ff]/[0.04] rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">
          <Arrows className="w-14 h-9 text-[#0000ff] mx-auto mb-8 observe" />

          <h2 className="observe text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[0.92] tracking-tight mb-6">
            Vamos transformar
            <br />
            sua <span className="text-[#0000ff]">Ideia</span>
            <br />
            em Realidade
          </h2>

          <p className="observe d2 text-white/35 text-base mb-12 leading-relaxed max-w-md mx-auto">
            Entre em contato com Gerson Alves para iniciar a transformação digital da sua empresa com a metodologia KMM.
          </p>

          <div className="observe d3 flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <a
              href="tel:+351912100755"
              className="inline-flex items-center gap-3 bg-[#0000ff] hover:bg-[#0000cc] text-white font-bold px-10 py-5 rounded-full text-lg transition-all duration-200 hover:scale-105 hover:shadow-[0_0_40px_rgba(0,0,255,0.5)]"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 7V5z" />
              </svg>
              +351 912 100 755
            </a>
            <a
              href="#servicos"
              className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm font-medium transition-colors"
            >
              Ver serviços →
            </a>
          </div>

          {/* CEO card */}
          <div className="observe d4 inline-flex items-center gap-4 bg-white/[0.04] border border-white/10 rounded-2xl px-6 py-4">
            <div className="w-12 h-12 rounded-full bg-[#0000ff] flex items-center justify-center">
              <span className="text-white font-black text-lg">G</span>
            </div>
            <div className="text-left">
              <p className="text-white font-bold">Gerson Alves</p>
              <p className="text-white/40 text-sm">CEO • NextPlatform</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer bar */}
      <div className="relative max-w-7xl mx-auto px-6 mt-24 pt-8 border-t border-white/10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <a href="#" className="flex items-center gap-2.5">
            <Arrows className="w-7 h-5 text-[#0000ff]" />
            <span className="text-white font-black text-lg tracking-tight">
              <span className="text-[#0000ff]">N</span>extPlatform
            </span>
          </a>
          <p className="text-white/25 text-sm">
            © {new Date().getFullYear()} NextPlatform. Todos os direitos reservados.
          </p>
          <div className="flex gap-6">
            {["Serviços", "Metodologia", "Contato"].map((l) => (
              <a key={l} href={`#${l.toLowerCase()}`} className="text-white/25 hover:text-white/60 text-sm transition-colors">
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   ROOT EXPORT
══════════════════════════════════════════════════════ */

export default function ClientPage() {
  useObserver();

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Services />
        <Methodology />
        <Process />
        <Maturity />
        <Benefits />
        <Contact />
      </main>
    </>
  );
}
