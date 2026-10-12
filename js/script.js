const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

// Footer year
const year = $('#year');
if (year) year.textContent = new Date().getFullYear();

// Mobile navigation
const menuButton = $('.menu');
const mainNav = $('.nav');
if (menuButton && mainNav) {
  menuButton.addEventListener('click', () => {
    const opened = mainNav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(opened));
  });
  $$('.nav a').forEach(link => link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  }));
}

// Project detail dialogs
const projectData = {
  ml: { k:'MACHINE LEARNING / PROJECT 01', t:'Student Examination Marks Prediction', d:'A student project that predicts examination marks using study hours and attendance percentage.', items:['Python, Pandas and NumPy for data preparation','Linear regression with batch gradient descent','Training and testing data split','Prediction testing'] },
  finance: { k:'WEB DEVELOPMENT / PROJECT 02', t:'Financial Calculator Website', d:'A browser-based financial calculator website with an easy-to-use interface.', items:['HTML for page structure','CSS for layout and responsive styling','JavaScript for calculator interactions'] },
  cyber: { k:'NETWORKING & SECURITY / PROJECT 03', t:'Cybersecurity & Networking Labs', d:'Educational practicals completed in authorized learning environments.', items:['VLANs and inter-VLAN routing','Switch port security and MAC address restrictions','Standard access control lists (ACLs)','Configuration verification and troubleshooting'] }
};
const modal = $('#modal');
if (modal) {
  $$('.details').forEach(btn => btn.addEventListener('click', () => {
    const p = projectData[btn.dataset.project];
    if (!p) return;
    $('#modal-kicker').textContent = p.k;
    $('#modal-title').textContent = p.t;
    $('#modal-text').textContent = p.d;
    $('#modal-list').replaceChildren(...p.items.map(item => {
      const li = document.createElement('li'); li.textContent = item; return li;
    }));
    modal.showModal();
  }));
  const close = $('.close');
  if (close) close.addEventListener('click', () => modal.close());
  modal.addEventListener('click', e => { if (e.target === modal) modal.close(); });
}

// Toast notifications
const toast = $('.toast');
let toastTimer;
function showToast(message) {
  if (!toast) { alert(message); return; }
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 4000);
}

// Contact form: opens a prefilled Gmail compose window
const contactForm = $('#contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', event => {
    event.preventDefault();
    const name = $('#name');
    const email = $('#email');
    const message = $('#message');
    if (!name || !email || !message) {
      showToast('Contact form fields are missing. Check index.html.'); return;
    }
    if (!contactForm.reportValidity()) return;
    const n = name.value.trim(), em = email.value.trim(), msg = message.value.trim();
    if (!n || !em || !msg) { showToast('Please complete all fields.'); return; }
    const subject = encodeURIComponent('Portfolio message from ' + n);
    const body = encodeURIComponent('Name: ' + n + '\nEmail: ' + em + '\n\nMessage:\n' + msg);
    const url = 'https://mail.google.com/mail/?view=cm&fs=1&to=' + encodeURIComponent('sanskardongare7@gmail.com') + '&su=' + subject + '&body=' + body;
    const tab = window.open(url, '_blank');
    if (tab) showToast('Gmail Compose opened. Review and send your message.');
    else { showToast('Opening Gmail in this tab...'); window.location.href = url; }
  });
}

// Reveal elements only when supported
if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const reveal = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('visible'); reveal.unobserve(entry.target); }
  }), { threshold: 0.12 });
  $$('.section-title, .project, .skill-card, .experience-card, .education, .about-copy, .info-card, .profile-card, .contact-card, .certifications-panel').forEach(el => {
    el.classList.add('reveal'); reveal.observe(el);
  });
}

// Highlight current dock navigation section
const sections = $$('.section-anchor');
const dockLinks = $$('.dock a');
if ('IntersectionObserver' in window) {
  const activeObserver = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) dockLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id));
  }), { rootMargin: '-35% 0px -50% 0px' });
  sections.forEach(section => activeObserver.observe(section));
}

// Custom cursor: null checks prevent errors if an element is absent
const dot = $('.cursor-dot');
const ring = $('.cursor-ring');
if (dot && ring && matchMedia('(hover:hover) and (pointer:fine)').matches && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  let x = innerWidth / 2, y = innerHeight / 2, rx = x, ry = y;
  window.addEventListener('mousemove', event => {
    x = event.clientX; y = event.clientY;
    dot.style.left = x + 'px'; dot.style.top = y + 'px';
  });
  function animateCursor() {
    rx += (x - rx) * 0.17; ry += (y - ry) * 0.17;
    ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
    requestAnimationFrame(animateCursor);
  }
  animateCursor();
  $$('a, button, input, textarea, .tilt').forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('hover'));
    el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
  });
  $$('.tilt').forEach(card => {
    card.addEventListener('mousemove', event => {
      const rect = card.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width - 0.5;
      const py = (event.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(900px) rotateX(${-py * 3}deg) rotateY(${px * 3}deg) translateY(-2px)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });
}
