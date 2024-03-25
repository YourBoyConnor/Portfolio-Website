const hamburger = document.querySelector(".hamburger");
const nav = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
  nav.classList.toggle("active");
  hamburger.classList.toggle("active");
});

document.querySelectorAll('.nav-link').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('active');
    hamburger.classList.remove('active');
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
});

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));

