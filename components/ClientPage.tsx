"use client";

import { useEffect, useState } from "react";

// ─── Logo ─────────────────────────────────────────────────────────────────────

function Arrows({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 90 60" fill="none" aria-hidden>
      <path d="M4 4 L24 30 L4 56"  stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M30 4 L50 30 L30 56" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M56 4 L76 30 L56 56" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ─── Scroll reveal ────────────────────────────────────────────────────────────

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("in")),
      { threshold: 0.1, rootMargin: "0px 0px -48px 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

// ─── Nav ──────────────────────────────────────────────────────────────────────

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const links = [
    { href: "#servicos",    label: "Serviços" },
    { href: "#metodologia", label: "Metodologia" },
    { href: "#processo",    label: "Processo" },
    { href: "#maturidade",  label: "Maturidade" },
  ];

  return (
    <>
      <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? "bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-white/[0.06]" : "bg-transparent"}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2 group z-10" onClick={() => setOpen(false)}>
            <Arrows className="w-7 h-5 text-[#0000ff] transition-transform duration-200 group-hover:translate-x-0.5" />
            <span className="font-black text-white text-[17px] tracking-tight">
              <span className="text-[#0000ff]">N</span>ext<span className="font-light text-white/60">Platform</span>
            </span>
          </a>

          <div className="hidden md:flex items-center gap-7">
            {links.map((l) => (
              <a key={l.href} href={l.href} className="text-white/50 hover:text-white text-sm font-medium transition-colors duration-150">
                {l.label}
              </a>
            ))}
            <a href="#contato" className="bg-[#0000ff] hover:bg-blue-700 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-all duration-200 hover:shadow-[0_0_20px_rgba(0,0,255,0.4)]">
              Falar com CEO
            </a>
          </div>

          <button
            className="md:hidden relative z-10 w-10 h-10 flex flex-col items-center justify-center gap-[5px]"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
          >
            <span className={`block w-5 h-0.5 bg-white origin-center transition-all duration-300 ${open ? "rotate-45 translate-y-[7px]" : ""}`} />
            <span className={`block w-5 h-0.5 bg-white transition-all duration-200 ${open ? "opacity-0 scale-x-0" : ""}`} />
            <span className={`block w-5 h-0.5 bg-white origin-center transition-all duration-300 ${open ? "-rotate-45 -translate-y-[7px]" : ""}`} />
          </button>
        </div>
      </nav>

      {/* Mobile fullscreen drawer */}
      <div className={`md:hidden fixed inset-0 z-40 bg-[#0a0a0a] flex flex-col px-6 pt-24 pb-10 transition-all duration-300 ${open ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-4 pointer-events-none"}`}>
        <nav className="flex-1">
          {links.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="flex items-center justify-between text-3xl font-black text-white/60 hover:text-white py-4 border-b border-white/[0.07] transition-colors"
              style={{ transitionDelay: open ? `${i * 40}ms` : "0ms" }}
            >
              {l.label}
              <span className="text-white/20 text-lg">→</span>
            </a>
          ))}
        </nav>
        <a
          href="#contato"
          onClick={() => setOpen(false)}
          className="block bg-[#0000ff] text-white font-bold text-lg text-center py-4 rounded-2xl mt-8"
        >
          Falar com CEO
        </a>
        <a
          href="https://wa.me/351912100755"
          onClick={() => setOpen(false)}
          className="block mt-3 text-center text-white/40 text-sm py-2"
        >
          +351 912 100 755
        </a>
      </div>
    </>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="min-h-[100dvh] bg-[#0a0a0a] flex flex-col justify-center relative overflow-hidden">
      {/* BG glows */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute top-1/3 right-0 w-64 sm:w-96 lg:w-[500px] aspect-square bg-[#0000ff]/[0.07] rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-48 sm:w-72 aspect-square bg-[#0000ff]/[0.04] rounded-full blur-3xl" />
        {/* Grid texture */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)", backgroundSize: "64px 64px" }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 w-full pt-24 pb-16 sm:pt-28 sm:pb-20">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-[#0000ff]/10 border border-[#0000ff]/30 rounded-full px-4 py-1.5 mb-8 sm:mb-10">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0000ff] animate-pulse" />
            <span className="text-[#0000ff] text-xs font-bold uppercase tracking-widest">Kanban Maturity Model</span>
          </div>

          {/* Headline */}
          <h1 className="text-[2.4rem] leading-[1.08] sm:text-5xl md:text-6xl lg:text-[4.5rem] font-black text-white tracking-tight mb-5 sm:mb-6">
            Vamos transformar
            <br />
            sua <span className="text-[#0000ff]">Ideia</span> em
            <br />
            Realidade
          </h1>

          <p className="text-white/50 text-base sm:text-lg leading-relaxed mb-8 sm:mb-10 max-w-md">
            Software de qualidade entregue em{" "}
            <strong className="text-white font-semibold">1 a 2 semanas</strong>.
            {" "}Da descoberta ao deploy com previsibilidade total.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <a
              href="https://wa.me/351912100755?text=Ol%C3%A1%2C%20vim%20pelo%20site%20e%20quero%20saber%20mais%20sobre%20a%20NextPlatform"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 bg-[#25d366] hover:bg-[#20bb5a] text-white font-bold px-7 py-4 rounded-2xl text-base transition-all duration-200 hover:shadow-[0_0_28px_rgba(37,211,102,0.35)]"
            >
              <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp com CEO
            </a>
            <a
              href="#metodologia"
              className="flex items-center justify-center gap-2 bg-white/[0.06] hover:bg-white/10 text-white border border-white/10 hover:border-white/25 font-semibold px-7 py-4 rounded-2xl text-base transition-all duration-200"
            >
              Ver Metodologia
              <Arrows className="w-4 h-3" />
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 sm:gap-8 mt-12 sm:mt-16 pt-10 border-t border-white/[0.08]">
            {[
              { v: "1–2",  l: "semanas p/ entrega" },
              { v: "7",    l: "frentes de serviço" },
              { v: "KMM",  l: "metodologia ágil"   },
            ].map((s) => (
              <div key={s.l}>
                <div className="text-2xl sm:text-3xl font-black text-white">{s.v}</div>
                <div className="text-white/35 text-[11px] sm:text-xs mt-1 leading-snug">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2 text-white/20">
        <span className="text-[9px] tracking-[0.25em] uppercase">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-white/20 to-transparent" />
      </div>
    </section>
  );
}

// ─── Services ─────────────────────────────────────────────────────────────────

const SERVICES = [
  { n: "01", title: "Product Discovery",    desc: "Imersão no problema, personas com Matriz CSD e definição de hipóteses de valor." },
  { n: "02", title: "Gestão de Projetos",    desc: "Portfolio omnichannel com Design Sprint, Design Thinking e alinhamento executivo." },
  { n: "03", title: "Open Innovation",       desc: "Hackathons, Science Fair, conexão com Labs e fundos de investimento." },
  { n: "04", title: "Customer Success",      desc: "Gestão com NPS, melhoria contínua da metodologia e alinhamento de expectativas." },
  { n: "05", title: "Entrega de Tecnologia", desc: "Apps, Web, Cloud, integrações e chatbots com qualidade embutida." },
  { n: "06", title: "DevOps & Cloud",        desc: "Sustentação, monitoria, CI/CD pipeline e infraestrutura." },
  { n: "07", title: "Dados & Open IA",       desc: "Analytics, KPIs, métricas de fluxo e inteligência artificial aplicada." },
];

function Services() {
  return (
    <section id="servicos" className="py-20 sm:py-28 bg-[#f5f5f5]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="mb-12 sm:mb-16 reveal">
          <span className="text-[#0000ff] text-[11px] font-black uppercase tracking-[0.18em]">O que oferecemos</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0a0a0a] mt-3 leading-tight">
            7 frentes de
            <br />
            transformação
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
          {SERVICES.map((s, i) => (
            <div
              key={s.n}
              className={`reveal group relative rounded-2xl p-6 sm:p-7 cursor-default transition-all duration-300 border
                ${i === 0
                  ? "bg-[#0000ff] border-[#0000ff] sm:col-span-2 lg:col-span-1"
                  : "bg-white border-transparent hover:border-[#0000ff]/20 hover:shadow-[0_4px_24px_rgba(0,0,0,0.08)] hover:-translate-y-0.5"
                }`}
            >
              <span className={`text-[10px] font-black uppercase tracking-[0.2em] block mb-4 ${i === 0 ? "text-white/50" : "text-[#0000ff]"}`}>
                {s.n}
              </span>
              <h3 className={`text-[15px] font-black mb-2.5 leading-snug ${i === 0 ? "text-white" : "text-[#0a0a0a]"}`}>
                {s.title}
              </h3>
              <p className={`text-sm leading-relaxed ${i === 0 ? "text-white/65" : "text-[#0a0a0a]/50"}`}>
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Methodology ──────────────────────────────────────────────────────────────

const LEVELS = [
  {
    tag: "Nível 1", title: "Outsourcing", sub: "Focado em Times",
    features: ["Kanban Board de Delivery", "Transparência emergente", "Competência & iniciativa", "PS Manager + Squad Lead"],
    result: "Processo emergente", highlight: false,
  },
  {
    tag: "Nível 2", title: "Squad Digital", sub: "Orientado ao Consumidor",
    features: ["Discovery + Delivery Board", "Ritos com cadência fixa", "Qualidade embutida (BDD)", "Customer awareness"],
    result: "Delivery previsível", highlight: true,
  },
  {
    tag: "Nível 3", title: "Success Way", sub: "Ajustado ao Propósito",
    features: ["OKRs + Métricas de fluxo", "Roadmap + Release Plan", "Service Design + Growth", "Processo consistente"],
    result: "Antifrágil", highlight: false,
  },
];

function Methodology() {
  return (
    <section id="metodologia" className="py-20 sm:py-28 bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="mb-12 sm:mb-16 reveal">
          <span className="text-[#0000ff] text-[11px] font-black uppercase tracking-[0.18em]">Metodologia KMM</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mt-3 leading-tight">
            3 níveis de{" "}
            <span className="text-[#0000ff]">maturidade</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {LEVELS.map((lv, i) => (
            <div
              key={lv.tag}
              className={`reveal relative overflow-hidden rounded-2xl p-7 sm:p-8 border transition-transform duration-300 hover:scale-[1.01]
                ${lv.highlight ? "bg-[#0000ff] border-[#0000ff]" : "bg-white/[0.04] border-white/10"}`}
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <Arrows className="absolute -right-4 -bottom-2 w-24 h-16 text-white/[0.06]" />

              <span className={`text-[10px] font-black uppercase tracking-[0.2em] block mb-1 ${lv.highlight ? "text-white/50" : "text-[#0000ff]"}`}>
                {lv.tag}
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white mt-1">{lv.title}</h3>
              <p className="text-white/45 text-sm mt-1">{lv.sub}</p>

              <ul className="mt-7 space-y-2.5">
                {lv.features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${lv.highlight ? "bg-white/40" : "bg-[#0000ff]"}`} />
                    <span className="text-white/65 text-sm">{f}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-7 pt-5 border-t border-white/10">
                <span className="text-white/30 text-[10px] uppercase tracking-widest">Resultado</span>
                <p className="text-white font-bold text-sm mt-1">{lv.result}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Process ──────────────────────────────────────────────────────────────────

const STEPS = [
  {
    n: "01", title: "Estudo de Público-Alvo",
    desc: "Desk research, entrevistas qualitativas e compilação de personas com a Matriz CSD.",
    tags: ["Desk Research", "Entrevistas", "Personas", "Hipóteses"],
  },
  {
    n: "02", title: "Escopo de Funcionalidades",
    desc: "Análise de contexto, benchmarking e definição das funcionalidades que geram mais valor.",
    tags: ["Benchmarking", "Proposta de Valor", "Contexto", "Técnico"],
  },
  {
    n: "03", title: "Montagem do MVP",
    desc: "Customer Journey, wireframes e protótipo de alta fidelidade para validação com usuários reais.",
    tags: ["Customer Journey", "Wireframe", "Protótipo", "Validação"],
  },
];

function Process() {
  return (
    <section id="processo" className="py-20 sm:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="mb-12 sm:mb-16 reveal">
          <span className="text-[#0000ff] text-[11px] font-black uppercase tracking-[0.18em]">Fase 1 — Metodologia</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0a0a0a] mt-3 leading-tight">
            Product Discovery
          </h2>
          <div className="w-12 h-1 bg-[#0000ff] mt-5 rounded-full" />
        </div>

        <div className="space-y-6 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-8 lg:gap-12">
          {STEPS.map((s, i) => (
            <div key={s.n} className="reveal" style={{ transitionDelay: `${i * 80}ms` }}>
              <div className="flex items-center gap-4 mb-5">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#0000ff] flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-black text-base sm:text-lg">{s.n}</span>
                </div>
                {i < STEPS.length - 1 && (
                  <div className="hidden sm:block flex-1 h-px bg-[#0000ff]/20" />
                )}
              </div>
              <h3 className="text-lg sm:text-xl font-black text-[#0a0a0a] mb-3">{s.title}</h3>
              <p className="text-[#0a0a0a]/50 text-sm leading-relaxed mb-5">{s.desc}</p>
              <div className="flex flex-wrap gap-2">
                {s.tags.map((t) => (
                  <span key={t} className="text-[11px] font-semibold bg-[#0000ff]/8 text-[#0000ff] px-2.5 py-1 rounded-lg">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Maturity ─────────────────────────────────────────────────────────────────

const MAT = [
  { n: 0, label: "Inconsciente",         state: "FRÁGIL",     border: "border-red-400/50",    bg: "bg-red-400/8",    txt: "text-red-400"    },
  { n: 1, label: "Focado em Times",      state: "FRÁGIL",     border: "border-red-400/50",    bg: "bg-red-400/8",    txt: "text-red-400"    },
  { n: 2, label: "Orientado ao Cliente", state: "RESILIENTE", border: "border-amber-400/50",  bg: "bg-amber-400/8",  txt: "text-amber-400"  },
  { n: 3, label: "Ajustado ao Propósito",state: "RESILIENTE", border: "border-amber-400/50",  bg: "bg-amber-400/8",  txt: "text-amber-400"  },
  { n: 4, label: "Riscos Protegidos",    state: "ROBUSTO",    border: "border-green-400/60",  bg: "bg-green-400/8",  txt: "text-green-400"  },
  { n: 5, label: "Líder de Mercado",     state: "ANTIFRÁGIL", border: "border-[#0000ff]/70",  bg: "bg-[#0000ff]/8",  txt: "text-[#0000ff]"  },
  { n: 6, label: "Feita para Durar",     state: "ANTIFRÁGIL", border: "border-[#0000ff]",     bg: "bg-[#0000ff]/12", txt: "text-[#0000ff]"  },
];

function Maturity() {
  return (
    <section id="maturidade" className="py-20 sm:py-28 bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="mb-12 sm:mb-16 reveal">
          <span className="text-[#0000ff] text-[11px] font-black uppercase tracking-[0.18em]">Kanban Maturity Model</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mt-3 leading-tight">
            Onde está
            <br />
            sua empresa?
          </h2>
        </div>

        {/* Gradient bar */}
        <div className="reveal h-1 w-full rounded-full mb-6 bg-gradient-to-r from-red-400 via-amber-400 via-green-400 to-[#0000ff] opacity-30" />

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 sm:gap-3">
          {MAT.map((m, i) => (
            <div
              key={m.n}
              className={`reveal border ${m.border} ${m.bg} rounded-2xl p-4 sm:p-5 text-center transition-transform duration-300 hover:scale-[1.04] cursor-default`}
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 ${m.border} flex items-center justify-center mx-auto mb-3`}>
                <span className="text-lg font-black text-white">{m.n}</span>
              </div>
              <div className={`text-[9px] sm:text-[10px] font-black uppercase tracking-wider mb-1 ${m.txt}`}>{m.state}</div>
              <div className="text-white text-[11px] sm:text-xs font-semibold leading-tight">{m.label}</div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-4 sm:gap-6 mt-8 pt-6 border-t border-white/[0.07]">
          {[
            { s: "FRÁGIL",     c: "bg-red-400" },
            { s: "RESILIENTE", c: "bg-amber-400" },
            { s: "ROBUSTO",    c: "bg-green-400" },
            { s: "ANTIFRÁGIL", c: "bg-[#0000ff]" },
          ].map((x) => (
            <div key={x.s} className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${x.c}`} />
              <span className="text-white/35 text-xs font-medium">{x.s}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Benefits ─────────────────────────────────────────────────────────────────

const BENEFITS = [
  "Previsão de riscos com antecedência",
  "Adaptação rápida a mudanças de escopo",
  "Maior qualidade nas entregas",
  "Maior produtividade do time",
  "Melhoria contínua a cada ciclo",
  "Correção de bugs com esforço reduzido",
  "Retorno do investimento em menor tempo",
];

const PIPELINE = [
  "Inception & Release Plan",
  "Planning Meeting",
  "Design Sprint",
  "Daily Kanban",
  "Dev Wrap & Review",
  "Demo Meeting",
  "Deliverable ✓",
];

function Benefits() {
  return (
    <section className="py-20 sm:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <div>
            <div className="reveal">
              <span className="text-[#0000ff] text-[11px] font-black uppercase tracking-[0.18em]">Por que escolher</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0a0a0a] mt-3 leading-tight">
                Software em{" "}
                <span className="text-[#0000ff]">1–2</span>
                <br />
                semanas
              </h2>
              <div className="w-12 h-1 bg-[#0000ff] mt-5 mb-10 rounded-full" />
            </div>

            <ul className="space-y-3 sm:space-y-4">
              {BENEFITS.map((b, i) => (
                <li
                  key={b}
                  className="reveal flex items-start gap-3.5"
                  style={{ transitionDelay: `${i * 50}ms` }}
                >
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#0000ff] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" fill="none" viewBox="0 0 12 10">
                      <path d="M1 5L4.5 8.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <span className="text-[#0a0a0a]/60 text-sm sm:text-[15px] leading-relaxed">{b}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="reveal">
            <h3 className="text-lg sm:text-xl font-black text-[#0a0a0a] mb-6">Pipeline de entrega</h3>
            <div className="space-y-2">
              {PIPELINE.map((step, i) => (
                <div key={step} className="flex items-center gap-3">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#0000ff] flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-[11px] font-black">{i + 1}</span>
                  </div>
                  <div className="flex-1 bg-[#0a0a0a]/[0.04] border border-[#0a0a0a]/[0.06] rounded-xl px-4 py-2.5">
                    <span className="text-[#0a0a0a] font-semibold text-sm">{step}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Contact ──────────────────────────────────────────────────────────────────

function Contact() {
  return (
    <section id="contato" className="py-20 sm:py-28 bg-[#0a0a0a] relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 sm:w-[600px] aspect-square bg-[#0000ff]/[0.05] rounded-full blur-3xl" />
        <Arrows className="absolute bottom-10 right-8 w-64 h-40 text-white/[0.02]" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mx-auto text-center">
          <Arrows className="reveal w-10 h-7 sm:w-12 sm:h-8 text-[#0000ff] mx-auto mb-8" />

          <h2 className="reveal text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight mb-5">
            Vamos transformar
            <br />
            sua <span className="text-[#0000ff]">Ideia</span>
            <br />
            em Realidade
          </h2>

          <p className="reveal text-white/40 text-sm sm:text-base mb-10 leading-relaxed max-w-sm mx-auto">
            Entre em contacto com Gerson Alves para iniciar a transformação digital da sua empresa.
          </p>

          <div className="reveal flex flex-col sm:flex-row items-center justify-center gap-3 mb-12">
            <a
              href="https://wa.me/351912100755?text=Ol%C3%A1%2C%20vim%20pelo%20site%20e%20quero%20saber%20mais%20sobre%20a%20NextPlatform"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 bg-[#25d366] hover:bg-[#20bb5a] text-white font-bold px-8 py-4 rounded-2xl text-base transition-all duration-200 hover:shadow-[0_0_32px_rgba(37,211,102,0.35)]"
            >
              <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Falar no WhatsApp
            </a>
            <a
              href="tel:+351912100755"
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white/[0.06] hover:bg-white/10 text-white border border-white/10 hover:border-white/25 font-semibold px-8 py-4 rounded-2xl text-base transition-all duration-200"
            >
              +351 912 100 755
            </a>
          </div>

          {/* CEO card */}
          <div className="reveal inline-flex items-center gap-4 bg-white/[0.04] border border-white/[0.08] rounded-2xl px-5 py-4">
            <div className="w-11 h-11 rounded-full bg-[#0000ff] flex items-center justify-center flex-shrink-0">
              <span className="text-white font-black text-base">G</span>
            </div>
            <div className="text-left">
              <p className="text-white font-bold text-sm">Gerson Alves</p>
              <p className="text-white/40 text-xs">CEO • NextPlatform</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-20 sm:mt-24 pt-8 border-t border-white/[0.07] flex flex-col sm:flex-row items-center justify-between gap-4">
          <a href="#" className="flex items-center gap-2">
            <Arrows className="w-6 h-4 text-[#0000ff]" />
            <span className="text-white font-black text-[15px] tracking-tight">
              <span className="text-[#0000ff]">N</span>ext<span className="font-light text-white/50">Platform</span>
            </span>
          </a>
          <p className="text-white/20 text-xs">© {new Date().getFullYear()} NextPlatform. Todos os direitos reservados.</p>
          <div className="flex gap-5">
            {["Serviços", "Metodologia", "Contacto"].map((l) => (
              <a key={l} href={`#${l === "Contacto" ? "contato" : l.toLowerCase()}`} className="text-white/25 hover:text-white/55 text-xs transition-colors">
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── WhatsApp FAB (mobile) ────────────────────────────────────────────────────

function WhatsAppFab() {
  return (
    <a
      href="https://wa.me/351912100755?text=Ol%C3%A1%2C%20vim%20pelo%20site%20e%20quero%20saber%20mais%20sobre%20a%20NextPlatform"
      target="_blank"
      rel="noopener noreferrer"
      className="sm:hidden fixed bottom-5 right-4 z-50 w-14 h-14 bg-[#25d366] rounded-full shadow-[0_4px_20px_rgba(37,211,102,0.5)] flex items-center justify-center"
      aria-label="Falar no WhatsApp"
    >
      <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    </a>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────

export default function ClientPage() {
  useReveal();

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
      <WhatsAppFab />
    </>
  );
}
