import React, { useEffect, useRef } from 'react';

const InteractiveCursor = () => {
  const canvasRef = useRef(null);
  const particles = useRef([]);
  const mouse = useRef({ x: 0, y: 0 });
  const animationFrameId = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;

    // Set canvas size
    const setCanvasSize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    setCanvasSize();

    // Vibrant Tibetan Prayer Flag colors - more visible on light background
    const colors = [
      { r: 0, g: 128, b: 192 },    // Blue (Sky) #0080C0
      { r: 0, g: 166, b: 81 },     // Green (Earth) #00A651
      { r: 193, g: 39, b: 45 },    // Red (Fire) #C1272D
      { r: 255, g: 213, b: 0 },    // Yellow (Air) #FFD500
      { r: 120, g: 81, b: 169 },   // Purple/Violet (additional vibrance) #7851A9
    ];

    // Particle class
    class Particle {
      constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.life = 1;
        this.decay = 0.015 + Math.random() * 0.01;
        this.size = 40 + Math.random() * 40;
        this.color = color;
        this.angle = Math.random() * Math.PI * 2;
        this.angleVelocity = (Math.random() - 0.5) * 0.02;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life -= this.decay;
        this.angle += this.angleVelocity;
        this.vx *= 0.98;
        this.vy *= 0.98;
      }

      draw(ctx) {
        if (this.life <= 0) return;

        ctx.save();
        ctx.globalAlpha = this.life * 0.3; // More visible opacity
        
        // Create radial gradient for soft glow
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.size
        );
        
        gradient.addColorStop(0, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 0.6)`);
        gradient.addColorStop(0.4, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 0.3)`);
        gradient.addColorStop(1, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 0)`);
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
      }
    }

    // Create particles at cursor position
    const createParticles = (x, y, count = 1) => {
      for (let i = 0; i < count; i++) {
        const color = colors[Math.floor(Math.random() * colors.length)];
        particles.current.push(new Particle(x, y, color));
      }
    };

    // Mouse move handler
    const handleMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      
      // Create particles based on movement speed
      const dx = e.movementX || 0;
      const dy = e.movementY || 0;
      const speed = Math.sqrt(dx * dx + dy * dy);
      
      if (speed > 0.5) {
        createParticles(e.clientX, e.clientY, Math.min(Math.floor(speed / 10), 2));
      }
    };

    // Touch move handler for mobile
    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        mouse.current.x = touch.clientX;
        mouse.current.y = touch.clientY;
        createParticles(touch.clientX, touch.clientY, 1);
      }
    };

    // Touch start handler
    const handleTouchStart = (e) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        // Create ripple effect on touch
        for (let i = 0; i < 3; i++) {
          setTimeout(() => {
            createParticles(touch.clientX, touch.clientY, 2);
          }, i * 100);
        }
      }
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Update and draw particles
      particles.current = particles.current.filter(particle => {
        particle.update();
        particle.draw(ctx);
        return particle.life > 0;
      });

      // Limit particle count for performance
      if (particles.current.length > 100) {
        particles.current = particles.current.slice(-50);
      }

      animationFrameId.current = requestAnimationFrame(animate);
    };

    // Event listeners
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('resize', setCanvasSize);

    // Start animation
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('resize', setCanvasSize);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[100]"
      style={{
        mixBlendMode: 'multiply',
        opacity: 0.7,
      }}
    />
  );
};

export default InteractiveCursor;
