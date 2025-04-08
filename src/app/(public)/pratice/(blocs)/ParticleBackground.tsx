import { useEffect, useRef, ReactNode } from 'react';

interface StarsProps {
  children?: ReactNode;
  velocity?: number;
  radius?: number;
  stars?: number;
}

class Star {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  center: { x: number; y: number };
  x: number;
  y: number;
  x0: number;
  y0: number;
  vel: { x: number; y: number };
  lineWidth: number = 0;
  radius: number;

  constructor(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, center: { x: number; y: number }, radius: number) {
    this.canvas = canvas;
    this.context = context;
    this.center = center;
    this.x = center.x;
    this.y = center.y;
    this.x0 = center.x;
    this.y0 = center.y;
    this.vel = {
      x: Math.random() * 10 - 5,
      y: Math.random() * 10 - 5,
    };
    this.radius = Math.random() * radius;
  }

  update() {
    this.vel.x *= 1.05;
    this.vel.y *= 1.05;
    this.lineWidth += 0.035;

    this.x0 = this.x;
    this.y0 = this.y;
    this.x += this.vel.x;
    this.y += this.vel.y;

    this.draw();

    if (this.isDead()) this.reset();
  }

  draw() {
    this.context.beginPath();
    this.context.moveTo(this.x0, this.y0);
    this.context.lineTo(this.x, this.y);
    this.context.lineWidth = this.lineWidth;
    this.context.stroke();
  }

  reset() {
    this.x = this.center.x;
    this.y = this.center.y;
    this.lineWidth = 0;
    this.vel = {
      x: Math.random() * 10 - 5,
      y: Math.random() * 10 - 5,
    };
  }

  isDead() {
    return (
      this.x < 0 ||
      this.x > this.canvas.width ||
      this.y < 0 ||
      this.y > this.canvas.height
    );
  }
}

export default function BackgroundStars({
  children,
  velocity = 0.1,
  radius = 1,
  stars = 1,
}: StarsProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const starsRef = useRef<Star[]>([]);
  const centerRef = useRef({ x: 0, y: 0 });
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    contextRef.current = context;
    context.lineCap = 'round';

    const center = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    };
    centerRef.current = center;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      center.x = canvas.width / 2;
      center.y = canvas.height / 2;
    };

    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < stars; i++) {
      setTimeout(() => {
        if (canvasRef.current && contextRef.current && centerRef.current) {
          starsRef.current.push(new Star(canvasRef.current, contextRef.current, centerRef.current, radius));
        }
      }, i * 30);
    }

    const render = () => {
      if (!contextRef.current) return;

      contextRef.current.fillStyle = 'rgb(0, 0, 0)';
      contextRef.current.fillRect(0, 0, canvas.width, canvas.height);
      contextRef.current.strokeStyle = 'white';

      starsRef.current.forEach((s) => s.update());

      requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, [velocity, radius, stars]);

  return (
    <div style={{ position: 'relative', width: '100vw', minHeight: '100vh' }}>
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed', // <- importante: fixado no fundo da tela
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        backgroundColor: '#000',
      }}
    />
    <div style={{ position: 'relative', zIndex: 1 }}>
      {children}
    </div>
  </div>
  );
}
