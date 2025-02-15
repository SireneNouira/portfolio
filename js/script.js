let menuIcon = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");
let sections = document.querySelectorAll("section");
let navLinks = document.querySelectorAll("header nav a");

window.onscroll = () => {
  sections.forEach((sec) => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 150;
    let height = sec.offsetHeight;
    let id = sec.getAttribute("id");

    if (top >= offset && top < offset + height) {
      navLinks.forEach((links) => {
        links.classList.remove("active");
        document
          .querySelector("header nav a [href+=" + id + " ]")
          .classList.add("active");
      });
    }
  });
};

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}

// Animation button

document.querySelectorAll('.social-icons').forEach(btn => {
  
  btn.addEventListener('mousemove', (e) => {
    
    const rect = btn.getBoundingClientRect();    
    const h = rect.width / 2;
    
    const x = e.clientX - rect.left - h;
    const y = e.clientY - rect.top - h;

    const r1 = Math.sqrt(x*x+y*y);
    const r2 = (1 - (r1 / h)) * r1;

    const angle = Math.atan2(y, x);
    const tx = Math.round(Math.cos(angle) * r2 * 100) / 100;
    const ty = Math.round(Math.sin(angle) * r2 * 100) / 100;
    
    const op = (r2 / r1) + 0.25;

    btn.style.setProperty('--tx', `${tx}px`);
    btn.style.setProperty('--ty', `${ty}px`);
    btn.style.setProperty('--opacity', `${op}`);
  });

  btn.addEventListener('mouseleave', (e) => {
    btn.style.setProperty('--tx', '0px');
    btn.style.setProperty('--ty', '0px');
    btn.style.setProperty('--opacity', `${0.25}`);
  });
});

  