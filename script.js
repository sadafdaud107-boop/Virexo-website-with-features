/**
 * Virexo Innovations - Pure JavaScript
 * Where Innovation Meets Excellence
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Dynamic Year in Footer
  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // 2. Dark / Light Theme Toggle (Stored in localStorage)
  const themeToggle = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('virexo_theme') || 'dark';

  if (savedTheme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
  } else {
    document.documentElement.setAttribute('data-theme', 'dark');
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('virexo_theme', newTheme);
    });
  }

  // 3. Mobile Navigation Menu Toggle
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close mobile menu when clicking any link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 4. Smooth Scrolling & Active Section Tracking
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-link');

  function highlightNavOnScroll() {
    const scrollY = window.pageYOffset;
    const navOffset = 120;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - navOffset;
      const sectionId = current.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navItems.forEach(item => {
          item.classList.remove('active');
          if (item.getAttribute('href') === `#${sectionId}`) {
            item.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightNavOnScroll, { passive: true });

  // 5. Back to Top Floating Button
  const toTopBtn = document.getElementById('toTop');
  if (toTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 400) {
        toTopBtn.classList.add('visible');
      } else {
        toTopBtn.classList.remove('visible');
      }
    }, { passive: true });

    toTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 6. Scroll Reveal Animation
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // 7. Modal Handlers
  const modalOverlay = document.getElementById('modalOverlay');
  const modalClose = document.getElementById('modalClose');
  const openModalBtns = document.querySelectorAll('.js-open-modal');
  const modalServiceSelect = document.getElementById('mf-service');

  function openModal(defaultService = 'Web Development') {
    if (modalOverlay) {
      if (modalServiceSelect && defaultService) {
        modalServiceSelect.value = defaultService;
      }
      modalOverlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeModal() {
    if (modalOverlay) {
      modalOverlay.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', () => openModal());
  });

  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('open')) {
      closeModal();
    }
  });

  // 8. Service Card Links: Scroll to Contact Section and Pre-select Service
  const serviceLinks = document.querySelectorAll('.service-link[data-service]');
  const pageServiceSelect = document.getElementById('pcf-service');

  serviceLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const service = link.getAttribute('data-service');
      if (pageServiceSelect && service) {
        pageServiceSelect.value = service;
      }

      const contactSection = document.getElementById('contact');
      if (contactSection) {
        const top = contactSection.getBoundingClientRect().top + window.pageYOffset - 80;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // 9. Budget Chips Selection in Contact Form
  const budgetChips = document.querySelectorAll('.budget-chips .chip-btn');
  let selectedBudget = '$1k - $3k';

  budgetChips.forEach(chip => {
    chip.addEventListener('click', () => {
      budgetChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      selectedBudget = chip.getAttribute('data-val') || chip.textContent;
    });
  });

  // EmailJS Configuration
  const EMAILJS_CONFIG = {
    PUBLIC_KEY: '6o_851nQ88iTWVgm2',
    SERVICE_ID: 'service_o2gmctb',
    TEMPLATE_ID: 'template_bhmble9',
  };

  // Initialize EmailJS if library is loaded
  if (window.emailjs) {
    try {
      emailjs.init({ publicKey: EMAILJS_CONFIG.PUBLIC_KEY });
    } catch (e) {
      console.warn('EmailJS init warning:', e);
    }
  }

  // 10. On-Page Contact Form Submission (EmailJS Integration)
  const pageContactForm = document.getElementById('pageContactForm');
  const pcfNote = document.getElementById('pcfNote');
  const pcfSubmitBtn = pageContactForm?.querySelector('button[type="submit"]');

  if (pageContactForm) {
    pageContactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const name = document.getElementById('pcf-name')?.value.trim();
      const email = document.getElementById('pcf-email')?.value.trim();
      const phone = document.getElementById('pcf-phone')?.value.trim() || 'Not provided';
      const service = document.getElementById('pcf-service')?.value || 'Web Development';
      const message = document.getElementById('pcf-message')?.value.trim() || 'No message provided';

      if (!name || !email) {
        if (pcfNote) {
          pcfNote.className = 'form-note error';
          pcfNote.textContent = 'Please provide both your name and work email.';
        }
        return;
      }

      if (pcfSubmitBtn) {
        pcfSubmitBtn.disabled = true;
        pcfSubmitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending message...';
      }
      if (pcfNote) {
        pcfNote.className = 'form-note';
        pcfNote.textContent = 'Sending your inquiry via EmailJS...';
      }

      const templateParams = {
        from_name: name,
        user_name: name,
        name: name,
        from_email: email,
        user_email: email,
        email: email,
        reply_to: email,
        phone: phone,
        service: service,
        budget: selectedBudget,
        message: message,
        project_details: message,
      };

      try {
        if (window.emailjs) {
          await emailjs.send(
            EMAILJS_CONFIG.SERVICE_ID,
            EMAILJS_CONFIG.TEMPLATE_ID,
            templateParams,
            EMAILJS_CONFIG.PUBLIC_KEY
          );
        } else {
          // Fallback to EmailJS REST API if script didn't load
          const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              service_id: EMAILJS_CONFIG.SERVICE_ID,
              template_id: EMAILJS_CONFIG.TEMPLATE_ID,
              user_id: EMAILJS_CONFIG.PUBLIC_KEY,
              template_params: templateParams,
            }),
          });
          if (!res.ok) throw new Error('Failed to send email');
        }

        if (pcfNote) {
          pcfNote.className = 'form-note success';
          pcfNote.innerHTML = `✓ Thank you, <strong>${name}</strong>! Your message has been sent successfully. We will contact you at <strong>${email}</strong> within 24 hours.`;
        }
        pageContactForm.reset();
        budgetChips.forEach((c, idx) => {
          if (idx === 1) c.classList.add('active');
          else c.classList.remove('active');
        });
        selectedBudget = '$1k - $3k';
      } catch (err) {
        console.error('EmailJS Error:', err);
        if (pcfNote) {
          pcfNote.className = 'form-note error';
          pcfNote.textContent = 'Failed to send message. Please check your details or contact us directly at hello@virexodigital.com.';
        }
      } finally {
        if (pcfSubmitBtn) {
          pcfSubmitBtn.disabled = false;
          pcfSubmitBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Send Message &amp; Request Proposal';
        }
      }
    });
  }

  // 11. Modal Contact Form Submission (EmailJS Integration)
  const modalForm = document.getElementById('modalForm');
  const modalNote = document.getElementById('modalNote');
  const modalSubmitBtn = modalForm?.querySelector('.btn-send');

  if (modalForm) {
    modalForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const name = document.getElementById('mf-name')?.value.trim();
      const email = document.getElementById('mf-email')?.value.trim();
      const service = document.getElementById('mf-service')?.value || 'Web Development';
      const details = document.getElementById('mf-details')?.value.trim() || 'No details provided';

      if (!name || !email) {
        if (modalNote) {
          modalNote.className = 'modal-note error';
          modalNote.style.color = '#ef4444';
          modalNote.textContent = 'Please fill out your name and work email.';
        }
        return;
      }

      if (modalSubmitBtn) {
        modalSubmitBtn.disabled = true;
        modalSubmitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
      }
      if (modalNote) {
        modalNote.className = 'modal-note';
        modalNote.style.color = '#94a3b8';
        modalNote.textContent = 'Sending your request via EmailJS...';
      }

      const templateParams = {
        from_name: name,
        user_name: name,
        name: name,
        from_email: email,
        user_email: email,
        email: email,
        reply_to: email,
        service: service,
        message: details,
        project_details: details,
      };

      try {
        if (window.emailjs) {
          await emailjs.send(
            EMAILJS_CONFIG.SERVICE_ID,
            EMAILJS_CONFIG.TEMPLATE_ID,
            templateParams,
            EMAILJS_CONFIG.PUBLIC_KEY
          );
        } else {
          // Fallback to EmailJS REST API
          const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              service_id: EMAILJS_CONFIG.SERVICE_ID,
              template_id: EMAILJS_CONFIG.TEMPLATE_ID,
              user_id: EMAILJS_CONFIG.PUBLIC_KEY,
              template_params: templateParams,
            }),
          });
          if (!res.ok) throw new Error('Failed to send email');
        }

        if (modalNote) {
          modalNote.className = 'modal-note success';
          modalNote.style.color = '#10b981';
          modalNote.innerHTML = `✓ Thanks <strong>${name}</strong>! Your inquiry has been sent to our team. We'll reply to <strong>${email}</strong> shortly.`;
        }

        setTimeout(() => {
          modalForm.reset();
          if (modalNote) modalNote.textContent = '';
          closeModal();
        }, 2400);
      } catch (err) {
        console.error('EmailJS Modal Error:', err);
        if (modalNote) {
          modalNote.className = 'modal-note error';
          modalNote.style.color = '#ef4444';
          modalNote.textContent = 'Error sending email. Please try again.';
        }
      } finally {
        if (modalSubmitBtn) {
          modalSubmitBtn.disabled = false;
          modalSubmitBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Send Message';
        }
      }
    });
  }

  // 12. Counter Calculation Animation on Scroll
  function initCounters() {
    const counterElements = document.querySelectorAll('.counter-val');
    if (!counterElements.length) return;

    function runCounter(el) {
      if (el.dataset.hasAnimated === 'true') return;
      el.dataset.hasAnimated = 'true';

      const target = parseFloat(el.getAttribute('data-target') || '0');
      const suffix = el.getAttribute('data-suffix') || '';
      const prefix = el.getAttribute('data-prefix') || '';
      const decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
      const duration = 1600;
      const startTime = performance.now();

      el.classList.add('calculating');

      function step(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Fluid exponential easing
        const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        const currentVal = ease * target;

        const formatted = decimals > 0 
          ? currentVal.toFixed(decimals) 
          : Math.floor(currentVal).toString();

        el.textContent = `${prefix}${formatted}${suffix}`;

        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          const finalVal = decimals > 0 ? target.toFixed(decimals) : target.toString();
          el.textContent = `${prefix}${finalVal}${suffix}`;
          el.classList.remove('calculating');
        }
      }

      requestAnimationFrame(step);
    }

    const counterObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          runCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    });

    counterElements.forEach(el => counterObserver.observe(el));
  }
  initCounters();

  // 13. Services Search Bar & Category Filter
  function initServicesFilterAndSearch() {
    const searchInput = document.getElementById('serviceSearchInput');
    const searchClear = document.getElementById('serviceSearchClear');
    const filterTabs = document.querySelectorAll('.filter-tab');
    const serviceCards = document.querySelectorAll('#servicesGrid .service-card');
    const resultsCount = document.getElementById('servicesResultsCount');
    const emptyState = document.getElementById('servicesEmptyState');
    const emptyQueryText = document.getElementById('emptyQueryText');
    const resetFilterBtn = document.getElementById('resetServicesFilterBtn');

    if (!serviceCards.length) return;

    let currentFilter = 'all';
    let searchQuery = '';

    function applyFilter() {
      let visibleCount = 0;
      const normalizedQuery = searchQuery.trim().toLowerCase();

      serviceCards.forEach(card => {
        const category = card.getAttribute('data-category') || '';
        const title = (card.getAttribute('data-title') || '').toLowerCase();
        const keywords = (card.getAttribute('data-keywords') || '').toLowerCase();
        const textContent = card.textContent.toLowerCase();

        // Check category match
        let matchesCategory = false;
        if (currentFilter === 'all') {
          matchesCategory = true;
        } else if (currentFilter === 'dev') {
          matchesCategory = (category === 'dev');
        } else if (currentFilter === 'ai') {
          matchesCategory = (category === 'ai');
        } else if (currentFilter === 'design') {
          matchesCategory = (category === 'design');
        } else if (currentFilter === 'growth') {
          matchesCategory = (category === 'growth');
        }

        // Check search match
        let matchesSearch = true;
        if (normalizedQuery.length > 0) {
          matchesSearch = title.includes(normalizedQuery) ||
                          keywords.includes(normalizedQuery) ||
                          textContent.includes(normalizedQuery);
        }

        if (matchesCategory && matchesSearch) {
          card.style.display = 'flex';
          visibleCount++;
        } else {
          card.style.display = 'none';
        }
      });

      // Update counter
      if (resultsCount) {
        resultsCount.innerHTML = `Showing <strong>${visibleCount} of ${serviceCards.length}</strong> services`;
      }

      // Show/hide empty state
      if (emptyState) {
        if (visibleCount === 0) {
          emptyState.style.display = 'block';
          if (emptyQueryText) {
            emptyQueryText.textContent = searchQuery || currentFilter;
          }
        } else {
          emptyState.style.display = 'none';
        }
      }
    }

    // Search input handler
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        if (searchClear) {
          if (searchQuery.length > 0) {
            searchClear.classList.add('visible');
          } else {
            searchClear.classList.remove('visible');
          }
        }
        applyFilter();
      });
    }

    // Search clear button
    if (searchClear) {
      searchClear.addEventListener('click', () => {
        if (searchInput) {
          searchInput.value = '';
          searchQuery = '';
          searchClear.classList.remove('visible');
          searchInput.focus();
          applyFilter();
        }
      });
    }

    // Filter tab buttons
    filterTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        filterTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        currentFilter = tab.getAttribute('data-filter') || 'all';
        applyFilter();
      });
    });

    // Reset button in empty state
    if (resetFilterBtn) {
      resetFilterBtn.addEventListener('click', () => {
        if (searchInput) {
          searchInput.value = '';
          searchQuery = '';
        }
        if (searchClear) searchClear.classList.remove('visible');
        filterTabs.forEach(t => t.classList.remove('active'));
        const allTab = document.querySelector('.filter-tab[data-filter="all"]');
        if (allTab) allTab.classList.add('active');
        currentFilter = 'all';
        applyFilter();
      });
    }
  }
  initServicesFilterAndSearch();

  // 14. Service Details Pop-up Modal with Technologies Used
  function initServiceDetailsModal() {
    const modal = document.getElementById('serviceDetailsModal');
    const closeBtn = document.getElementById('serviceDetailsClose');
    const bottomCloseBtn = document.getElementById('smCloseBtn');
    const requestBtn = document.getElementById('smRequestBtn');
    const openBtns = document.querySelectorAll('.js-open-service-details');

    const heroImg = document.getElementById('smHeroImg');
    const categoryTag = document.getElementById('smCategoryTag');
    const titleEl = document.getElementById('smTitle');
    const subtitleEl = document.getElementById('smSubtitle');
    const descEl = document.getElementById('smDescription');
    const techGrid = document.getElementById('smTechGrid');
    const deliverablesGrid = document.getElementById('smDeliverablesGrid');
    const timelineEl = document.getElementById('smTimelineText');

    let currentSelectedService = 'Web Development';

    const servicesDetailsData = {
      'web-dev': {
        title: 'Web Development',
        category: 'Engineering & Architecture',
        subtitle: 'Enterprise-grade responsive web applications and high-converting marketing portals.',
        image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
        timeline: 'Typical Timeline: 1-3 Weeks',
        description: 'We build ultra-fast, modern web applications, client portals, and e-commerce platforms using clean code, responsive layouts, and modern JAMstack and full-stack architectures. Every site is rigorously tested across mobile, tablet, and desktop devices with Google Lighthouse scores consistently exceeding 95+.',
        technologies: [
          { name: 'React 19', type: 'Frontend Framework', icon: 'fa-brands fa-react' },
          { name: 'Next.js 14', type: 'Full-Stack SSR / SSG', icon: 'fa-solid fa-layer-group' },
          { name: 'TypeScript', type: 'Type Safety & Scale', icon: 'fa-solid fa-code' },
          { name: 'Tailwind CSS', type: 'Modern Responsive UI', icon: 'fa-solid fa-palette' },
          { name: 'Node.js & Express', type: 'Backend Microservices', icon: 'fa-brands fa-node-js' },
          { name: 'PostgreSQL / Supabase', type: 'Relational Database', icon: 'fa-solid fa-database' },
          { name: 'Vercel / AWS', type: 'CI/CD Cloud Hosting', icon: 'fa-solid fa-cloud' },
          { name: 'REST & GraphQL', type: 'API Architecture', icon: 'fa-solid fa-network-wired' },
          { name: 'HTML5 & Semantic CSS', type: 'Web Standards', icon: 'fa-brands fa-html5' }
        ],
        deliverables: [
          'Full-Stack Source Code Repository (Clean Git History)',
          '100% Responsive Mobile-First Design & Viewports',
          'Search Engine Optimization (SEO) & Core Web Vitals 95+',
          'API & Database Integrations with Authentication',
          'Production Deployment on Vercel / AWS with SSL',
          '30 Days Dedicated Post-Launch Support & Bug Fixing'
        ]
      },
      'uiux': {
        title: 'UI/UX Design',
        category: 'Visual Design & Systems',
        subtitle: 'Human-centered interfaces, user flows, and scalable design systems.',
        image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=800&q=80',
        timeline: 'Typical Timeline: 1-2 Weeks',
        description: 'Great software starts with great design. Our design team creates intuitive, visually captivating digital interfaces that eliminate user friction and boost conversion rates. We deliver complete design systems with reusable component libraries, typography tokens, and interactive clickable prototypes.',
        technologies: [
          { name: 'Figma Pro', type: 'Collaborative UI Design', icon: 'fa-brands fa-figma' },
          { name: 'Framer Interactive', type: 'Micro-Interactions & Web', icon: 'fa-solid fa-wand-magic-sparkles' },
          { name: 'Adobe Photoshop', type: 'High-Res Asset Production', icon: 'fa-solid fa-image' },
          { name: 'Adobe Illustrator', type: 'Vector Icons & Brand Graphics', icon: 'fa-solid fa-pen-nib' },
          { name: 'Protopie', type: 'Advanced Mobile Prototyping', icon: 'fa-solid fa-mobile-screen' },
          { name: 'Design Tokens', type: 'Color & Typography Systems', icon: 'fa-solid fa-swatchbook' },
          { name: 'WCAG 2.1', type: 'Accessibility Standards', icon: 'fa-solid fa-universal-access' }
        ],
        deliverables: [
          'Comprehensive User Journey Maps & Wireframes',
          'Complete Figma Design System with Reusable Components',
          'High-Fidelity Clickable Interactive Prototypes',
          'Developer-Ready Asset Specs & Auto-Layout Handoff',
          'Custom Icon Sets, Graphics & Dark/Light Themes',
          'Interactive Usability Testing & Audit Report'
        ]
      },
      'marketing': {
        title: 'Digital Marketing',
        category: 'Acquisition & Conversion',
        subtitle: 'Targeted paid ad funnels, technical SEO, and conversion optimization.',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
        timeline: 'Sprint-Based / Monthly Retainer',
        description: 'Drive high-intent traffic and convert visitors into paying clients. We engineer data-backed digital marketing campaigns combining technical on-page/off-page SEO, Google Search & Display Ads, and Meta advertising funnels with rigorous Conversion Rate Optimization (CRO).',
        technologies: [
          { name: 'Google Ads', type: 'Search, Shopping & Display', icon: 'fa-brands fa-google' },
          { name: 'Meta Ads Manager', type: 'Facebook & Instagram Ads', icon: 'fa-brands fa-meta' },
          { name: 'Google Analytics 4', type: 'Behavior & Conversion Tracking', icon: 'fa-solid fa-chart-pie' },
          { name: 'Google Search Console', type: 'Indexation & Search Queries', icon: 'fa-solid fa-magnifying-glass-chart' },
          { name: 'SEMrush & Ahrefs', type: 'Keyword & Competitor Intelligence', icon: 'fa-solid fa-chart-line' },
          { name: 'Hotjar', type: 'Heatmaps & User Recording', icon: 'fa-solid fa-fire' },
          { name: 'HubSpot & Klaviyo', type: 'Email Marketing Automations', icon: 'fa-solid fa-envelope-open-text' }
        ],
        deliverables: [
          'Comprehensive SEO Keyword & Technical Site Audit',
          'High-Converting Ad Copy, Visual Creatives & Funnels',
          'Conversion Rate Optimization (CRO) A/B Testing',
          'Custom Conversion Tracking & GA4 Event Dashboards',
          'Negative Keyword Lists & Cost-Per-Click (CPC) Reduction',
          'Weekly Performance Reports & Transparent ROAS Metrics'
        ]
      },
      'social': {
        title: 'Social Media Growth',
        category: 'Brand Dominance & Viral Content',
        subtitle: 'Explosive follower growth, short-form viral reels, and organic domination.',
        image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=800&q=80',
        timeline: 'Monthly Sprint Retainer',
        description: 'Dominate short-form video algorithms and scale your brand authority. We produce high-retention viral Reels, TikToks, and YouTube Shorts backed by deep audience psychographics, psychological hooks, and organic growth strategies that turn followers into brand advocates.',
        technologies: [
          { name: 'CapCut Pro', type: 'High-Retention Video Editing', icon: 'fa-solid fa-film' },
          { name: 'Adobe Premiere Pro', type: 'Cinematic Post-Production', icon: 'fa-solid fa-video' },
          { name: 'Canva Enterprise', type: 'Branded Social Visuals', icon: 'fa-solid fa-palette' },
          { name: 'Meta Business Suite', type: 'Scheduling & Multi-Account', icon: 'fa-solid fa-calendar-days' },
          { name: 'TikTok Ads Manager', type: 'Targeted Spark Ads', icon: 'fa-brands fa-tiktok' },
          { name: 'YouTube Studio', type: 'Retention & Click-Through Rate', icon: 'fa-brands fa-youtube' },
          { name: 'Algorithm Analytics', type: 'Trends & Audio Tracking', icon: 'fa-solid fa-bolt' }
        ],
        deliverables: [
          'High-Retention Viral Video Production (Reels / TikTok / Shorts)',
          'High-Impact Hook Scriptwriting & Storyboarding',
          'Monthly Content Calendar & Strategic Scheduling',
          'Custom Branded Thumbnails, Captions & Sound Selection',
          'Automated DM Lead Funnels & Community Engagement',
          'Monthly Growth & Audience Demographic Analytics'
        ]
      },
      'ai-automation': {
        title: 'AI & Automation',
        category: 'Intelligent Systems & LLMs',
        subtitle: 'Bespoke AI agents, autonomous workflow automation, and custom LLM integrations.',
        image: '/assets/images/ai-automation.jpg',
        timeline: 'Typical Timeline: 1-3 Weeks',
        description: 'Eliminate repetitive manual labor, decrease operational overhead, and empower your business with custom autonomous agents. We design 24/7 intelligent customer service agents, automated data parsing systems, CRM synchronization bridges, and bespoke LLM prompt workflows powered by state-of-the-art models.',
        technologies: [
          { name: 'OpenAI GPT-4o', type: 'State-of-the-Art Multimodal AI', icon: 'fa-solid fa-brain' },
          { name: 'Claude 3.5 Sonnet', type: 'High-Reasoning LLM Agent', icon: 'fa-solid fa-robot' },
          { name: 'LangChain & LlamaIndex', type: 'Agentic Orchestration', icon: 'fa-solid fa-link' },
          { name: 'n8n Automation', type: 'Self-Hosted Workflow Engine', icon: 'fa-solid fa-network-wired' },
          { name: 'Zapier Enterprise', type: '5,000+ App Automation', icon: 'fa-solid fa-bolt' },
          { name: 'Pinecone / Chroma', type: 'Vector DB & Semantic Search', icon: 'fa-solid fa-database' },
          { name: 'Python AI SDKs', type: 'Custom Agent Architecture', icon: 'fa-brands fa-python' },
          { name: 'REST Webhooks', type: 'Real-Time Event Triggers', icon: 'fa-solid fa-arrows-split-up-and-left' }
        ],
        deliverables: [
          'Custom Autonomous AI Chatbot with Knowledge Base RAG',
          'End-to-End Workflow Automations (Lead Gen, CRM, Email, Docs)',
          'Automated Document Summarization & Data Extraction',
          'Zero-Code / Low-Code Maintenance Dashboard for Your Team',
          'Full API Integration with Security Token Encryption',
          'Complete Documentation & Video Training Walkthrough'
        ]
      },
      'python-dev': {
        title: 'Python Development',
        category: 'Backend & Data Engineering',
        subtitle: 'Enterprise APIs, automated web scraping, data pipelines, and custom Python microservices.',
        image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
        timeline: 'Typical Timeline: 1-3 Weeks',
        description: 'Python is the backbone of high-performance data processing, backend microservices, and automation. We engineer resilient APIs with FastAPI and Django, build fault-tolerant web scrapers capable of handling millions of requests with proxy rotation, and construct automated ETL pipelines.',
        technologies: [
          { name: 'Python 3.12+', type: 'Core High-Performance Engine', icon: 'fa-brands fa-python' },
          { name: 'FastAPI & Uvicorn', type: 'Async High-Speed REST APIs', icon: 'fa-solid fa-bolt-lightning' },
          { name: 'Django & DRF', type: 'Enterprise Backend Framework', icon: 'fa-solid fa-server' },
          { name: 'Pandas & NumPy', type: 'Data Science & Processing', icon: 'fa-solid fa-table-cells' },
          { name: 'Selenium & Playwright', type: 'Headless Browser Automation', icon: 'fa-solid fa-spider' },
          { name: 'Beautiful Soup 4', type: 'HTML/XML Web Scraping', icon: 'fa-solid fa-code' },
          { name: 'Docker & Docker Compose', type: 'Containerized Deployment', icon: 'fa-brands fa-docker' },
          { name: 'Celery & Redis', type: 'Async Task Queue & Caching', icon: 'fa-solid fa-memory' }
        ],
        deliverables: [
          'High-Concurrency FastAPI / Django REST Microservices',
          'Anti-Bot & CAPTCHA Bypassing Web Scrapers',
          'Automated ETL Pipelines with CSV/Excel/SQL Export',
          'PostgreSQL / MySQL Schema Design & ORM Integration',
          'Dockerized Container with Zero-Setup Deployment',
          'Unit Tests & Interactive OpenAPI (Swagger) Documentation'
        ]
      }
    };

    function openDetails(serviceId) {
      const data = servicesDetailsData[serviceId] || servicesDetailsData['web-dev'];
      currentSelectedService = data.title;

      if (heroImg) {
        heroImg.src = data.image;
        heroImg.alt = data.title;
      }
      if (categoryTag) categoryTag.textContent = data.category;
      if (titleEl) titleEl.textContent = data.title;
      if (subtitleEl) subtitleEl.textContent = data.subtitle;
      if (descEl) descEl.textContent = data.description;
      if (timelineEl) timelineEl.innerHTML = `<i class="fa-regular fa-clock"></i> ${data.timeline}`;

      // Populate Technologies Grid with icons & badges
      if (techGrid) {
        techGrid.innerHTML = data.technologies.map(tech => `
          <div class="sm-tech-card">
            <div class="sm-tech-icon"><i class="${tech.icon}"></i></div>
            <div class="sm-tech-info">
              <span class="sm-tech-name">${tech.name}</span>
              <span class="sm-tech-type">${tech.type}</span>
            </div>
          </div>
        `).join('');
      }

      // Populate Deliverables Grid
      if (deliverablesGrid) {
        deliverablesGrid.innerHTML = data.deliverables.map(del => `
          <div class="sm-deliverable-item">
            <i class="fa-solid fa-circle-check"></i>
            <span>${del}</span>
          </div>
        `).join('');
      }

      if (modal) {
        modal.classList.add('open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
      }
    }

    function closeDetails() {
      if (modal) {
        modal.classList.remove('open');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      }
    }

    openBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const serviceId = btn.getAttribute('data-service-id') || 'web-dev';
        openDetails(serviceId);
      });
    });

    if (closeBtn) closeBtn.addEventListener('click', closeDetails);
    if (bottomCloseBtn) bottomCloseBtn.addEventListener('click', closeDetails);

    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeDetails();
      });
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal && modal.classList.contains('open')) {
        closeDetails();
      }
    });

    // Request Service Button in Details Modal
    if (requestBtn) {
      requestBtn.addEventListener('click', () => {
        closeDetails();
        openModal(currentSelectedService);
      });
    }
  }
  initServiceDetailsModal();

  // 15. FAQ Accordion Toggle
  function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    if (!faqItems.length) return;

    faqItems.forEach(item => {
      const questionBtn = item.querySelector('.faq-question');
      const answer = item.querySelector('.faq-answer');

      if (!questionBtn || !answer) return;

      questionBtn.addEventListener('click', () => {
        const isOpen = item.classList.contains('active');

        // Close other open items for accordion behavior
        faqItems.forEach(otherItem => {
          if (otherItem !== item && otherItem.classList.contains('active')) {
            otherItem.classList.remove('active');
            const otherBtn = otherItem.querySelector('.faq-question');
            const otherAnswer = otherItem.querySelector('.faq-answer');
            if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
            if (otherAnswer) otherAnswer.style.maxHeight = null;
          }
        });

        if (isOpen) {
          item.classList.remove('active');
          questionBtn.setAttribute('aria-expanded', 'false');
          answer.style.maxHeight = null;
        } else {
          item.classList.add('active');
          questionBtn.setAttribute('aria-expanded', 'true');
          answer.style.maxHeight = answer.scrollHeight + 'px';
        }
      });
    });
  }
  initFaqAccordion();
});
