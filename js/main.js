/**
 * MAYYSH TECH — Core Application Logic
 * Interactive components: Navigation, Mobile Drawer, Ask Era Interactive Demo, FAQ Accordion, WhatsApp integration.
 */

const CONFIG = {
  WHATSAPP_NUMBER: "918487083803",
  DEFAULT_MESSAGE: "Hi MAYYSH TECH, I would like to schedule a product demonstration.",
  ERA_CAMPUS_MESSAGE: "Hi MAYYSH TECH, I would like to schedule an Era Campus (School ERP) demonstration.",
  MAYYSH_CARE_MESSAGE: "Hi MAYYSH TECH, I would like to schedule a Mayysh Care (Hospital System) demonstration.",
};

document.addEventListener("DOMContentLoaded", () => {
  // 1. Mobile Menu Drawer Toggle
  const toggleBtn = document.getElementById("navToggle");
  const mobileDrawer = document.getElementById("mobileDrawer");

  if (toggleBtn && mobileDrawer) {
    toggleBtn.addEventListener("click", () => {
      const isOpen = mobileDrawer.classList.toggle("open");
      toggleBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    // Close on clicking any link inside drawer
    mobileDrawer.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        mobileDrawer.classList.remove("open");
        toggleBtn.setAttribute("aria-expanded", "false");
      });
    });
  }

  // 2. Nav Scroll Blur
  const nav = document.getElementById("nav");
  if (nav) {
    const handleScroll = () => {
      if (window.scrollY > 15) {
        nav.classList.add("is-scrolled");
      } else {
        nav.classList.remove("is-scrolled");
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
  }

  // 3. Dynamic WhatsApp Links
  const setupWhatsAppLinks = () => {
    document.querySelectorAll(".js-whatsapp").forEach((el) => {
      const customMsg = el.getAttribute("data-wa-msg") || CONFIG.DEFAULT_MESSAGE;
      const url = `https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${encodeURIComponent(customMsg)}`;
      el.setAttribute("href", url);
      el.setAttribute("target", "_blank");
      el.setAttribute("rel", "noopener noreferrer");
    });
  };
  setupWhatsAppLinks();

  // 4. Ask Era Interactive Query Demonstration
  const queryPills = document.querySelectorAll(".query-pill");
  const queryDisplay = document.getElementById("askEraQueryDisplay");
  const resultDisplay = document.getElementById("askEraResultDisplay");

  const queryMockData = {
    1: {
      en: {
        query: "Which class had the lowest attendance over the last 7 days?",
        headline: "Attendance Anomaly Detected (Last 7 Days)",
        stats: [
          { label: "Class 8-B", val: "84.2% Attendance (Lowest)" },
          { label: "Class 9-A", val: "88.6% Attendance" },
          { label: "School Average", val: "94.8% Attendance" },
        ],
        note: "Tip: Route 4 school bus delay on Wednesday affected 14 students of Class 8-B."
      },
      hinglish: {
        query: "Pichhle 7 din mein sabse kam attendance kis class ki hai?",
        headline: "Last 7 Days ka Attendance Report",
        stats: [
          { label: "Class 8-B", val: "84.2% Attendance (Sabse Kam)" },
          { label: "Class 9-A", val: "88.6% Attendance" },
          { label: "School Average", val: "94.8% Attendance" },
        ],
        note: "Dhyan dein: Wednesday ko Route 4 bus delay ki wajah se 8-B ke 14 bacche late huye the."
      }
    },
    2: {
      en: {
        query: "Show total pending fee for Class 10th Section A",
        headline: "Class 10-A Fee Audit Status",
        stats: [
          { label: "Total Students", val: "42 Enrolled" },
          { label: "Fees Collected", val: "₹5,88,000 (87%)" },
          { label: "Outstanding Dues", val: "₹38,500 (5 Students)" },
        ],
        note: "Action ready: 5 pending WhatsApp reminder receipts generated offline."
      },
      hinglish: {
        query: "Class 10 Section A ki total pending fees kitni hai?",
        headline: "Class 10-A Fees Audit Status",
        stats: [
          { label: "Total Students", val: "42 Students" },
          { label: "Total Jama Fees", val: "₹5,88,000 (87%)" },
          { label: "Pending Balance", val: "₹38,500 (5 Students)" },
        ],
        note: "Ready to send: 5 parents ke pending fees reminder receipts bina internet taiyar hain."
      }
    },
    3: {
      en: {
        query: "Generate list of students absent for 3 consecutive days",
        headline: "Consecutive Absence Report (Offline Ledger)",
        stats: [
          { label: "Rahul V. (Roll 14)", val: "Class 7-A • Absent since 15-Sept" },
          { label: "Priya S. (Roll 28)", val: "Class 9-B • Absent since 15-Sept" },
          { label: "Total Identified", val: "2 Students across all classes" },
        ],
        note: "Official guardian phone numbers mapped automatically from local student master."
      },
      hinglish: {
        query: "Lagaatar 3 din se absent students ki list nikalo",
        headline: "Lagaatar 3 Din Absent Students ki List",
        stats: [
          { label: "Rahul V. (Roll 14)", val: "Class 7-A • 15-Sept se absent" },
          { label: "Priya S. (Roll 28)", val: "Class 9-B • 15-Sept se absent" },
          { label: "Total Absent", val: "2 Students poore school mein" },
        ],
        note: "Dono parents ke verified mobile numbers master database se fetch ho chuke hain."
      }
    }
  };

  let currentQueryIndex = 1;

  function renderAskEraResult(queryId) {
    if (!resultDisplay || !queryDisplay) return;
    currentQueryIndex = queryId;

    const currentLang = (window.i18n && window.i18n.getLanguage()) || "en";
    const data = queryMockData[queryId][currentLang] || queryMockData[queryId]["en"];

    queryDisplay.textContent = data.query;

    resultDisplay.innerHTML = `
      <div class="terminal-result-card">
        <div class="terminal-result-head">
          <span>⚡ Local SQL Query • Sub-second (0.04s)</span>
          <span class="mock-status-pill">100% OFFLINE</span>
        </div>
        <h4 style="font-size:15px; color:#ffffff; margin-bottom:12px;">${data.headline}</h4>
        <div class="terminal-data-rows">
          ${data.stats
            .map(
              (s) => `
            <div class="terminal-row">
              <span style="color:var(--slate-400); font-weight:500;">${s.label}</span>
              <strong style="color:var(--crimson-400); font-family:var(--font-mono);">${s.val}</strong>
            </div>
          `
            )
            .join("")}
        </div>
        <p style="font-size:12px; color:var(--slate-300); margin-top:14px; border-top:1px solid rgba(255,255,255,0.08); padding-top:10px;">
          ${data.note}
        </p>
      </div>
    `;
  }

  queryPills.forEach((pill) => {
    pill.addEventListener("click", () => {
      queryPills.forEach((p) => p.classList.remove("active"));
      pill.classList.add("active");
      const id = pill.getAttribute("data-query-id");
      renderAskEraResult(id);
    });
  });

  // Re-render when language changes
  window.addEventListener("languageChanged", () => {
    renderAskEraResult(currentQueryIndex);
    setupWhatsAppLinks();
  });

  // Initial render
  if (queryDisplay && resultDisplay) {
    renderAskEraResult(1);
  }

  // 5. Screenshot Walkthrough Gallery Tabs
  const galleryTabs = document.querySelectorAll(".gallery-tab");
  if (galleryTabs.length > 0) {
    galleryTabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        const targetId = tab.getAttribute("data-tab");
        const container = tab.closest(".gallery-tabs-nav")?.parentElement || document;

        // Set active tab
        container.querySelectorAll(".gallery-tab").forEach((t) => t.classList.remove("active"));
        tab.classList.add("active");

        // Set active panel
        container.querySelectorAll(".gallery-panel").forEach((panel) => panel.classList.remove("active"));
        const targetPanel = document.getElementById(targetId);
        if (targetPanel) {
          targetPanel.classList.add("active");
        }
      });
    });
  }

  // 6. FAQ Accordion Handling
  document.querySelectorAll(".faq-toggle").forEach((btn) => {
    btn.addEventListener("click", () => {
      const item = btn.closest(".faq-item");
      if (item) {
        const isOpen = item.classList.contains("open");
        // Close other items in the same container
        const parent = item.parentElement;
        if (parent) {
          parent.querySelectorAll(".faq-item").forEach((it) => it.classList.remove("open"));
        }
        if (!isOpen) {
          item.classList.add("open");
        }
      }
    });
  });

  // 6. Contact Form Submission
  const contactForm = document.getElementById("leadContactForm");
  const formFeedback = document.getElementById("formFeedback");

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = contactForm.querySelector("#contactName")?.value || "";
      const org = contactForm.querySelector("#contactOrg")?.value || "";
      const phone = contactForm.querySelector("#contactPhone")?.value || "";
      const industry = contactForm.querySelector("#contactIndustry")?.value || "";
      const requirement = contactForm.querySelector("#contactRequirement")?.value || "";
      const notes = contactForm.querySelector("#contactNotes")?.value || "";

      const currentLang = (window.i18n && window.i18n.getLanguage()) || "en";
      const leadMsg =
        `*New Inquiry from MAYYSH TECH Website:*\n` +
        `• Name: ${name}\n` +
        `• Organization: ${org}\n` +
        `• Phone/WhatsApp: ${phone}\n` +
        `• Industry: ${industry}\n` +
        `• Requirement: ${requirement}\n` +
        (notes ? `• Notes: ${notes}\n` : "");

      const waUrl = `https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${encodeURIComponent(leadMsg)}`;

      if (formFeedback) {
        formFeedback.style.display = "block";
        formFeedback.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }

      // Open WhatsApp directly after short delay
      setTimeout(() => {
        window.open(waUrl, "_blank");
      }, 700);
    });
  }

  // 7. Dynamic Year in Footer
  const yearEl = document.getElementById("copyrightYear");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 8. Screenshot Lightbox Handler
  const lightbox = document.getElementById("screenshotLightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const closeBtn = document.getElementById("closeLightbox");

  if (lightbox && lightboxImg) {
    document.querySelectorAll(".js-lightbox-trigger").forEach((trigger) => {
      trigger.addEventListener("click", () => {
        const src = trigger.getAttribute("data-src") || trigger.querySelector("img")?.getAttribute("src");
        const alt = trigger.querySelector("img")?.getAttribute("alt") || "Product Preview";
        if (src) {
          lightboxImg.setAttribute("src", src);
          lightboxImg.setAttribute("alt", alt);
          lightbox.classList.add("open");
          document.body.style.overflow = "hidden";
        }
      });
    });

    const closeLightbox = () => {
      lightbox.classList.remove("open");
      document.body.style.overflow = "";
    };

    if (closeBtn) closeBtn.addEventListener("click", closeLightbox);
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && lightbox.classList.contains("open")) {
        closeLightbox();
      }
    });
  }
});
