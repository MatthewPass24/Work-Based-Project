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