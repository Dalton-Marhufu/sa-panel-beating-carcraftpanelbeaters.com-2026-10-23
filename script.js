(function () {
  "use strict";

  const root = document.documentElement;
  const toggle = document.getElementById("nav-toggle");
  const nav = document.getElementById("nav");
  const close = document.getElementById("nav-close");
  const links = document.querySelectorAll(".nav-link, .nav-cta-wrap .btn-gold");
  const lb = document.getElementById("lb");
  const lbImg = document.getElementById("lb-img");
  const lbClose = document.getElementById("lb-close");

  function closeNav() {
    if (nav) nav.classList.remove("open");
  }

  if (toggle) {
    toggle.addEventListener("click", function () {
      nav.classList.add("open");
      document.body.classList.add("nav-open");
    });
  }
  if (close) close.addEventListener("click", closeNav);
  if (nav) {
    nav.addEventListener("click", function (e) {
      if (e.target === nav) closeNav();
    });
  }

  links.forEach(function (a) {
    a.addEventListener("click", function () {
      closeNav();
    });
  });

  // Lock body scroll when mobile nav open
  function updateScrollLock() {
    if (nav && nav.classList.contains("open")) {
      document.body.classList.add("nav-open");
    } else {
      document.body.classList.remove("nav-open");
    }
  }
  document.addEventListener("click", updateScrollLock);

  // Lightbox gallery
  function openLb(src, alt) {
    lbImg.src = src;
    lbImg.alt = alt || "";
    if (lb) lb.classList.add("show");
    lbImg.setAttribute("aria-hidden", "false");
  }
  function closeLb() {
    if (lb) lb.classList.remove("show");
    lbImg.src = "";
  }

  if (lb) {
    lb.addEventListener("click", function (e) {
      if (e.target === lb || e.target === lbClose) closeLb();
    });
  }

  document.querySelectorAll('[data-lightbox="gallery"]').forEach(function (el) {
    el.addEventListener("click", function (e) {
      e.preventDefault();
      openLb(el.getAttribute("href"), el.querySelector("img").alt);
    });
  });

  // Close lightbox on Escape
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      if (lb && lb.classList.contains("show")) closeLb();
      closeNav();
    }
  });

  // Fade-in on scroll
  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );
  document.querySelectorAll("section").forEach(function (s) {
    s.classList.add("pre-reveal");
    observer.observe(s);
  });
})();
