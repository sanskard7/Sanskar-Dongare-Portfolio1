
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

// Footer year
const year = $('#year');
if (year) {
  year.textContent = new Date().getFullYear();
}

// Project details
const projectData = {
  ml: {
    k: 'MACHINE LEARNING / PROJECT 01',
    t: 'Student Examination Marks Prediction',
    d: 'A student project that predicts examination marks using study hours and attendance percentage.',
    items: [
      'Python, Pandas and NumPy for data preparation',
      'Linear regression with batch gradient descent',
      'Training and testing data split',
      'Prediction testing'
    ]
  },
  finance: {
    k: 'WEB DEVELOPMENT / PROJECT 02',
    t: 'Financial Calculator Website',
    d: 'A browser-based financial calculator website with an easy-to-use interface.',
    items: [
      'HTML for page structure',
      'CSS for layout and responsive styling',
      'JavaScript for calculator interactions'
    ]
  },
  cyber: {
    k: 'NETWORKING & SECURITY / PROJECT 03',
    t: 'Cybersecurity & Networking Labs',
    d: 'Educational practicals completed in authorized learning environments.',
    items: [
      'VLANs and inter-VLAN routing',
      'Switch port security and MAC address restrictions',
      'Standard access control lists (ACLs)',
      'Configuration verification and troubleshooting'
    ]
  }
};

// Project modal
const modal = $('#modal');

if (modal) {
  $$('.details').forEach(btn => {
    btn.addEventListener('click', () => {
      const p = projectData[btn.dataset.project];
      if (!p) return;

      $('#modal-kicker').textContent = p.k;
      $('#modal-title').textContent = p.t;
      $('#modal-text').textContent = p.d;

      $('#modal-list').replaceChildren(
        ...p.items.map(item => {
          const li = document.createElement('li');
          li.textContent = item;
          return li;
        })
      );

      modal.showModal();
    });
  });

  const closeButton = $('.close');

  if (closeButton) {
    closeButton.addEventListener('click', () => modal.close());
  }

  modal.addEventListener('click', e => {
    if (e.target === modal) modal.close();
  });
}

// Toast notification
const toast = $('.toast');
let toastTimer;

function showToast(message) {
  if (!toast) {
    alert(message);
    return;
  }

  toast.textContent = message;
  toast.classList.add('show');

  clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}

// CONTACT FORM - GMAIL COMPOSE FIX
const contactForm = $('#contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();

    // Match the field IDs in your HTML
    const nameInput =
      $('#contact-name') || $('#name');

    const emailInput =
      $('#contact-email') || $('#email');

    const messageInput =
      $('#contact-message') || $('#message');

    if (!nameInput || !emailInput || !messageInput) {
      showToast('Contact fields not found. Please check index.html.');
      console.error('Check your contact form field IDs.');
      return;
    }

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();

    if (!name || !email || !message) {
      showToast('Please fill in all three fields.');
      return;
    }

    if (!emailInput.checkValidity()) {
      showToast('Please enter a valid email address.');
      emailInput.focus();
      return;
    }

    const recipient = 'sanskardongare7@gmail.com';

    const subject = encodeURIComponent(
      'Portfolio message from ' + name
    );

    const body = encodeURIComponent(
      'Name: ' + name + '\n' +
      'Email: ' + email + '\n\n' +
      'Message:\n' + message
    );

    const gmailURL =
      'https://mail.google.com/mail/?view=cm&fs=1' +
      '&to=' + encodeURIComponent(recipient) +
      '&su=' + subject +
      '&body=' + body;

    // Open Gmail Compose in a new tab
    const gmailTab = window.open(gmailURL, '_blank');

    if (gmailTab) {
      showToast('Gmail Compose opened. Review and send your message.');
    } else {
      // Fallback if Chrome blocks the new tab
      showToast('Opening Gmail in this tab...');

      window.location.href = gmailURL;
    }
  });
}

// Reveal animations
if (
  'IntersectionObserver' in window &&
  !matchMedia('(prefers-reduced-motion: reduce)').matches
) {
  const reveal = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        reveal.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  $$(
    '.section-title, .project, .skill-card, .experience-card, ' +
    '.education, .about-copy, .info-card, .profile-card, .contact-card'
  ).forEach(el => {
    el.classList.add('reveal');
    reveal.observe(el);
  });
}

// Active navigation link
const sections = $$('.section-anchor');
const dockLinks = $$('.dock a');
if ('IntersectionObserver' in window) {
  const active = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        dockLinks.forEach(link => {
          link.classList.toggle(
            'active',
            link.getAttribute('href') === `#${entry.target.id}`
          );
        });
      }
    });
  }, { rootMargin: '-35% 0px -50% 0px' });

  sections.forEach(section => active.observe(section));
}

// Custom cursor and card tilt
const dot = $('.cursor-dot');
const ring = $('.cursor-ring');

if (
  dot &&
  ring &&
  matchMedia('(hover:hover) and (pointer:fine)').matches &&
  !matchMedia('(prefers-reduced-motion: reduce)').matches
) {
  let x = innerWidth / 2;
  let y = innerHeight / 2;
  let rx = x;
  let ry = y;

  window.addEventListener('mousemove', e => {
    x = e.clientX;
    y = e.clientY;

    dot.style.left = x + 'px';
    dot.style.top = y + 'px';
  });

  function animate() {
    rx += (x - rx) * 0.17;
    ry += (y - ry) * 0.17;

    ring.style.left = rx + 'px';
    ring.style.top = ry + 'px';

    requestAnimationFrame(animate);
  }

  animate();

  $$('a, button, input, textarea, .tilt').forEach(el => {
    el.addEventListener('mouseenter', () => {
      ring.classList.add('hover');
    });

    el.addEventListener('mouseleave', () => {
      ring.classList.remove('hover');
    });
  });

  $$('.tilt').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;

      card.style.transform =
        `perspective(900px) rotateX(${-py * 3}deg) ` +
        `rotateY(${px * 3}deg) translateY(-2px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
  
/* Certifications & Awards */
.learning-check {
  color: #06d6c7;
  font-size: 14px;
  font-weight: 700;
}

.certifications-panel {
  position: relative;
  max-width: 950px;
  margin: 28px auto 0;
  padding: 28px;
  overflow: hidden;
  background:
    radial-gradient(ellipse at top left,
      rgba(142, 68, 255, 0.09), transparent 55%),
    rgba(15, 14, 26, 0.92);
  border: 1px solid rgba(168, 85, 247, 0.28);
  border-radius: 22px;
  box-shadow: 0 15px 50px rgba(0, 0, 0, 0.16);
}

.certifications-panel-heading {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 26px;
}

.certificate-symbol {
  display: grid;
  place-items: center;
  width: 48px;
  height: 48px;
  flex-shrink: 0;
  color: #e879f9;
  font-size: 25px;
  border: 1px solid rgba(232, 121, 249, 0.35);
  background: rgba(232, 121, 249, 0.08);
  border-radius: 13px;
}

.certifications-panel-heading .eyebrow {
  margin-bottom: 7px;
}

.certifications-panel-heading h3 {
  margin: 0 0 7px;
  color: #f3f0ff;
  font-size: 20px;
}

.cert-provider {
  margin: 0;
  color: #b58aff;
  font-size: 13px;
}

.certificate-list {
  display: grid;
  gap: 8px;
}

.certificate-row {
  display: flex;
  align-items: center;
  gap: 13px;
  padding: 13px 14px;
  color: inherit;
  text-decoration: none;
  border: 1px solid transparent;
  border-radius: 12px;
  transition: background 0.25s ease,
              border-color 0.25s ease,
              transform 0.25s ease;
}

.certificate-row:hover {
  transform: translateX(4px);
  background: rgba(168, 85, 247, 0.07);
  border-color: rgba(168, 85, 247, 0.25);
}

.certificate-icon {
  display: grid;
  place-items: center;
  width: 34px;
  height: 34px;
  flex-shrink: 0;
  color: #a78bfa;
  font-size: 20px;
  border-radius: 10px;
  background: rgba(139, 92, 246, 0.10);
}

.certificate-info {
  display: grid;
  flex: 1;
  gap: 5px;
}

.certificate-info strong {
  color: #e9e6f5;
  font-size: 14px;
  line-height: 1.5;
}

.certificate-info small {
  color: #9692aa;
  font-size: 12px;
}

.certificate-arrow {
  color: #a78bfa;
  font-size: 18px;
  opacity: 0.7;
  transition: opacity 0.2s ease;
}

.certificate-row:hover .certificate-arrow {
  opacity: 1;
}

.certificate-note {
  margin: 22px 0 0;
  padding-top: 17px;
  color: #8f8ba4;
  font-size: 12px;
  border-top: 1px solid rgba(255, 255, 255, 0.07);
}

@media (max-width: 600px) {
  .certifications-panel {
    padding: 17px;
    border-radius: 17px;
  }

  .certifications-panel-heading {
    align-items: flex-start;
    gap: 12px;
  }

  .certifications-panel-heading h3 {
    font-size: 17px;
  }

  .certificate-row {
    gap: 10px;
    padding: 12px 7px;
  }

  .certificate-info strong {
    font-size: 12px;
  }

  .certificate-info small {
    font-size: 11px;
  }
}

}
