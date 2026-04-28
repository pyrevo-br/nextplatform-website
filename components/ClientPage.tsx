"use client";

import { useEffect, useState } from "react";

// ─── utils ────────────────────────────────────────────────────────────────────

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("in")),
      { threshold: 0.08, rootMargin: "0px 0px -48px 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

// ─── icons ────────────────────────────────────────────────────────────────────

function IconCheck() {
  return (
    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 14 11" aria-hidden>
      <path d="M1 5.5L5 9.5L13 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconArrowRight() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 16 16" aria-hidden>
      <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconWhatsApp() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function LogoMark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 90 60" fill="none" aria-hidden>
      <path d="M4 4 L24 30 L4 56"  stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M30 4 L50 30 L30 56" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M56 4 L76 30 L56 56" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ─── Nav ──────────────────────────────────────────────────────────────────────

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
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
      <nav
        className="fixed top-0 inset-x-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? "rgba(10,10,10,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "1px solid transparent",
        }}
      >
        <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2.5 group" onClick={() => setOpen(false)}>
            <LogoMark className="w-7 h-[18px] text-[#0000ff] transition-transform duration-200 group-hover:translate-x-0.5" />
            <span className="text-white font-bold text-[17px] tracking-tight">
              Next<span className="text-[#555]">Platform</span>
            </span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <a key={l.href} href={l.href} className="text-[#888] hover:text-white text-sm font-medium transition-colors duration-150">
                {l.label}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <a href="https://wa.me/351912100755" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 text-[#888] hover:text-white text-sm font-medium transition-colors">
              <IconWhatsApp />
              WhatsApp
            </a>
            <a href="#contato"
              className="bg-white hover:bg-[#eee] text-[#0a0a0a] text-sm font-bold px-5 py-2.5 rounded-lg transition-colors duration-150">
              Falar com CEO
            </a>
          </div>

          <button
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-[5px]"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
          >
            <span className={`block w-5 h-[1.5px] bg-white origin-center transition-all duration-300 ${open ? "rotate-45 translate-y-[6.5px]" : ""}`} />
            <span className={`block w-5 h-[1.5px] bg-white transition-all duration-200 ${open ? "opacity-0" : ""}`} />
            <span className={`block w-5 h-[1.5px] bg-white origin-center transition-all duration-300 ${open ? "-rotate-45 -translate-y-[6.5px]" : ""}`} />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className="md:hidden fixed inset-0 z-40 flex flex-col px-6 pt-20 pb-8 transition-all duration-300"
        style={{
          background: "#0a0a0a",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transform: open ? "translateY(0)" : "translateY(-8px)",
        }}
      >
        <div className="flex-1 space-y-1 pt-4">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}
              className="flex items-center justify-between text-[28px] font-bold text-[#555] hover:text-white py-4 border-b border-[#1a1a1a] transition-colors">
              {l.label}
              <span className="text-[#333]"><IconArrowRight /></span>
            </a>
          ))}
        </div>
        <div className="space-y-3 mt-8">
          <a href="https://wa.me/351912100755" target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}
            className="flex items-center justify-center gap-2.5 w-full bg-[#25d366] text-white font-bold py-4 rounded-xl text-base">
            <IconWhatsApp />
            Falar no WhatsApp
          </a>
          <a href="#contato" onClick={() => setOpen(false)}
            className="flex items-center justify-center w-full bg-white text-[#0a0a0a] font-bold py-4 rounded-xl text-base">
            Falar com CEO
          </a>
        </div>
      </div>
    </>
  );
}

// ─── Hero visual card ─────────────────────────────────────────────────────────

const SPRINT_STEPS = [
  { step: "01", label: "Product Discovery",  done: true  },
  { step: "02", label: "Design Sprint",      done: true  },
  { step: "03", label: "Development",        done: true  },
  { step: "04", label: "QA & Review",        done: false, active: true },
  { step: "05", label: "Deploy",             done: false },
];

function HeroVisual() {
  return (
    <div className="relative">
      {/* Glow */}
      <div className="absolute inset-0 bg-[#0000ff] opacity-10 rounded-3xl blur-3xl scale-90" />

      <div className="relative border border-[#222] rounded-2xl overflow-hidden" style={{ background: "#111" }}>
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#1a1a1a]">
          <div className="flex items-center gap-2">
            <LogoMark className="w-5 h-3 text-[#0000ff]" />
            <span className="text-white text-sm font-semibold">Sprint #7 — Semana 2</span>
          </div>
          <span className="flex items-center gap-1.5 text-[#25d366] text-xs font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#25d366] animate-pulse inline-block" />
            Em progresso
          </span>
        </div>

        {/* Pipeline */}
        <div className="px-5 py-5 space-y-2.5">
          {SPRINT_STEPS.map((s) => (
            <div key={s.step} className="flex items-center gap-3">
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 text-xs font-bold"
                style={{
                  background: s.done ? "#0000ff" : s.active ? "rgba(0,0,255,0.15)" : "#1a1a1a",
                  color: s.done ? "#fff" : s.active ? "#0000ff" : "#444",
                  border: s.active ? "1px solid rgba(0,0,255,0.4)" : "1px solid transparent",
                }}
              >
                {s.done ? <IconCheck /> : s.step}
              </div>
              <span
                className="text-sm font-medium"
                style={{ color: s.done ? "#fff" : s.active ? "#ccc" : "#555" }}
              >
                {s.label}
              </span>
              {s.done && <span className="ml-auto text-[#0000ff] text-xs font-semibold">✓</span>}
              {s.active && <span className="ml-auto text-[#888] text-xs">Hoje</span>}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-[#1a1a1a]" style={{ background: "#0d0d0d" }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#555] text-xs">Entrega estimada</p>
              <p className="text-white text-sm font-bold mt-0.5">Em 3 dias</p>
            </div>
            <div className="text-right">
              <p className="text-[#555] text-xs">Metodologia</p>
              <p className="text-[#0000ff] text-sm font-bold mt-0.5">KMM Nível 3</p>
            </div>
          </div>
          <div className="mt-3 h-1.5 rounded-full bg-[#1a1a1a] overflow-hidden">
            <div className="h-full rounded-full bg-[#0000ff]" style={{ width: "72%" }} />
          </div>
          <p className="text-[#555] text-xs mt-1.5">72% concluído</p>
        </div>
      </div>

      {/* Floating badge */}
      <div
        className="absolute -bottom-4 -right-4 flex items-center gap-2.5 px-4 py-2.5 rounded-xl border border-[#222] text-sm font-bold"
        style={{ background: "#111" }}
      >
        <span className="text-2xl font-black text-white">1–2</span>
        <span className="text-[#666] text-xs leading-tight">semanas<br/>p/ entrega</span>
      </div>
    </div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="min-h-[100dvh] flex flex-col justify-center relative overflow-hidden" style={{ background: "#0a0a0a" }}>
      {/* Background */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full opacity-[0.07]"
          style={{ background: "#0000ff", filter: "blur(120px)" }} />
        <div className="absolute bottom-0 left-1/3 w-[300px] h-[300px] rounded-full opacity-[0.04]"
          style={{ background: "#0000ff", filter: "blur(80px)" }} />
        {/* Dot grid */}
        <div className="absolute inset-0 opacity-[0.15]"
          style={{ backgroundImage: "radial-gradient(circle, #333 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
      </div>

      <div className="relative max-w-[1200px] mx-auto px-6 lg:px-10 w-full pt-24 pb-16 sm:pt-28 sm:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 mb-8 text-xs font-semibold uppercase tracking-widest"
              style={{ background: "rgba(0,0,255,0.1)", border: "1px solid rgba(0,0,255,0.25)", color: "#6699ff" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-[#0000ff] animate-pulse" />
              Kanban Maturity Model
            </div>

            <h1 className="text-[2.6rem] sm:text-5xl lg:text-[3.5rem] xl:text-[4rem] font-black text-white leading-[1.06] tracking-tight mb-6">
              Vamos transformar
              <br />
              sua{" "}
              <span className="text-[#0000ff]">Ideia</span>
              <br />
              em Realidade
            </h1>

            <p className="text-[#888] text-base sm:text-lg leading-relaxed mb-8 max-w-md">
              Software de qualidade entregue em{" "}
              <span className="text-white font-semibold">1 a 2 semanas</span>.
              {" "}Da descoberta ao deploy com previsibilidade total.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="https://wa.me/351912100755?text=Ol%C3%A1%2C%20vim%20pelo%20site%20e%20quero%20saber%20mais"
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 font-bold px-7 py-4 rounded-xl text-base transition-all duration-200"
                style={{ background: "#25d366", color: "#fff" }}
              >
                <IconWhatsApp />
                WhatsApp com CEO
              </a>
              <a href="#metodologia"
                className="inline-flex items-center justify-center gap-2 font-semibold px-7 py-4 rounded-xl text-base transition-all duration-200 text-[#888] hover:text-white"
                style={{ border: "1px solid #222", background: "transparent" }}
              >
                Ver Metodologia
                <IconArrowRight />
              </a>
            </div>

            <div className="grid grid-cols-3 gap-6 mt-10 pt-10" style={{ borderTop: "1px solid #1a1a1a" }}>
              {[
                { v: "1–2",  l: "semanas p/ entrega" },
                { v: "7",    l: "frentes de serviço" },
                { v: "KMM", l: "metodologia ágil"    },
              ].map((s) => (
                <div key={s.l}>
                  <div className="text-2xl sm:text-3xl font-black text-white">{s.v}</div>
                  <div className="text-[#555] text-xs mt-1 leading-snug">{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — visual */}
          <div className="hidden lg:block">
            <HeroVisual />
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2"
        style={{ color: "#333" }}>
        <span className="text-[9px] tracking-[0.3em] uppercase font-medium">Scroll</span>
        <div className="w-px h-8" style={{ background: "linear-gradient(to bottom, #333, transparent)" }} />
      </div>
    </section>
  );
}

// ─── Services ─────────────────────────────────────────────────────────────────

const SERVICES = [
  { n: "01", title: "Product Discovery",    desc: "Imersão no problema, personas com Matriz CSD e definição de hipóteses de valor." },
  { n: "02", title: "Gestão de Projetos",   desc: "Portfolio omnichannel, Design Sprint e alinhamento executivo contínuo." },
  { n: "03", title: "Open Innovation",      desc: "Hackathons, Science Fair e conexão com Labs e fundos de investimento." },
  { n: "04", title: "Customer Success",     desc: "Gestão com NPS, melhoria contínua e alinhamento de expectativas." },
  { n: "05", title: "Entrega de Tecnologia", desc: "Apps, Web, Cloud, integrações e chatbots com qualidade embutida." },
  { n: "06", title: "DevOps & Cloud",       desc: "Sustentação, CI/CD pipeline, monitoria e infraestrutura." },
  { n: "07", title: "Dados & Open IA",      desc: "Analytics, KPIs, métricas de fluxo e inteligência artificial aplicada." },
];

function Services() {
  return (
    <section id="servicos" style={{ background: "#0d0d0d", borderTop: "1px solid #161616" }}>
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-20 md:py-28">
        <div className="mb-14 reveal">
          <p className="text-[#0000ff] text-[11px] font-bold uppercase tracking-[0.2em] mb-3">O que oferecemos</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
            7 frentes de transformação
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Featured card */}
          <div className="reveal sm:col-span-2 lg:col-span-1 row-span-1 rounded-2xl p-7 flex flex-col" style={{ background: "#0000ff" }}>
            <span className="text-blue-200 text-[10px] font-black uppercase tracking-[0.22em] mb-auto">01</span>
            <div className="mt-10">
              <h3 className="text-white text-xl font-black mb-2">Product Discovery</h3>
              <p className="text-blue-100 text-sm leading-relaxed">
                Imersão no problema, personas com Matriz CSD e definição de hipóteses de valor.
              </p>
            </div>
          </div>

          {/* Regular cards */}
          {SERVICES.slice(1).map((s, i) => (
            <div
              key={s.n}
              className="reveal rounded-2xl p-6 group transition-all duration-200 cursor-default"
              style={{
                background: "#111",
                border: "1px solid #1e1e1e",
                transitionDelay: `${(i + 1) * 50}ms`,
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#333"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#1e1e1e"; }}
            >
              <span className="text-[#0000ff] text-[10px] font-black uppercase tracking-[0.22em] block mb-4">{s.n}</span>
              <h3 className="text-white text-[15px] font-bold mb-2 leading-snug">{s.title}</h3>
              <p className="text-[#666] text-sm leading-relaxed">{s.desc}</p>
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
    result: "Processo emergente", featured: false,
  },
  {
    tag: "Nível 2", title: "Squad Digital", sub: "Orientado ao Consumidor",
    features: ["Discovery + Delivery Board", "Ritos com cadência fixa", "Qualidade embutida (BDD)", "Customer awareness"],
    result: "Delivery previsível", featured: true,
  },
  {
    tag: "Nível 3", title: "Success Way", sub: "Ajustado ao Propósito",
    features: ["OKRs + Métricas de fluxo", "Roadmap + Release Plan", "Service Design + Growth", "Processo consistente"],
    result: "Antifrágil", featured: false,
  },
];

function Methodology() {
  return (
    <section id="metodologia" style={{ background: "#0a0a0a", borderTop: "1px solid #161616" }}>
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-20 md:py-28">
        <div className="mb-14 reveal">
          <p className="text-[#0000ff] text-[11px] font-bold uppercase tracking-[0.2em] mb-3">Metodologia KMM</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
            3 níveis de <span className="text-[#0000ff]">maturidade</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {LEVELS.map((lv, i) => (
            <div
              key={lv.tag}
              className="reveal rounded-2xl p-7 flex flex-col"
              style={{
                background: lv.featured ? "#0000ff" : "#111",
                border: lv.featured ? "1px solid #0000ff" : "1px solid #1e1e1e",
                transitionDelay: `${i * 80}ms`,
              }}
            >
              <div>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] block mb-1"
                  style={{ color: lv.featured ? "rgba(255,255,255,0.5)" : "#0000ff" }}>
                  {lv.tag}
                </span>
                <h3 className="text-2xl font-black text-white">{lv.title}</h3>
                <p className="text-sm mt-1" style={{ color: lv.featured ? "rgba(255,255,255,0.55)" : "#666" }}>
                  {lv.sub}
                </p>
              </div>

              <ul className="mt-8 space-y-3 flex-1">
                {lv.features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                      style={{ background: lv.featured ? "rgba(255,255,255,0.4)" : "#0000ff" }} />
                    <span className="text-sm" style={{ color: lv.featured ? "rgba(255,255,255,0.75)" : "#888" }}>
                      {f}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 pt-6" style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
                <p className="text-[10px] uppercase tracking-widest font-bold mb-1"
                  style={{ color: lv.featured ? "rgba(255,255,255,0.3)" : "#444" }}>
                  Resultado
                </p>
                <p className="text-white font-bold">{lv.result}</p>
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
    <section id="processo" style={{ background: "#0d0d0d", borderTop: "1px solid #161616" }}>
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-20 md:py-28">
        <div className="mb-14 reveal">
          <p className="text-[#0000ff] text-[11px] font-bold uppercase tracking-[0.2em] mb-3">Fase 1 — Metodologia</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
            Product Discovery
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {STEPS.map((s, i) => (
            <div key={s.n} className="reveal" style={{ transitionDelay: `${i * 80}ms` }}>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center font-black text-white text-base flex-shrink-0"
                  style={{ background: "#0000ff" }}>
                  {s.n}
                </div>
                {i < STEPS.length - 1 && (
                  <div className="hidden md:block flex-1 h-px" style={{ background: "#1e1e1e" }} />
                )}
              </div>
              <h3 className="text-white text-lg font-bold mb-3">{s.title}</h3>
              <p className="text-[#666] text-sm leading-relaxed mb-5">{s.desc}</p>
              <div className="flex flex-wrap gap-2">
                {s.tags.map((t) => (
                  <span key={t}
                    className="text-[11px] font-semibold px-3 py-1.5 rounded-lg"
                    style={{ background: "#161616", color: "#0066ff", border: "1px solid #1e1e1e" }}>
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
  { n: 0, label: "Inconsciente",          state: "FRÁGIL",     color: "#ef4444", bg: "rgba(239,68,68,0.1)",    bd: "rgba(239,68,68,0.3)" },
  { n: 1, label: "Focado em Times",       state: "FRÁGIL",     color: "#ef4444", bg: "rgba(239,68,68,0.1)",    bd: "rgba(239,68,68,0.3)" },
  { n: 2, label: "Orientado ao Cliente",  state: "RESILIENTE", color: "#f59e0b", bg: "rgba(245,158,11,0.1)",   bd: "rgba(245,158,11,0.3)" },
  { n: 3, label: "Ajustado ao Propósito", state: "RESILIENTE", color: "#f59e0b", bg: "rgba(245,158,11,0.1)",   bd: "rgba(245,158,11,0.3)" },
  { n: 4, label: "Riscos Protegidos",     state: "ROBUSTO",    color: "#22c55e", bg: "rgba(34,197,94,0.1)",    bd: "rgba(34,197,94,0.3)" },
  { n: 5, label: "Líder de Mercado",      state: "ANTIFRÁGIL", color: "#3b82f6", bg: "rgba(59,130,246,0.12)",  bd: "rgba(59,130,246,0.35)" },
  { n: 6, label: "Feita para Durar",      state: "ANTIFRÁGIL", color: "#0000ff", bg: "rgba(0,0,255,0.15)",     bd: "rgba(0,0,255,0.45)" },
];

function Maturity() {
  return (
    <section id="maturidade" style={{ background: "#0a0a0a", borderTop: "1px solid #161616" }}>
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-20 md:py-28">
        <div className="mb-14 reveal">
          <p className="text-[#0000ff] text-[11px] font-bold uppercase tracking-[0.2em] mb-3">Kanban Maturity Model</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
            Onde está sua empresa?
          </h2>
        </div>

        {/* Gradient bar */}
        <div className="reveal h-1 rounded-full mb-8 opacity-40"
          style={{ background: "linear-gradient(to right, #ef4444, #f59e0b, #22c55e, #0000ff)" }} />

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {MAT.map((m, i) => (
            <div
              key={m.n}
              className="reveal rounded-2xl p-4 text-center transition-transform duration-300 hover:scale-[1.04] cursor-default"
              style={{
                background: m.bg,
                border: `1px solid ${m.bd}`,
                transitionDelay: `${i * 50}ms`,
              }}
            >
              <div
                className="w-11 h-11 rounded-full flex items-center justify-center mx-auto mb-3 text-lg font-black text-white"
                style={{ border: `2px solid ${m.bd}` }}
              >
                {m.n}
              </div>
              <p className="text-[9px] font-black uppercase tracking-wider mb-1" style={{ color: m.color }}>{m.state}</p>
              <p className="text-white text-[11px] font-semibold leading-tight">{m.label}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-5 mt-8 pt-6" style={{ borderTop: "1px solid #161616" }}>
          {[
            { s: "FRÁGIL",     c: "#ef4444" },
            { s: "RESILIENTE", c: "#f59e0b" },
            { s: "ROBUSTO",    c: "#22c55e" },
            { s: "ANTIFRÁGIL", c: "#0000ff" },
          ].map((x) => (
            <div key={x.s} className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full" style={{ background: x.c }} />
              <span className="text-[#555] text-xs font-medium">{x.s}</span>
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
  "Melhoria contínua a cada ciclo de entrega",
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
    <section style={{ background: "#0d0d0d", borderTop: "1px solid #161616" }}>
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20">
          <div>
            <div className="reveal">
              <p className="text-[#0000ff] text-[11px] font-bold uppercase tracking-[0.2em] mb-3">Por que escolher</p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight mb-10">
                Software em{" "}
                <span className="text-[#0000ff]">1–2</span>
                <br />
                semanas
              </h2>
            </div>
            <ul className="space-y-4">
              {BENEFITS.map((b, i) => (
                <li key={b} className="reveal flex items-start gap-4" style={{ transitionDelay: `${i * 50}ms` }}>
                  <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-white"
                    style={{ background: "#0000ff" }}>
                    <IconCheck />
                  </div>
                  <span className="text-[#888] text-sm leading-relaxed">{b}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="reveal">
            <h3 className="text-white font-bold text-lg mb-6">Pipeline de entrega</h3>
            <div className="space-y-2">
              {PIPELINE.map((step, i) => (
                <div key={step} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-white text-xs font-black"
                    style={{ background: "#0000ff" }}>
                    {i + 1}
                  </div>
                  <div className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium text-[#aaa]"
                    style={{ background: "#111", border: "1px solid #1e1e1e" }}>
                    {step}
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
    <section id="contato" style={{ background: "#0a0a0a", borderTop: "1px solid #161616" }}>
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-20 md:py-28">
        <div className="max-w-2xl mx-auto text-center">
          <div className="reveal">
            <LogoMark className="w-10 h-7 text-[#0000ff] mx-auto mb-8" />
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight mb-5">
              Vamos transformar
              <br />
              sua <span className="text-[#0000ff]">Ideia</span>
              <br />
              em Realidade
            </h2>
            <p className="text-[#666] text-base mb-10 leading-relaxed">
              Entre em contacto com Gerson Alves para iniciar a transformação digital da sua empresa.
            </p>
          </div>

          <div className="reveal flex flex-col sm:flex-row items-center justify-center gap-3 mb-12">
            <a
              href="https://wa.me/351912100755?text=Ol%C3%A1%2C%20vim%20pelo%20site%20e%20quero%20saber%20mais"
              target="_blank" rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 font-bold px-8 py-4 rounded-xl text-base transition-all duration-200 text-white"
              style={{ background: "#25d366" }}
            >
              <IconWhatsApp />
              Falar no WhatsApp
            </a>
            <a
              href="tel:+351912100755"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 font-semibold px-8 py-4 rounded-xl text-base transition-all duration-200 text-[#888] hover:text-white"
              style={{ border: "1px solid #222", background: "transparent" }}
            >
              +351 912 100 755
            </a>
          </div>

          <div className="reveal inline-flex items-center gap-4 rounded-2xl px-5 py-4"
            style={{ background: "#111", border: "1px solid #1e1e1e" }}>
            <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 text-white font-black text-base"
              style={{ background: "#0000ff" }}>
              G
            </div>
            <div className="text-left">
              <p className="text-white font-bold text-sm">Gerson Alves</p>
              <p className="text-[#555] text-xs">CEO • NextPlatform</p>
            </div>
          </div>
        </div>

        <div className="mt-20 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid #161616" }}>
          <a href="#" className="flex items-center gap-2.5">
            <LogoMark className="w-6 h-4 text-[#0000ff]" />
            <span className="text-white font-bold text-[15px]">
              Next<span className="text-[#444]">Platform</span>
            </span>
          </a>
          <p className="text-[#333] text-xs">© {new Date().getFullYear()} NextPlatform. Todos os direitos reservados.</p>
          <div className="flex gap-5">
            {["Serviços", "Metodologia", "Contacto"].map((l) => (
              <a key={l} href={`#${l === "Contacto" ? "contato" : l.toLowerCase()}`}
                className="text-[#444] hover:text-[#888] text-xs transition-colors">
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── WhatsApp FAB ─────────────────────────────────────────────────────────────

function WhatsAppFab() {
  return (
    <a
      href="https://wa.me/351912100755?text=Ol%C3%A1%2C%20vim%20pelo%20site%20e%20quero%20saber%20mais"
      target="_blank" rel="noopener noreferrer"
      className="sm:hidden fixed bottom-5 right-4 z-50 w-14 h-14 rounded-full flex items-center justify-center text-white"
      style={{ background: "#25d366", boxShadow: "0 4px 20px rgba(37,211,102,0.5)" }}
      aria-label="Falar no WhatsApp"
    >
      <IconWhatsApp />
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
