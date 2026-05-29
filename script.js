/* ============================================
   NYXCLOUD — script.js
   Clean, minimal, production-ready JS
   ============================================ */

(function () {
  "use strict";

  /* ============================================
     MOBILE MENU
  ============================================ */

  const header = document.getElementById("header");
  const menuToggle = document.getElementById("menuToggle");
  const mobileMenu = document.getElementById("mobileMenu");

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", () => {
      const isOpen = mobileMenu.classList.toggle("active");
      menuToggle.setAttribute("aria-expanded", isOpen);
      mobileMenu.setAttribute("aria-hidden", !isOpen);
    });

    // Close on link click
    mobileMenu.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        mobileMenu.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
        mobileMenu.setAttribute("aria-hidden", "true");
      });
    });

    // Close on outside click
    document.addEventListener("click", (e) => {
      if (!header.contains(e.target) && mobileMenu.classList.contains("active")) {
        mobileMenu.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
        mobileMenu.setAttribute("aria-hidden", "true");
      }
    });
  }

  /* ============================================
     TESTIMONIAL SLIDER
  ============================================ */

  const testimonials = document.querySelectorAll(".testimonial");
  const dots = document.querySelectorAll(".dot");
  const prevBtn = document.getElementById("prevTestimonial");
  const nextBtn = document.getElementById("nextTestimonial");

  if (testimonials.length > 0) {
    let current = 0;
    let autoSlideTimer;

    function showSlide(index) {
      testimonials.forEach(t => t.classList.remove("active"));
      dots.forEach(d => d.classList.remove("active"));

      testimonials[index].classList.add("active");
      if (dots[index]) dots[index].classList.add("active");
    }

    function nextSlide() {
      current = (current + 1) % testimonials.length;
      showSlide(current);
    }

    function prevSlide() {
      current = (current - 1 + testimonials.length) % testimonials.length;
      showSlide(current);
    }

    function resetAutoSlide() {
      clearInterval(autoSlideTimer);
      autoSlideTimer = setInterval(nextSlide, 7000);
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        nextSlide();
        resetAutoSlide();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        prevSlide();
        resetAutoSlide();
      });
    }

    dots.forEach(dot => {
      dot.addEventListener("click", () => {
        current = parseInt(dot.dataset.index, 10);
        showSlide(current);
        resetAutoSlide();
      });
    });

    autoSlideTimer = setInterval(nextSlide, 7000);
  }

  /* ============================================
     SCROLL REVEAL
  ============================================ */

  const revealEls = document.querySelectorAll(".reveal");

  if (revealEls.length > 0 && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    revealEls.forEach(el => observer.observe(el));
  } else {
    // Fallback for older browsers
    revealEls.forEach(el => el.classList.add("active"));
  }

  /* ============================================
     CONTACT FORM
  ============================================ */

  const form = document.getElementById("contactForm");
  const formMessage = document.getElementById("formMessage");

  if (form && formMessage) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const fields = ["name", "email", "company", "message"];
      const values = {};
      let valid = true;

      fields.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
          values[id] = el.value.trim();
          if (!values[id]) valid = false;
        }
      });

      if (!valid) {
        formMessage.textContent = "Por favor, preencha todos os campos.";
        formMessage.style.color = "#ef4444";
        return;
      }

      // Basic email validation
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(values.email)) {
        formMessage.textContent = "Insira um e-mail válido.";
        formMessage.style.color = "#ef4444";
        return;
      }

      // Simulate success
      const submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Enviando…";
      }

      setTimeout(() => {
        formMessage.textContent = "Mensagem enviada com sucesso. Retornaremos em breve.";
        formMessage.style.color = "#16a34a";
        form.reset();

        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = "Enviar mensagem";
        }
      }, 800);
    });
  }

  /* ============================================
     FOOTER NEWSLETTER
  ============================================ */

  const newsletterForm = document.querySelector(".footer-col form, .footer-newsletter form");

  if (newsletterForm) {
    newsletterForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = newsletterForm.querySelector("input");
      if (input && input.value.trim()) {
        input.value = "";
        input.placeholder = "Inscrição confirmada!";
        setTimeout(() => {
          input.placeholder = "Seu e-mail";
        }, 3000);
      }
    });
  }



  /* ============================================
     PLATFORM TABS
  ============================================ */

  const platformTabs = document.querySelectorAll(".pnav");
  const platformContent = document.getElementById("platformContent");

  const platformViews = {
    overview: `
      <div class="preview-kpis">
        <div class="kpi-card">
          <span>Servidores</span>
          <strong>48</strong>
          <em class="kpi-status ok">Todos online</em>
        </div>
        <div class="kpi-card">
          <span>Tarefas ativas</span>
          <strong>12</strong>
          <em class="kpi-status">Em execução</em>
        </div>
        <div class="kpi-card">
          <span>Alertas</span>
          <strong>0</strong>
          <em class="kpi-status ok">Nenhum crítico</em>
        </div>
      </div>
    `,

    backups: `
      <div class="preview-kpis">
        <div class="kpi-card">
          <span>Backups hoje</span>
          <strong>128</strong>
          <em class="kpi-status ok">98% sucesso</em>
        </div>

        <div class="kpi-card">
          <span>Armazenamento</span>
          <strong>8.2TB</strong>
          <em class="kpi-status">Utilizado</em>
        </div>

        <div class="kpi-card">
          <span>Retenção</span>
          <strong>30d</strong>
          <em class="kpi-status ok">Ativa</em>
        </div>
      </div>
    `,

    alerts: `
      <div class="preview-kpis">
        <div class="kpi-card">
          <span>Alertas ativos</span>
          <strong>3</strong>
          <em class="kpi-status">Monitorando</em>
        </div>

        <div class="kpi-card">
          <span>Incidentes</span>
          <strong>1</strong>
          <em class="kpi-status">Baixa prioridade</em>
        </div>

        <div class="kpi-card">
          <span>Status</span>
          <strong>OK</strong>
          <em class="kpi-status ok">Sistema estável</em>
        </div>
      </div>
    `,

    reports: `
      <div class="preview-kpis">
        <div class="kpi-card">
          <span>Relatórios</span>
          <strong>24</strong>
          <em class="kpi-status ok">Gerados</em>
        </div>

        <div class="kpi-card">
          <span>Exports</span>
          <strong>12</strong>
          <em class="kpi-status">PDF/CSV</em>
        </div>

        <div class="kpi-card">
          <span>Atualização</span>
          <strong>Live</strong>
          <em class="kpi-status ok">Sincronizado</em>
        </div>
      </div>
    `
  };

  if (platformTabs.length && platformContent) {

    platformTabs.forEach(tab => {

      tab.addEventListener("click", () => {

        platformTabs.forEach(item => item.classList.remove("active"));
        tab.classList.add("active");

        const currentTab = tab.dataset.tab;

        platformContent.style.opacity = "0";

        setTimeout(() => {
          platformContent.innerHTML = platformViews[currentTab];
          platformContent.style.opacity = "1";
        }, 180);

      });

    });

  }


})();