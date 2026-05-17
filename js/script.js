// Register the ScrollTrigger plugin with GSAP safely
if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

document.addEventListener("DOMContentLoaded", () => {
  // Guard clause if scripts fail to load from CDN
  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined")
    return;

  // ==========================================
  // 1. HERO SECTION ENTRANCE ANIMATION
  // ==========================================
  const heroTimeline = gsap.timeline({
    defaults: { ease: "power4.out", duration: 1 },
  });

  heroTimeline
    .from(".site-header", { y: -50, opacity: 0, duration: 0.8 })
    .from(".home-section .text-uppercase", { y: 30, opacity: 0 }, "-=0.4")
    .from(".home-section h1", { y: 30, opacity: 0 }, "-=0.6")
    .from(".typing-container", { y: 30, opacity: 0 }, "-=0.6")
    .from(".home-section p", { y: 30, opacity: 0 }, "-=0.6")
    .from(
      ".stats-container .col-4",
      { y: 30, opacity: 0, stagger: 0.15 },
      "-=0.6",
    )
    .from(
      ".portfolio-img-wrapper",
      { scale: 0.8, opacity: 0, duration: 1.2, ease: "back.out(1.7)" },
      "-=1",
    );

  // ==========================================
  // 2. TEXT TYPING EFFECT (GSAP Native)
  // ==========================================
  const words = ["Web Developer", "UI/UX Designer", "Full-Stack Developer"];
  let wordIndex = 0;
  const textElement = document.getElementById("typing-text");

  function typeWords() {
    if (!textElement) return;

    let currentWord = words[wordIndex];
    let letters = currentWord.split("");
    textElement.textContent = "";

    let typeTimeline = gsap.timeline({
      onComplete: () => {
        // Hold the completed word for 2 seconds, then transition to the next word
        gsap.delayedCall(2, () => {
          wordIndex = (wordIndex + 1) % words.length;
          typeWords();
        });
      },
    });

    letters.forEach((letter) => {
      typeTimeline.to(
        {},
        {
          duration: 0.08,
          onComplete: () => {
            textElement.textContent += letter;
          },
        },
      );
    });
  }

  typeWords();

  // ==========================================
  // 3. NUMBER COUNTERS ANIMATION (ScrollTriggered)
  // ==========================================
  const counters = document.querySelectorAll(".counter");

  counters.forEach((counter) => {
    const target = parseInt(counter.getAttribute("data-target"), 10);

    gsap.to(counter, {
      innerText: target,
      duration: 2,
      ease: "power2.out",
      snap: { innerText: 1 }, // Prevents decimal points while counting up
      scrollTrigger: {
        trigger: counter,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });
  });

  // ==========================================
  // 4. NAVIGATION LINK ACTIVATION (Scrollspy)
  // ==========================================
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".custom-nav-link");

  sections.forEach((section) => {
    const sectionId = section.getAttribute("id");
    const correspondingLink = document.querySelector(
      `.custom-nav-link[href="#${sectionId}"]`,
    );

    if (correspondingLink) {
      ScrollTrigger.create({
        trigger: section,
        start: "top 150px",
        end: "bottom 150px",
        onToggle: (self) => {
          if (self.isActive) {
            navLinks.forEach((link) => link.classList.remove("active"));
            correspondingLink.classList.add("active");
          }
        },
      });
    }
  });

  // ==========================================
  // 5. SCROLL REVEAL ELEMENTS
  // ==========================================
  // About Section Left Content
  gsap.from(".about-img-wrapper", {
    x: -100,
    opacity: 0,
    duration: 1,
    scrollTrigger: {
      trigger: ".about-section",
      start: "top 75%",
    },
  });

  // About Section Text Elements
  gsap.from(".about-section .col-lg-7 > *", {
    y: 40,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    scrollTrigger: {
      trigger: ".about-section",
      start: "top 75%",
    },
  });

  // Project Cards Stagger Flow
  gsap.from(".project-card", {
    y: 60,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".projects-section",
      start: "top 70%",
    },
  });

  // Contact Details
  gsap.from(".contact-info-item", {
    x: -50,
    opacity: 0,
    duration: 0.6,
    stagger: 0.15,
    scrollTrigger: {
      trigger: ".contact-section",
      start: "top 75%",
    },
  });

  // Contact Input Form Fields
  gsap.from(".contact-form .form-group, .contact-form button", {
    y: 30,
    opacity: 0,
    duration: 0.6,
    stagger: 0.1,
    scrollTrigger: {
      trigger: ".contact-form",
      start: "top 80%",
    },
  });

  // Contact Input Form Fields
  gsap.to(".contact-form .form-group, .contact-form button", {
    opacity: 1,
    duration: 0.6,
    stagger: 0.1,
    scrollTrigger: {
      trigger: ".contact-form",
      start: "top 80%",
    },
  });
});
