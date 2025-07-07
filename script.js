// === Éléments sélectionnés ===
const backToTop = document.getElementById("backToTop");
const links = document.querySelectorAll("nav a");
const sections = document.querySelectorAll("main section");

// === Bouton retour en haut ===
window.addEventListener("scroll", () => {
  // Affichage du bouton
  if (window.scrollY > 300) {
    backToTop.classList.add("visible");
  } else {
    backToTop.classList.remove("visible");
  }

  // Animation des sections qui entrent dans la vue
  sections.forEach((section) => {
    const sectionTop = section.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (sectionTop < windowHeight - 100) {
      section.classList.add("visible");
    }
  });
});

// === Clique sur bouton retour en haut ===
backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// === Navigation fluide personnalisée ===
links.forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const targetID = this.getAttribute("href").substring(1);
    const targetSection = document.getElementById(targetID);

    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

