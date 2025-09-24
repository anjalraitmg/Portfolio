document.addEventListener("DOMContentLoaded", () => {
  AOS.init({
    duration: 800,
    once: true,
    offset: 50,
    easing: "ease-out-cubic",
  });

  initThemeToggle();
  initMobileMenu();
  initTyped();
  initScrollToTop();
  initScrollSpy();
  initContactForm();

  const yearSpan = document.getElementById("current-year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});

// Handles the typing animation in the hero section
function initTyped() {
  if (document.getElementById("typed-output")) {
    new Typed("#typed-output", {
      strings: [
        "Web Developer",
        "Frontend Specialist",
        "UI/UX Enthusiast",
        "Problem Solver",
      ],
      typeSpeed: 50,
      backSpeed: 30,
      backDelay: 1500,
      loop: true,
      cursorChar: "|",
    });
  }
}

// Handles the light/dark mode theme toggle
function initThemeToggle() {
  const themeToggle = document.getElementById("theme-toggle");
  const themeIcon = document.getElementById("theme-icon");
  if (!themeToggle || !themeIcon) return;

  const applyTheme = (theme) => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      themeIcon.classList.replace("fa-moon", "fa-sun");
    } else {
      document.documentElement.classList.remove("dark");
      themeIcon.classList.replace("fa-sun", "fa-moon");
    }

    const recaptcha = document.querySelector(".g-recaptcha");
    if (recaptcha) {
      recaptcha.setAttribute("data-theme", theme);
    }
  };

  themeToggle.addEventListener("click", () => {
    const isDark = document.documentElement.classList.contains("dark");
    const newTheme = isDark ? "light" : "dark";
    localStorage.setItem("theme", newTheme);
    applyTheme(newTheme);
  });

  const savedTheme =
    localStorage.getItem("theme") ||
    (window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light");
  applyTheme(savedTheme);
}

// Handles the mobile navigation menu toggle
function initMobileMenu() {
  const toggleButton = document.getElementById("mobile-menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  const menuIcon = document.getElementById("menu-icon");
  if (!toggleButton || !mobileMenu || !menuIcon) return;

  toggleButton.addEventListener("click", () => {
    const isHidden =
      mobileMenu.style.display === "none" || mobileMenu.style.display === "";
    if (isHidden) {
      mobileMenu.style.display = "block";
      menuIcon.classList.replace("fa-bars", "fa-times");
    } else {
      mobileMenu.style.display = "none";
      menuIcon.classList.replace("fa-times", "fa-bars");
    }
  });

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      toggleButton.click();
    });
  });
}

// Handles the "scroll to top" button visibility and action
function initScrollToTop() {
  const scrollTopBtn = document.getElementById("scrollTopBtn");
  if (!scrollTopBtn) return;

  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      scrollTopBtn.classList.add("visible");
    } else {
      scrollTopBtn.classList.remove("visible");
    }
  });

  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// Handles active nav link highlighting on scroll
function initScrollSpy() {
  const sections = document.querySelectorAll("section[id], header[id]");
  const navLinks = document.querySelectorAll(".nav-link");
  const navHeight = document.getElementById("navbar").offsetHeight;

  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - navHeight - 50;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href").substring(1) === current) {
        link.classList.add("active");
      }
    });
  });
}

// Handles the contact form submission
function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  async function handleSubmit(event) {
    event.preventDefault();
    const status = document.getElementById("form-status");
    const data = new FormData(event.target);

    fetch(event.target.action, {
      method: form.method,
      body: data,
      headers: { Accept: "application/json" },
    })
      .then((response) => {
        if (response.ok) {
          status.textContent = "Thanks for your submission!";
          status.style.color = "green";
          form.reset();
        } else {
          response.json().then((data) => {
            status.textContent = data.errors
              ? data.errors.map((e) => e.message).join(", ")
              : "Oops! There was a problem.";
            status.style.color = "red";
          });
        }
      })
      .catch((error) => {
        status.textContent = "Oops! There was a problem submitting your form";
        status.style.color = "red";
      });
  }
  form.addEventListener("submit", handleSubmit);
}
