"use client";

import { useEffect, useState } from "react";

// ─── i18n ─────────────────────────────────────────────────────────────────────

type Lang = "pt" | "en" | "es";

const T = {
  pt: {
    nav: {
      links: [
        { href: "#servicos",    label: "Serviços" },
        { href: "#metodologia", label: "Metodologia" },
        { href: "#processo",    label: "Processo" },
        { href: "#maturidade",  label: "Maturidade" },
      ],
      cta: "Falar com nossa Equipe",
    },
    hero: {
      badge: "Kanban Maturity Model",
      h1a: "Transformamos",
      h1b: "Ideias",
      h1c: "em Resultados",
      subtitle: "Software de qualidade entregue em",
      subtitleBold: "1 a 2 semanas",
      subtitleEnd: ". Da descoberta ao deploy com previsibilidade total.",
      cta1: "Falar com nossa Equipe",
      cta2: "Ver Metodologia",
      stats: [
        { v: "1–2",  l: "semanas p/ entrega" },
        { v: "7",    l: "frentes de serviço"  },
        { v: "KMM",  l: "metodologia ágil"    },
      ],
    },
    sprint: {
      title: "Sprint #7 — Semana 2",
      status: "Em progresso",
      stepLabels: ["Product Discovery", "Design Sprint", "Development", "QA & Review", "Deploy"],
      deliveryLabel: "Entrega estimada",
      deliveryVal: "Em 3 dias",
      methodLabel: "Metodologia",
      methodVal: "KMM Nível 3",
      progress: "72% concluído",
    },
    services: {
      label: "O que oferecemos",
      heading: "7 frentes de transformação",
      items: [
        { n: "01", title: "Product Discovery",     desc: "Imersão no problema, personas com Matriz CSD e definição de hipóteses de valor." },
        { n: "02", title: "Gestão de Projetos",    desc: "Portfolio omnichannel, Design Sprint e alinhamento executivo contínuo." },
        { n: "03", title: "Open Innovation",       desc: "Hackathons, Science Fair e conexão com Labs e fundos de investimento." },
        { n: "04", title: "Customer Success",      desc: "Gestão com NPS, melhoria contínua e alinhamento de expectativas." },
        { n: "05", title: "Entrega de Tecnologia", desc: "Apps, Web, Cloud, integrações e chatbots com qualidade embutida." },
        { n: "06", title: "DevOps & Cloud",        desc: "Sustentação, CI/CD pipeline, monitoria e infraestrutura." },
        { n: "07", title: "Dados & Open IA",       desc: "Analytics, KPIs, métricas de fluxo e inteligência artificial aplicada." },
      ],
    },
    methodology: {
      label: "Metodologia KMM",
      headingA: "3 níveis de ",
      headingB: "maturidade",
      levels: [
        {
          tag: "Nível 1", title: "Outsourcing", sub: "Focado em Times",
          features: ["Kanban Board de Delivery", "Transparência emergente", "Competência & iniciativa", "PS Manager + Squad Lead"],
          resultLabel: "Resultado", result: "Processo emergente", featured: false,
        },
        {
          tag: "Nível 2", title: "Squad Digital", sub: "Orientado ao Consumidor",
          features: ["Discovery + Delivery Board", "Ritos com cadência fixa", "Qualidade embutida (BDD)", "Customer awareness"],
          resultLabel: "Resultado", result: "Delivery previsível", featured: true,
        },
        {
          tag: "Nível 3", title: "Success Way", sub: "Ajustado ao Propósito",
          features: ["OKRs + Métricas de fluxo", "Roadmap + Release Plan", "Service Design + Growth", "Processo consistente"],
          resultLabel: "Resultado", result: "Antifrágil", featured: false,
        },
      ],
    },
    process: {
      label: "Fase 1 — Metodologia",
      heading: "Product Discovery",
      steps: [
        { n: "01", title: "Estudo de Público-Alvo",       desc: "Desk research, entrevistas qualitativas e compilação de personas com a Matriz CSD.",                                       tags: ["Desk Research", "Entrevistas", "Personas", "Hipóteses"] },
        { n: "02", title: "Escopo de Funcionalidades",    desc: "Análise de contexto, benchmarking e definição das funcionalidades que geram mais valor.",                                   tags: ["Benchmarking", "Proposta de Valor", "Contexto", "Técnico"] },
        { n: "03", title: "Montagem do MVP",              desc: "Customer Journey, wireframes e protótipo de alta fidelidade para validação com usuários reais.",                            tags: ["Customer Journey", "Wireframe", "Protótipo", "Validação"] },
      ],
    },
    maturity: {
      label: "Kanban Maturity Model",
      heading: "Onde está sua empresa?",
      items: [
        { n: 0, label: "Inconsciente",          state: "FRÁGIL",     color: "#ef4444", bg: "rgba(239,68,68,0.1)",   bd: "rgba(239,68,68,0.3)" },
        { n: 1, label: "Focado em Times",       state: "FRÁGIL",     color: "#ef4444", bg: "rgba(239,68,68,0.1)",   bd: "rgba(239,68,68,0.3)" },
        { n: 2, label: "Orientado ao Cliente",  state: "RESILIENTE", color: "#f59e0b", bg: "rgba(245,158,11,0.1)",  bd: "rgba(245,158,11,0.3)" },
        { n: 3, label: "Ajustado ao Propósito", state: "RESILIENTE", color: "#f59e0b", bg: "rgba(245,158,11,0.1)",  bd: "rgba(245,158,11,0.3)" },
        { n: 4, label: "Riscos Protegidos",     state: "ROBUSTO",    color: "#22c55e", bg: "rgba(34,197,94,0.1)",   bd: "rgba(34,197,94,0.3)" },
        { n: 5, label: "Líder de Mercado",      state: "ANTIFRÁGIL", color: "#3b82f6", bg: "rgba(59,130,246,0.12)", bd: "rgba(59,130,246,0.35)" },
        { n: 6, label: "Feita para Durar",      state: "ANTIFRÁGIL", color: "#0000ff", bg: "rgba(0,0,255,0.15)",    bd: "rgba(0,0,255,0.45)" },
      ],
      legend: [
        { s: "FRÁGIL",     c: "#ef4444" },
        { s: "RESILIENTE", c: "#f59e0b" },
        { s: "ROBUSTO",    c: "#22c55e" },
        { s: "ANTIFRÁGIL", c: "#0000ff" },
      ],
    },
    benefits: {
      label: "Por que escolher",
      headingA: "Software em ",
      headingB: "1–2",
      headingC: " semanas",
      items: [
        "Previsão de riscos com antecedência",
        "Adaptação rápida a mudanças de escopo",
        "Maior qualidade nas entregas",
        "Maior produtividade do time",
        "Melhoria contínua a cada ciclo de entrega",
        "Correção de bugs com esforço reduzido",
        "Retorno do investimento em menor tempo",
      ],
      pipelineTitle: "Pipeline de entrega",
      pipeline: ["Inception & Release Plan", "Planning Meeting", "Design Sprint", "Daily Kanban", "Dev Wrap & Review", "Demo Meeting", "Deliverable ✓"],
    },
    contact: {
      label: "Comece agora",
      headingA: "Vamos transformar",
      headingB: "sua",
      headingC: "Ideia",
      headingD: "em Realidade",
      trustA: "Resposta em até 24 horas",
      trustB: "Reunião estratégica gratuita",
      trustC: "Sem compromisso inicial",
      form: {
        name: "Nome completo *",
        namePh: "Seu nome",
        company: "Empresa *",
        companyPh: "Nome da empresa",
        email: "Email corporativo *",
        emailPh: "voce@empresa.com",
        role: "Cargo",
        rolePh: "CEO, CTO, Diretor...",
        message: "Mensagem",
        messagePh: "Conte-nos sobre seu projeto ou desafio...",
        submit: "Enviar Mensagem",
        sending: "Enviando...",
        success: "Mensagem enviada com sucesso! Entraremos em contacto em breve.",
        error: "Erro ao enviar. Por favor tente novamente.",
      },
      footer: {
        copy: "Todos os direitos reservados.",
        links: [
          { label: "Serviços",    href: "#servicos"    },
          { label: "Metodologia", href: "#metodologia" },
          { label: "Contacto",    href: "#contato"     },
        ],
      },
    },
  },

  en: {
    nav: {
      links: [
        { href: "#servicos",    label: "Services"    },
        { href: "#metodologia", label: "Methodology" },
        { href: "#processo",    label: "Process"     },
        { href: "#maturidade",  label: "Maturity"    },
      ],
      cta: "Talk to Our Team",
    },
    hero: {
      badge: "Kanban Maturity Model",
      h1a: "We transform",
      h1b: "Ideas",
      h1c: "into Results",
      subtitle: "Quality software delivered in",
      subtitleBold: "1 to 2 weeks",
      subtitleEnd: ". From discovery to deploy with total predictability.",
      cta1: "Talk to Our Team",
      cta2: "View Methodology",
      stats: [
        { v: "1–2",  l: "weeks to deliver"  },
        { v: "7",    l: "service areas"      },
        { v: "KMM",  l: "agile methodology"  },
      ],
    },
    sprint: {
      title: "Sprint #7 — Week 2",
      status: "In progress",
      stepLabels: ["Product Discovery", "Design Sprint", "Development", "QA & Review", "Deploy"],
      deliveryLabel: "Estimated delivery",
      deliveryVal: "In 3 days",
      methodLabel: "Methodology",
      methodVal: "KMM Level 3",
      progress: "72% completed",
    },
    services: {
      label: "What we offer",
      heading: "7 transformation fronts",
      items: [
        { n: "01", title: "Product Discovery",    desc: "Problem immersion, personas with CSD Matrix and value hypothesis definition." },
        { n: "02", title: "Project Management",   desc: "Omnichannel portfolio, Design Sprint and continuous executive alignment." },
        { n: "03", title: "Open Innovation",      desc: "Hackathons, Science Fair and connection with Labs and investment funds." },
        { n: "04", title: "Customer Success",     desc: "NPS management, continuous improvement and expectation alignment." },
        { n: "05", title: "Technology Delivery",  desc: "Apps, Web, Cloud, integrations and chatbots with built-in quality." },
        { n: "06", title: "DevOps & Cloud",       desc: "Sustaining, CI/CD pipeline, monitoring and infrastructure." },
        { n: "07", title: "Data & Open AI",       desc: "Analytics, KPIs, flow metrics and applied artificial intelligence." },
      ],
    },
    methodology: {
      label: "KMM Methodology",
      headingA: "3 levels of ",
      headingB: "maturity",
      levels: [
        {
          tag: "Level 1", title: "Outsourcing", sub: "Team Focused",
          features: ["Delivery Kanban Board", "Emerging transparency", "Competence & initiative", "PS Manager + Squad Lead"],
          resultLabel: "Result", result: "Emerging process", featured: false,
        },
        {
          tag: "Level 2", title: "Digital Squad", sub: "Consumer Oriented",
          features: ["Discovery + Delivery Board", "Fixed cadence ceremonies", "Built-in quality (BDD)", "Customer awareness"],
          resultLabel: "Result", result: "Predictable delivery", featured: true,
        },
        {
          tag: "Level 3", title: "Success Way", sub: "Purpose Aligned",
          features: ["OKRs + Flow Metrics", "Roadmap + Release Plan", "Service Design + Growth", "Consistent process"],
          resultLabel: "Result", result: "Antifragile", featured: false,
        },
      ],
    },
    process: {
      label: "Phase 1 — Methodology",
      heading: "Product Discovery",
      steps: [
        { n: "01", title: "Target Audience Study",    desc: "Desk research, qualitative interviews and persona compilation with the CSD Matrix.",              tags: ["Desk Research", "Interviews", "Personas", "Hypotheses"] },
        { n: "02", title: "Feature Scoping",          desc: "Context analysis, benchmarking and definition of the features that generate the most value.",      tags: ["Benchmarking", "Value Proposition", "Context", "Technical"] },
        { n: "03", title: "MVP Assembly",             desc: "Customer Journey, wireframes and high-fidelity prototype for validation with real users.",          tags: ["Customer Journey", "Wireframe", "Prototype", "Validation"] },
      ],
    },
    maturity: {
      label: "Kanban Maturity Model",
      heading: "Where is your company?",
      items: [
        { n: 0, label: "Unaware",          state: "FRAGILE",     color: "#ef4444", bg: "rgba(239,68,68,0.1)",   bd: "rgba(239,68,68,0.3)" },
        { n: 1, label: "Team Focused",     state: "FRAGILE",     color: "#ef4444", bg: "rgba(239,68,68,0.1)",   bd: "rgba(239,68,68,0.3)" },
        { n: 2, label: "Customer Driven",  state: "RESILIENT",   color: "#f59e0b", bg: "rgba(245,158,11,0.1)",  bd: "rgba(245,158,11,0.3)" },
        { n: 3, label: "Purpose Fit",      state: "RESILIENT",   color: "#f59e0b", bg: "rgba(245,158,11,0.1)",  bd: "rgba(245,158,11,0.3)" },
        { n: 4, label: "Risk Protected",   state: "ROBUST",      color: "#22c55e", bg: "rgba(34,197,94,0.1)",   bd: "rgba(34,197,94,0.3)" },
        { n: 5, label: "Market Leader",    state: "ANTIFRAGILE", color: "#3b82f6", bg: "rgba(59,130,246,0.12)", bd: "rgba(59,130,246,0.35)" },
        { n: 6, label: "Built to Last",    state: "ANTIFRAGILE", color: "#0000ff", bg: "rgba(0,0,255,0.15)",    bd: "rgba(0,0,255,0.45)" },
      ],
      legend: [
        { s: "FRAGILE",     c: "#ef4444" },
        { s: "RESILIENT",   c: "#f59e0b" },
        { s: "ROBUST",      c: "#22c55e" },
        { s: "ANTIFRAGILE", c: "#0000ff" },
      ],
    },
    benefits: {
      label: "Why choose us",
      headingA: "Software in ",
      headingB: "1–2",
      headingC: " weeks",
      items: [
        "Risk forecasting in advance",
        "Rapid adaptation to scope changes",
        "Higher delivery quality",
        "Increased team productivity",
        "Continuous improvement every delivery cycle",
        "Bug fixing with reduced effort",
        "Faster return on investment",
      ],
      pipelineTitle: "Delivery pipeline",
      pipeline: ["Inception & Release Plan", "Planning Meeting", "Design Sprint", "Daily Kanban", "Dev Wrap & Review", "Demo Meeting", "Deliverable ✓"],
    },
    contact: {
      label: "Get started",
      headingA: "Let's transform",
      headingB: "your",
      headingC: "Idea",
      headingD: "into Reality",
      trustA: "Response within 24 hours",
      trustB: "Free strategic meeting",
      trustC: "No initial commitment",
      form: {
        name: "Full name *",
        namePh: "Your name",
        company: "Company *",
        companyPh: "Company name",
        email: "Work email *",
        emailPh: "you@company.com",
        role: "Role",
        rolePh: "CEO, CTO, Director...",
        message: "Message",
        messagePh: "Tell us about your project or challenge...",
        submit: "Send Message",
        sending: "Sending...",
        success: "Message sent successfully! We will contact you shortly.",
        error: "Failed to send. Please try again.",
      },
      footer: {
        copy: "All rights reserved.",
        links: [
          { label: "Services",    href: "#servicos"    },
          { label: "Methodology", href: "#metodologia" },
          { label: "Contact",     href: "#contato"     },
        ],
      },
    },
  },

  es: {
    nav: {
      links: [
        { href: "#servicos",    label: "Servicios"   },
        { href: "#metodologia", label: "Metodología" },
        { href: "#processo",    label: "Proceso"     },
        { href: "#maturidade",  label: "Madurez"     },
      ],
      cta: "Hablar con Nuestro Equipo",
    },
    hero: {
      badge: "Kanban Maturity Model",
      h1a: "Transformamos",
      h1b: "Ideas",
      h1c: "en Resultados",
      subtitle: "Software de calidad entregado en",
      subtitleBold: "1 a 2 semanas",
      subtitleEnd: ". Del descubrimiento al deploy con previsibilidad total.",
      cta1: "Hablar con Nuestro Equipo",
      cta2: "Ver Metodología",
      stats: [
        { v: "1–2",  l: "semanas p/ entrega"    },
        { v: "7",    l: "frentes de servicio"    },
        { v: "KMM",  l: "metodología ágil"       },
      ],
    },
    sprint: {
      title: "Sprint #7 — Semana 2",
      status: "En progreso",
      stepLabels: ["Product Discovery", "Design Sprint", "Development", "QA & Review", "Deploy"],
      deliveryLabel: "Entrega estimada",
      deliveryVal: "En 3 días",
      methodLabel: "Metodología",
      methodVal: "KMM Nivel 3",
      progress: "72% completado",
    },
    services: {
      label: "Lo que ofrecemos",
      heading: "7 frentes de transformación",
      items: [
        { n: "01", title: "Product Discovery",    desc: "Inmersión en el problema, personas con Matriz CSD y definición de hipótesis de valor." },
        { n: "02", title: "Gestión de Proyectos", desc: "Portfolio omnicanal, Design Sprint y alineación ejecutiva continua." },
        { n: "03", title: "Open Innovation",      desc: "Hackathons, Science Fair y conexión con Labs y fondos de inversión." },
        { n: "04", title: "Customer Success",     desc: "Gestión con NPS, mejora continua y alineación de expectativas." },
        { n: "05", title: "Entrega de Tecnología",desc: "Apps, Web, Cloud, integraciones y chatbots con calidad incorporada." },
        { n: "06", title: "DevOps & Cloud",       desc: "Sustentación, CI/CD pipeline, monitorización e infraestructura." },
        { n: "07", title: "Datos & Open IA",      desc: "Analytics, KPIs, métricas de flujo e inteligencia artificial aplicada." },
      ],
    },
    methodology: {
      label: "Metodología KMM",
      headingA: "3 niveles de ",
      headingB: "madurez",
      levels: [
        {
          tag: "Nivel 1", title: "Outsourcing", sub: "Enfocado en Equipos",
          features: ["Kanban Board de Delivery", "Transparencia emergente", "Competencia e iniciativa", "PS Manager + Squad Lead"],
          resultLabel: "Resultado", result: "Proceso emergente", featured: false,
        },
        {
          tag: "Nivel 2", title: "Squad Digital", sub: "Orientado al Consumidor",
          features: ["Discovery + Delivery Board", "Ceremonias con cadencia fija", "Calidad incorporada (BDD)", "Customer awareness"],
          resultLabel: "Resultado", result: "Entrega predecible", featured: true,
        },
        {
          tag: "Nivel 3", title: "Success Way", sub: "Ajustado al Propósito",
          features: ["OKRs + Métricas de flujo", "Roadmap + Release Plan", "Service Design + Growth", "Proceso consistente"],
          resultLabel: "Resultado", result: "Antifrágil", featured: false,
        },
      ],
    },
    process: {
      label: "Fase 1 — Metodología",
      heading: "Product Discovery",
      steps: [
        { n: "01", title: "Estudio de Público Objetivo", desc: "Desk research, entrevistas cualitativas y compilación de personas con la Matriz CSD.",                    tags: ["Desk Research", "Entrevistas", "Personas", "Hipótesis"] },
        { n: "02", title: "Alcance de Funcionalidades",  desc: "Análisis de contexto, benchmarking y definición de las funcionalidades que generan más valor.",            tags: ["Benchmarking", "Propuesta de Valor", "Contexto", "Técnico"] },
        { n: "03", title: "Montaje del MVP",             desc: "Customer Journey, wireframes y prototipo de alta fidelidad para validación con usuarios reales.",          tags: ["Customer Journey", "Wireframe", "Prototipo", "Validación"] },
      ],
    },
    maturity: {
      label: "Kanban Maturity Model",
      heading: "¿Dónde está su empresa?",
      items: [
        { n: 0, label: "Inconsciente",          state: "FRÁGIL",     color: "#ef4444", bg: "rgba(239,68,68,0.1)",   bd: "rgba(239,68,68,0.3)" },
        { n: 1, label: "Enfocado en Equipos",   state: "FRÁGIL",     color: "#ef4444", bg: "rgba(239,68,68,0.1)",   bd: "rgba(239,68,68,0.3)" },
        { n: 2, label: "Orientado al Cliente",  state: "RESILIENTE", color: "#f59e0b", bg: "rgba(245,158,11,0.1)",  bd: "rgba(245,158,11,0.3)" },
        { n: 3, label: "Ajustado al Propósito", state: "RESILIENTE", color: "#f59e0b", bg: "rgba(245,158,11,0.1)",  bd: "rgba(245,158,11,0.3)" },
        { n: 4, label: "Riesgos Protegidos",    state: "ROBUSTO",    color: "#22c55e", bg: "rgba(34,197,94,0.1)",   bd: "rgba(34,197,94,0.3)" },
        { n: 5, label: "Líder de Mercado",      state: "ANTIFRÁGIL", color: "#3b82f6", bg: "rgba(59,130,246,0.12)", bd: "rgba(59,130,246,0.35)" },
        { n: 6, label: "Hecha para Durar",      state: "ANTIFRÁGIL", color: "#0000ff", bg: "rgba(0,0,255,0.15)",    bd: "rgba(0,0,255,0.45)" },
      ],
      legend: [
        { s: "FRÁGIL",     c: "#ef4444" },
        { s: "RESILIENTE", c: "#f59e0b" },
        { s: "ROBUSTO",    c: "#22c55e" },
        { s: "ANTIFRÁGIL", c: "#0000ff" },
      ],
    },
    benefits: {
      label: "Por qué elegirnos",
      headingA: "Software en ",
      headingB: "1–2",
      headingC: " semanas",
      items: [
        "Previsión de riesgos con anticipación",
        "Adaptación rápida a cambios de alcance",
        "Mayor calidad en las entregas",
        "Mayor productividad del equipo",
        "Mejora continua en cada ciclo de entrega",
        "Corrección de bugs con esfuerzo reducido",
        "Retorno de inversión en menor tiempo",
      ],
      pipelineTitle: "Pipeline de entrega",
      pipeline: ["Inception & Release Plan", "Planning Meeting", "Design Sprint", "Daily Kanban", "Dev Wrap & Review", "Demo Meeting", "Deliverable ✓"],
    },
    contact: {
      label: "Empiece ahora",
      headingA: "Transformamos",
      headingB: "su",
      headingC: "Idea",
      headingD: "en Realidad",
      trustA: "Respuesta en 24 horas",
      trustB: "Reunión estratégica gratuita",
      trustC: "Sin compromiso inicial",
      form: {
        name: "Nombre completo *",
        namePh: "Su nombre",
        company: "Empresa *",
        companyPh: "Nombre de la empresa",
        email: "Email corporativo *",
        emailPh: "usted@empresa.com",
        role: "Cargo",
        rolePh: "CEO, CTO, Director...",
        message: "Mensaje",
        messagePh: "Cuéntenos sobre su proyecto o desafío...",
        submit: "Enviar Mensaje",
        sending: "Enviando...",
        success: "¡Mensaje enviado con éxito! Nos pondremos en contacto en breve.",
        error: "Error al enviar. Por favor inténtelo de nuevo.",
      },
      footer: {
        copy: "Todos los derechos reservados.",
        links: [
          { label: "Servicios",   href: "#servicos"    },
          { label: "Metodología", href: "#metodologia" },
          { label: "Contacto",    href: "#contato"     },
        ],
      },
    },
  },
} as const;

// ─── utils ────────────────────────────────────────────────────────────────────

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("in")),
      { threshold: 0.06, rootMargin: "0px 0px -40px 0px" }
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

function IconGlobe() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" strokeLinecap="round" />
    </svg>
  );
}

function IconSend() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M22 2L11 13M22 2L15 22 11 13 2 9l20-7z" strokeLinecap="round" strokeLinejoin="round" />
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

function Nav({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const t = T[lang].nav;

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const LANGS: { code: Lang; label: string }[] = [
    { code: "pt", label: "PT" },
    { code: "en", label: "EN" },
    { code: "es", label: "ES" },
  ];

  return (
    <>
      <nav
        className="fixed top-0 inset-x-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? "rgba(10,10,10,0.94)" : "transparent",
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
            {t.links.map((l) => (
              <a key={l.href} href={l.href} className="text-[#888] hover:text-white text-sm font-medium transition-colors duration-150">
                {l.label}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            {/* Language switcher */}
            <div className="flex items-center gap-1 rounded-lg p-1" style={{ background: "#111", border: "1px solid #1e1e1e" }}>
              <IconGlobe />
              {LANGS.map((l) => (
                <button
                  key={l.code}
                  onClick={() => setLang(l.code)}
                  className="text-[11px] font-bold px-2 py-1 rounded-md transition-all duration-150"
                  style={{
                    background: lang === l.code ? "#0000ff" : "transparent",
                    color: lang === l.code ? "#fff" : "#555",
                  }}
                >
                  {l.label}
                </button>
              ))}
            </div>

            <a
              href="#contato"
              className="bg-white hover:bg-[#eee] text-[#0a0a0a] text-sm font-bold px-5 py-2.5 rounded-lg transition-colors duration-150"
            >
              {t.cta}
            </a>
          </div>

          {/* Mobile hamburger */}
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
          {t.links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}
              className="flex items-center justify-between text-[28px] font-bold text-[#555] hover:text-white py-4 border-b border-[#1a1a1a] transition-colors">
              {l.label}
              <span className="text-[#333]"><IconArrowRight /></span>
            </a>
          ))}
        </div>
        <div className="space-y-3 mt-8">
          {/* Mobile language switcher */}
          <div className="flex items-center justify-center gap-2 py-2">
            {LANGS.map((l) => (
              <button
                key={l.code}
                onClick={() => setLang(l.code)}
                className="text-sm font-bold px-4 py-2 rounded-lg transition-all duration-150"
                style={{
                  background: lang === l.code ? "#0000ff" : "#111",
                  color: lang === l.code ? "#fff" : "#555",
                  border: "1px solid #1e1e1e",
                }}
              >
                {l.label}
              </button>
            ))}
          </div>
          <a href="#contato" onClick={() => setOpen(false)}
            className="flex items-center justify-center w-full bg-white text-[#0a0a0a] font-bold py-4 rounded-xl text-base">
            {t.cta}
          </a>
        </div>
      </div>
    </>
  );
}

// ─── Hero visual card ─────────────────────────────────────────────────────────

function HeroVisual({ lang }: { lang: Lang }) {
  const t = T[lang].sprint;

  const steps = t.stepLabels.map((label, i) => ({
    step: String(i + 1).padStart(2, "0"),
    label,
    done: i < 3,
    active: i === 3,
  }));

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-[#0000ff] opacity-10 rounded-3xl blur-3xl scale-90" />

      <div className="relative border border-[#222] rounded-2xl overflow-hidden" style={{ background: "#111" }}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#1a1a1a]">
          <div className="flex items-center gap-2">
            <LogoMark className="w-5 h-3 text-[#0000ff]" />
            <span className="text-white text-sm font-semibold">{t.title}</span>
          </div>
          <span className="flex items-center gap-1.5 text-[#22c55e] text-xs font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] animate-pulse inline-block" />
            {t.status}
          </span>
        </div>

        <div className="px-5 py-5 space-y-2.5">
          {steps.map((s) => (
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
              <span className="text-sm font-medium" style={{ color: s.done ? "#fff" : s.active ? "#ccc" : "#555" }}>
                {s.label}
              </span>
              {s.done && <span className="ml-auto text-[#0000ff] text-xs font-semibold">✓</span>}
              {s.active && <span className="ml-auto text-[#888] text-xs">Today</span>}
            </div>
          ))}
        </div>

        <div className="px-5 py-4 border-t border-[#1a1a1a]" style={{ background: "#0d0d0d" }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#555] text-xs">{t.deliveryLabel}</p>
              <p className="text-white text-sm font-bold mt-0.5">{t.deliveryVal}</p>
            </div>
            <div className="text-right">
              <p className="text-[#555] text-xs">{t.methodLabel}</p>
              <p className="text-[#0000ff] text-sm font-bold mt-0.5">{t.methodVal}</p>
            </div>
          </div>
          <div className="mt-3 h-1.5 rounded-full bg-[#1a1a1a] overflow-hidden">
            <div className="h-full rounded-full bg-[#0000ff]" style={{ width: "72%" }} />
          </div>
          <p className="text-[#555] text-xs mt-1.5">{t.progress}</p>
        </div>
      </div>

      <div
        className="absolute -bottom-4 -right-4 flex items-center gap-2.5 px-4 py-2.5 rounded-xl border border-[#222] text-sm font-bold"
        style={{ background: "#111" }}
      >
        <span className="text-2xl font-black text-white">1–2</span>
        <span className="text-[#666] text-xs leading-tight">
          {lang === "en" ? "weeks to\ndeliver" : "semanas\np/ entrega"}
        </span>
      </div>
    </div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero({ lang }: { lang: Lang }) {
  const t = T[lang].hero;

  return (
    <section className="min-h-[100dvh] flex flex-col justify-center relative overflow-hidden" style={{ background: "#0a0a0a" }}>
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full opacity-[0.07]"
          style={{ background: "#0000ff", filter: "blur(120px)" }} />
        <div className="absolute bottom-0 left-1/3 w-[300px] h-[300px] rounded-full opacity-[0.04]"
          style={{ background: "#0000ff", filter: "blur(80px)" }} />
        <div className="absolute inset-0 opacity-[0.12]"
          style={{ backgroundImage: "radial-gradient(circle, #333 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
      </div>

      <div className="relative max-w-[1200px] mx-auto px-6 lg:px-10 w-full pt-24 pb-16 sm:pt-28 sm:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 mb-8 text-xs font-semibold uppercase tracking-widest"
              style={{ background: "rgba(0,0,255,0.1)", border: "1px solid rgba(0,0,255,0.25)", color: "#6699ff" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-[#0000ff] animate-pulse" />
              {t.badge}
            </div>

            <h1 className="text-[2.8rem] sm:text-5xl lg:text-[3.6rem] xl:text-[4.2rem] font-black text-white leading-[1.05] tracking-tight mb-6">
              {t.h1a}
              <br />
              <span className="text-[#0000ff]">{t.h1b}</span>
              <br />
              {t.h1c}
            </h1>

            <p className="text-[#888] text-base sm:text-lg leading-relaxed mb-8 max-w-md">
              {t.subtitle}{" "}
              <span className="text-white font-semibold">{t.subtitleBold}</span>
              {t.subtitleEnd}
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="#contato"
                className="inline-flex items-center justify-center gap-2 font-bold px-7 py-4 rounded-xl text-base transition-all duration-200 text-white hover:opacity-90"
                style={{ background: "#0000ff" }}
              >
                {t.cta1}
                <IconArrowRight />
              </a>
              <a
                href="#metodologia"
                className="inline-flex items-center justify-center gap-2 font-semibold px-7 py-4 rounded-xl text-base transition-all duration-200 text-[#888] hover:text-white"
                style={{ border: "1px solid #222", background: "transparent" }}
              >
                {t.cta2}
                <IconArrowRight />
              </a>
            </div>

            <div className="grid grid-cols-3 gap-6 mt-10 pt-10" style={{ borderTop: "1px solid #1a1a1a" }}>
              {t.stats.map((s) => (
                <div key={s.l}>
                  <div className="text-2xl sm:text-3xl font-black text-white">{s.v}</div>
                  <div className="text-[#555] text-xs mt-1 leading-snug">{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden lg:block">
            <HeroVisual lang={lang} />
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2" style={{ color: "#333" }}>
        <span className="text-[9px] tracking-[0.3em] uppercase font-medium">Scroll</span>
        <div className="w-px h-8" style={{ background: "linear-gradient(to bottom, #333, transparent)" }} />
      </div>
    </section>
  );
}

// ─── Services ─────────────────────────────────────────────────────────────────

function Services({ lang }: { lang: Lang }) {
  const t = T[lang].services;

  return (
    <section id="servicos" style={{ background: "#0d0d0d", borderTop: "1px solid #161616" }}>
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-20 md:py-28">
        <div className="mb-14 reveal">
          <p className="text-[#0000ff] text-[11px] font-bold uppercase tracking-[0.2em] mb-3">{t.label}</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">{t.heading}</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="reveal sm:col-span-2 lg:col-span-1 rounded-2xl p-7 flex flex-col" style={{ background: "#0000ff" }}>
            <span className="text-blue-200 text-[10px] font-black uppercase tracking-[0.22em] mb-auto">01</span>
            <div className="mt-10">
              <h3 className="text-white text-xl font-black mb-2">{t.items[0].title}</h3>
              <p className="text-blue-100 text-sm leading-relaxed">{t.items[0].desc}</p>
            </div>
          </div>

          {t.items.slice(1).map((s, i) => (
            <div
              key={s.n}
              className="reveal rounded-2xl p-6 transition-all duration-200 cursor-default"
              style={{ background: "#111", border: "1px solid #1e1e1e", transitionDelay: `${(i + 1) * 50}ms` }}
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

function Methodology({ lang }: { lang: Lang }) {
  const t = T[lang].methodology;

  return (
    <section id="metodologia" style={{ background: "#0a0a0a", borderTop: "1px solid #161616" }}>
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-20 md:py-28">
        <div className="mb-14 reveal">
          <p className="text-[#0000ff] text-[11px] font-bold uppercase tracking-[0.2em] mb-3">{t.label}</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
            {t.headingA}<span className="text-[#0000ff]">{t.headingB}</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {t.levels.map((lv, i) => (
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
                <p className="text-sm mt-1" style={{ color: lv.featured ? "rgba(255,255,255,0.55)" : "#666" }}>{lv.sub}</p>
              </div>

              <ul className="mt-8 space-y-3 flex-1">
                {lv.features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                      style={{ background: lv.featured ? "rgba(255,255,255,0.4)" : "#0000ff" }} />
                    <span className="text-sm" style={{ color: lv.featured ? "rgba(255,255,255,0.75)" : "#888" }}>{f}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 pt-6" style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
                <p className="text-[10px] uppercase tracking-widest font-bold mb-1"
                  style={{ color: lv.featured ? "rgba(255,255,255,0.3)" : "#444" }}>
                  {lv.resultLabel}
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

function Process({ lang }: { lang: Lang }) {
  const t = T[lang].process;

  return (
    <section id="processo" style={{ background: "#0d0d0d", borderTop: "1px solid #161616" }}>
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-20 md:py-28">
        <div className="mb-14 reveal">
          <p className="text-[#0000ff] text-[11px] font-bold uppercase tracking-[0.2em] mb-3">{t.label}</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">{t.heading}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {t.steps.map((s, i) => (
            <div key={s.n} className="reveal" style={{ transitionDelay: `${i * 80}ms` }}>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center font-black text-white text-base flex-shrink-0"
                  style={{ background: "#0000ff" }}>
                  {s.n}
                </div>
                {i < t.steps.length - 1 && (
                  <div className="hidden md:block flex-1 h-px" style={{ background: "#1e1e1e" }} />
                )}
              </div>
              <h3 className="text-white text-lg font-bold mb-3">{s.title}</h3>
              <p className="text-[#666] text-sm leading-relaxed mb-5">{s.desc}</p>
              <div className="flex flex-wrap gap-2">
                {s.tags.map((tag) => (
                  <span key={tag} className="text-[11px] font-semibold px-3 py-1.5 rounded-lg"
                    style={{ background: "#161616", color: "#0066ff", border: "1px solid #1e1e1e" }}>
                    {tag}
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

function Maturity({ lang }: { lang: Lang }) {
  const t = T[lang].maturity;

  return (
    <section id="maturidade" style={{ background: "#0a0a0a", borderTop: "1px solid #161616" }}>
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-20 md:py-28">
        <div className="mb-14 reveal">
          <p className="text-[#0000ff] text-[11px] font-bold uppercase tracking-[0.2em] mb-3">{t.label}</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">{t.heading}</h2>
        </div>

        <div className="reveal h-1 rounded-full mb-8 opacity-40"
          style={{ background: "linear-gradient(to right, #ef4444, #f59e0b, #22c55e, #0000ff)" }} />

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {t.items.map((m, i) => (
            <div
              key={m.n}
              className="reveal rounded-2xl p-4 text-center transition-transform duration-300 hover:scale-[1.04] cursor-default"
              style={{ background: m.bg, border: `1px solid ${m.bd}`, transitionDelay: `${i * 50}ms` }}
            >
              <div className="w-11 h-11 rounded-full flex items-center justify-center mx-auto mb-3 text-lg font-black text-white"
                style={{ border: `2px solid ${m.bd}` }}>
                {m.n}
              </div>
              <p className="text-[9px] font-black uppercase tracking-wider mb-1" style={{ color: m.color }}>{m.state}</p>
              <p className="text-white text-[11px] font-semibold leading-tight">{m.label}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-5 mt-8 pt-6" style={{ borderTop: "1px solid #161616" }}>
          {t.legend.map((x) => (
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

function Benefits({ lang }: { lang: Lang }) {
  const t = T[lang].benefits;

  return (
    <section style={{ background: "#0d0d0d", borderTop: "1px solid #161616" }}>
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20">
          <div>
            <div className="reveal">
              <p className="text-[#0000ff] text-[11px] font-bold uppercase tracking-[0.2em] mb-3">{t.label}</p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight mb-10">
                {t.headingA}<span className="text-[#0000ff]">{t.headingB}</span>{t.headingC}
              </h2>
            </div>
            <ul className="space-y-4">
              {t.items.map((b, i) => (
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
            <h3 className="text-white font-bold text-lg mb-6">{t.pipelineTitle}</h3>
            <div className="space-y-2">
              {t.pipeline.map((step, i) => (
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

type FormState = "idle" | "sending" | "success" | "error";

function Contact({ lang }: { lang: Lang }) {
  const t = T[lang].contact;
  const f = t.form;

  const [state, setState] = useState<FormState>("idle");
  const [fields, setFields] = useState({ name: "", company: "", email: "", role: "", message: "" });

  const set = (k: keyof typeof fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFields((prev) => ({ ...prev, [k]: e.target.value }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState("sending");
    try {
      // Replace with your preferred form handler, e.g. formsubmit.co or Resend
      await fetch("https://formsubmit.co/ajax/contato@nextplatform.io", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...fields, _subject: `NextPlatform — Contacto de ${fields.company}` }),
      });
      setState("success");
      setFields({ name: "", company: "", email: "", role: "", message: "" });
    } catch {
      setState("error");
    }
  }

  const inputCls = "w-full bg-[#111] border border-[#1e1e1e] rounded-xl px-4 py-3.5 text-white text-sm placeholder-[#444] focus:outline-none focus:border-[#0000ff] transition-colors duration-150";

  const TRUST = [
    { icon: "✓", label: t.trustA },
    { icon: "✓", label: t.trustB },
    { icon: "✓", label: t.trustC },
  ];

  return (
    <section id="contato" style={{ background: "#0a0a0a", borderTop: "1px solid #161616" }}>
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Left — pitch */}
          <div className="reveal">
            <p className="text-[#0000ff] text-[11px] font-bold uppercase tracking-[0.2em] mb-6">{t.label}</p>
            <h2 className="text-4xl sm:text-5xl lg:text-[3.4rem] font-black text-white leading-[1.06] tracking-tight mb-6">
              {t.headingA}
              <br />
              {t.headingB}{" "}
              <span className="text-[#0000ff]">{t.headingC}</span>
              <br />
              {t.headingD}
            </h2>
            <p className="text-[#666] text-base leading-relaxed mb-10">
              {lang === "pt" && "Entre em contacto com nossa equipe para iniciar a transformação digital da sua empresa."}
              {lang === "en" && "Contact our team to start your company's digital transformation journey."}
              {lang === "es" && "Contacte a nuestro equipo para iniciar la transformación digital de su empresa."}
            </p>

            <div className="space-y-4">
              {TRUST.map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-white text-xs font-black"
                    style={{ background: "#0000ff" }}>
                    {item.icon}
                  </div>
                  <span className="text-[#888] text-sm">{item.label}</span>
                </div>
              ))}
            </div>

            <div className="mt-12 pt-8" style={{ borderTop: "1px solid #1a1a1a" }}>
              <div className="inline-flex items-center gap-4 rounded-2xl px-5 py-4"
                style={{ background: "#111", border: "1px solid #1e1e1e" }}>
                <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 text-white font-black text-base"
                  style={{ background: "#0000ff" }}>
                  G
                </div>
                <div>
                  <p className="text-white font-bold text-sm">Gerson Alves</p>
                  <p className="text-[#555] text-xs">
                    {lang === "pt" && "CEO & Fundador • NextPlatform"}
                    {lang === "en" && "CEO & Founder • NextPlatform"}
                    {lang === "es" && "CEO & Fundador • NextPlatform"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right — form */}
          <div className="reveal" style={{ transitionDelay: "100ms" }}>
            <div className="rounded-2xl p-8" style={{ background: "#0d0d0d", border: "1px solid #1e1e1e" }}>
              {state === "success" ? (
                <div className="text-center py-10">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-white"
                    style={{ background: "#0000ff" }}>
                    <IconCheck />
                  </div>
                  <p className="text-white font-bold text-lg">{f.success}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[#555] text-[11px] font-semibold uppercase tracking-wider mb-2">{f.name}</label>
                      <input type="text" required value={fields.name} onChange={set("name")} placeholder={f.namePh} className={inputCls} />
                    </div>
                    <div>
                      <label className="block text-[#555] text-[11px] font-semibold uppercase tracking-wider mb-2">{f.company}</label>
                      <input type="text" required value={fields.company} onChange={set("company")} placeholder={f.companyPh} className={inputCls} />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[#555] text-[11px] font-semibold uppercase tracking-wider mb-2">{f.email}</label>
                      <input type="email" required value={fields.email} onChange={set("email")} placeholder={f.emailPh} className={inputCls} />
                    </div>
                    <div>
                      <label className="block text-[#555] text-[11px] font-semibold uppercase tracking-wider mb-2">{f.role}</label>
                      <input type="text" value={fields.role} onChange={set("role")} placeholder={f.rolePh} className={inputCls} />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[#555] text-[11px] font-semibold uppercase tracking-wider mb-2">{f.message}</label>
                    <textarea
                      rows={4}
                      value={fields.message}
                      onChange={set("message")}
                      placeholder={f.messagePh}
                      className={`${inputCls} resize-none`}
                    />
                  </div>

                  {state === "error" && (
                    <p className="text-red-400 text-sm">{f.error}</p>
                  )}

                  <button
                    type="submit"
                    disabled={state === "sending"}
                    className="w-full inline-flex items-center justify-center gap-2.5 font-bold py-4 px-6 rounded-xl text-white text-sm transition-all duration-200 disabled:opacity-60"
                    style={{ background: "#0000ff" }}
                  >
                    <IconSend />
                    {state === "sending" ? f.sending : f.submit}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-20 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid #161616" }}>
          <a href="#" className="flex items-center gap-2.5">
            <LogoMark className="w-6 h-4 text-[#0000ff]" />
            <span className="text-white font-bold text-[15px]">
              Next<span className="text-[#444]">Platform</span>
            </span>
          </a>
          <p className="text-[#333] text-xs">© {new Date().getFullYear()} NextPlatform. {t.footer.copy}</p>
          <div className="flex gap-5">
            {t.footer.links.map((l) => (
              <a key={l.label} href={l.href} className="text-[#444] hover:text-[#888] text-xs transition-colors">
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────

export default function ClientPage() {
  const [lang, setLang] = useState<Lang>("pt");
  useReveal();

  return (
    <>
      <Nav lang={lang} setLang={setLang} />
      <main>
        <Hero lang={lang} />
        <Services lang={lang} />
        <Methodology lang={lang} />
        <Process lang={lang} />
        <Maturity lang={lang} />
        <Benefits lang={lang} />
        <Contact lang={lang} />
      </main>
    </>
  );
}
