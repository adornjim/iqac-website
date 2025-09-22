document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("feedbackForm");
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const message = document.getElementById("message").value;

      // Later this will POST to backend
      console.log({ name, email, message });

      document.getElementById("responseMsg").innerText =
        "Feedback submitted successfully (demo mode).";
      
      form.reset();
    });
  }
  // About Modal
const aboutBtn = document.getElementById("aboutBtn");
const aboutModal = document.getElementById("aboutModal");
const closeBtn = document.querySelector(".modal .close");

aboutBtn.addEventListener("click", () => {
  aboutModal.style.display = "block";
});

closeBtn.addEventListener("click", () => {
  aboutModal.style.display = "none";
});

// Close modal if clicked outside content
window.addEventListener("click", (e) => {
  if (e.target === aboutModal) {
    aboutModal.style.display = "none";
  }
});

// Reusable modal system
const modalButtons = document.querySelectorAll(".modalBtn");

modalButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const modalId = btn.getAttribute("data-target");
    const modal = document.getElementById(modalId);
    modal.style.display = "block";
  });
});

// Close modal when clicking X
const closeButtons = document.querySelectorAll(".modal .close");
closeButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    btn.closest(".modal").style.display = "none";
  });
});

// Close modal when clicking outside content
window.addEventListener("click", (e) => {
  if (e.target.classList.contains("modal")) {
    e.target.style.display = "none";
  }
});
// Change header background on scroll
window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

  // Smooth scroll for nav links + active highlight
  const navLinks = document.querySelectorAll('header nav a[href^="#"]');
  const sections = Array.from(document.querySelectorAll('main section[id]'));

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  function setActiveLinkOnScroll() {
    const fromTop = window.scrollY + 90; // account for fixed header
    let currentId = null;
    for (const section of sections) {
      const rect = section.getBoundingClientRect();
      const top = window.scrollY + rect.top;
      if (top <= fromTop) currentId = section.id;
    }
    navLinks.forEach(a => {
      const href = a.getAttribute('href') || '';
      if (href === `#${currentId}`) a.classList.add('active');
      else a.classList.remove('active');
    });
  }

  window.addEventListener('scroll', setActiveLinkOnScroll);
  window.addEventListener('load', setActiveLinkOnScroll);

  // Mobile menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.getElementById('primary-nav');
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    // Close menu on link click (mobile)
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        if (navLinks.classList.contains('open')) {
          navLinks.classList.remove('open');
          menuToggle.setAttribute('aria-expanded', 'false');
        }
      });
    });
    // Close on resize to desktop
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768 && navLinks.classList.contains('open')) {
        navLinks.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }
// About modal tables
const objBtn = document.getElementById("objBtn");
const funcBtn = document.getElementById("funcBtn");
const objectivesTable = document.getElementById("objectivesTable");
const functionsTable = document.getElementById("functionsTable");

// Show Objectives
objBtn.addEventListener("click", () => {
  objectivesTable.style.display = "block";
  functionsTable.style.display = "none"; // hide functions
});

// Show Functions
funcBtn.addEventListener("click", () => {
  functionsTable.style.display = "block";
  objectivesTable.style.display = "none"; // hide objectives
});
// Animate committee cards on scroll
const committeeCards = document.querySelectorAll(".committee-card");

function showCommitteesOnScroll() {
  const triggerBottom = window.innerHeight * 0.85;

  committeeCards.forEach(card => {
    const cardTop = card.getBoundingClientRect().top;

    if(cardTop < triggerBottom) {
      card.classList.add("visible");
    }
  });
}

window.addEventListener("scroll", showCommitteesOnScroll);
window.addEventListener("load", showCommitteesOnScroll);
const documentsBtn = document.getElementById("documentsBtn");
const documentsSection = document.getElementById("documents");

documentsBtn.addEventListener("click", (e) => {
  e.preventDefault(); // prevent default link behavior
  documentsSection.scrollIntoView({ behavior: "smooth" });
});

});
