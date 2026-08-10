/* ==========================================================================
   MAYYSH TECH — site config
   Ye sab cheezein aage badalni ho to sirf yahin change karo.
   ========================================================================== */
const CONFIG = {
  // WhatsApp number (country code ke saath, bina + ya spaces ke)
  WHATSAPP_NUMBER: "918487083803",
  WHATSAPP_MESSAGE: "Hi MAYYSH TECH, mujhe Era Campus ka demo dekhna hai.",

  // Naya installer upload karne ke baad, uska link yahan daal dena
  // (GitHub Releases ya Google Drive ka "share" link — README.md mein
  // pura tarika likha hai)
  DOWNLOAD_URL: "#",
  DOWNLOAD_VERSION: "v2.0",
};

/* ---------------------------------------------------------------------- */

document.addEventListener("DOMContentLoaded", () => {
  // wire up every WhatsApp button/link
  const waHref = `https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${encodeURIComponent(CONFIG.WHATSAPP_MESSAGE)}`;
  document.querySelectorAll(".js-whatsapp").forEach((el) => {
    el.setAttribute("href", waHref);
    el.setAttribute("target", "_blank");
    el.setAttribute("rel", "noopener");
  });

  // download button
  const downloadBtn = document.getElementById("downloadBtn");
  const versionTag = document.getElementById("versionTag");
  if (downloadBtn) {
    if (CONFIG.DOWNLOAD_URL && CONFIG.DOWNLOAD_URL !== "#") {
      downloadBtn.setAttribute("href", CONFIG.DOWNLOAD_URL);
    } else {
      downloadBtn.addEventListener("click", (e) => {
        e.preventDefault();
        alert("Installer link jald hi add hoga. Tab tak WhatsApp par sampark karein.");
      });
    }
  }
  if (versionTag) versionTag.textContent = CONFIG.DOWNLOAD_VERSION;

  // footer year
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // nav background on scroll
  const nav = document.getElementById("nav");
  const onScroll = () => {
    if (window.scrollY > 12) nav.classList.add("is-scrolled");
    else nav.classList.remove("is-scrolled");
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // scroll-reveal for feature cards
  const cards = document.querySelectorAll(".feature-card");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add("in"), (i % 4) * 70);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    cards.forEach((c) => io.observe(c));
  } else {
    cards.forEach((c) => c.classList.add("in"));
  }
});
