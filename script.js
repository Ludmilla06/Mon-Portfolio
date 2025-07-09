// Affiche le menu déroulant
function hamburg() {
  const navbar = document.querySelector(".dropdown");
  navbar.style.transform = "translateY(0px)";
}

// Cache le menu déroulant
function cancel() {
  const navbar = document.querySelector(".dropdown");
  navbar.style.transform = "translateY(-500px)";
}

// Effet machine à écrire
const texts = [
  "Web Developer",
  "Software Engineer",
  "Freelancer"
];

let speed = 100;
let textIndex = 0;
let characterIndex = 0;

window.onload = function () {
  const textElement = document.querySelector(".typewriter-text");
  if (!textElement) return;

  function typeWriter() {
    if (characterIndex < texts[textIndex].length) {
      textElement.textContent += texts[textIndex].charAt(characterIndex);
      characterIndex++;
      setTimeout(typeWriter, speed);
    } else {
      setTimeout(eraseText, 1000);
    }
  }

  function eraseText() {
    if (textElement.textContent.length > 0) {
      textElement.textContent = textElement.textContent.slice(0, -1);
      setTimeout(eraseText, 50);
    } else {
      textIndex = (textIndex + 1) % texts.length;
      characterIndex = 0;
      setTimeout(typeWriter, 500);
    }
  }

  typeWriter();

  // Ferme le menu déroulant si un lien est cliqué
  const dropdownLinks = document.querySelectorAll(".dropdown .links a");
  dropdownLinks.forEach(link => {
    link.addEventListener("click", cancel);
  });
};

// Validation du formulaire de contact
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");

  form.addEventListener("submit", function (e) {
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
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const skillsContainer = document.querySelector(".skills-container");

  function checkSkillsVisibility() {
    const rect = skillsContainer.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom >= 0) {
      skillsContainer.classList.add("animate");
      window.removeEventListener("scroll", checkSkillsVisibility);
    }
  }

  window.addEventListener("scroll", checkSkillsVisibility);
  checkSkillsVisibility();
});
// Fonction pour afficher le message de succès  