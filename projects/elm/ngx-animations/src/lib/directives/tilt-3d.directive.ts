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
 * 3D Tilt Directive
 * Creates a 3D tilt effect following mouse movement (GSAP-inspired)
 * Perfect for cards and interactive elements
 * 
 * @example
 * <div ngxTilt3d [maxTilt]="15" [perspective]="1000">3D Card</div>
 */
@Directive({
  selector: '[ngxTilt3d]',
  standalone: true
})
export class Tilt3dDirective implements OnInit {
  @Input() maxTilt: number = 20; // Maximum tilt angle in degrees
  @Input() perspective: number = 1000; // Perspective value
  @Input() scale: number = 1.05; // Scale on hover
  @Input() speed: number = 400; // Transition speed in ms
  @Input() glare: boolean = false; // Add glare effect

  private platformId = inject(PLATFORM_ID);

  constructor(private el: ElementRef<HTMLElement>) {}

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const element = this.el.nativeElement;
    element.style.transformStyle = 'preserve-3d';
    element.style.transition = `transform ${this.speed}ms cubic-bezier(0.03, 0.98, 0.52, 0.99)`;
    element.style.willChange = 'transform';

    if (this.glare) {
      this.addGlareEffect();
    }
  }

  private addGlareEffect(): void {
    const glare = document.createElement('div');
    glare.className = 'tilt-glare';
    glare.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.3) 100%);
      opacity: 0;
      pointer-events: none;
      transition: opacity ${this.speed}ms;
      border-radius: inherit;
    `;
    this.el.nativeElement.appendChild(glare);
    this.el.nativeElement.style.position = 'relative';
    this.el.nativeElement.style.overflow = 'hidden';
  }

  @HostListener('mouseenter')
  onMouseEnter(): void {
    const element = this.el.nativeElement;
    element.style.transform = `perspective(${this.perspective}px) scale(${this.scale})`;
    
    if (this.glare) {
      const glare = element.querySelector('.tilt-glare') as HTMLElement;
      if (glare) glare.style.opacity = '1';
    }
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    const element = this.el.nativeElement;
    const rect = element.getBoundingClientRect();
    
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * this.maxTilt;
    const rotateY = ((centerX - x) / centerX) * this.maxTilt;
    
    element.style.transform = 
      `perspective(${this.perspective}px) scale(${this.scale}) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    
    if (this.glare) {
      const glare = element.querySelector('.tilt-glare') as HTMLElement;
      if (glare) {
        const angle = Math.atan2(y - centerY, x - centerX) * (180 / Math.PI);
        glare.style.background = 
          `linear-gradient(${angle}deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.3) 100%)`;
      }
    }
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    const element = this.el.nativeElement;
    element.style.transform = `perspective(${this.perspective}px) rotateX(0deg) rotateY(0deg) scale(1)`;
    
    if (this.glare) {
      const glare = element.querySelector('.tilt-glare') as HTMLElement;
      if (glare) glare.style.opacity = '0';
    }
  }
}

