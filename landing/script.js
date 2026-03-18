
    // Spawn particles
    const container = document.getElementById('particles');
    const colors = ['rgba(247,223,30,0.4)','rgba(100,160,255,0.35)','rgba(230,57,70,0.3)','rgba(6,214,160,0.25)'];
    for (let i = 0; i < 20; i++) {
      const p = document.createElement('div');
      p.className = 'p';
      const size = Math.random() * 4 + 2;
      const color = colors[Math.floor(Math.random() * colors.length)];
      p.style.cssText = `
        width:${size}px; height:${size}px;
        left:${Math.random()*100}%;
        bottom:-10px;
        background:${color};
        box-shadow: 0 0 ${size*2}px ${color};
        animation-duration:${Math.random()*10+8}s;
        animation-delay:${Math.random()*14}s;
      `;
      container.appendChild(p);
    }
  