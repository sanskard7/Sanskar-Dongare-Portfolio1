
// Helper functions
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

// Footer year
const year = $("#year");
if (year) {
  year.textContent = new Date().getFullYear();
}

// ================================
// DARK / LIGHT THEME TOGGLE
// Requires a button with id="theme-toggle"
// ================================
const themeButton = $("#theme-toggle");
const root = document.documentElement;

function applyTheme(theme) {
  const selectedTheme = theme === "light" ? "light" : "dark";

  root.dataset.theme = selectedTheme;
  root.style.colorScheme = selectedTheme;

  if (themeButton) {
    themeButton.setAttribute(
      "aria-label",
      selectedTheme === "dark"
        ? "Switch to light theme"
        : "Switch to dark theme"
    );

    themeButton.setAttribute(
      "aria-pressed",
      String(selectedTheme === "light")
    );

    // Update icon/text only if the button contains a dedicated icon
    const icon = $(".theme-icon", themeButton);
    if (icon) {
      icon.textContent = selectedTheme === "dark" ? "☀" : "☾";
    }
  }
}

let savedTheme = null;

try {
  savedTheme = localStorage.getItem("portfolio-theme");
} catch (error) {
  // Continue if browser storage is unavailable
}

const initialTheme =
  savedTheme === "light" || savedTheme === "dark"
    ? savedTheme
    : "dark";

applyTheme(initialTheme);

if (themeButton) {
  themeButton.addEventListener("click", () => {
    const currentTheme = root.dataset.theme || "dark";
    const nextTheme = currentTheme === "dark" ? "light" : "dark";

    applyTheme(nextTheme);

    try {
      localStorage.setItem("portfolio-theme", nextTheme);
    } catch (error) {
      // Theme still works for the current page
    }
  });
}

// ================================
// MOBILE NAVIGATION
// ================================
const menuButton = $(".menu");
const mainNav = $(".nav");

if (menuButton && mainNav) {
  menuButton.addEventListener("click", () => {
    const opened = mainNav.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(opened));
  });

  $$(".nav a", mainNav).forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
    });
  });
}

// ================================
// PROJECT DETAILS
// ================================
const projectData = {
  ml: {
    k: "MACHINE LEARNING / PROJECT 01",
    t: "Student Examination Marks Prediction",
    d: "A student project that predicts examination marks using study hours and attendance percentage.",
    items: [
      "Python, Pandas and NumPy for data preparation",
      "Linear regression with batch gradient descent",
      "Training and testing data split",
      "Prediction testing and model evaluation"
    ]
  },

  finance: {
    k: "WEB DEVELOPMENT / PROJECT 02",
    t: "Financial Calculator Website",
    d: "A browser-based financial calculator website with an easy-to-use interface.",
    items: [
      "HTML for page structure",
      "CSS for layout and responsive styling",
      "JavaScript for calculator interactions"
    ]
  },

  cyber: {
    k: "NETWORKING & SECURITY / PROJECT 03",
    t: "Cybersecurity & Networking Labs",
    d: "Educational practicals completed in authorized learning environments.",
    items: [
      "VLANs and inter-VLAN routing",
      "Switch port security and MAC address restrictions",
      "Standard access control lists (ACLs)",
      "Configuration verification and troubleshooting"
    ]
  }
};

const modal = $("#modal");

if (modal) {
  $$(".details").forEach((button) => {
    button.addEventListener("click", () => {
      const project = projectData[button.dataset.project];

      if (!project) return;

      const kicker = $("#modal-kicker", modal);
      const title = $("#modal-title", modal);
      const description = $("#modal-text", modal);
      const list = $("#modal-list", modal);

      if (kicker) kicker.textContent = project.k;
      if (title) title.textContent = project.t;
      if (description) description.textContent = project.d;

      if (list) {
        list.replaceChildren();

        project.items.forEach((item) => {
          const li = document.createElement("li");
          li.textContent = item;
          list.appendChild(li);
        });
      }

      if (typeof modal.showModal === "function") {
        if (!modal.open) modal.showModal();
      } else {
        modal.setAttribute("open", "");
      }
    });
  });

  const closeButton = $(".close", modal);

  if (closeButton) {
    closeButton.addEventListener("click", () => {
      if (typeof modal.close === "function") {
        modal.close();
      } else {
        modal.removeAttribute("open");
      }
    });
  }

  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      if (typeof modal.close === "function") {
        modal.close();
      } else {
        modal.removeAttribute("open");
      }
    }
  });
}

// ================================
// TOAST NOTIFICATIONS
// ================================
const toast = $(".toast");
let toastTimer;

function showToast(message) {
  if (!toast) {
    window.alert(message);
    return;
  }

  toast.textContent = message;
  toast.classList.add("show");

  window.clearTimeout(toastTimer);

  toastTimer = window.setTimeout(() => {
    toast.classList.remove("show");
  }, 3500);
}

// ================================
// CONTACT FORM
// Opens a prefilled Gmail compose draft
// ================================
const contactForm = $("#contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const nameInput = $("#name", contactForm);
    const emailInput = $("#email", contactForm);
    const messageInput = $("#message", contactForm);

    if (!nameInput || !emailInput || !messageInput) {
      showToast("Contact form fields are missing. Check index.html.");
      return;
    }

    if (!contactForm.reportValidity()) return;

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();

    if (!name || !email || !message) {
      showToast("Please complete all fields.");
      return;
    }

    const subject = encodeURIComponent(
      "Portfolio message from " + name
    );

    const body = encodeURIComponent(
      "Name: " + name +
      "\nEmail: " + email +
      "\n\nMessage:\n" + message
    );

    const url =
      "https://mail.google.com/mail/?view=cm&fs=1" +
      "&to=" + encodeURIComponent("sanskardongare7@gmail.com") +
      "&su=" + subject +
      "&body=" + body;

    const newTab = window.open(url, "_blank");

    if (newTab) {
      showToast("Gmail draft opened. Review and send your message.");
    } else {
      showToast("Opening Gmail in this tab...");
      window.location.href = url;
    }
  });
}

// ================================
// SCROLL REVEAL ANIMATIONS
// CSS should support .reveal and .visible
// ================================
const revealSelectors = [
  ".section-title",
  ".project",
  ".skill-card",
  ".experience-card",
  ".education",
  ".about-copy",
  ".info-card",
  ".profile-card",
  ".contact-card",
  ".certifications-panel"
].join(", ");

const revealElements = $$(revealSelectors);

if (
  "IntersectionObserver" in window &&
  !prefersReducedMotion
) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealElements.forEach((element) => {
    element.classList.add("reveal");
    revealObserver.observe(element);
  });
} else {
  revealElements.forEach((element) => {
    element.classList.add("visible");
  });
}

// ================================
// ACTIVE DOCK NAVIGATION
// ================================
const sections = $$(".section-anchor");
const dockLinks = $$(".dock a");

if ("IntersectionObserver" in window && sections.length) {
  const activeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        dockLinks.forEach((link) => {
          const isActive =
            link.getAttribute("href") === "#" + entry.target.id;

          link.classList.toggle("active", isActive);
        });
      });
    },
    { rootMargin: "-35% 0px -50% 0px" }
  );

  sections.forEach((section) => {
    activeObserver.observe(section);
  });
}

// ================================
// CUSTOM DESKTOP CURSOR
// Disabled on touch devices and reduced-motion settings
// ================================
const dot = $(".cursor-dot");
const ring = $(".cursor-ring");

if (
  dot &&
  ring &&
  window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
  !prefersReducedMotion
) {
  let x = window.innerWidth / 2;
  let y = window.innerHeight / 2;
  let ringX = x;
  let ringY = y;

  window.addEventListener("mousemove", (event) => {
    x = event.clientX;
    y = event.clientY;

    dot.style.left = x + "px";
    dot.style.top = y + "px";
  });

  function animateCursor() {
    ringX += (x - ringX) * 0.17;
    ringY += (y - ringY) * 0.17;

    ring.style.left = ringX + "px";
    ring.style.top = ringY + "px";

    window.requestAnimationFrame(animateCursor);
  }

  animateCursor();

  $$("a, button, input, textarea, .tilt").forEach((element) => {
    element.addEventListener("mouseenter", () => {
      ring.classList.add("hover");
    });

    element.addEventListener("mouseleave", () => {
      ring.classList.remove("hover");
    });
  });

  // Subtle 3D project card movement
  $$(".tilt").forEach((card) => {
    card.addEventListener("mousemove", (event) => {
      const rect = card.getBoundingClientRect();

      if (!rect.width || !rect.height) return;

      const px = (event.clientX - rect.left) / rect.width - 0.5;
      const py = (event.clientY - rect.top) / rect.height - 0.5;

      card.style.transform =
        `perspective(900px) ` +
        `rotateX(${-py * 3}deg) ` +
        `rotateY(${px * 3}deg) ` +
        "translateY(-2px)";
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });
}

// Allow other scripts to display a toast if needed
window.showPortfolioToast = showToast;
