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

  

// animation mousemove
(function() {
  window.onload = function() {

    // Initialise an empty canvas and place it on the page
    var canvas = document.createElement("canvas");
    canvas.classList.add("overlay-canvas");
    var context = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.body.appendChild(canvas);

    // Set up object to contain particles axnd set some default values
    var particles = {},
        particleIndex = 0,
        settings = {
          density: 1,
          minParticleSize: 0.001,
          maxParticleSize: 30 + (canvas.width / 200),
          maxVelocity: 0.1,
          gravity: 1,
          maxLife: 100,
          colors: ["#ffffff","#fb7ce6","#6ea2fc","#fb7ce6"]
        };

    function resetSettings(){
      settings.maxParticleSize =  30 + (canvas.width / 200);
    }

    // To optimise the previous script, generate some pseudo-random angles
    var seedsX = [];
    var seedsY = [];
    var maxAngles = 100;
    var currentAngle = 0;

    function seedAngles() {
      seedsX = [];
      seedsY = [];
      for (var i = 0; i < maxAngles; i++) {
        seedsX.push(Math.random() * (2 * settings.maxVelocity) - settings.maxVelocity);
        seedsY.push(Math.random() * (2 * settings.maxVelocity) - settings.maxVelocity);
      }
    }

    // Start off with 100 angles ready to go
    seedAngles();

    // Set up a function to create multiple particles
    function Particle(x, y, static) {
      if (currentAngle !== maxAngles) {
        // Establish starting positions and velocities
        this.id = particleIndex;
        particleIndex ++;
        this.vx = seedsX[currentAngle];
        this.vy = seedsY[currentAngle];
        this.x = x + this.vx * 200;
        this.y = y + this.vy * 200;
        this.size = Math.random() * (settings.maxParticleSize - settings.minParticleSize) + settings.minParticleSize;
        var colorIndex = Math.floor(Math.random() * settings.colors.length);
        this.color = hexToRgb(settings.colors[colorIndex]);
        currentAngle++;

        this.life = 0;
        this.maxLife = settings.maxLife;

      } else {
        seedAngles();
        currentAngle = 0;
      }
    }

    // Some prototype methods for the particle's "draw" function
    Particle.prototype.draw = function() {
      // If Particle is old, it goes in the chamber for renewal
      if (this.life >= this.maxLife || !this.color || this.y > canvas.height || this.y < 0 || this.x < 0 || this.x > canvas.width) {
        delete particles[this.id];
        return false;
      }

      // Age the particle
      this.life++;
      // Adjust for gravity
      // this.vy += settings.gravity * (1 - (this.life / settings.maxLife));
      this.x += this.vx;
      this.y += this.vy + settings.gravity * (1 - (this.life / settings.maxLife));;

      context.fillStyle= "rgba(" + this.color.r + "," + this.color.g + "," + this.color.b + "," + (1 - (this.life / this.maxLife)) + ")";
      context.strokeStyle = "rgba(" + this.color.r + "," + this.color.g + "," + this.color.b + "," + (1 - (this.life / this.maxLife)) + ")";

      // Create the particles
      context.beginPath();
      // // Draws a circle in the center
      context.arc(this.x + 0.5, this.y + 0.5, (this.size / 20) * (1 - (this.life / this.maxLife)), 0, Math.PI*2, true); 

      // Draws a cross of random height and width
      let starWidth = Math.random() * this.size * (1 - (this.life / this.maxLife));
      let starHeight = Math.random() * this.size * (1 - (this.life / this.maxLife));
      context.moveTo(this.x - (starWidth / 2), this.y);
      context.lineTo(this.x + (starWidth / 2), this.y);
      context.moveTo(this.x, this.y - (starHeight / 2))
      context.lineTo(this.x, this.y + (starWidth / 2));

      context.closePath();
      context.fill();
      context.stroke();
    }

    // shim layer with setTimeout fallback
    window.requestAnimFrame = (function(){
      return  window.requestAnimationFrame       ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        function( callback ){
        window.setTimeout(callback, 1000 / 60);
      };
    })();
    (function animloop(){
      requestAnimFrame(animloop);
      render();
    })();

    function render(){
      context.clearRect(0, 0, canvas.width, canvas.height);

      // Draw the particles
      for (var i in particles) {
        particles[i].draw();
      }    
    }

    var resizeTimeout = false;
    // window.resize event listener
    window.onresize = function(){
      // clear the timeout
      clearTimeout(resizeTimeout);
      // start timing for event "completion"
      resizeTimeout = setTimeout(function(){
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        resetSettings();
      }, 250);
    }

    // https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
    function hexToRgb(hex) {
      // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
      var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
      hex = hex.replace(shorthandRegex, function(m, r, g, b) {
        return r + r + g + g + b + b;
      });

      var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : null;
    }

    window.onclick = function(event){
      for(var i = 0; i < 50; i++){
        particles[particleIndex] = new Particle(event.clientX, event.clientY, false);
        particles[particleIndex - 1].vx *= 100;
        particles[particleIndex - 1].vy *= 100;
      }
    }

    window.onmousemove = function(event){
      particleActionCheck(event.clientX, event.clientY);
    }

    window.ontouchmove = function(event){
      particleActionCheck(event.touches[0].clientX, event.touches[0].clientY);
    }

    function particleActionCheck(x, y){
      // create new particles
      if(settings.density < 1 && settings.density > 0){
        if(Math.random() < settings.density){
          particles[particleIndex] = new Particle(x, y, false);
        }
      } else {
        for (var i = 0; i < settings.density; i++) {
          particles[particleIndex] = new Particle(x, y, false);
        }
      }
    }
  };
})();