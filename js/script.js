
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
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add('show');

  clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}

// CONTACT FORM - FIXED
const contactForm = $('#contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();

    const nameInput = $('#contact-name');
    const emailInput = $('#contact-email');
    const messageInput = $('#contact-message');

    // Check that the HTML IDs match
    if (!nameInput || !emailInput || !messageInput) {
      showToast('Contact form fields could not be found. Please check index.html.');
      console.error('Expected IDs: contact-name, contact-email, contact-message');
      return;
    }

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();

    if (!name || !email || !message) {
      showToast('Please fill in all fields.');
      contactForm.reportValidity();
      return;
    }

    if (!emailInput.checkValidity()) {
      showToast('Please enter a valid email address.');
      emailInput.reportValidity();
      return;
    }

    const subject = encodeURIComponent(
      `Portfolio message from ${name}`
    );

    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    );

    const mailtoURL =
      `mailto:sanskardongare7@gmail.com?subject=${subject}&body=${body}`;

    showToast('Opening your email app...');

    // Open a draft in the visitor's email application
    window.location.href = mailtoURL;
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
}
