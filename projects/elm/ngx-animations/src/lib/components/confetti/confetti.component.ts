import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  ElementRef,
  ViewChild,
  signal,
  inject,
  PLATFORM_ID
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  rotationSpeed: number;
  color: string;
  size: number;
  opacity: number;
}

/**
 * Confetti Component
 * Creates a celebratory confetti explosion effect
 * 
 * @example
 * <ngx-confetti [particleCount]="100" [duration]="3000"></ngx-confetti>
 */
@Component({
  selector: 'ngx-confetti',
  standalone: true,
  template: `
    <canvas #canvas [style.width.px]="width" [style.height.px]="height"></canvas>
  `,
  styles: [`
    :host {
      display: block;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 9999;
    }
    
    canvas {
      width: 100%;
      height: 100%;
    }
  `]
})
export class ConfettiComponent implements OnInit, OnDestroy {
  @Input() particleCount: number = 150;
  @Input() duration: number = 3000;
  @Input() colors: string[] = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
  @Input() autoStart: boolean = true;

  @ViewChild('canvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;

  protected width = signal(window.innerWidth);
  protected height = signal(window.innerHeight);

  private platformId = inject(PLATFORM_ID);
  private ctx?: CanvasRenderingContext2D;
  private particles: Particle[] = [];
  private animationId?: number;
  private startTime?: number;

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const canvasEl = this.canvas.nativeElement;
    canvasEl.width = window.innerWidth;
    canvasEl.height = window.innerHeight;
    
    this.ctx = canvasEl.getContext('2d')!;

    window.addEventListener('resize', () => this.onResize());

    if (this.autoStart) {
      this.start();
    }
  }

  private onResize(): void {
    const canvasEl = this.canvas.nativeElement;
    canvasEl.width = window.innerWidth;
    canvasEl.height = window.innerHeight;
    this.width.set(window.innerWidth);
    this.height.set(window.innerHeight);
  }

  start(): void {
    this.createParticles();
    this.startTime = Date.now();
    this.animate();
  }

  private createParticles(): void {
    this.particles = [];
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    for (let i = 0; i < this.particleCount; i++) {
      const angle = (Math.PI * 2 * i) / this.particleCount;
      const velocity = 5 + Math.random() * 10;

      this.particles.push({
        x: centerX,
        y: centerY,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity - Math.random() * 5,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10,
        color: this.colors[Math.floor(Math.random() * this.colors.length)],
        size: 8 + Math.random() * 8,
        opacity: 1
      });
    }
  }

  private animate(): void {
    if (!this.ctx || !this.startTime) return;

    const elapsed = Date.now() - this.startTime;
    if (elapsed > this.duration) {
      this.stop();
      return;
    }

    this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    this.particles.forEach((particle) => {
      // Update position
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.vy += 0.5; // gravity
      particle.rotation += particle.rotationSpeed;

      // Fade out towards end
      const fadeStart = this.duration * 0.7;
      if (elapsed > fadeStart) {
        particle.opacity = 1 - (elapsed - fadeStart) / (this.duration - fadeStart);
      }

      // Draw particle
      if (this.ctx) {
        this.ctx.save();
        this.ctx.translate(particle.x, particle.y);
        this.ctx.rotate((particle.rotation * Math.PI) / 180);
        this.ctx.globalAlpha = particle.opacity;
        this.ctx.fillStyle = particle.color;
        
        // Draw rectangle confetti
        this.ctx.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size);
        
        this.ctx.restore();
      }
    });

    this.animationId = requestAnimationFrame(() => this.animate());
  }

  stop(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = undefined;
    }
    if (this.ctx) {
      this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    }
  }

  ngOnDestroy(): void {
    this.stop();
    window.removeEventListener('resize', () => this.onResize());
  }
}

