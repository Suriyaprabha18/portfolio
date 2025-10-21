const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

let width, height;
function resize() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

// Create particles
const particles = [];
for(let i=0;i<80;i++){
  particles.push({
    x: Math.random()*width,
    y: Math.random()*height,
    size: Math.random()*3+1,
    speedX: Math.random()*0.5-0.25,
    speedY: Math.random()*0.5-0.25
  });
}

function draw(){
  ctx.clearRect(0,0,width,height);
  ctx.fillStyle='rgba(0,191,255,0.7)';

  // Draw particles
  for(let p of particles){
    ctx.beginPath();
    ctx.arc(p.x,p.y,p.size,0,Math.PI*2);
    ctx.fill();
    p.x += p.speedX;
    p.y += p.speedY;

    // wrap around
    if(p.x>width)p.x=0;
    if(p.x<0)p.x=width;
    if(p.y>height)p.y=0;
    if(p.y<0)p.y=height;
  }

  // Draw lines between close particles
  for(let i=0;i<particles.length;i++){
    for(let j=i+1;j<particles.length;j++){
      let dx=particles[i].x-particles[j].x;
      let dy=particles[i].y-particles[j].y;
      let dist=Math.sqrt(dx*dx+dy*dy);
      if(dist<120){
        ctx.beginPath();
        ctx.strokeStyle='rgba(0,191,255,'+(1-dist/120)+')';
        ctx.moveTo(particles[i].x,particles[i].y);
        ctx.lineTo(particles[j].x,particles[j].y);
        ctx.stroke();
      }
    }
  }

  requestAnimationFrame(draw);
}
draw();
