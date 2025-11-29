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

export type RotateAxis = 'x' | 'y' | 'z';
type EasingFunction = 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'linear' | 'cubic-bezier(0.4, 0, 0.2, 1)';

/**
 * Rotate In Directive
 * Rotates element on specified axis
 * 
 * @example
 * <div ngxRotateIn axis="y" [degrees]="90">Content</div>
 */
@Directive({
  selector: '[ngxRotateIn]',
  standalone: true
})
export class RotateInDirective implements OnInit, OnDestroy {
  @Input() duration: number = 600;
  @Input() delay: number = 0;
  @Input() easing: EasingFunction = 'cubic-bezier(0.4, 0, 0.2, 1)';
  @Input() axis: RotateAxis = 'z';
  @Input() degrees: number = 180;
  @Input() triggerOnScroll: boolean = false;
  @Input() threshold: number = 0.1;
  /**
   * When true and triggerOnScroll is enabled, the directive will
   * reset back to its initial rotated state with opacity 0 when the
   * element leaves the viewport so the animation can replay.
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
    
    // Set initial rotation
    const initial = this.getRotateTransform(this.degrees);
    this.initialTransform = initial;
    element.style.transform = initial;
    element.style.opacity = '0';
    element.style.transition = `transform ${this.duration}ms ${this.easing} ${this.delay}ms, opacity ${this.duration}ms ${this.easing} ${this.delay}ms`;

    if (this.triggerOnScroll) {
      this.setupIntersectionObserver();
    } else {
      this.animate();
    }
  }

  private getRotateTransform(degrees: number): string {
    switch (this.axis) {
      case 'x':
        return `rotateX(${degrees}deg)`;
      case 'y':
        return `rotateY(${degrees}deg)`;
      case 'z':
        return `rotateZ(${degrees}deg)`;
      default:
        return `rotate(${degrees}deg)`;
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
      element.style.transform = this.getRotateTransform(0);
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

