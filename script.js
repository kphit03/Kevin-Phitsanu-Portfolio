// hide/show function for project details show more button
function hideShow(button) {
  const projectCard = button.parentElement;
  const details = projectCard.querySelector('.projectDetails');

  const isVisible = details.classList.contains('show');
  
  if (isVisible) {
    details.classList.remove('show');
    button.innerText = "View Details";
  } else {
    details.classList.add('show');
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
  publicKey: 'w1tsgKvU80CzeQROO',
  limitRate: {
    id: 'contact_form',
    throttle: 10000
  }
});

window.onload = function() {
  const form = document.getElementById('contact-form');
  const submitBtn = form.querySelector('button[type="submit"]');

  form.addEventListener('submit', function(event) {
    event.preventDefault(); //prevent form reloads

    submitBtn.disabled = true;
    submitBtn.innerText = 'Sending...';

    //send form function
    emailjs.sendForm('service_21pg896', 'template_54khror', this)
      .then(() => {
        this.reset();
        showToast('Message sent! I will respond within 48 hours.', 'success');
      }, (error) => {
        showToast('Failed to send message. Please try again.', 'error');
      })
      .finally(() => {
        submitBtn.disabled = false;
        submitBtn.innerText = "Send Message";
      });
  });
}

//hamburger menu
document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.querySelector('.hamburger');
  const navRight = document.querySelector('.navRight');

  if (hamburger && navRight) {
    hamburger.addEventListener('click', function () {
      navRight.classList.toggle('show');
    });
  }
});

//download resume button
document.getElementById('download-resume').addEventListener('click', function () {
  const link = document.createElement('a'); //programmatically added link on download-resume, can do this in html but wanted to do it in js for fun
  link.href = '/Kevin-Phitsanu-Portfolio/docs/Kevin Phitsanu Resume.pdf';
  link.download = 'Kevin Phitsanu Resume.pdf'; //download goes to this file
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  showToast('Resume downloaded!', 'success');
})

//intersection observer scroll animation

//projects section
const projectCards = document.querySelectorAll('.projectCard'); //grab project cards

const observer = new IntersectionObserver((entries) => { //intersection observer used here
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      const card = entry.target;
      // Staggered animation: each card gets a slight delay
      card.style.animationDelay = `${index * 0.2}s`;
      card.classList.add('animate-in');
      observer.unobserve(card); // Animate once per card
    }
  });
}, {
  threshold: 0.1
});

projectCards.forEach((card) => {
  observer.observe(card);
});


//animation for exp section
const experienceCards = document.querySelectorAll('.expCard');

const expObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      entry.target.style.animationDelay = `${index * 0.15}s`;
      entry.target.classList.add('animate-in');
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.2,
});

experienceCards.forEach(card => expObserver.observe(card));


//back to top button

const backToTopBtn = document.getElementById("backToTopBtn");

window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    backToTopBtn.classList.add('show'); // adds fade-in
  } else {
    backToTopBtn.classList.remove('show'); // triggers fade-out
  }
});


backToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

// Toast Messages 
function showToast(message, type = 'success') {
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;

  document.getElementById('toastContainer').appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3000); // Toast lasts for 3s
}
