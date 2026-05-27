/* ============================================================
   script.js — Portfólio Maria Vitória
   Responsável por:
     1. Alternância de tema escuro/claro com persistência no localStorage
     2. Troca de idioma PT-BR / EN com persistência no localStorage
     3. Animação da lua no canvas
     4. Geração de estrelas decorativas
     5. Animações de entrada com IntersectionObserver
     6. Menu mobile
     7. Highlight de link ativo no nav
   ============================================================ */

/* ════════════════════════════════════════════════════════════
   1. GERENCIAMENTO DE TEMA (escuro / claro)
   ─────────────────────────────────────────────────────────
   O tema é salvo no localStorage sob a chave 'mv-theme'.
   Quando a página carrega, lemos essa chave e aplicamos o
   atributo data-theme no <html>, o que aciona todas as
   variáveis CSS do tema escolhido.
════════════════════════════════════════════════════════════ */

/**
 * Aplica o tema ao documento e atualiza o ícone do botão.
 * @param {string} theme - 'light' ou 'dark'
 */
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  const btn = document.getElementById('theme-btn');
  if (btn) {
    // Ícone de sol para tema claro, lua para escuro
    btn.innerHTML = theme === 'dark'
      ? '<span class="theme-icon">☀️</span>'
      : '<span class="theme-icon">🌙</span>';
    btn.setAttribute('aria-label', theme === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro');
  }
}

/**
 * Alterna entre tema claro e escuro.
 * Salva a preferência no localStorage para persistir entre sessões.
 */
function toggleTheme() {
  // Lê o tema atual; se não existir, assume 'light'
  const current = localStorage.getItem('mv-theme') || 'light';
  const next = current === 'dark' ? 'light' : 'dark';
  localStorage.setItem('mv-theme', next); // Salva a preferência
  applyTheme(next);
}

// Inicializa o tema assim que o script carrega
(function initTheme() {
  // Verifica o localStorage; se vazio, verifica preferência do sistema operacional
  const saved = localStorage.getItem('mv-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(saved || (prefersDark ? 'dark' : 'light'));
})();


/* ════════════════════════════════════════════════════════════
   2. SISTEMA DE IDIOMAS (PT-BR / EN)
   ─────────────────────────────────────────────────────────
   Todos os textos do site ficam neste objeto 'translations'.
   Cada chave corresponde a um atributo data-i18n="chave"
   no HTML. Ao trocar o idioma:
     - Lemos todos os elementos com [data-i18n]
     - Substituímos seu textContent pelo texto correto
     - Salvamos a preferência no localStorage sob 'mv-lang'
════════════════════════════════════════════════════════════ */

const translations = {
  'pt': {
    /* ─── Navegação ─────────────────────────────── */
    'nav.home':       'Início',
    'nav.about':      'Sobre',
    'nav.projects':   'Projetos',
    'nav.contact':    'Contato',

    /* ─── Hero ──────────────────────────────────── */
    'hero.greeting':  'Olá, eu sou',
    'hero.role':      'Desenvolvedora Full Stack',
    'hero.bio':       'Apaixonada por construir experiências digitais elegantes, funcionais e cheias de propósito. Código que respira arte.',
    'hero.cta.projects': 'Ver Projetos',
    'hero.cta.contact':  'Falar Comigo',
    'hero.scroll':    'Rolar',

    /* ─── Sobre (resumo na home) ─────────────────── */
    'about.tag':      'Sobre mim',
    'about.title':    'Quem sou',
    'about.title.em': 'eu',
    'about.p1':       'Sou Maria Vitória, desenvolvedora full stack apaixonada por criar soluções digitais que unem estética e funcionalidade. Acredito que bom código é aquele que resolve problemas reais com elegância.',
    'about.p2':       'Trabalho com desenvolvimento web desde 2022, construindo projetos que vão de APIs robustas a interfaces cuidadosamente projetadas. Cada linha de código é uma oportunidade de fazer algo incrível.',
    'about.hobbies.title': 'Além do código ✨',
    'about.hobbies.intro': 'Fora do editor de código, você me encontra mergulhada em universos ficcionais, explorando novos lugares ou simplesmente curtindo um café com uma boa playlist no fundo. ☕',
    'hobby.dorama':       'K-dramas & Doramas',
    'hobby.dorama.desc':  'Sempre com uma série asiática na fila — de romances coreanos a thrillers japoneses. Quem me avisa quando sair nova temporada?',
    'hobby.astro':        'Astronomia',
    'hobby.astro.desc':   'Olhar para o céu e lembrar o quanto o universo é imenso. Uma forma favorita de ganhar perspectiva nos dias difíceis.',
    'hobby.read':         'Leituras',
    'hobby.read.desc':    'Ficção científica, fantasia e livros técnicos convivem na mesma estante. Nada como uma boa história para recarregar as energias.',
    'hobby.photo':        '📷 Fotografia',
    'hobby.music':        'Música',
    'hobby.music.desc':   'Playlist no fone é item obrigatório no fluxo de desenvolvimento. Lo-fi para focar, K-pop para animar, jazz para pensar.',
    'hobby.design':       'Design & Fotografia',
    'hobby.design.desc':  'O olhar de design transborda para fora do código — nas fotos, nas cores do dia a dia e em tudo que é bonito de ver.',
    'hobby.travel':       'Viagens & Explorar o mundo',
    'hobby.travel.desc':  'Cada lugar novo é um reset criativo. Pequenas escapadas ou grandes aventuras — o importante é conhecer gente nova e histórias diferentes.',
    'hobby.coffee':       '☕ Café',

    /* ─── Habilidades ────────────────────────────── */
    'skills.tag':       'Tecnologias',
    'skills.title':     'Minhas',
    'skills.title.em':  'habilidades',
    'skills.desc':      'Ferramentas e tecnologias que uso para construir soluções completas, do front ao back-end.',
    'skills.frontend':  'Frontend',
    'skills.backend':   'Backend',
    'skills.database':  'Database',
    'skills.tools':     'Ferramentas',

    /* ─── Projetos ───────────────────────────────── */
    'proj.tag':       'Portfólio',
    'proj.title':     'Projetos',
    'proj.title.em':  'em destaque',
    'proj.desc':      'Uma seleção dos trabalhos que mais me orgulho, combinando criatividade e técnica.',
    'proj.p1.tag':    'Web App',
    'proj.p1.title':  'Gestão de Tarefas',
    'proj.p1.desc':   'Aplicação full stack para organização de tarefas com autenticação, categorias e filtros avançados.',
    'proj.p2.tag':    'API REST',
    'proj.p2.title':  'API de E-commerce',
    'proj.p2.desc':   'API robusta com rotas protegidas, carrinho de compras, pagamentos e painel administrativo.',
    'proj.p3.tag':    'Dashboard',
    'proj.p3.title':  'Painel Analytics',
    'proj.p3.desc':   'Dashboard interativo com visualizações de dados em tempo real, filtros e exportação em CSV.',
    'proj.demo':      'Demo',
    'proj.code':      'Código',
    'proj.all':       'Ver todos os projetos',

    /* ─── Contato ────────────────────────────────── */
    'contact.tag':        'Vamos conversar',
    'contact.title':      'Entre em',
    'contact.title.em':   'contato',
    'contact.p':          'Estou disponível para projetos freelance, oportunidades de emprego ou apenas uma conversa sobre tecnologia. Adoraria ouvir de você!',
    'form.name':          'Nome',
    'form.email':         'E-mail',
    'form.subject':       'Assunto',
    'form.message':       'Mensagem',
    'form.send':          'Enviar mensagem',
    'form.success':       '✨ Mensagem enviada! Em breve entro em contato.',
    'contact.available':  'Disponível para trabalho',

    /* ─── Rodapé ─────────────────────────────────── */
    'footer.copy':    'Feito com ♥ e muito café por Maria Vitória',
  },
  'en': {
    /* ─── Navigation ────────────────────────────── */
    'nav.home':       'Home',
    'nav.about':      'About',
    'nav.projects':   'Projects',
    'nav.contact':    'Contact',

    /* ─── Hero ──────────────────────────────────── */
    'hero.greeting':  'Hi, I\'m',
    'hero.role':      'Full Stack Developer',
    'hero.bio':       'Passionate about building elegant, functional digital experiences full of purpose. Code that breathes art.',
    'hero.cta.projects': 'View Projects',
    'hero.cta.contact':  'Get in Touch',
    'hero.scroll':    'Scroll',

    /* ─── About ─────────────────────────────────── */
    'about.tag':      'About me',
    'about.title':    'Who',
    'about.title.em': 'I am',
    'about.p1':       'I\'m Maria Vitória, a full stack developer passionate about creating digital solutions that unite aesthetics and functionality. I believe great code is that which solves real problems with elegance.',
    'about.p2':       'I\'ve been working with web development since 2022, building projects ranging from robust APIs to carefully designed interfaces. Every line of code is an opportunity to create something amazing.',
    'about.hobbies.title': 'Beyond code ✨',
    'about.hobbies.intro': 'Outside the code editor, you\'ll find me lost in fictional universes, exploring new places, or just enjoying a coffee with a good playlist in the background. ☕',
    'hobby.dorama':       'K-dramas & Doramas',
    'hobby.dorama.desc':  'Always with an Asian series in the queue — from Korean romances to Japanese thrillers. Let me know when a new season drops!',
    'hobby.astro':        'Astronomy',
    'hobby.astro.desc':   'Looking up at the sky and remembering how vast the universe is. A favorite way to gain perspective on tough days.',
    'hobby.read':         'Reading',
    'hobby.read.desc':    'Sci-fi, fantasy, and technical books share the same shelf. Nothing like a good story to recharge the creative batteries.',
    'hobby.photo':        '📷 Photography',
    'hobby.music':        'Music',
    'hobby.music.desc':   'Headphones on is a must in any dev flow. Lo-fi to focus, K-pop to boost energy, jazz to think.',
    'hobby.design':       'Design & Photography',
    'hobby.design.desc':  'The design eye overflows beyond code — in photos, in everyday colors, and in everything that\'s beautiful to look at.',
    'hobby.travel':       'Travel & Explore the world',
    'hobby.travel.desc':  'Every new place is a creative reset. Small getaways or big adventures — what matters is meeting new people and different stories.',
    'hobby.coffee':       '☕ Coffee',

    /* ─── Skills ─────────────────────────────────── */
    'skills.tag':       'Technologies',
    'skills.title':     'My',
    'skills.title.em':  'skills',
    'skills.desc':      'Tools and technologies I use to build complete solutions, from front to back-end.',
    'skills.frontend':  'Frontend',
    'skills.backend':   'Backend',
    'skills.database':  'Database',
    'skills.tools':     'Tools',

    /* ─── Projects ───────────────────────────────── */
    'proj.tag':       'Portfolio',
    'proj.title':     'Featured',
    'proj.title.em':  'projects',
    'proj.desc':      'A selection of the work I\'m most proud of, combining creativity and technique.',
    'proj.p1.tag':    'Web App',
    'proj.p1.title':  'Task Manager',
    'proj.p1.desc':   'Full stack application for task organization with authentication, categories and advanced filters.',
    'proj.p2.tag':    'REST API',
    'proj.p2.title':  'E-commerce API',
    'proj.p2.desc':   'Robust API with protected routes, shopping cart, payments and admin dashboard.',
    'proj.p3.tag':    'Dashboard',
    'proj.p3.title':  'Analytics Panel',
    'proj.p3.desc':   'Interactive dashboard with real-time data visualizations, filters and CSV export.',
    'proj.demo':      'Demo',
    'proj.code':      'Code',
    'proj.all':       'View all projects',

    /* ─── Contact ────────────────────────────────── */
    'contact.tag':        'Let\'s talk',
    'contact.title':      'Get in',
    'contact.title.em':   'touch',
    'contact.p':          'I\'m available for freelance projects, job opportunities or just a conversation about technology. I\'d love to hear from you!',
    'form.name':          'Name',
    'form.email':         'Email',
    'form.subject':       'Subject',
    'form.message':       'Message',
    'form.send':          'Send message',
    'form.success':       '✨ Message sent! I\'ll get back to you soon.',
    'contact.available':  'Available for work',

    /* ─── Footer ─────────────────────────────────── */
    'footer.copy':    'Made with ♥ and lots of coffee by Maria Vitória',
  }
};

/**
 * Aplica o idioma escolhido a todos os elementos com atributo [data-i18n].
 * Elementos com [data-i18n-placeholder] têm seu placeholder atualizado.
 * Salva a preferência no localStorage.
 * @param {string} lang - 'pt' ou 'en'
 */
function applyLang(lang) {
  const dict = translations[lang];
  if (!dict) return;

  // Atualiza todos os elementos marcados com data-i18n
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key] !== undefined) {
      el.textContent = dict[key];
    }
  });

  // Atualiza placeholders de inputs/textareas
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (dict[key] !== undefined) {
      el.placeholder = dict[key];
    }
  });

  // Atualiza o botão de idioma para mostrar o próximo idioma
  const btn = document.getElementById('lang-btn');
  if (btn) btn.textContent = lang === 'pt' ? 'EN' : 'PT';

  // Atualiza o atributo lang do HTML (acessibilidade)
  document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
}

/**
 * Alterna entre PT-BR e EN.
 * Salva e aplica o novo idioma.
 */
function toggleLang() {
  const current = localStorage.getItem('mv-lang') || 'pt';
  const next = current === 'pt' ? 'en' : 'pt';
  localStorage.setItem('mv-lang', next); // Persiste no localStorage
  applyLang(next);
}

// Inicializa o idioma
(function initLang() {
  const saved = localStorage.getItem('mv-lang') || 'pt';
  applyLang(saved);
})();


/* ════════════════════════════════════════════════════════════
   3. ANIMAÇÃO DA LUA NO CANVAS
   ─────────────────────────────────────────────────────────
   Desenhamos uma lua crescente/cheia com brilho suave usando
   a API Canvas 2D. A lua pulsa levemente com uma animação
   baseada em requestAnimationFrame para performance suave.
════════════════════════════════════════════════════════════ */

function initLunarCanvas() {
  const canvas = document.getElementById('lunar-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let animId;
  let t = 0; // Tempo — usado para calcular pulsação

  /**
   * Ajusta o tamanho do canvas ao tamanho da janela.
   * Necessário para evitar distorções em telas de retina.
   */
  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  /**
   * Desenha a lua com glow, crateras sutis e anel de brilho.
   * A pulsação é criada variando o raio e opacidade com base em 'sin(t)'.
   */
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Posição da lua: canto superior direito da tela
    const x = canvas.width  * 0.82;
    const y = canvas.height * 0.18;

    // Pulso suave — oscila entre 0 e 1 ao longo do tempo
    const pulse = (Math.sin(t * 0.4) + 1) / 2; // 0..1
    const radius = 90 + pulse * 8;              // 90 a 98 px

    // ── Halo externo difuso ────────────────────────────────
    const halo = ctx.createRadialGradient(x, y, radius * 0.8, x, y, radius * 2.5);
    halo.addColorStop(0,   `rgba(212, 180, 131, ${0.12 + pulse * 0.06})`);
    halo.addColorStop(0.5, `rgba(212, 180, 131, 0.04)`);
    halo.addColorStop(1,   'rgba(212, 180, 131, 0)');
    ctx.beginPath();
    ctx.arc(x, y, radius * 2.5, 0, Math.PI * 2);
    ctx.fillStyle = halo;
    ctx.fill();

    // ── Corpo principal da lua ─────────────────────────────
    const moonGrad = ctx.createRadialGradient(
      x - radius * 0.3, y - radius * 0.3, radius * 0.1, // luz interna
      x, y, radius
    );
    moonGrad.addColorStop(0,   '#F5EFE6');
    moonGrad.addColorStop(0.5, '#D4B483');
    moonGrad.addColorStop(1,   '#A88B5A');

    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = moonGrad;
    ctx.fill();

    // ── Sombra da lua crescente (máscara escura lateral) ───
    // Cria a aparência de lua quase-cheia com fase sutil
    const shadow = ctx.createRadialGradient(
      x + radius * 0.6, y - radius * 0.1, 0,
      x + radius * 0.6, y, radius * 1.1
    );
    shadow.addColorStop(0,   'rgba(13, 5, 8, 0.45)');
    shadow.addColorStop(0.7, 'rgba(13, 5, 8, 0.0)');

    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = shadow;
    ctx.fill();

    // ── Anel de brilho pulsante ────────────────────────────
    ctx.beginPath();
    ctx.arc(x, y, radius + 6 + pulse * 4, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(212, 180, 131, ${0.25 + pulse * 0.15})`;
    ctx.lineWidth = 1;
    ctx.stroke();

    // ── Crateras sutis ─────────────────────────────────────
    const craters = [
      { dx: -25, dy: -15, r: 8  },
      { dx:  15, dy:  20, r: 5  },
      { dx: -10, dy:  30, r: 6  },
      { dx:  30, dy: -10, r: 4  },
    ];

    craters.forEach(c => {
      const cx = x + c.dx, cy = y + c.dy;
      const cg = ctx.createRadialGradient(cx - 1, cy - 1, 0, cx, cy, c.r);
      cg.addColorStop(0,   'rgba(100, 70, 30, 0.25)');
      cg.addColorStop(0.6, 'rgba(100, 70, 30, 0.1)');
      cg.addColorStop(1,   'rgba(100, 70, 30, 0)');
      ctx.beginPath();
      ctx.arc(cx, cy, c.r, 0, Math.PI * 2);
      ctx.fillStyle = cg;
      ctx.fill();
    });

    // Avança o tempo para o próximo frame
    t += 0.015;
    animId = requestAnimationFrame(draw);
  }

  resize();
  draw();

  // Redimensiona o canvas quando a janela muda de tamanho
  window.addEventListener('resize', resize);

  // Retorna função de limpeza (boa prática em SPAs)
  return () => {
    cancelAnimationFrame(animId);
    window.removeEventListener('resize', resize);
  };
}


/* ════════════════════════════════════════════════════════════
   4. ESTRELAS DECORATIVAS
   ─────────────────────────────────────────────────────────
   Cria estrelas pequenas no hero com posições e animações
   aleatórias para simular o céu noturno.
════════════════════════════════════════════════════════════ */

function initStars() {
  const field = document.querySelector('.star-field');
  if (!field) return;

  const count = 40; // Número de estrelas

  for (let i = 0; i < count; i++) {
    const star = document.createElement('div');
    star.className = 'star';

    // Posição aleatória em porcentagem
    star.style.left  = `${Math.random() * 100}%`;
    star.style.top   = `${Math.random() * 100}%`;

    // Tamanho variado (1 a 3 px)
    const size = 1 + Math.random() * 2;
    star.style.width  = `${size}px`;
    star.style.height = `${size}px`;

    // Atraso e duração aleatórios para dessincronizar o brilho
    star.style.animationDelay    = `${Math.random() * 4}s`;
    star.style.animationDuration = `${2 + Math.random() * 3}s`;

    field.appendChild(star);
  }
}


/* ════════════════════════════════════════════════════════════
   5. ANIMAÇÕES DE ENTRADA (IntersectionObserver)
   ─────────────────────────────────────────────────────────
   Elementos com a classe 'fade-up' ficam invisíveis por padrão.
   Quando entram na viewport, a classe 'visible' é adicionada,
   ativando a transição CSS de fade + slide.
════════════════════════════════════════════════════════════ */

function initScrollAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Para de observar após animar (performance)
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,    // Aciona quando 12% do elemento está visível
      rootMargin: '0px 0px -40px 0px' // Pequeno atraso antes de animar
    }
  );

  // Observa todos os elementos com a classe fade-up
  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
}


/* ════════════════════════════════════════════════════════════
   6. MENU MOBILE
   ─────────────────────────────────────────────────────────
   Controla a abertura e fechamento do drawer lateral
   em telas pequenas.
════════════════════════════════════════════════════════════ */

function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const closeBtn   = document.getElementById('mobile-close');
  const overlay    = document.querySelector('.mobile-menu-overlay');

  if (!hamburger || !mobileMenu) return;

  // Abre o menu
  hamburger.addEventListener('click', () => {
    mobileMenu.classList.add('open');
    document.body.style.overflow = 'hidden'; // Trava o scroll do body
  });

  // Fecha via botão X
  if (closeBtn) {
    closeBtn.addEventListener('click', closeMenu);
  }

  // Fecha ao clicar no overlay escuro
  if (overlay) {
    overlay.addEventListener('click', closeMenu);
  }

  // Fecha e navega ao clicar em um link
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  function closeMenu() {
    mobileMenu.classList.remove('open');
    document.body.style.overflow = ''; // Libera o scroll
  }
}


/* ════════════════════════════════════════════════════════════
   7. LINK ATIVO NO NAV
   ─────────────────────────────────────────────────────────
   Compara o nome do arquivo atual com os hrefs dos links
   e adiciona a classe 'active' ao link correspondente.
════════════════════════════════════════════════════════════ */

function initActiveNav() {
  const path = window.location.pathname;
  const filename = path.split('/').pop() || 'index.html';

  document.querySelectorAll('.nav-links a, .mobile-menu-drawer a').forEach(link => {
    const href = link.getAttribute('href') || '';
    // Considera ativo se o href termina com o nome do arquivo atual
    if (href.endsWith(filename) || (filename === 'index.html' && href === '../index.html') || (filename === 'index.html' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}


/* ════════════════════════════════════════════════════════════
   8. FORMULÁRIO DE CONTATO (simulação)
   ─────────────────────────────────────────────────────────
   Simula o envio do formulário com feedback visual.
   Em produção, substituir pelo envio real (fetch para API).
════════════════════════════════════════════════════════════ */

function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault(); // Impede recarregamento da página

    const btn = form.querySelector('.btn-primary');
    const feedback = document.getElementById('form-feedback');

    // Estado de carregamento no botão
    const originalText = btn.textContent;
    btn.textContent = '...';
    btn.disabled = true;

    // Simula delay de envio (2 segundos)
    setTimeout(() => {
      btn.textContent = originalText;
      btn.disabled = false;
      form.reset();

      // Mostra mensagem de sucesso
      if (feedback) {
        const lang = localStorage.getItem('mv-lang') || 'pt';
        feedback.textContent = translations[lang]['form.success'];
        feedback.classList.add('success');

        // Remove a mensagem após 5 segundos
        setTimeout(() => feedback.classList.remove('success'), 5000);
      }
    }, 2000);
  });
}


/* ════════════════════════════════════════════════════════════
   9. INICIALIZAÇÃO GERAL
   ─────────────────────────────────────────────────────────
   Aguarda o DOM estar pronto e então inicializa todos os
   módulos acima. Usa DOMContentLoaded para garantir que todos
   os elementos já existem no momento da execução.
════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', function () {

  // Conecta o botão de tema
  const themeBtn = document.getElementById('theme-btn');
  if (themeBtn) themeBtn.addEventListener('click', toggleTheme);

  // Conecta o botão de idioma
  const langBtn = document.getElementById('lang-btn');
  if (langBtn) langBtn.addEventListener('click', toggleLang);

  // Inicializa todos os módulos
  initLunarCanvas();
  initStars();
  initScrollAnimations();
  initMobileMenu();
  initActiveNav();
  initContactForm();

  // Reaplicar o idioma após o DOM estar pronto
  // (garante que os data-i18n do HTML sejam todos preenchidos)
  const savedLang = localStorage.getItem('mv-lang') || 'pt';
  applyLang(savedLang);

  // Reaplicar o tema (atualiza ícone do botão)
  const savedTheme = localStorage.getItem('mv-theme') || 'light';
  applyTheme(savedTheme);

});
