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

  function updateDescription(skill) {
    let helpData = {
      "VFX": {
        title: "Special Effects",
        description: "Became familiar with greenscreens to help create a specific scene",
        image: "img/special-effects-icon-2048x2048-o197xkfs 1.png"
      },
      "Camera": {
        title: "Camera Work",
        description: "I started using Canon Cameras for videography, which helped me with aperture, focusing, and using different lenses",
        image: "img/camera.png"
      },
      "Adobe": {
        title: "Adobe Premiere",
        description: "I use Adobe Premiere to help edit my videos, where I learn about splitting and trimming",
        image: "img/Adobe Express - file (5).png"
      }
    };
  
    let selected = helpData[skill];
  
    // Now update the HTML
    document.getElementById('change-title').innerText = selected.title;
    document.querySelector('.info-section').innerText = selected.description;
    document.querySelector('.offer-image').innerHTML = `<img src="${selected.image}" alt="${selected.title}" style="max-width: 100%;">`;
  }  
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
  
      window.scrollTo({
        top: target.offsetTop - 50, // Adjust this value to get the perfect centering
        behavior: 'smooth'
      });
    });
  });