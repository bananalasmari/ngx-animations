import {
  Directive,
  ElementRef,
  Input,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy,
  signal,
  inject,
  PLATFORM_ID
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type SlideDirection = 'left' | 'right' | 'top' | 'bottom';
type EasingFunction = 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'linear' | 'cubic-bezier(0.4, 0, 0.2, 1)';

/**
 * Slide In Directive
 * Slides element from specified direction with RTL support
 * 
 * @example
 * <div ngxSlideIn direction="left" [duration]="500">Content</div>
 */
@Directive({
  selector: '[ngxSlideIn]',
  standalone: true
})
export class SlideInDirective implements OnInit, OnDestroy {
  @Input() duration: number = 600;
  @Input() delay: number = 0;
  @Input() easing: EasingFunction = 'cubic-bezier(0.4, 0, 0.2, 1)';
  @Input() direction: SlideDirection = 'left';
  @Input() distance: number = 50;
  @Input() triggerOnScroll: boolean = false;
  @Input() threshold: number = 0.1;
  @Input() rtl: boolean = false;
  /**
   * When true and triggerOnScroll is enabled, the directive will
   * reset back to its initial offset + opacity 0 when the element
   * leaves the viewport so the animation can replay.
   */
  @Input() resetOnExit: boolean = false;

  @Output() animationStart = new EventEmitter<void>();
  @Output() animationEnd = new EventEmitter<void>();

  private observer?: IntersectionObserver;
  private hasAnimated = signal(false);
  private platformId = inject(PLATFORM_ID);
  private initialTransform: string | null = null;

  constructor(private el: ElementRef<HTMLElement>) {}

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const element = this.el.nativeElement;
    
    // Detect RTL from element or input
    const isRTL = this.rtl || getComputedStyle(element).direction === 'rtl';
    
    // Adjust direction for RTL
    let actualDirection = this.direction;
    if (isRTL) {
      if (this.direction === 'left') actualDirection = 'right';
      else if (this.direction === 'right') actualDirection = 'left';
    }

    // Set initial transform
    const transform = this.getTransform(actualDirection, this.distance);
    this.initialTransform = transform;
    element.style.transform = transform;
    element.style.opacity = '0';
    element.style.transition = `transform ${this.duration}ms ${this.easing} ${this.delay}ms, opacity ${this.duration}ms ${this.easing} ${this.delay}ms`;

    if (this.triggerOnScroll) {
      this.setupIntersectionObserver();
    } else {
      this.animate();
    }
  }

  private getTransform(direction: SlideDirection, distance: number): string {
    switch (direction) {
      case 'left':
        return `translateX(-${distance}px)`;
      case 'right':
        return `translateX(${distance}px)`;
      case 'top':
        return `translateY(-${distance}px)`;
      case 'bottom':
        return `translateY(${distance}px)`;
      default:
        return 'translateX(0)';
    }
  }

  private setupIntersectionObserver(): void {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.animate();
            this.hasAnimated.set(true);
          } else {
            // Optionally reset to initial state so animation can replay
            if (this.resetOnExit && this.initialTransform !== null) {
              const element = this.el.nativeElement;
              element.style.transform = this.initialTransform;
              element.style.opacity = '0';
            }
            this.hasAnimated.set(false);
          }
        });
      },
      { threshold: this.threshold }
    );

    this.observer.observe(this.el.nativeElement);
  }

  private animate(): void {
    const element = this.el.nativeElement;
    
    this.animationStart.emit();

    requestAnimationFrame(() => {
      element.style.transform = 'translate(0, 0)';
      element.style.opacity = '1';
    });

    setTimeout(() => {
      this.animationEnd.emit();
    }, this.duration + this.delay);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}

