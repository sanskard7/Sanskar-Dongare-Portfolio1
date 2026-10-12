/* Personal portfolio settings: edit this object to update your public details. */
const portfolioConfig = {
  email: "sanskardongare7@gmail.com",
  github: "",       // Example: https://github.com/your-username
  linkedin: "",     // Example: https://www.linkedin.com/in/your-profile/
  resumePath: "", // Set to "assets/resume.pdf" after adding your genuine PDF
  education: {
    institution: "", // Add your college/university when you want it displayed
    graduationYear: "" // Example: "2028"
  },
  credentials: [
    // Add genuine credentials only, e.g. { title: "Course name", issuer: "Provider", year: "2026", url: "" }
  ],
  projects: {
    marks: {
      status: "In Progress", // Change to Completed only after you have finished and checked it
      repository: "",
      demo: ""
    },
    finance: {
      status: "In Progress",
      repository: "",
      demo: ""
    },
    labs: {
      status: "Educational lab collection",
      repository: "",
      demo: ""
    }
  }
};

const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

function isValidHttpUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

function setExternalLink(element, url, fallbackText) {
  if (!element) return;
  if (isValidHttpUrl(url)) {
    element.href = url;
    element.target = "_blank";
    element.rel = "noopener noreferrer";
    element.removeAttribute("aria-disabled");
    element.classList.remove("is-unconfigured");
  } else {
    element.href = "#";
    element.removeAttribute("target");
    element.removeAttribute("rel");
    element.setAttribute("aria-disabled", "true");
    element.classList.add("is-unconfigured");
    if (fallbackText && element.querySelector("strong")) {
      element.querySelector("strong").textContent = fallbackText;
    }
  }
}

function setupProfileLinks() {
  $$('[data-profile="github"]').forEach(link => setExternalLink(link, portfolioConfig.github, "Add your GitHub profile"));
  $$('[data-profile="linkedin"]').forEach(link => setExternalLink(link, portfolioConfig.linkedin, "Add your LinkedIn profile"));
  $$('[data-profile][aria-disabled="true"]').forEach(link => {
    link.title = "Add your profile URL in js/script.js before using this link.";
    link.addEventListener("click", event => event.preventDefault());
  });
  $$('[data-project="marks-repo"]').forEach(link => setExternalLink(link, portfolioConfig.projects.marks.repository));
  $$('[data-project="finance-repo"]').forEach(link => setExternalLink(link, portfolioConfig.projects.finance.repository));
  $$('[data-project="finance-demo"]').forEach(link => setExternalLink(link, portfolioConfig.projects.finance.demo));
  $$('[data-project="labs-repo"]').forEach(link => setExternalLink(link, portfolioConfig.projects.labs.repository));
  $$('[data-project][aria-disabled="true"]').forEach(link => {
    link.title = "Add and verify this URL in js/script.js before using this link.";
    link.addEventListener("click", event => event.preventDefault());
  });
  const resume = $('[data-resume-link]');
  const resumeNote = $("#resume-note");
  if (resume) {
    if (portfolioConfig.resumePath && !portfolioConfig.resumePath.includes("PLACEHOLDER")) {
      resume.href = portfolioConfig.resumePath;
      resumeNote.textContent = "Resume PDF configured. Make sure the file exists at the path above.";
    } else {
      // Hide the unavailable action until a genuine resume PDF is added.
      resume.hidden = true;
      resumeNote.textContent = "Resume download will appear after you add your genuine PDF and set resumePath in js/script.js.";
    }
  }
}

function setupProjectStatuses() {
  const statusMap = {
    marks: portfolioConfig.projects.marks.status,
    finance: portfolioConfig.projects.finance.status,
    labs: portfolioConfig.projects.labs.status
  };
  Object.entries(statusMap).forEach(([key, status]) => {
    const node = $(`[data-status="${key}"]`);
    if (node && status) node.textContent = status;
  });
}

function setupEducationAndCredentials() {
  const institution = portfolioConfig.education.institution.trim();
  const year = portfolioConfig.education.graduationYear.trim();
  if (institution) $("#education-institution").textContent = institution;
  if (year) $("#graduation-year").textContent = `Expected graduation: ${year}`;

  const credentials = portfolioConfig.credentials.filter(item => item && item.title && item.issuer);
  if (credentials.length) {
    const panel = $("#credentials-panel");
    const list = $("#credentials-list");
    panel.hidden = false;
    credentials.forEach(item => {
      const article = document.createElement("article");
      const title = document.createElement("h4");
      title.textContent = item.title;
      const detail = document.createElement("p");
      detail.textContent = [item.issuer, item.year].filter(Boolean).join(" · ");
      article.append(title, detail);
      if (isValidHttpUrl(item.url || "")) {
        const link = document.createElement("a");
        link.href = item.url;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.textContent = "View credential ↗";
        article.append(link);
      }
      list.append(article);
    });
  }
}

function setupMobileMenu() {
  const toggle = $(".menu-toggle");
  const nav = $("#nav-links");
  if (!toggle || !nav) return;
  const closeMenu = () => {
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open navigation menu");
  };
  toggle.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") !== "true";
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close navigation menu" : "Open navigation menu");
    nav.classList.toggle("open", open);
  });
  $$("a", nav).forEach(link => link.addEventListener("click", closeMenu));
  document.addEventListener("keydown", event => {
    if (event.key === "Escape") closeMenu();
  });
  document.addEventListener("click", event => {
    if (!nav.contains(event.target) && !toggle.contains(event.target)) closeMenu();
  });
}

function setupThemeToggle() {
  const button = $(".theme-toggle");
  if (!button) return;
  const stored = (() => {
    try { return localStorage.getItem("portfolio-theme"); } catch { return null; }
  })();
  const preferred = window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
  const setTheme = theme => {
    document.documentElement.dataset.theme = theme;
    button.setAttribute("aria-label", theme === "dark" ? "Switch to light theme" : "Switch to dark theme");
    button.title = button.getAttribute("aria-label");
    $(".theme-icon", button).textContent = theme === "dark" ? "☼" : "☾";
  };
  setTheme(stored || preferred);
  button.addEventListener("click", () => {
    const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    setTheme(next);
    try { localStorage.setItem("portfolio-theme", next); } catch { /* Theme still works without storage. */ }
  });
}

function setupRevealAnimations() {
  const items = $$(".reveal");
  if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    items.forEach(item => item.classList.add("is-visible"));
    return;
  }
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -35px 0px" });
  items.forEach(item => observer.observe(item));
}

function setupActiveNavigation() {
  const sections = $$("main section[id]");
  const links = $$(".nav-links a[href^='#']");
  if (!("IntersectionObserver" in window)) return;
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      links.forEach(link => {
        const active = link.getAttribute("href") === `#${entry.target.id}`;
        if (active) link.classList.add("active");
        else link.classList.remove("active");
      });
    });
  }, { rootMargin: "-35% 0px -55% 0px" });
  sections.forEach(section => observer.observe(section));
}

function setupRotatingHeadline() {
  const target = $("#rotating-role");
  if (!target || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const phrases = ["Software Developer", "IT Student", "Tech Enthusiast", "Problem Solver"];
  let phraseIndex = 0;
  let charIndex = phrases[0].length;
  let deleting = true;
  let timeoutId;
  const tick = () => {
    const phrase = phrases[phraseIndex];
    if (deleting) {
      charIndex--;
      target.textContent = phrase.slice(0, Math.max(0, charIndex));
      if (charIndex <= 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        timeoutId = window.setTimeout(tick, 350);
        return;
      }
      timeoutId = window.setTimeout(tick, 45);
    } else {
      const next = phrases[phraseIndex];
      charIndex++;
      target.textContent = next.slice(0, charIndex);
      if (charIndex >= next.length) {
        deleting = true;
        timeoutId = window.setTimeout(tick, 1500);
        return;
      }
      timeoutId = window.setTimeout(tick, 75);
    }
  };
  timeoutId = window.setTimeout(tick, 1800);
  window.addEventListener("pagehide", () => window.clearTimeout(timeoutId), { once: true });
}

const projectDetails = {
  marks: {
    title: "Student Examination Marks Prediction",
    intro: "A learning project focused on predicting examination marks from study hours and attendance percentage.",
    sections: [
      ["Implementation checklist", ["Create or load a dataset with at least 20 records.", "Split records into training and testing sets.", "Standardize input features using training-set statistics.", "Implement prediction and batch gradient descent.", "Evaluate using metrics such as MAE, MSE, and R²."]],
      ["Keep the write-up accurate", ["Mark each item complete only after testing it.", "Record the actual evaluation results; do not invent model accuracy.", "Explain the model and its limitations in your own words."]]
    ]
  },
  labs: {
    title: "Cybersecurity & Networking Lab Collection",
    intro: "Educational exercises performed only in authorized, controlled lab environments.",
    sections: [
      ["Possible lab topics", ["VLAN segmentation and inter-VLAN routing.", "Switch port security and MAC address restrictions.", "Standard access control lists and traffic filtering.", "MAC spoofing detection and defensive analysis.", "ARP spoofing concepts and mitigations."]],
      ["Documentation to add", ["Lab objective and topology diagram.", "Device configuration and commands used.", "Expected versus observed results.", "Troubleshooting notes and defensive takeaways."]]
    ]
  }
};

function setupProjectDialogs() {
  const dialog = $("#project-dialog");
  const title = $("#dialog-title");
  const content = $("#dialog-content");
  const close = $(".dialog-close");
  if (!dialog || !title || !content || !close) return;
  $$("[data-details]").forEach(button => button.addEventListener("click", () => {
    const details = projectDetails[button.dataset.details];
    if (!details) return;
    title.textContent = details.title;
    content.replaceChildren();
    const intro = document.createElement("p");
    intro.textContent = details.intro;
    content.append(intro);
    details.sections.forEach(([heading, items]) => {
      const h3 = document.createElement("h3");
      h3.textContent = heading;
      const ul = document.createElement("ul");
      items.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;
        ul.append(li);
      });
      content.append(h3, ul);
    });
    if (typeof dialog.showModal === "function") dialog.showModal();
    else dialog.setAttribute("open", "");
  }));
  close.addEventListener("click", () => dialog.close ? dialog.close() : dialog.removeAttribute("open"));
  dialog.addEventListener("click", event => {
    if (event.target === dialog) dialog.close ? dialog.close() : dialog.removeAttribute("open");
  });
  dialog.addEventListener("close", () => {
    const last = document.activeElement;
    if (last && typeof last.focus === "function") last.focus();
  });
}

function setupContactForm() {
  const form = $("#contact-form");
  if (!form) return;
  const fields = ["name", "email", "subject", "message"];
  const errorMessages = {
    name: "Please enter your name (at least 2 characters).",
    email: "Please enter a valid email address.",
    subject: "Please enter a subject (at least 3 characters).",
    message: "Please enter a message (at least 10 characters)."
  };
  const validate = field => {
    const input = $(`#${field}`);
    const error = $(`#${field}-error`);
    let valid = input.value.trim().length >= (field === "name" ? 2 : field === "subject" ? 3 : field === "message" ? 10 : 1);
    if (field === "email") valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim());
    input.setAttribute("aria-invalid", String(!valid));
    error.textContent = valid ? "" : errorMessages[field];
    return valid;
  };
  fields.forEach(field => {
    const input = $(`#${field}`);
    input.addEventListener("blur", () => validate(field));
    input.addEventListener("input", () => {
      if (input.getAttribute("aria-invalid") === "true") validate(field);
    });
  });
  form.addEventListener("submit", event => {
    event.preventDefault();
    const valid = fields.map(validate).every(Boolean);
    const feedback = $("#form-feedback");
    if (!valid) {
      feedback.textContent = "Please fix the highlighted fields before continuing.";
      const firstInvalid = fields.map(field => $(`#${field}`)).find(input => input.getAttribute("aria-invalid") === "true");
      if (firstInvalid) firstInvalid.focus();
      return;
    }
    const name = $("#name").value.trim();
    const email = $("#email").value.trim();
    const subject = $("#subject").value.trim();
    const message = $("#message").value.trim();
    const body = `Hi Sanskar,%0D%0A%0D%0A${encodeURIComponent(message)}%0D%0A%0D%0ARegards,%0D%0A${encodeURIComponent(name)}%0D%0AReply to: ${encodeURIComponent(email)}`;
    const mailto = `mailto:${encodeURIComponent(portfolioConfig.email)}?subject=${encodeURIComponent(subject)}&body=${body}`;
    feedback.textContent = "Your email app should open with the message prefilled. Review it and press Send there.";
    window.location.href = mailto;
  });
}

function setupFooterYear() {
  const year = $("#current-year");
  if (year) year.textContent = new Date().getFullYear();
}

document.addEventListener("DOMContentLoaded", () => {
  setupProfileLinks();
  setupProjectStatuses();
  setupEducationAndCredentials();
  setupMobileMenu();
  setupThemeToggle();
  setupRevealAnimations();
  setupActiveNavigation();
  setupRotatingHeadline();
  setupProjectDialogs();
  setupContactForm();
  setupFooterYear();
});

