/* ===============================================================
   DigitalGov 0.1 — app.js (ES Module)
   Intro · Magnetic particles · Cinematic animations · All sections
=============================================================== */

// ================================================
// DATA
// ================================================
if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}
window.addEventListener("load", () => {
  window.scrollTo(0, 0);
});
window.addEventListener("beforeunload", () => {
  window.scrollTo(0, 0);
});

const DAYS = {
  1: [
    { t: "08:30", e: "Accueil des invités", w: "", hl: false },
    { t: "09:00", e: "Mot d'ouverture", w: "", hl: false },
    { t: "09:30", e: "Lancement du Hackathon", w: "", hl: true },
    {
      t: "09:45",
      e: "Conférence — Gouvernance des SI",
      w: "Mme. MEZOUAR Houda",
      hl: false,
    },
    { t: "10:35", e: "Pause café & Networking", w: "", hl: false },
    {
      t: "10:55",
      e: "Conférence — Sécurité des SI",
      w: "Mr. DUBOURG Jérémy",
      hl: false,
    },
    { t: "11:45", e: "Lancement Python Battle", w: "", hl: true },
    { t: "12:00", e: "Passage des entreprises", w: "", hl: false },
    { t: "12:20", e: "Ouverture du Forum", w: "", hl: false },
    { t: "13:00", e: "Pause déjeuner", w: "", hl: false },
    {
      t: "14:15",
      e: "Table ronde des Experts",
      w: "BOUAZZAOUI · HABYB ELLAH · ABDLKRIM · EL ANMANARI · Mod: BENAYADA",
      hl: true,
    },
    {
      t: "15:05",
      e: "Workshop — Formation ERP",
      w: "Mme. MNIJEL Oumaima",
      hl: false,
    },
    { t: "16:00", e: "Pause café", w: "", hl: false },
    {
      t: "16:20",
      e: "Workshop — Formation pratique IA",
      w: "Mr. EL OUIAAZZANI Hamza & Mr. OUBAL Mohamed",
      hl: false,
    },
    {
      t: "17:00",
      e: "Sharing Experience",
      w: "Mme. ATTAR Fatiha · Mr. AIT YOUSSEF Lahcen · Mr. MTOUAA Mourad",
      hl: false,
    },
    { t: "18:00", e: "Pause musicale", w: "", hl: false },
    { t: "18:30", e: "Clôture — Jour 1", w: "", hl: false },
  ],
  2: [
    { t: "09:00", e: "Accueil des participants", w: "", hl: false },
    { t: "09:30", e: "Session d'ouverture — Jour 2", w: "", hl: false },
    {
      t: "10:00",
      e: "Conférence — Entrepreneuriat & Digitalisation",
      w: "Mr. OUBAL Mohamed",
      hl: false,
    },
    {
      t: "11:00",
      e: "Conférence — Entrepreneuriat & Management SI",
      w: "Mr. ONMAZIR Ahmed",
      hl: false,
    },
    { t: "12:00", e: "Pause déjeuner", w: "", hl: false },
    {
      t: "13:30",
      e: "Table ronde — Jour 2",
      w: "AUSIM · Mr. EL JADID Othmane",
      hl: true,
    },
    {
      t: "14:30",
      e: "Finale Python Battle — Jury professionnel",
      w: "",
      hl: true,
    },
    {
      t: "15:30",
      e: "Workshop — Coaching Carrière",
      w: "Mr. ESSEMLALI Anas",
      hl: false,
    },
    {
      t: "16:30",
      e: "Workshop — Automatisation",
      w: "Mr. ZEMZGUI Youness",
      hl: false,
    },
    { t: "16:45", e: "Remise des prix", w: "", hl: true },
    { t: "17:30", e: "Clôture générale DigitalGov 0.1", w: "", hl: false },
  ],
};

const SPEAKERS = [
  {
    init: "MH",
    name: "Mme. MEZOUAR Houda",
    role: "Intervenante",
    topic:
      "« Gouvernance des SI — Pourquoi les meilleurs systèmes échouent-ils sans elle ? »",
    img: "images/partenaires/partenaires/Houda mezouar.jpeg",
  },
  {
    init: "DJ",
    name: "Mr. DUBOURG Jérémy",
    role: "Intervenant",
    topic:
      "« Sécurité des SI — Enjeux et bonnes pratiques pour une gouvernance robuste »",
    img: "images/partenaires/partenaires/Jeremy dubourg.jpeg",
  },
  {
    init: "OM",
    name: "Mr. OUBAL Mohamed",
    role: "Intervenant",
    topic: "« Entrepreneuriat & Digitalisation — Du technique au stratégique »",
    img: "images/partenaires/partenaires/Oubal.png",
  },
  {
    init: "OA",
    name: "Mr. ONMAZIR Ahmed",
    role: "Intervenant",
    topic:
      "« Entrepreneuriat & Management de projet SI — Naviguer dans la complexité »",
    img: "images/partenaires/partenaires/ounmazir.png",
  },
  {
    init: "MO",
    name: "Mme. MNIJEL Oumaima",
    role: "Animatrice Workshop",
    topic:
      "« Formation ERP — Optimiser la gestion des ressources de l'entreprise »",
    img: "images/partenaires/partenaires/Oumaima mnijel.jpeg",
  },
  {
    init: "BA",
    name: "Mr. BOUCHAL Anouar",
    role: "Animateur Workshop",
    topic: "« Gouvernance SI — La vision d'ensemble souvent négligée »",
    img: "images/partenaires/partenaires/bouchal anouar.png",
  },
  {
    init: "AK",
    name: "Mr. ADIL Karim",
    role: "Animateur Workshop",
    topic:
      "« Rise of Agentic AI — L'IA autonome et son impact sur la gouvernance »",
    img: "images/partenaires/partenaires/Adil Karim.png",
  },
  {
    init: "EH",
    name: "Mr. ELOUIAAZZANI Hamza",
    role: "Animateur Workshop",
    topic: "« Formation pratique en Intelligence Artificielle »",
    img: "images/partenaires/partenaires/Hamza ELOUIAAZANI.png",
  },
];

const WORKSHOPS = [
  {
    pill: "online",
    label: "En ligne",
    date: "28 Fév 2026 · 21:30",
    title: "Formation Gouvernance SI",
    who: "Mr. BOUCHAL Anouar",
    desc: "La vision d'ensemble des Systèmes d'Information — souvent négligée, toujours essentielle.",
  },
  {
    pill: "online",
    label: "En ligne",
    date: "Avril (En ligne)",
    title: "Formation en IA",
    who: "Mr. Bahae",
    desc: "Comprendre les bases de l'IA et son impact sur les systèmes d'information.",
  },
  {
    pill: "hybrid",
    label: "Hybride",
    date: "5–7 Mars 2026",
    title: "Algorithmique & Prog. Compétitive",
    who: "Club ResearchX",
    desc: "Logique d'algorithme et programmation compétitive — théorie + pratique.",
  },
  {
    pill: "live",
    label: "Présentiel",
    date: "7 Mars 2026 · 11:00",
    title: "Rise of Agentic AI",
    who: "Mr. ADIL Karim",
    desc: "Exploration des systèmes d'IA autonomes et leur impact sur la gouvernance numérique.",
  },
  {
    pill: "live",
    label: "Présentiel",
    date: "20 Avril 2026",
    title: "Formation en ERP",
    who: "Mme. MNIJEL Oumaima",
    desc: "Optimiser la gestion des ressources de l'entreprise grâce aux systèmes ERP.",
  },
  {
    pill: "live",
    label: "Présentiel",
    date: "20 Avril 2026",
    title: "Formation pratique IA",
    who: "Mr. ELOUIAAZZANI Hamza",
    desc: "Atelier pratique de manipulation des outils et modèles d'intelligence artificielle.",
  },
  {
    pill: "live",
    label: "Présentiel",
    date: "21 Avril 2026",
    title: "Coaching Carrière",
    who: "Mr. ESSEMLALI Anas",
    desc: "Développer ses compétences pour réussir dans le monde professionnel.",
  },
  {
    pill: "live",
    label: "Présentiel",
    date: "21 Avril 2026",
    title: "Workshop Automatisation",
    who: "Mr. ZEMZGUI Youness",
    desc: "Outils et techniques d'automatisation pour améliorer l'efficacité dans les projets SI.",
  },
];

const ROUNDTABLE = [
  {
    tag: "Table ronde · 20 Avril",
    title: "Experts du secteur",
    people: [
      {
        name: "Mr. BOUAZZAOUI Aziz",
        role: "Directeur SI & Transformation Digitale",
        img: "images/partenaires/partenaires/bouazzouzi.png",
      },
      { name: "Mme. HABYB ELLAH Khadija", role: "Chef de projet MOA/MOE" },
      { name: "Mr. ABDLKRIM Moudrika", role: "Chef de projet senior" },
      {
        name: "Mr. EL ANMANARI Nezha",
        role: "Senior IT Manager & Business Analyst",
        img: "images/partenaires/partenaires/Nezha elanmanari.jpeg",
      },
      {
        name: "Mme. BENAYADA Assya",
        role: "Modératrice",
        mod: true,
        img: "images/partenaires/partenaires/Assya Benayada.png",
      },
    ],
  },
  {
    tag: "Sharing Experience · 20 Avril",
    title: "Retours d'expérience",
    people: [
      {
        name: "Mme. ATTAR Fatiha",
        role: "Business Analyst",
        img: "images/partenaires/partenaires/Fatiha attar.jpeg",
      },
      {
        name: "Mr. AIT YOUSSEF Lahcen",
        role: "Consultant SAP & Lauréat ENSAKh",
        img: "images/partenaires/partenaires/ait youssef.png",
      },
      {
        name: "Mr. MTOUAA Mourad",
        role: "DevOps Consultant & Software Engineer",
        img: "images/partenaires/partenaires/Mourad mtouaa.jpeg",
      },
    ],
  },
  {
    tag: "Table ronde · 21 Avril",
    title: "Jour 2 — Regards croisés",
    people: [
      { name: "AUSIM", role: "Technologie & Services de l'Information" },
      {
        name: "Mr. EL JADID Othmane",
        role: "Entrepreneur",
        img: "images/partenaires/partenaires/Outhmane Eljadid.png",
      },
    ],
  },
];

const TEAM = [
  {
    init: "SH",
    name: "SENNAL Hajar",
    cell: "Présidence",
    role: "Présidente",
    img: "images/opt/hajar.jpg",
    linkedin: "https://www.linkedin.com/in/hajar-sennal-6a9ab3351/",
  },
  {
    init: "IF",
    name: "ICHMAWIN Fahd",
    cell: "Présidence",
    role: "Vice-président",
    img: "images/opt/fahd.jpg",
    linkedin: "https://www.linkedin.com/in/fahd-ichmawin/",
  },
  {
    init: "BY",
    name: "BENNIS Yasmine",
    cell: "Cellule Technique",
    role: "Responsable",
    img: "images/opt/yassmine.jpg",
    linkedin: "https://www.linkedin.com/in/yasmine-bennis04",
  },
  {
    init: "ED",
    name: "EL ALLAM Douae",
    cell: "Cellule Technique",
    role: "Vice-responsable",
    img: "images/opt/douaa.jpg",
    linkedin: "https://www.linkedin.com/in/douae-el-allam-6b0616317",
  },
  {
    init: "GH",
    name: "EL GUEROUA Haytam",
    cell: "Cellule Média",
    role: "Responsable",
    img: "images/opt/haytam.jpg",
    linkedin: "https://www.linkedin.com/in/haytam-elg",
  },
  {
    init: "SZ",
    name: "SAMHAOUI Ziad",
    cell: "Cellule Média",
    role: "Vice-responsable",
    img: "images/opt/zyad.jpg",
    linkedin: "https://www.linkedin.com/in/ziyad-samhaoui-185782362",
  },
  {
    init: "CF",
    name: "CHOUJAA Fatima Zahra",
    cell: "Compétition",
    role: "Responsable",
    img: "images/opt/fatima.jpg",
    linkedin: "https://www.linkedin.com/in/choujaafatimazahra",
  },
  {
    init: "AI",
    name: "ATMANI Imad",
    cell: "Compétition",
    role: "Vice-responsable",
    img: "images/opt/imad.jpg",
    linkedin: "https://www.linkedin.com/in/imad-atmani-910a20383",
  },
  {
    init: "AZ",
    name: "AZAROUAL Zineb",
    cell: "Logistique",
    role: "Responsable",
    img: "images/opt/zineb.jpg",
    linkedin: "https://www.linkedin.com/in/zinebazaroual",
  },
  {
    init: "ZA",
    name: "ZIDOUH Abdelkrim",
    cell: "Logistique",
    role: "Vice-responsable",
    img: "images/opt/abdlkrim.jpg",
    linkedin: "https://www.linkedin.com/in/abdelkrim-zidouh-4917a5334",
  },
  {
    init: "AY",
    name: "ATTI Youssra",
    cell: "Sponsoring",
    role: "Responsable",
    img: "images/opt/youssra.jpg",
    linkedin: "https://www.linkedin.com/in/yousra-atti",
  },
  {
    init: "SN",
    name: "SADIKI Nouhaila",
    cell: "Sponsoring",
    role: "Vice-responsable",
    img: "images/opt/nouhaila.jpg",
    linkedin: "https://www.linkedin.com/in/sadiki-nouhaila",
  },
  {
    init: "HI",
    name: "HAFIDI Ihsane",
    cell: "Conférences & Ateliers",
    role: "Responsable",
    img: "images/opt/ihssane.jpg",
    linkedin: "https://www.linkedin.com/in/ihsane-hafidi-a80859304",
  },
  {
    init: "RS",
    name: "RAHALI Sara",
    cell: "Conférences & Ateliers",
    role: "Vice-responsable",
    img: "images/opt/sara.jpg",
    linkedin: "https://www.linkedin.com/in/sara-rahali",
  },
  {
    init: "NS",
    name: "NAFI Samira",
    cell: "Divertissement",
    role: "Responsable",
    img: "images/opt/samira.jpg",
    linkedin: "https://www.linkedin.com/in/samira-nafi-017372326",
  },
  {
    init: "AA",
    name: "AIT ABDELLAH Ayoub",
    cell: "Divertissement",
    role: "Vice-responsable",
    img: "images/opt/ayoub.jpg",
    linkedin: "#",
  },
  {
    init: "CM",
    name: "CHERIF Madani",
    cell: "Trésorerie",
    role: "Responsable",
    img: "images/opt/cherif.jpg",
    linkedin: "https://www.linkedin.com/in/cherif-madani-078296244",
  },
];

// ================================================
// CURSOR
// ================================================
const cursorEl = document.getElementById("cursor");
const cursorText = document.getElementById("cursorText");
let cx = 0,
  cy = 0,
  tx = 0,
  ty = 0;

document.addEventListener("mousemove", (e) => {
  tx = e.clientX;
  ty = e.clientY;
});

(function trackCursor() {
  cx += (tx - cx) * 0.12;
  cy += (ty - cy) * 0.12;
  cursorEl.style.left = cx + "px";
  cursorEl.style.top = cy + "px";
  requestAnimationFrame(trackCursor);
})();

function addCursorHover(selector, text = "") {
  document.querySelectorAll(selector).forEach((el) => {
    el.addEventListener("mouseenter", () => {
      if (text) {
        document.body.classList.add("hovering-text");
        cursorText.textContent = text;
      } else {
        document.body.classList.add("hovering");
      }
    });
    el.addEventListener("mouseleave", () => {
      document.body.classList.remove("hovering", "hovering-text");
      cursorText.textContent = "";
    });
  });
}
addCursorHover(
  "a, button, .fb-card, .spk-card, .atelier-card, .tm-card, .rt-panel, label",
);
addCursorHover(".btn-primary", "Explorer");
addCursorHover(".btn-submit", "Envoyer");

// ================================================
// HERO CANVAS — MAGNETIC FLUID PARTICLES
// The signature animation: a living particle field
// that reacts magnetically to the mouse position
// ================================================
(function heroFluid() {
  const canvas = document.getElementById("heroCanvas");
  const ctx = canvas.getContext("2d");
  let W,
    H,
    particles = [],
    raf,
    dpr = 1;
  const isTouch = window.matchMedia(
    "(hover:none) and (pointer:coarse)",
  ).matches;
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  const COUNT = reduceMotion ? 60 : isTouch ? 90 : 180;
  const CONNECT = isTouch ? 70 : 90;
  const AURA = isTouch ? 90 : 120;
  let mouse = { x: -9999, y: -9999 };

  function resize() {
    W = canvas.offsetWidth;
    H = canvas.offsetHeight;
    dpr = Math.min(window.devicePixelRatio || 1, isTouch ? 1.25 : 2);
    canvas.width = Math.max(1, Math.floor(W * dpr));
    canvas.height = Math.max(1, Math.floor(H * dpr));
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    initParticles();
  }

  class Particle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * W;
      this.y = Math.random() * H;
      this.ox = this.x; // "home" x
      this.oy = this.y; // "home" y
      this.vx = 0;
      this.vy = 0;
      this.size = Math.random() * 1.8 + 0.4;
      this.alpha = Math.random() * 0.5 + 0.15;
      this.hue = 200 + Math.random() * 60; // blue → violet range
      this.speed = Math.random() * 0.002 + 0.001;
      this.angle = Math.random() * Math.PI * 2;
    }

    update() {
      // Gentle drift (natural life)
      this.angle += this.speed;
      const driftX = Math.cos(this.angle) * 0.4;
      const driftY = Math.sin(this.angle * 0.7) * 0.4;

      // Mouse magnetic repulsion
      const dx = this.x - mouse.x;
      const dy = this.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const RADIUS = 160;

      if (dist < RADIUS) {
        const force = 1 - dist / RADIUS;
        const angle = Math.atan2(dy, dx);
        this.vx += Math.cos(angle) * force * 3.5;
        this.vy += Math.sin(angle) * force * 3.5;
      }

      // Spring back to home
      this.vx += (this.ox - this.x) * 0.018;
      this.vy += (this.oy - this.y) * 0.018;

      // Damping
      this.vx *= 0.88;
      this.vy *= 0.88;

      this.x += this.vx + driftX;
      this.y += this.vy + driftY;
    }

    draw() {
      const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
      const alpha = Math.min(1, this.alpha + speed * 0.08);
      const sat = 70 + speed * 10;
      const lum = 55 + speed * 8;

      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size + speed * 0.4, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${this.hue},${sat}%,${lum}%,${alpha})`;
      ctx.fill();
    }
  }

  function initParticles() {
    particles = Array.from({ length: COUNT }, () => new Particle());
  }

  function drawConnections() {
    const threshold = CONNECT;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < threshold) {
          const alpha = (1 - d / threshold) * 0.12;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(100,150,255,${alpha})`;
          ctx.lineWidth = isTouch ? 0.6 : 0.8;
          ctx.stroke();
        }
      }
    }
  }

  // Draw subtle grid
  function drawGrid() {
    ctx.strokeStyle = "rgba(59,130,246,0.028)";
    ctx.lineWidth = 1;
    const spacing = 80;
    for (let x = 0; x < W; x += spacing) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, H);
      ctx.stroke();
    }
    for (let y = 0; y < H; y += spacing) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(W, y);
      ctx.stroke();
    }
  }

  // Ambient glow around mouse
  function drawMouseAura() {
    if (mouse.x < 0 || mouse.x > W) return;
    const grad = ctx.createRadialGradient(
      mouse.x,
      mouse.y,
      0,
      mouse.x,
      mouse.y,
      AURA,
    );
    grad.addColorStop(0, "rgba(139,92,246,0.08)");
    grad.addColorStop(1, "rgba(59,130,246,0)");
    ctx.beginPath();
    ctx.arc(mouse.x, mouse.y, AURA, 0, Math.PI * 2);
    ctx.fillStyle = grad;
    ctx.fill();
  }

  let t = 0;
  function draw() {
    ctx.clearRect(0, 0, W, H);
    t++;

    drawGrid();
    drawMouseAura();
    drawConnections();
    particles.forEach((p) => {
      p.update();
      p.draw();
    });

    // Slow flowing gradient wash (atmosphere)
    const wash = ctx.createLinearGradient(0, 0, W, H);
    const phase = Math.sin(t * 0.003);
    wash.addColorStop(0, `rgba(139,92,246,${0.03 + phase * 0.015})`);
    wash.addColorStop(0.5, "rgba(0,0,0,0)");
    wash.addColorStop(1, `rgba(6,182,212,${0.025 + phase * 0.01})`);
    ctx.fillStyle = wash;
    ctx.fillRect(0, 0, W, H);

    raf = requestAnimationFrame(draw);
  }

  resize();
  function setPointer(clientX, clientY) {
    const rect = canvas.getBoundingClientRect();
    mouse.x = clientX - rect.left;
    mouse.y = clientY - rect.top;
  }

  window.addEventListener("resize", resize);
  canvas.addEventListener(
    "pointermove",
    (e) => setPointer(e.clientX, e.clientY),
    { passive: true },
  );
  canvas.addEventListener(
    "pointerdown",
    (e) => setPointer(e.clientX, e.clientY),
    { passive: true },
  );
  canvas.addEventListener("pointerleave", () => {
    mouse.x = -9999;
    mouse.y = -9999;
  });
  window.addEventListener(
    "pointermove",
    (e) => setPointer(e.clientX, e.clientY),
    { passive: true },
  );
  window.addEventListener(
    "touchend",
    () => {
      mouse.x = -9999;
      mouse.y = -9999;
    },
    { passive: true },
  );

  draw();
})();

// ================================================
// COMPETITION CANVAS — Energy wave field
// ================================================
(function compWave() {
  const canvas = document.getElementById("compCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let W,
    H,
    t = 0;

  function resize() {
    W = canvas.width = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener("resize", resize);

  // Floating energy nodes
  const nodes = Array.from({ length: 14 }, () => ({
    x: Math.random(),
    y: Math.random() * 0.8 + 0.1,
    vx: (Math.random() - 0.5) * 0.0008,
    vy: (Math.random() - 0.5) * 0.0005,
    phase: Math.random() * Math.PI * 2,
    speed: 0.015 + Math.random() * 0.025,
  }));

  (function draw() {
    ctx.clearRect(0, 0, W, H);
    t += 0.018;

    // Deep background gradient
    const bg = ctx.createLinearGradient(0, 0, W, H);
    bg.addColorStop(0, "#06080f");
    bg.addColorStop(0.5, "#0a0d1a");
    bg.addColorStop(1, "#06080f");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    // Flowing horizontal energy waves
    for (let i = 0; i < 6; i++) {
      const offset = i / 6;
      ctx.beginPath();
      for (let x = 0; x <= W; x += 3) {
        const progress = x / W;
        const y =
          H * 0.5 +
          Math.sin(progress * 6 + t + offset * Math.PI * 2) * (30 + i * 12) +
          Math.sin(progress * 3 - t * 0.7 + offset) * (15 + i * 5);
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      const alpha = 0.08 - i * 0.012;
      const hue = 220 + i * 15;
      ctx.strokeStyle = `hsla(${hue},80%,65%,${alpha})`;
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }

    // Energy nodes + connections
    nodes.forEach((n) => {
      n.x += n.vx;
      n.y += n.vy;
      n.phase += n.speed;
      if (n.x < 0 || n.x > 1) n.vx *= -1;
      if (n.y < 0.05 || n.y > 0.95) n.vy *= -1;
      const px = n.x * W,
        py = n.y * H;
      const pulse = (Math.sin(n.phase) + 1) * 0.5;
      const r = 5 + pulse * 6;

      // Glow
      const gl = ctx.createRadialGradient(px, py, 0, px, py, r * 3.5);
      gl.addColorStop(0, `rgba(245,158,11,${0.4 * pulse + 0.1})`);
      gl.addColorStop(1, "rgba(245,158,11,0)");
      ctx.beginPath();
      ctx.arc(px, py, r * 3.5, 0, Math.PI * 2);
      ctx.fillStyle = gl;
      ctx.fill();
      // Core
      ctx.beginPath();
      ctx.arc(px, py, r * 0.5, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${0.7 + pulse * 0.3})`;
      ctx.fill();
    });

    // Node connections
    nodes.forEach((a, i) => {
      nodes.slice(i + 1).forEach((b) => {
        const dx = (a.x - b.x) * W,
          dy = (a.y - b.y) * H;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < 200) {
          ctx.beginPath();
          ctx.moveTo(a.x * W, a.y * H);
          ctx.lineTo(b.x * W, b.y * H);
          ctx.strokeStyle = `rgba(245,158,11,${(1 - d / 200) * 0.14})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      });
    });

    // Central glow
    const cg = ctx.createRadialGradient(
      W / 2,
      H / 2,
      0,
      W / 2,
      H / 2,
      Math.min(W, H) / 2.5,
    );
    cg.addColorStop(0, "rgba(59,130,246,0.06)");
    cg.addColorStop(1, "rgba(59,130,246,0)");
    ctx.fillStyle = cg;
    ctx.fillRect(0, 0, W, H);

    requestAnimationFrame(draw);
  })();
})();

// ================================================
// NAV
// ================================================
window.addEventListener(
  "scroll",
  () => {
    const pct =
      (window.scrollY / (document.body.scrollHeight - window.innerHeight)) *
      100;
    document.getElementById("progress").style.width = pct + "%";
    document
      .getElementById("nav")
      .classList.toggle("stuck", window.scrollY > 40);
  },
  { passive: true },
);

document.getElementById("navToggle").addEventListener("click", () => {
  document.getElementById("navLinks").classList.toggle("open");
});
document.querySelectorAll(".nav-a, .nav-btn").forEach((a) =>
  a.addEventListener("click", () => {
    document.getElementById("navLinks").classList.remove("open");
  }),
);

// ================================================
// PROGRAMME
// ================================================
function renderDay(day) {
  const tl = document.getElementById("progTimeline");
  tl.innerHTML = "";
  DAYS[day].forEach((item, i) => {
    const div = document.createElement("div");
    div.className = "pt-item" + (item.hl ? " highlight" : "");
    div.style.animationDelay = i * 0.035 + "s";
    div.innerHTML = `
      <div class="pt-time">${item.t}</div>
      <div class="pt-body">
        <div class="pt-event">${item.e}</div>
        ${item.w ? `<div class="pt-who">${item.w}</div>` : ""}
      </div>
    `;
    tl.appendChild(div);
  });
}

document.querySelectorAll(".ps-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document
      .querySelectorAll(".ps-btn")
      .forEach((b) => b.classList.remove("ps-active"));
    btn.classList.add("ps-active");
    renderDay(Number(btn.dataset.day));
  });
});
renderDay(1);

// ================================================
// SPEAKERS
// ================================================
function renderSpeakers() {
  const grid = document.getElementById("spkGrid");
  grid.innerHTML = SPEAKERS.map(
    (s) => `
    <div class="spk-card">
      <div class="spk-avatar">
        ${
          s.img
            ? `<img src="${encodeURI(s.img)}" alt="${s.name}" loading="lazy" decoding="async" width="96" height="96">`
            : s.init
        }
      </div>
      <div class="spk-name">${s.name}</div>
      <div class="spk-role">${s.role}</div>
      <p class="spk-topic">${s.topic}</p>
    </div>
  `,
  ).join("");
}
renderSpeakers();

// ================================================
// ATELIERS
// ================================================
function renderAteliers() {
  const grid = document.getElementById("atelierGrid");
  grid.innerHTML = WORKSHOPS.map(
    (w) => `
    <div class="atelier-card">
      <span class="ac-pill ${w.pill}">${w.label}</span>
      <div class="ac-date">${w.date}</div>
      <div class="ac-title">${w.title}</div>
      <div class="ac-presenter">${w.who}</div>
      <p class="ac-desc">${w.desc}</p>
    </div>
  `,
  ).join("");
}
renderAteliers();

// ================================================
// ROUNDTABLE
// ================================================
function renderRoundtable() {
  const wrap = document.getElementById("rtPanels");
  wrap.innerHTML = ROUNDTABLE.map(
    (panel, i) => `
    <div class="rt-panel">
      <span class="rtp-tag">${panel.tag}</span>
      <h3 class="rtp-title">${panel.title}</h3>
      <ul class="rtp-list">
        ${panel.people
          .map(
            (p) => `
          <li class="rtp-person${p.mod ? " rtp-mod" : ""}">
            ${
              p.img
                ? `<span class="rtp-ava"><img src="${encodeURI(p.img)}" alt="${p.name}" loading="lazy" decoding="async" width="56" height="56"></span>`
                : ""
            }
            <div class="rtp-text">
              <span class="rtp-name">${p.name}</span>
              <span class="rtp-role">${p.role}</span>
            </div>
          </li>
        `,
          )
          .join("")}
      </ul>
    </div>
  `,
  ).join("");
}
renderRoundtable();

// ================================================
// COMPETITION TIMELINE
// ================================================
function renderCompTimeline() {
  const data = [
    { date: "7 Mars 2026", ev: "Annonce de la compétition", hl: false },
    { date: "20 Avril · 09:30", ev: "Lancement du Hackathon", hl: true },
    { date: "20 Avril · 11:45", ev: "Lancement Python Battle", hl: true },
    { date: "21 Avril · 14:30", ev: "Finale — Jury professionnel", hl: true },
    { date: "21 Avril · 16:45", ev: "Remise des prix", hl: true },
  ];
  const ct = document.getElementById("compTimeline");
  ct.innerHTML = data
    .map(
      (d) => `
    <div class="ct-row${d.hl ? " hl" : ""}">
      <span class="ct-date">${d.date}</span>
      ${d.hl ? '<span class="ct-dot"></span>' : ""}
      <span class="ct-ev">${d.ev}</span>
    </div>
  `,
    )
    .join("");
}
renderCompTimeline();

// ================================================
// TEAM
// ================================================
function renderTeam() {
  const grid = document.getElementById("teamGrid");
  if (!grid) return;
  grid.innerHTML = TEAM.map((m) => {
    const isPlaceholder = m.linkedin === "#";
    return `
    <div class="tm-card">
      <div class="tm-ava">
        ${m.img ? `<img src="${m.img}" alt="${m.name}" loading="lazy" decoding="async" width="72" height="72">` : m.init}
      </div>
      <div class="tm-name">${m.name}</div>
      <div class="tm-cell">${m.cell}</div>
      <div class="tm-role">${m.role}</div>
      ${
        m.linkedin
          ? `<a class="tm-link${isPlaceholder ? " is-placeholder" : ""}" href="${m.linkedin}" ${
              isPlaceholder
                ? 'aria-disabled="true"'
                : 'target="_blank" rel="noopener noreferrer"'
            } aria-label="LinkedIn de ${m.name}">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M4.98 3.5a2.48 2.48 0 1 1-.01 4.96 2.48 2.48 0 0 1 .01-4.96zM3 8.98h3.96V21H3V8.98zm7.5 0h3.79v1.63h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.77 2.65 4.77 6.1V21h-3.96v-5.43c0-1.3-.03-2.97-1.81-2.97-1.82 0-2.1 1.42-2.1 2.88V21H10.5V8.98z"/>
              </svg>
              <span>LinkedIn</span>
            </a>`
          : ""
      }
    </div>
  `;
  }).join("");
}
renderTeam();

// Hero entrance is handled entirely by CSS body.site-ready rules.

// ================================================
// SCROLL REVEAL + COUNT UP
// ================================================
const countedSet = new Set();
const revealObs = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      if (el.hasAttribute("data-count") && !countedSet.has(el)) {
        countedSet.add(el);
        countUp(el, parseInt(el.dataset.count));
      }
      revealObs.unobserve(el);
    });
  },
  { threshold: 0 },
);

function observeAll() {
  document.querySelectorAll("[data-count]").forEach((el) => {
    if (!countedSet.has(el)) revealObs.observe(el);
  });
}
observeAll();
// Also fire on load in case elements were already in view
window.addEventListener("load", observeAll);

function countUp(el, target, duration = 1400) {
  let start = null;
  function step(ts) {
    if (!start) start = ts;
    const prog = Math.min(1, (ts - start) / duration);
    const ease = 1 - Math.pow(1 - prog, 3);
    el.textContent = Math.floor(ease * target);
    if (prog < 1) requestAnimationFrame(step);
    else el.textContent = target;
  }
  requestAnimationFrame(step);
}

// ================================================
// FAQ
// ================================================
document.querySelectorAll(".faq-q").forEach((btn) => {
  btn.addEventListener("click", () => {
    const item = btn.closest(".faq-i");
    const isOpen = item.classList.contains("open");
    document
      .querySelectorAll(".faq-i")
      .forEach((fi) => fi.classList.remove("open"));
    if (!isOpen) item.classList.add("open");
  });
});

// ================================================
// REGISTRATION FORM — EmailJS
// ================================================
// ⚙️  Replace these three values with your own from emailjs.com
const EMAILJS_PUBLIC_KEY = "Szbbymzu1hbBXPx14"; // Account → API Keys
const EMAILJS_SERVICE_ID = "service_abc123"; // Email Services tab
const EMAILJS_TEMPLATE_ID = "template_dabpkn6"; // Email Templates tab

emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });

document.getElementById("regForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const form = this;
  const btn = document.getElementById("submitBtn");
  const success = document.getElementById("rfSuccess");

  // Collect checked participation boxes
  const checked =
    [...form.querySelectorAll('input[name="participation"]:checked')]
      .map((cb) => cb.value)
      .join(", ") || "—";

  const templateParams = {
    prenom: form.prenom.value.trim(),
    nom: form.nom.value.trim(),
    email: form.email.value.trim(),
    telephone: form.telephone.value.trim() || "—",
    etablissement: form.etablissement.value.trim() || "—",
    ville: form.ville.value.trim() || "—",
    profil: form.profil.value || "—",
    participation: checked,
    to_email: form.email.value.trim(), // used in template as {{to_email}}
  };

  btn.disabled = true;
  btn.textContent = "Envoi en cours…";

  emailjs
    .send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
    .then(() => {
      success.style.display = "flex";
      form.reset();
      setTimeout(() => (success.style.display = "none"), 6000);
    })
    .catch((err) => {
      console.error("EmailJS error:", err);
      alert(
        "Une erreur est survenue. Veuillez réessayer ou contacter digitalgovdays@gmail.com",
      );
    })
    .finally(() => {
      btn.disabled = false;
      btn.textContent = "Réserver ma place";
    });
});

// ================================================
// SMOOTH ACTIVE NAV
// ================================================
const sections = document.querySelectorAll("section[id], footer[id]");
window.addEventListener(
  "scroll",
  () => {
    let current = "";
    sections.forEach((sec) => {
      if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
    });
    document.querySelectorAll(".nav-a").forEach((a) => {
      a.style.color =
        a.getAttribute("href") === "#" + current ? "var(--white)" : "";
    });
  },
  { passive: true },
);

// ================================================
// RE-ADD CURSOR HOVER AFTER DYNAMIC RENDERS
// ================================================
setTimeout(() => {
  addCursorHover(".spk-card, .atelier-card, .tm-card, .rt-panel, .fb-card");
}, 200);

// ================================================
// STAGGER + BLUR-IN SCROLL OBSERVERS
// ================================================
const blurObs = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add("revealed");
      blurObs.unobserve(e.target);
    });
  },
  { threshold: 0.05, rootMargin: "0px 0px 40px 0px" },
);

const staggerObs = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add("revealed");
      staggerObs.unobserve(e.target);
    });
  },
  { threshold: 0.04, rootMargin: "0px 0px 60px 0px" },
);

// Add blur-in to section headings
document
  .querySelectorAll(".section-h, .section-label, .section-sub")
  .forEach((el) => {
    el.classList.add("blur-in");
    blurObs.observe(el);
  });
// Add stagger to grids
document
  .querySelectorAll(
    ".spk-grid, .atelier-grid, .rt-panels, .team-grid, .feature-bento, .partner-logos, .li-cards",
  )
  .forEach((el) => {
    el.classList.add("stagger-children");
    staggerObs.observe(el);
  });

// ================================================
// INTRO LOADER
// ================================================
(async function initIntro() {
  const intro = document.getElementById("intro");
  const titleEl = document.getElementById("introTitle");
  const tagEl = document.getElementById("introTagline");
  const progressEl = document.getElementById("introProgress");
  if (!intro) return;

  document.body.style.overflow = "hidden";
  document.body.classList.add("intro-active");

  if (titleEl) titleEl.textContent = "DigitalGov";
  if (tagEl) tagEl.textContent = "0.1 — De la donnée à la décision";

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  const duration = reduceMotion ? 800 : 1600;
  const hold = reduceMotion ? 200 : 400;
  const start = performance.now();

  function tick(now) {
    if (!progressEl) return;
    const t = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - t, 3);
    progressEl.style.width = `${Math.round(eased * 100)}%`;
    if (t < 1) requestAnimationFrame(tick);
  }

  if (progressEl) {
    progressEl.style.width = "0%";
    requestAnimationFrame(tick);
  }

  setTimeout(() => {
    intro.classList.add("fade-out");
    document.body.style.overflow = "";
    document.body.classList.remove("intro-active");
    document.body.classList.add("site-ready");
    setTimeout(() => {
      intro.classList.add("gone");
    }, 500);
  }, duration + hold);
})();
