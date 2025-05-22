

  // Set the default background to "image 2.png" when the page loads
  window.addEventListener('DOMContentLoaded', function() {
    const skillsImage = document.querySelector('.skills-image');
    skillsImage.style.backgroundImage = "url('img/image 2.png')";
    skillsImage.style.backgroundSize = "cover";
    skillsImage.style.backgroundPosition = "center";
    updateDescription('VFX'); // You can set this as default, or remove if not needed
  });
  
  
  function updateDescription(skill) {
    const helpData = {
      "VFX": {
        title: "Special Effects",
        description: "Became familiar with greenscreens to help create a specific scene",
        backgroundImage: "img/screen.jpg"
      },
      "Camera": {
        title: "Camera Work",
        description: "I started using Canon Cameras for videography, which helped me with aperture, focusing, and using different lenses",
        backgroundImage: "img/camera.jpg"
      },
      "Adobe": {
        title: "Adobe Premiere",
        description: "I use Adobe Premiere to help edit my videos, where I learn about splitting and trimming",
        backgroundImage: "img/editing.jpg"
      }
    };
  
    const selected = helpData[skill];
  
    // Update title
    document.getElementById('change-title').innerText = selected.title;
  
    // Update description
    document.querySelector('.info-section').innerText = selected.description;
  
    // Update background image
    const skillsImage = document.querySelector('.skills-image');
    skillsImage.style.backgroundImage = `url('${selected.backgroundImage}')`;
    skillsImage.style.backgroundSize = "cover";
    skillsImage.style.backgroundPosition = "center";
  }
  
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      window.scrollTo({
        top: target.offsetTop - 50,
        behavior: 'smooth'
      });
    });
  });
  
const app = Vue.createApp({
    data() {
      return {
        selectedCategory: 'Season 1 Highlights',
        categories: ['Season 1 Highlights', 'Season 2 Highlights', 'Personal Projects'],
        websitesData: {}
      };
    },
    methods: {
      async fetchWebsitesData() {
        try {
          const response = await fetch('projects.json'); // Links the json filename to the js
          this.websitesData = await response.json();
        } catch (error) {
          console.error('Error loading website data:', error);
        }
      },
      selectCategory(category) {
        this.selectedCategory = category;
      }
    },
    created() {
      this.fetchWebsitesData();
    }
  });
  
  app.mount('#vue_app');
// Get the button:
let mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

  // When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}