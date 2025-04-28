const timelineWrapper = document.querySelector('.timeline-wrapper');
const dataBoxes = document.querySelectorAll('.timeline li .data');

// Toggle open/close for data boxes
dataBoxes.forEach(data => {
  data.addEventListener('click', () => {
    dataBoxes.forEach(d => {
      if (d !== data) d.classList.remove('show');
    });
    data.classList.toggle('show');
  });
});

document.querySelectorAll('.timeline li .data .close').forEach(closeBtn => {
  closeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    closeBtn.closest('.data').classList.remove('show');
  });
});

// Click-and-drag scroll behavior
let isDown = false;
let startX;
let scrollLeft;

timelineWrapper.addEventListener('mousedown', (e) => {
  isDown = true;
  timelineWrapper.classList.add('dragging');
  startX = e.pageX - timelineWrapper.offsetLeft;
  scrollLeft = timelineWrapper.scrollLeft;
});

timelineWrapper.addEventListener('mouseleave', () => {
  isDown = false;
  timelineWrapper.classList.remove('dragging');
});

timelineWrapper.addEventListener('mouseup', () => {
  isDown = false;
  timelineWrapper.classList.remove('dragging');
});

timelineWrapper.addEventListener('mousemove', (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - timelineWrapper.offsetLeft;
  const walk = (x - startX) * 1.5; // multiplier = scroll speed
  timelineWrapper.scrollLeft = scrollLeft - walk;
});

const app = Vue.createApp({
    data() {
      return {
        selectedCategory: 'Final Portfolio',
        categories: ['Final Portfolio', 'Notable Sites', 'Senior Projects'],
        websitesData: {}
      };
    },
    methods: {
      async fetchWebsitesData() {
        try {
          const response = await fetch('alumni.json'); // Links the json filename to the js
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
        backgroundImage: "img/Adobe%20Express%20-%20file.jpg"
      },
      "Camera": {
        title: "Camera Work",
        description: "I started using Canon Cameras for videography, which helped me with aperture, focusing, and using different lenses",
        backgroundImage: "img/camera.jpg"
      },
      "Adobe": {
        title: "Adobe Premiere",
        description: "I use Adobe Premiere to help edit my videos, where I learn about splitting and trimming",
        backgroundImage: "img/Adobe%20Express%20-%20file%20(6).png"
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
  
