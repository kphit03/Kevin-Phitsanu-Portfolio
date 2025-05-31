// hide/show function for project details show more button
function hideShow(button) {
  const projectCard = button.parentElement;
  const details = projectCard.querySelector('.projectDetails');
  
  if (details.style.display === 'block') { //hide details
    details.style.display = 'none';
    button.innerText = "View Details";
  } else { //show details
    details.style.display = 'block';
    button.innerText = "Hide Details";
  }
}

// Show/Hide function for the hidden/extra projects
var expandedProjects = false;

function toggleExtraProjects() { //onclick funciton
  const hiddenProjects = document.querySelector(".extraProjects"); //grab the extra projects section from dom (hidden by default on html)
  const toggleBtn = document.querySelector(".toggleExtraBtn"); //grab the button from the dom (to change the text)

  if (!expandedProjects) {
    hiddenProjects.classList.remove("hiddenProjects"); // remove hidden class 
    toggleBtn.textContent = "Hide Extra Projects";
    expandedProjects = true;
  } else {
    hiddenProjects.classList.add("hiddenProjects"); // add hidden class 
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
        console.log("Successfully Sent");
        this.reset();
      }, (error) => {
        console.log("Failed to send", error);
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
