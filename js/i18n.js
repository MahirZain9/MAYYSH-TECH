/**
 * MAYYSH TECH — Bilingual Internationalization Engine
 * Handles instant switching between ENGLISH and HINGLISH without reloading.
 * Persists user preference via localStorage.
 */

(function () {
  const STORAGE_KEY = "mayysh_tech_lang";
  const DEFAULT_LANG = "en";

  // Helper to safely get nested translation by key path (e.g. "common.navProducts" or "home.heroH1")
  function getTranslation(path, lang) {
    if (!window.TRANSLATIONS) return null;
    const parts = path.split(".");
    let curr = window.TRANSLATIONS;
    for (let part of parts) {
      if (!curr || typeof curr !== "object") return null;
      curr = curr[part];
    }
    if (curr && curr[lang] !== undefined) {
      return curr[lang];
    }
    // Fallback to English if missing
    if (curr && curr.en !== undefined) {
      return curr.en;
    }
    return null;
  }

  function applyLanguage(lang) {
    if (lang !== "en" && lang !== "hinglish") {
      lang = DEFAULT_LANG;
    }

    // Update <html> lang attribute
    document.documentElement.setAttribute("lang", lang === "hinglish" ? "hi-Latn" : "en");

    // Translate all elements with data-i18n
    const elements = document.querySelectorAll("[data-i18n]");
    elements.forEach((el) => {
      const keyPath = el.getAttribute("data-i18n");
      const val = getTranslation(keyPath, lang);
      if (val !== null && val !== undefined) {
        if (val.includes("<") && val.includes(">")) {
          el.innerHTML = val;
        } else {
          el.textContent = val;
        }
      }
    });

    // Translate attributes like placeholder, title, aria-label
    const attrElements = document.querySelectorAll("[data-i18n-attr]");
    attrElements.forEach((el) => {
      const attrRules = el.getAttribute("data-i18n-attr").split(",");
      attrRules.forEach((rule) => {
        const [attrName, keyPath] = rule.split(":").map((s) => s.trim());
        if (attrName && keyPath) {
          const val = getTranslation(keyPath, lang);
          if (val !== null && val !== undefined) {
            el.setAttribute(attrName, val);
          }
        }
      });
    });

    // Update active class on all language toggle buttons
    const langBtns = document.querySelectorAll(".lang-btn");
    langBtns.forEach((btn) => {
      const btnLang = btn.getAttribute("data-lang");
      if (btnLang === lang) {
        btn.classList.add("active");
        btn.setAttribute("aria-pressed", "true");
      } else {
        btn.classList.remove("active");
        btn.setAttribute("aria-pressed", "false");
      }
    });

    // Save to localStorage
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {
      console.warn("localStorage not accessible:", e);
    }

    // Dispatch global event for widgets
    window.dispatchEvent(new CustomEvent("languageChanged", { detail: { lang } }));
  }

  function getCurrentLanguage() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "en" || saved === "hinglish") return saved;
    } catch (e) {}
    return DEFAULT_LANG;
  }

  function initI18n() {
    const initialLang = getCurrentLanguage();

    // Bind all toggle buttons
    document.addEventListener("click", (e) => {
      const btn = e.target.closest(".lang-btn");
      if (btn) {
        e.preventDefault();
        const targetLang = btn.getAttribute("data-lang");
        if (targetLang) {
          applyLanguage(targetLang);
        }
      }
    });

    // Apply initially
    applyLanguage(initialLang);
  }

  // Export to window
  window.i18n = {
    setLanguage: applyLanguage,
    getLanguage: getCurrentLanguage,
    getTranslation: getTranslation,
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initI18n);
  } else {
    initI18n();
  }
})();
