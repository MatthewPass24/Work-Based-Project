// Set the default background to "image 2.png" when the page loads
window.addEventListener('DOMContentLoaded', function() {
  const skillsImage = document.querySelector('.skills-image');
  if (skillsImage) {
    skillsImage.style.backgroundImage = "url('img/image 2.png')";
    skillsImage.style.backgroundSize = "cover";
    skillsImage.style.backgroundPosition = "center";
  }
  updateDescription('VFX'); // Set default description or remove if not needed

  // Back to top button logic
  const mybutton = document.getElementById("myBtn");
  if (mybutton) {
    // Initially hide the button
    mybutton.style.display = "none";

    // Show/hide the button on scroll
    window.addEventListener("scroll", function () {
      if (window.scrollY > 20) {
        mybutton.style.display = "block";
      } else {
        mybutton.style.display = "none";
      }
    });

    // Scroll to top smoothly when clicked
    mybutton.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
});

function updateDescription(skill) {
  const helpData = {
    "VFX": {
      title: "Special Effects",
      description: "I became familiar with greenscreens on the morning show to create background scenes and help achieve a specific look.",
      backgroundImage: "img/screen.jpg"
    },
    "Camera": {
      title: "Camera Work",
      description: "I started using Canon Cameras for videography for my video editing class, which helped me understand aperture, focusing, and when to use different lenses",
      backgroundImage: "img/camera.jpg"
    },
    "Adobe": {
      title: "Adobe Premiere",
      description: "I use Adobe Premiere to help edit my videos, where I can trim the footage, adjust the color and lighting, and transition each clip",
      backgroundImage: "img/editing.jpg"
    }
  };

  const selected = helpData[skill];
  if (!selected) return;

  // Update title
  const titleEl = document.getElementById('change-title');
  if (titleEl) titleEl.innerText = selected.title;

  // Update description
  const descEl = document.querySelector('.info-section');
  if (descEl) descEl.innerText = selected.description;

  // Update background image
  const skillsImage = document.querySelector('.skills-image');
  if (skillsImage) {
    skillsImage.style.backgroundImage = `url('${selected.backgroundImage}')`;
    skillsImage.style.backgroundSize = "cover";
    skillsImage.style.backgroundPosition = "center";
  }
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 50,
        behavior: 'smooth'
      });
    }
  });
});

// Vue app for past websites
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
