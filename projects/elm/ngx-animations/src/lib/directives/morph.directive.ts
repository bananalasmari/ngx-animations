import {
  Directive,
  ElementRef,
  Input,
  HostListener,
  inject,
  PLATFORM_ID
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/**
 * Morph Directive
 * Creates smooth morphing transitions between shapes (GSAP MorphSVG-inspired)
 * Works with border-radius to create organic shape changes
 * 
 * @example
 * <div ngxMorph [morphOnHover]="true">Morphing element</div>
 */
@Directive({
  selector: '[ngxMorph]',
  standalone: true
})
export class MorphDirective {
  @Input() morphOnHover: boolean = true;
  @Input() morphOnClick: boolean = false;
  @Input() duration: number = 600;
  @Input() continuous: boolean = false;

  private platformId = inject(PLATFORM_ID);
  private intervalId?: ReturnType<typeof setInterval>;
  private originalBorderRadius?: string;

  constructor(private el: ElementRef<HTMLElement>) {}

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const element = this.el.nativeElement;
    this.originalBorderRadius = getComputedStyle(element).borderRadius || '0px';
    element.style.transition = `border-radius ${this.duration}ms cubic-bezier(0.4, 0, 0.2, 1)`;

    if (this.continuous) {
      this.startContinuousMorph();
    }
  }

  @HostListener('mouseenter')
  onMouseEnter(): void {
    if (this.morphOnHover && !this.continuous) {
      this.morph();
    }
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    if (this.morphOnHover && !this.continuous) {
      this.reset();
    }
  }

  @HostListener('click')
  onClick(): void {
    if (this.morphOnClick) {
      this.morph();
      setTimeout(() => this.reset(), this.duration);
    }
  }

  private morph(): void {
    const element = this.el.nativeElement;
    const shapes = this.getRandomShape();
    element.style.borderRadius = shapes;
  }

  private reset(): void {
    const element = this.el.nativeElement;
    element.style.borderRadius = this.originalBorderRadius || '0px';
  }

  private getRandomShape(): string {
    const shapes = [
      '60% 40% 30% 70% / 60% 30% 70% 40%',
      '30% 60% 70% 40% / 50% 60% 30% 60%',
      '60% 40% 60% 40% / 70% 50% 50% 60%',
      '40% 60% 70% 30% / 40% 50% 60% 50%',
      '80% 20% 50% 50% / 60% 70% 30% 40%',
      '50% 50% 30% 70% / 30% 60% 40% 60%'
    ];
    return shapes[Math.floor(Math.random() * shapes.length)];
  }

  private startContinuousMorph(): void {
    this.morph();
    this.intervalId = setInterval(() => {
      this.morph();
    }, this.duration + 500);
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}

