/* =========================================================
   CONFIGURAÇÃO — edite apenas este bloco
   ========================================================= */
const CONFIG = {
  // CONFIGURAÇÃO PENDENTE: substitua pelo número real, só dígitos, com 55 + DDD + número.
  // Exemplo de formato: "5541999999999"
  whatsappNumber: "55DDDNUMERO",
  message: "Olá, Marcelo! Conheci o Sistema F.A.R.O.L. pelo site e gostaria de conversar sobre os desafios e as oportunidades de crescimento da minha empresa.",
  // Opcionais (deixe vazio para ocultar no rodapé)
  email: "",
  linkedin: ""
};

(function () {
  "use strict";

  const numberIsValid = /^55\d{10,11}$/.test(CONFIG.whatsappNumber);
  const waUrl = numberIsValid
    ? "https://wa.me/" + CONFIG.whatsappNumber + "?text=" + encodeURIComponent(CONFIG.message)
    : null;

  /* Toast */
  const toast = document.getElementById("toast");
  let toastTimer;
  function showToast(text) {
    toast.textContent = text;
    toast.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.hidden = true; }, 5000);
  }

  /* Botões de WhatsApp */
  document.querySelectorAll("[data-wa]").forEach(function (el) {
    if (waUrl) {
      el.href = waUrl;
      el.target = "_blank";
      el.rel = "noopener noreferrer";
    } else {
      el.addEventListener("click", function (e) {
        e.preventDefault();
        showToast("Contato em configuração: o número de WhatsApp ainda não foi definido.");
      });
    }
  });

  /* Menu mobile */
  const btn = document.querySelector(".menu-btn");
  const menu = document.getElementById("menu");
  function setMenu(open) {
    btn.setAttribute("aria-expanded", String(open));
    btn.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    menu.classList.toggle("open", open);
  }
  btn.addEventListener("click", function () {
    setMenu(btn.getAttribute("aria-expanded") !== "true");
  });
  menu.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", function () { setMenu(false); });
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") setMenu(false);
  });

  /* Animações discretas de entrada */
  const items = document.querySelectorAll(".reveal");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce || !("IntersectionObserver" in window)) {
    items.forEach(function (i) { i.classList.add("in"); });
  } else {
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add("in");
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12 });
    items.forEach(function (i) { io.observe(i); });
  }

  /* Contatos opcionais no rodapé */
  function fillContact(selector, text, href) {
    const el = document.querySelector(selector);
    if (!el || !text) return;
    const a = document.createElement("a");
    a.href = href;
    a.textContent = text;
    if (href.indexOf("http") === 0) { a.target = "_blank"; a.rel = "noopener noreferrer"; }
    el.appendChild(a);
    el.hidden = false;
  }
  fillContact("[data-contact-email]", CONFIG.email, "mailto:" + CONFIG.email);
  fillContact("[data-contact-linkedin]", CONFIG.linkedin ? "LinkedIn" : "", CONFIG.linkedin);

  /* Ano do rodapé */
  document.getElementById("ano").textContent = new Date().getFullYear();
})();
