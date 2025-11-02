// Hamberger Menu
 const menuBtn = document.getElementById('menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const navLinks = document.querySelectorAll('#mobile-menu a');

  menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');

    // Animate hamburger icon
    menuBtn.classList.toggle('open');
  });

  // Close menu when a link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      menuBtn.classList.remove('open');
    });
  });

// Role changing animation
document.addEventListener("DOMContentLoaded", () => {
    const roles = [
      "Frontend Developer",
      "Backend Developer",
      "Full Stack Developer",
      "Python Developer",
      "UI/UX Designer"
    ];

    const roleEl = document.getElementById("changing-role");
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
      const currentRole = roles[roleIndex];
      const displayedText = currentRole.substring(0, charIndex);
      roleEl.textContent = displayedText;

      if (!isDeleting && charIndex < currentRole.length) {
        charIndex++;
        setTimeout(typeEffect, 100);
      } else if (isDeleting && charIndex > 0) {
        charIndex--;
        setTimeout(typeEffect, 50);
      } else {
        if (!isDeleting) {
          setTimeout(() => (isDeleting = true, typeEffect()), 1200);
        } else {
          isDeleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
          setTimeout(typeEffect, 300);
        }
      }
    }

    typeEffect();
  });


  document.addEventListener("mousemove", (e) => {
  const x = e.clientX / window.innerWidth;
  const y = e.clientY / window.innerHeight;

  const stars = document.querySelector(".stars");
  const twinkling = document.querySelector(".twinkling");
  const nebula = document.querySelector(".nebula");

  stars.style.transform = `translate(${x * 30}px, ${y * 30}px)`;
  twinkling.style.transform = `translate(${x * 60}px, ${y * 60}px)`;
  nebula.style.transform = `translate(${x * 90}px, ${y * 90}px)`;
});
