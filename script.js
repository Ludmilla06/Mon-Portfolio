document.addEventListener("DOMContentLoaded", () => {
  // --- Variables communes ---
  const navContainer = document.querySelector(".nav-container");
  const links = document.querySelectorAll(".nav-container .links a");
  const dropdown = document.querySelector(".dropdown");
  const dropdownLinks = document.querySelectorAll(".dropdown .links a");
  const sections = document.querySelectorAll("section");
  const textElement = document.querySelector(".typewriter-text");
  const form = document.querySelector("form");

  // --- Menu déroulant (mobile) ---
  const hamburgBtn = document.querySelector('.hamburg');
  const cancelBtn = document.querySelector('.cancel');

  hamburgBtn?.addEventListener('click', () => dropdown?.classList.toggle('active'));
  cancelBtn?.addEventListener('click', () => dropdown?.classList.remove('active'));

  dropdownLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: "smooth" });
        dropdown.classList.remove('active');
        links.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    });
  });

  // --- Navigation principale ---
  function updateActiveSectionOnScroll() {
    const scrollPos = window.scrollY + (navContainer?.offsetHeight || 0);
    sections.forEach((section, i) => {
      const top = section.offsetTop;
      const bottom = top + section.offsetHeight;
      if (scrollPos >= top && scrollPos < bottom) {
        links.forEach(link => link.classList.remove("active"));
        links[i]?.classList.add("active");
        section.classList.add("active");
      } else {
        section.classList.remove("active");
      }
    });
  }

  window.addEventListener("scroll", updateActiveSectionOnScroll);
  updateActiveSectionOnScroll();

  links.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const targetId = link.getAttribute("href");
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: "smooth" });
        links.forEach(l => l.classList.remove("active"));
        link.classList.add("active");
        sections.forEach(section => section.classList.remove("active"));
        targetSection.classList.add("active");
      }
    });
  });

  // --- Machine à écrire ---
  const texts = [
    "en reconversion professionnelle",
    "futur développeuse web et web mobile",
    "à la recherche d'un contrat en alternance",
    "passionnée par le développement web",
    "curieuse et motivée",
  ];
  let speed = 100, textIndex = 0, charIndex = 0;

  function typeWriter() {
    if (!textElement) return;
    if (charIndex < texts[textIndex].length) {
      textElement.textContent += texts[textIndex].charAt(charIndex);
      charIndex++;
      setTimeout(typeWriter, speed);
    } else {
      setTimeout(eraseText, 1000);
    }
  }
  function eraseText() {
    if (!textElement) return;
    if (textElement.textContent.length > 0) {
      textElement.textContent = textElement.textContent.slice(0, -1);
      setTimeout(eraseText, 50);
    } else {
      textIndex = (textIndex + 1) % texts.length;
      charIndex = 0;
      setTimeout(typeWriter, 500);
    }
  }
  if (textElement) typeWriter();

  // --- Formulaire ---
  form?.addEventListener("submit", e => {
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name || !email || !message) {
      alert("Veuillez remplir tous les champs obligatoires.");
      e.preventDefault();
      return;
    }
    if (!emailPattern.test(email)) {
      alert("Veuillez entrer une adresse email valide.");
      e.preventDefault();
      return;
    }
  });

// --- Slider projets ---
/*const slider = document.getElementById("projectSlider");
const slides = slider ? slider.querySelectorAll(".project-slide") : [];
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");

let currentIndex = 0;

function updateSliderPosition() {
  if (!slider || !slides.length) return;
  const slideWidth = slides[0].offsetWidth;
  slider.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
  updateNavButtons();
}

function updateNavButtons() {
  if (!prevBtn || !nextBtn) return;
  prevBtn.disabled = currentIndex === 0;
  nextBtn.disabled = currentIndex === slides.length - 1;
}

if (slider && prevBtn && nextBtn && slides.length) {
  nextBtn.addEventListener("click", () => {
    if (currentIndex < slides.length - 1) {
      currentIndex++;
      updateSliderPosition();
    }
  });

  prevBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateSliderPosition();
    }
  });

  window.addEventListener("resize", updateSliderPosition);
  updateSliderPosition();
} */

// --- Ajustements de la navigation responsive ---

  // --- Responsive nav adjustments ---
  function adjustNavOnResize() {
    if (!navContainer) return;
    if (window.innerWidth < 768) navContainer.classList.add('mobile');
    else navContainer.classList.remove('mobile');
  }
  window.addEventListener('resize', adjustNavOnResize);
  adjustNavOnResize();

  // --- Intersection Observer animations générales ---
  const generalObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.animate-on-scroll').forEach(el => generalObserver.observe(el));
});
