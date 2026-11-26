document.addEventListener("DOMContentLoaded", () => {
  console.log("Script loaded - checking elements...");

  // ===============================
  // TOGGLE MOBILE MENU
  // ===============================
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.querySelector(".navbar nav ul");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("show");
    });
  } else {
    console.warn("Mobile menu elements not found");
  }

  // ===============================
  // ACTIVE LINK HIGHLIGHT ON SCROLL
  // ===============================
  const links = document.querySelectorAll(".navbar a");

  function updateActiveLinkOnScroll() {
    const navbar = document.querySelector('.navbar');
    const navHeight = navbar ? navbar.offsetHeight : 100;
    const fromTop = window.scrollY + navHeight + 20;

    let found = false;
    links.forEach(link => {
      if (!link.hash) {
        link.classList.remove('active');
        return;
      }
      const section = document.querySelector(link.hash);
      if (!section) {
        link.classList.remove('active');
        return;
      }

      const sectionTop = section.offsetTop;
      const sectionBottom = sectionTop + section.offsetHeight;

      if (!found && sectionTop <= fromTop && sectionBottom > fromTop) {
        link.classList.add("active");
        found = true;
      } else {
        link.classList.remove("active");
      }
    });
  }

  window.addEventListener("scroll", updateActiveLinkOnScroll);
  window.addEventListener("load", updateActiveLinkOnScroll);
  window.addEventListener("resize", () => {
    clearTimeout(window.__nav_resize_timer);
    window.__nav_resize_timer = setTimeout(updateActiveLinkOnScroll, 120);
  });
  updateActiveLinkOnScroll();

  // ===============================
  // HEADER-AWARE SMOOTH SCROLLING
  // ===============================
  (function installHeaderAwareSmoothScroll() {
    function headerHeight() {
      const header = document.querySelector('.navbar');
      return header ? header.offsetHeight : 0;
    }

    function smoothScrollToElement(targetEl) {
      if (!targetEl) return;
      const rect = targetEl.getBoundingClientRect();
      const offset = headerHeight() + 8;
      const top = window.scrollY + rect.top - offset;
      window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener("click", function (e) {
        const href = this.getAttribute("href");
        if (!href || href === '#') return;
        const id = href.slice(1);
        const target = document.getElementById(id);
        if (target) {
          e.preventDefault();
          const navList = document.querySelector('.navbar nav ul');
          if (navList && navList.classList.contains('show')) navList.classList.remove('show');
          smoothScrollToElement(target);
          try { history.pushState && history.pushState(null, '', `#${id}`); } catch (err) {}
        }
      });
    });

    window.addEventListener('hashchange', () => {
      const id = location.hash.replace('#','');
      const el = document.getElementById(id);
      if (el) setTimeout(() => smoothScrollToElement(el), 40);
    });

    if (location.hash) {
      const el = document.getElementById(location.hash.replace('#',''));
      if (el) setTimeout(() => smoothScrollToElement(el), 60);
    }
  })();

  // ===============================
  // LOGIN MODAL FUNCTIONALITY
  // ===============================
  const modal = document.getElementById("loginModal");
  const loginBtn = document.getElementById("loginBtn");
  const closeBtn = document.querySelector(".close");

  if (loginBtn && modal && closeBtn) {
    loginBtn.addEventListener("click", (e) => {
      e.preventDefault();
      modal.style.display = "flex";
    });

    closeBtn.addEventListener("click", () => {
      modal.style.display = "none";
    });

    window.addEventListener("click", e => {
      if (e.target === modal) modal.style.display = "none";
    });
  }

  // ===============================
  // LOGIN FORM VALIDATION
  // ===============================
  const loginForm = document.getElementById("loginForm");
  const loginMessage = document.getElementById("loginMessage");

  if (loginForm && loginMessage) {
    loginForm.addEventListener("submit", e => {
      e.preventDefault();
      const username = document.getElementById("username").value.trim();
      const password = document.getElementById("password").value.trim();

      if (username === "admin" && password === "12345") {
        loginMessage.style.color = "green";
        loginMessage.textContent = "Login successful! Redirecting...";
        setTimeout(() => {
          modal.style.display = "none";
          loginMessage.textContent = "";
          loginForm.reset();
          alert("Welcome, admin!");
        }, 1500);
      } else {
        loginMessage.style.color = "red";
        loginMessage.textContent = "Invalid username or password.";
      }
    });
  }

  // ===============================
  // REGISTER MODAL FUNCTIONALITY
  // ===============================
  const registerModal = document.getElementById("registerModal");
  const registerBtn = document.getElementById("registerBtn");
  const closeRegisterBtn = document.getElementById("closeRegisterBtn");
  const registerForm = document.getElementById("registerForm");
  const registerMessage = document.getElementById("registerMessage");

  if (registerBtn && registerModal && closeRegisterBtn) {
    registerBtn.addEventListener("click", (e) => {
      e.preventDefault();
      registerModal.style.display = "flex";
    });

    closeRegisterBtn.addEventListener("click", () => {
      registerModal.style.display = "none";
    });

    window.addEventListener("click", (e) => {
      if (e.target === registerModal) registerModal.style.display = "none";
    });
  }

  if (registerForm && registerMessage) {
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault();
      // you can add more validation logic here
      registerMessage.style.color = "green";
      registerMessage.textContent = "Resident registered successfully!";
      setTimeout(() => {
        registerModal.style.display = "none";
        registerMessage.textContent = "";
        registerForm.reset();
      }, 2000);
    });
  }
});

// VIDEO MODAL FUNCTIONALITY
const videoModal = document.getElementById("videoModal");
const learnMoreBtn = document.querySelector(".hero .btn.primary");
const closeVideoBtn = document.getElementById("closeVideoBtn");
const videoPlayer = document.getElementById("videoPlayer");

if (learnMoreBtn && videoModal && closeVideoBtn && videoPlayer) {
  learnMoreBtn.addEventListener("click", (e) => {
    e.preventDefault();
    videoModal.style.display = "flex";
    videoPlayer.currentTime = 0;
    videoPlayer.play();
  });

  // Fixed: Close button click
  closeVideoBtn.addEventListener("click", () => {
    videoModal.style.display = "none";
    videoPlayer.pause();
  });

  // Close when clicking outside modal
  window.addEventListener("click", (e) => {
    if (e.target === videoModal) {
      videoModal.style.display = "none";
      videoPlayer.pause();
    }
  });
}

