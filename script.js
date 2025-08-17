// hide/show function for project details show more button
function hideShow(button) {
  const projectCard = button.parentElement;
  const details = projectCard.querySelector(".projectDetails");

  const isVisible = details.classList.contains("show");

  if (isVisible) {
    details.classList.remove("show");
    button.innerText = "View Details";
  } else {
    details.classList.add("show");
    button.innerText = "Hide Details";
  }
}

// Show/Hide function for the hidden/extra projects
var expandedProjects = false;

function toggleExtraProjects() {
  const hiddenProjects = document.querySelector(".hiddenProjects");
  const toggleBtn = document.querySelector(".toggleExtraBtn");

  if (!expandedProjects) {
    hiddenProjects.classList.add("show"); // trigger smooth expand
    toggleBtn.textContent = "Hide Extra Projects";
    expandedProjects = true;
  } else {
    hiddenProjects.classList.remove("show"); // trigger collapse
    toggleBtn.textContent = "View More Projects";
    expandedProjects = false;
  }
}

//email service
emailjs.init({
  publicKey: "w1tsgKvU80CzeQROO",
  limitRate: {
    id: "contact_form",
    throttle: 10000,
  },
});


window.onload = function () {
  const form = document.getElementById("contact-form");
  const submitBtn = form.querySelector('button[type="submit"]');

  form.addEventListener("submit", function (event) {
    event.preventDefault(); //prevent form reloads

    submitBtn.disabled = true;
    submitBtn.innerText = "Sending...";

    //send form function
    emailjs
      .sendForm("service_21pg896", "template_54khror", this)
      .then(
        () => {
          this.reset();
          showToast("Message sent! I will respond within 48 hours.", "success");
        },
        (error) => {
          showToast("Failed to send message. Please try again.", "error");
        }
      )
      .finally(() => {
        submitBtn.disabled = false;
        submitBtn.innerText = "Send Message";
      });
  });
};

//download resume button
document
  .getElementById("download-resume")
  .addEventListener("click", function () {
    const link = document.createElement("a"); //programmatically added link on download-resume, can do this in html but wanted to do it in js for fun
    link.href = "/Kevin-Phitsanu-Portfolio/docs/Kevin Phitsanu Resume.pdf";
    link.download = "Kevin Phitsanu Resume.pdf"; //download goes to this file
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast("Resume downloaded!", "success");
  });

//intersection observer scroll animation

//projects section
const projectCards = document.querySelectorAll(".projectCard"); //grab project cards

const observer = new IntersectionObserver(
  (entries) => {
    //intersection observer used here
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        const card = entry.target;
        // Staggered animation: each card gets a slight delay
        card.style.animationDelay = `${index * 0.2}s`;
        card.classList.add("animate-in");
        observer.unobserve(card); // Animate once per card
      }
    });
  },
  {
    threshold: 0.1,
  }
);

projectCards.forEach((card) => {
  observer.observe(card);
});

//animation for exp section
const experienceCards = document.querySelectorAll(".expCard");

const expObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        entry.target.style.animationDelay = `${index * 0.15}s`;
        entry.target.classList.add("animate-in");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.2,
  }
);

experienceCards.forEach((card) => expObserver.observe(card));

//back to top button

const backToTopBtn = document.getElementById("backToTopBtn");
// back to top scroll visibility handler
function toggleBackToTop() {
  if (window.scrollY > 100) {
    backToTopBtn.classList.add("show");
    // console.log("ScrollY:", window.scrollY);
  } else {
    backToTopBtn.classList.remove("show");
  }
}

window.addEventListener("scroll", toggleBackToTop);

backToTopBtn.addEventListener("click", () => {
  // console.log("clicked");
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Toast Messages
function showToast(message, type = "success") {
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.textContent = message;

  document.getElementById("toastContainer").appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3000); // Toast lasts for 3s
}

document.addEventListener("DOMContentLoaded", () => {
  const topContainer = document.querySelector(".topContainer");
  const navbar = document.querySelector(".navbar");
  const hamburger = document.querySelector(".hamburger");
  const navRight = document.querySelector(".navRight");

  if (hamburger && navRight) {
    hamburger.addEventListener("click", function () {
      navRight.classList.toggle("show");
      // console.log(navRight.classList);
    });
  }
  window.scrollTo(0, 0);
  document.body.classList.add("lock-scroll");

  navbar.classList.add("hidden"); // hide nav off-screen

  // Initial state
  gsap.set(topContainer, {
    scale: 1,
    paddingTop: "10vh",
    paddingBottom: "10vh",
    minHeight: "100vh",
    opacity: 0,
  });

  // Animate zoom-in
  gsap.to(topContainer, {
    duration: 1.5,
    scale: 1.1,
    opacity: 1,
    ease: "power2.out",
    paddingTop: "20vh",
    paddingBottom: "20vh",
    onStart: () => {
      gsap.from(".topContainer h1, .topContainer h2, .topContainer h3", {
        opacity: 0,
        y: 20,
        duration: 1.2,
        ease: "power3.out",
        stagger: 0.2,
      });
    },
  });

  // Shrink to normal
  gsap.to(topContainer, {
    delay: 1.5,
    duration: 1.2,
    scale: 1,
    ease: "power2.inOut",
    paddingTop: "6rem",
    paddingBottom: "6rem",
    minHeight: "auto",
    onComplete: () => {
      // Animate navbar into view while it's still absolute
      gsap.fromTo(
        navbar,
        {
          y: -60,
          opacity: 0,
          paddingTop: 0,
          paddingBottom: 0,
          marginBottom: 0,
        },
        {
          y: 0,
          opacity: 1,
          paddingTop: "1.4rem",
          paddingBottom: "1.4rem",
          marginBottom: "1.5rem",
          duration: 1,
          ease: "power2.out",
          onStart: () => {
            navbar.classList.remove("hidden");
          },
          onComplete: () => {
            navbar.style.position = "relative";
            navbar.style.top = "";
            navbar.style.left = "";
            navbar.style.right = "";
          },
        }
      );

      // Unlock scroll
      document.body.classList.remove("lock-scroll");
    },
  });
});

// Prevent #hash in the URL while still scrolling 
function scrollToSection(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
  // remove hash without adding a history entry
  history.replaceState(null, "", window.location.pathname + window.location.search);
}

document.addEventListener("DOMContentLoaded", () => {
  // Intercept navbar anchor clicks
  document.querySelectorAll('.navRight a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href").slice(1);
      if (!id) return;
      e.preventDefault();
      scrollToSection(id);

      // close mobile menu if open
      const navRight = document.getElementById("nav-links");
      navRight?.classList.remove("show");
    });
  });

  // If someone lands on a URL with a hash, scroll once then clean it
  if (location.hash) {
    const id = location.hash.slice(1);
    const el = document.getElementById(id);
    if (el) {
      // instant to avoid double-animate with GSAP
      el.scrollIntoView({ behavior: "auto", block: "start" });
      history.replaceState(null, "", window.location.pathname + window.location.search);
    }
  }
});

