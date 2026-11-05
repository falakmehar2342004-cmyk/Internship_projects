

/* ===== ABOUT PAGE INTERACTIONS ===== */
// about page ke interactions (original HTML se). Baad mein React state mein convert karna.
(() => {
    const track = document.getElementById('compliance-slider-track');
    const prevBtn = document.getElementById('slider-prev');
    const nextBtn = document.getElementById('slider-next');
    const dots = document.querySelectorAll('#slider-dots .slider-dot');

    if (track && prevBtn && nextBtn) {
      const scrollStep = 360;

      prevBtn.addEventListener('click', () => {
        track.scrollBy({ left: -scrollStep, behavior: 'smooth' });
      });

      nextBtn.addEventListener('click', () => {
        track.scrollBy({ left: scrollStep, behavior: 'smooth' });
      });

      // Update dot indicators based on scroll position
      track.addEventListener('scroll', () => {
        const maxScroll = track.scrollWidth - track.clientWidth;
        const progress = maxScroll > 0 ? track.scrollLeft / maxScroll : 0;
        const activeIndex = Math.min(dots.length - 1, Math.round(progress * (dots.length - 1)));

        dots.forEach((dot, index) => {
          if (index === activeIndex) {
            dot.classList.add('w-6', 'bg-ocean-600');
            dot.classList.remove('w-2', 'bg-slate-200');
          } else {
            dot.classList.add('w-2', 'bg-slate-200');
            dot.classList.remove('w-6', 'bg-ocean-600');
          }
        });
      });

      // Click dots to scroll
      dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
          const maxScroll = track.scrollWidth - track.clientWidth;
          track.scrollTo({ left: (index / (dots.length - 1)) * maxScroll, behavior: 'smooth' });
        });
      });
    }
  })();


/* ===== SERVICES PAGE INTERACTIONS ===== */
// services page ke interactions (original HTML se). Baad mein React state mein convert karna.
(function initAccordions() {
      const root = document.getElementById('accordion-root');
      if (!root) return;

      const items = root.querySelectorAll('.accordion-item');

      items.forEach(item => {
        item.addEventListener('click', (e) => {
          const isCurrentlyExpanded = item.getAttribute('data-expanded') === 'true';

          // Close all items
          items.forEach(other => {
            other.setAttribute('data-expanded', 'false');
            const body = other.querySelector('.accordion-body');
            const btnIcon = other.querySelector('.accordion-btn span');
            if (body) body.classList.add('hidden');
            if (btnIcon) btnIcon.textContent = 'add';
          });

          // Toggle current
          if (!isCurrentlyExpanded) {
            item.setAttribute('data-expanded', 'true');
            const body = item.querySelector('.accordion-body');
            const btnIcon = item.querySelector('.accordion-btn span');
            if (body) body.classList.remove('hidden');
            if (btnIcon) btnIcon.textContent = 'remove';
          }
        });
      });
    })();

    // Circular Showcase Slider Logic
    (function initCircularSlider() {
      const slider = document.getElementById('circular-slider');
      const prevBtn = document.getElementById('carousel-prev-btn');
      const nextBtn = document.getElementById('carousel-next-btn');
      const dotsContainer = document.getElementById('carousel-dots');

      if (!slider || !prevBtn || !nextBtn) return;

      const scrollDistance = 340;

      prevBtn.addEventListener('click', () => {
        slider.scrollBy({ left: -scrollDistance, behavior: 'smooth' });
        updateDots(-1);
      });

      nextBtn.addEventListener('click', () => {
        slider.scrollBy({ left: scrollDistance, behavior: 'smooth' });
        updateDots(1);
      });

      function updateDots(direction) {
        if (!dotsContainer) return;
        const dots = dotsContainer.querySelectorAll('button');
        let activeIdx = 0;
        dots.forEach((dot, idx) => {
          if (dot.classList.contains('bg-teal-600')) activeIdx = idx;
        });
        let nextIdx = (activeIdx + direction + dots.length) % dots.length;
        dots.forEach((dot, idx) => {
          if (idx === nextIdx) {
            dot.className = "w-3 h-3 rounded-full bg-teal-600 transition-all cursor-pointer";
          } else {
            dot.className = "w-2.5 h-2.5 rounded-full bg-slate-300 hover:bg-slate-400 transition-all cursor-pointer";
          }
        });
      }

      if (dotsContainer) {
        const dots = dotsContainer.querySelectorAll('button');
        dots.forEach((dot, index) => {
          dot.addEventListener('click', () => {
            slider.scrollTo({ left: index * scrollDistance, behavior: 'smooth' });
            dots.forEach((d, i) => {
              if (i === index) {
                d.className = "w-3 h-3 rounded-full bg-teal-600 transition-all cursor-pointer";
              } else {
                d.className = "w-2.5 h-2.5 rounded-full bg-slate-300 hover:bg-slate-400 transition-all cursor-pointer";
              }
            });
          });
        });
      }
    })();

    // AI Dialect Simulator Sandbox Logic
    (function initDialectSimulator() {
      const tabs = document.querySelectorAll('.dialect-tab-btn');
      const outputBox = document.getElementById('dialect-output-box');
      const confidencePill = document.getElementById('confidence-pill');
      const refreshBtn = document.getElementById('refresh-copy-btn');

      if (!tabs.length || !outputBox) return;

      const sampleTranslations = {
        urdu: [
          '“Assalam-o-Alaikum! Aap ki pasandeeda items cart mein mehfooz hain. Maghrib se pehle fori delivery ke liye yahan tap karein.”',
          '“Khas Peshkash: Eid ki tayari shuru karein! VIP code EID50 lagayein aur 25% fori discount payen.”'
        ],
        arabic: [
          '“أهلاً بك! طلبك بانتظارك في السلة، اضغط هنا لتأكيد التوصيل السريع قبل صلاة العشاء اليوم.”',
          '“عرض حصري لعملائنا في الرياض وجدة: شحن مجاني لكافة الطلبات فوق 200 ريال لفترة محدودة.”'
        ],
        english: [
          '“Hello! Your favorite items are waiting in your cart. Tap below to confirm instant express dispatch before 6 PM.”',
          '“VIP Flash Sale: Enjoy free priority carrier delivery across Pakistan & Saudi Arabia with code DIRECT.”'
        ]
      };

      let currentLang = 'urdu';
      let variantIdx = 0;

      tabs.forEach(tab => {
        tab.addEventListener('click', () => {
          tabs.forEach(t => {
            t.className = 'dialect-tab-btn px-3 py-1 rounded-md text-slate-600 hover:text-slate-900 transition-all';
          });
          tab.className = 'dialect-tab-btn px-3 py-1 rounded-md bg-white text-teal-800 shadow-xs border border-slate-200/60 transition-all font-semibold';

          currentLang = tab.getAttribute('data-target') || 'urdu';
          variantIdx = 0;
          renderText();
        });
      });

      if (refreshBtn) {
        refreshBtn.addEventListener('click', () => {
          variantIdx = (variantIdx + 1) % (sampleTranslations[currentLang]?.length || 1);
          renderText();
        });
      }

      function renderText() {
        const textArr = sampleTranslations[currentLang] || sampleTranslations.urdu;
        outputBox.textContent = textArr[variantIdx];
        if (confidencePill) {
          const scores = ['99.4%', '98.9%', '99.7%'];
          confidencePill.textContent = `${scores[variantIdx % scores.length]} Match`;
        }
      }
    })();


/* ===== HOME PAGE INTERACTIONS ===== */
// home page ke interactions (original HTML se). Baad mein React state mein convert karna.
/**
     * Toggles pricing between PKR and SAR currencies across plan cards
     * @param {string} currency - 'PKR' | 'SAR'
     */
    function setCurrency(currency) {
      const btnPkr = document.getElementById('btn-pkr');
      const btnSar = document.getElementById('btn-sar');
      const priceVals = document.querySelectorAll('.price-val');
      const currencyLabels = document.querySelectorAll('.currency-label');

      if (currency === 'PKR') {
        btnPkr.className = 'px-6 py-2 rounded-full text-sm font-bold transition bg-[var(--brand-primary)] text-white shadow-sm font-domine';
        btnSar.className = 'px-6 py-2 rounded-full text-sm font-bold transition text-slate-600 hover:text-slate-900 font-domine';
        
        currencyLabels.forEach(label => label.textContent = 'PKR');
        priceVals.forEach(val => {
          val.textContent = val.getAttribute('data-pkr');
        });
      } else if (currency === 'SAR') {
        btnSar.className = 'px-6 py-2 rounded-full text-sm font-bold transition bg-[var(--brand-primary)] text-white shadow-sm font-domine';
        btnPkr.className = 'px-6 py-2 rounded-full text-sm font-bold transition text-slate-600 hover:text-slate-900 font-domine';
        
        currencyLabels.forEach(label => label.textContent = 'SAR');
        priceVals.forEach(val => {
          val.textContent = val.getAttribute('data-sar');
        });
      }
    }

    /**
     * Toggles step accordion expansion matching the services list style
     * @param {number} stepNumber - 1, 2, or 3
     */
    function toggleStep(stepNumber) {
      const items = document.querySelectorAll('.accordion-item');
      items.forEach(item => {
        const num = parseInt(item.getAttribute('data-step'), 10);
        const content = item.querySelector('.step-content');
        const iconSvg = item.querySelector('.step-icon');
        const button = item.querySelector('button');

        if (num === stepNumber) {
          const isCurrentlyOpen = content.style.display === 'block';
          if (isCurrentlyOpen) {
            content.style.display = 'none';
            button.setAttribute('aria-expanded', 'false');
            iconSvg.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" d="M12 5v14m-7-7h14"></path>';
          } else {
            content.style.display = 'block';
            button.setAttribute('aria-expanded', 'true');
            iconSvg.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" d="M19 12H5"></path>';
          }
        }
      });
    }

    /**
     * Interactive Feature Slider Switcher
     * @param {number} index - 0, 1, 2, 3
     */
    let currentFeatureIndex = 0;
    let autoSlideTimer = null;

    function switchFeatureSlide(index) {
      const slides = document.querySelectorAll('.feature-slide');
      const buttons = document.querySelectorAll('.feature-nav-btn');

      slides.forEach((slide, i) => {
        if (i === index) {
          slide.style.opacity = '1';
          slide.style.pointerEvents = 'auto';
        } else {
          slide.style.opacity = '0';
          slide.style.pointerEvents = 'none';
        }
      });

      buttons.forEach((btn, i) => {
        const dot = btn.querySelector('.indicator-dot');
        if (i === index) {
          btn.className = 'feature-nav-btn active px-4 py-3.5 rounded-2xl border text-left transition-all duration-300 flex items-center justify-between bg-[var(--brand-primary)] text-white border-[var(--brand-accent)] shadow-md font-domine cursor-pointer';
          if (dot) {
            dot.className = 'w-2 h-2 rounded-full bg-[var(--brand-accent)] indicator-dot';
          }
        } else {
          btn.className = 'feature-nav-btn px-4 py-3.5 rounded-2xl border text-left transition-all duration-300 flex items-center justify-between bg-white text-slate-700 border-slate-200 hover:border-teal-500/40 font-domine cursor-pointer';
          if (dot) {
            dot.className = 'w-2 h-2 rounded-full bg-slate-300 indicator-dot';
          }
        }
      });

      currentFeatureIndex = index;
    }

    // Auto-advance slider gently every 6.5 seconds with pause on interaction
    function startAutoSlide() {
      // purane timers saaf (page dobara khulne par intervals jama nahi hone chahiye)
      clearInterval(autoSlideTimer);
      clearInterval(window.__featureTimer);
      autoSlideTimer = setInterval(() => {
        // Jab slider scroll se pin hota hai (src/motion/sliders.js) to auto-advance band
        if (window.__featurePinned) return;
        // Page badal chuka ho to timer khatam
        if (!document.getElementById('feature-showcase-stage')) { clearInterval(autoSlideTimer); return; }
        const nextIndex = (currentFeatureIndex + 1) % 4;
        switchFeatureSlide(nextIndex);
      }, 6500);
      window.__featureTimer = autoSlideTimer;
    }

    const featureStage = document.getElementById('feature-showcase-stage');
    if (featureStage) {
      featureStage.addEventListener('mouseenter', () => clearInterval(autoSlideTimer));
      featureStage.addEventListener('mouseleave', () => startAutoSlide());
    }
    startAutoSlide();

    // IntersectionObserver for scroll-reveal animations
    (() => {
      const revealElements = document.querySelectorAll('.reveal-on-scroll');
      if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-revealed');
              observer.unobserve(entry.target);
            }
          });
        }, {
          threshold: 0.15,
          rootMargin: '0px 0px -50px 0px'
        });

        revealElements.forEach(el => observer.observe(el));
      } else {
        revealElements.forEach(el => el.classList.add('is-revealed'));
      }
    })();


/* ===== CONTACT PAGE INTERACTIONS ===== */
// contact page ke interactions (original HTML se). Baad mein React state mein convert karna.
function toggleFaq(btn) {
      const content = btn.nextElementSibling;
      const icon = btn.querySelector('.material-symbols-outlined');
      const isExpanded = !content.classList.contains('hidden');

      document.querySelectorAll('#faqAccordion .faq-content').forEach(c => c.classList.add('hidden'));
      document.querySelectorAll('#faqAccordion .material-symbols-outlined').forEach(i => i.style.transform = 'rotate(0deg)');

      if (!isExpanded) {
        content.classList.remove('hidden');
        if (icon) icon.style.transform = 'rotate(180deg)';
      }
    }

    function handleFormSubmit() {
      const toast = document.getElementById('formSuccessToast');
      if (toast) {
        toast.classList.remove('hidden');
      }
    }

    function dismissToast() {
      const toast = document.getElementById('formSuccessToast');
      const form = document.getElementById('contactQueryForm');
      if (toast) toast.classList.add('hidden');
      if (form) form.reset();
    }
