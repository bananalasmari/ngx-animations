import {
  Directive,
  ElementRef,
  Input,
  OnInit,
  OnDestroy,
  inject,
  PLATFORM_ID
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/**
 * Count Up Directive
 * Animates numbers from a start value to an end value.
 *
 * @example
 * <span ngxCountUp [end]="2500" [duration]="1200"></span>
 */
@Directive({
  selector: '[ngxCountUp]',
  standalone: true
})
export class CountUpDirective implements OnInit, OnDestroy {
  /** Starting value */
  @Input() start: number = 0;

  /** Final value */
  @Input() end: number = 100;

  /** Duration in ms */
  @Input() duration: number = 1000;

  /** Decimal places */
  @Input() decimals: number = 0;

  /** Optional prefix (e.g. '$') */
  @Input() prefix: string = '';

  /** Optional suffix (e.g. '%') */
  @Input() suffix: string = '';

  /** Whether to animate on scroll into view */
  @Input() triggerOnScroll: boolean = true;

  /** Intersection threshold */
  @Input() threshold: number = 0.2;

  private platformId = inject(PLATFORM_ID);
  private observer?: IntersectionObserver;
  private startTime = 0;
  private rafId?: number;
  private hasAnimated = false;

  constructor(private el: ElementRef<HTMLElement>) {}

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      this.render(this.end);
      return;
    }

    if (this.triggerOnScroll) {
      this.setupObserver();
    } else {
      this.startAnimation();
    }
  }

  private setupObserver(): void {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!this.hasAnimated) {
              this.startAnimation();
              this.hasAnimated = true;
            }
          } else {
            // Reset so animation can play again on next scroll into view
            this.hasAnimated = false;
            this.render(this.start);
          }
        });
      },
      { threshold: this.threshold }
    );

    this.observer.observe(this.el.nativeElement);
  }

  private startAnimation(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.startTime = performance.now();
    this.animate();
  }

  private animate = (): void => {
    const now = performance.now();
    const elapsed = now - this.startTime;
    const progress = Math.min(elapsed / this.duration, 1);

    const currentValue = this.start + (this.end - this.start) * progress;
    this.render(currentValue);

    if (progress < 1) {
      this.rafId = requestAnimationFrame(this.animate);
    }
  };

  private render(value: number): void {
    const formatted = this.prefix +
      value.toFixed(this.decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',') +
      this.suffix;
    this.el.nativeElement.textContent = formatted;
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    if (this.rafId) cancelAnimationFrame(this.rafId);
  }
}


