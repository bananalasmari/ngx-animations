import {
  Directive,
  ElementRef,
  Input,
  HostListener,
  inject,
  PLATFORM_ID,
  OnInit
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/**
 * Magnetic Directive
 * Creates a magnetic pull effect on hover (GSAP-inspired)
 * Elements follow the mouse cursor when hovering
 * 
 * @example
 * <button ngxMagnetic [strength]="0.5">Magnetic Button</button>
 */
@Directive({
  selector: '[ngxMagnetic]',
  standalone: true
})
export class MagneticDirective implements OnInit {
  @Input() strength: number = 0.4; // 0-1, how strong the magnetic effect is
  @Input() speed: number = 0.3; // 0-1, how fast it follows

  private platformId = inject(PLATFORM_ID);
  private rect?: DOMRect;
  private isHovering = false;
  private currentX = 0;
  private currentY = 0;
  private targetX = 0;
  private targetY = 0;
  private rafId?: number;

  constructor(private el: ElementRef<HTMLElement>) {}

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    
    const element = this.el.nativeElement;
    element.style.transition = 'transform 0.1s ease-out';
    element.style.willChange = 'transform';
  }

  @HostListener('mouseenter')
  onMouseEnter(): void {
    this.isHovering = true;
    this.rect = this.el.nativeElement.getBoundingClientRect();
    this.animate();
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.isHovering = false;
    this.targetX = 0;
    this.targetY = 0;
    
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
    }
    
    // Reset to center
    this.el.nativeElement.style.transform = 'translate(0px, 0px)';
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (!this.isHovering || !this.rect) return;

    const x = event.clientX - this.rect.left - this.rect.width / 2;
    const y = event.clientY - this.rect.top - this.rect.height / 2;

    this.targetX = x * this.strength;
    this.targetY = y * this.strength;
  }

  private animate(): void {
    if (!this.isHovering) return;

    // Smooth lerp (linear interpolation)
    this.currentX += (this.targetX - this.currentX) * this.speed;
    this.currentY += (this.targetY - this.currentY) * this.speed;

    this.el.nativeElement.style.transform = 
      `translate(${this.currentX}px, ${this.currentY}px)`;

    this.rafId = requestAnimationFrame(() => this.animate());
  }
}

