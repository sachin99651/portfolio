  // Loader fadeout
  window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    loader.classList.add('hidden');
  });

  // Dark/light mode toggle
  function toggleMode() {
    document.body.classList.toggle('light-mode');
  }

  // Scroll reveal animations
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('active');
      });
    },
    { threshold: 0.25 }
  );
  document.querySelectorAll('.about-me, .prof-img, .section-title, .about-content, .project-grid').forEach((el) => observer.observe(el));

  // Typing effect for name
  const nameText = "Hello, I'm Sachin Pal";
  const typingElem = document.getElementById('typing-name');
  let charIndex = 0;

  function type() {
    if (charIndex < nameText.length) {
      typingElem.textContent += nameText.charAt(charIndex);
      charIndex++;
      setTimeout(type, 100);
    } else {
      // Blink cursor after typing
      setInterval(() => {
        typingElem.style.borderRight = typingElem.style.borderRight === '2px solid transparent' ? '2px solid #00ffff' : '2px solid transparent';
      }, 500);
    }
  }
  type();