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

export type ScaleOrigin = 'center' | 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
type EasingFunction = 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'linear' | 'cubic-bezier(0.4, 0, 0.2, 1)';

/**
 * Scale In Directive
 * Scales element from specified origin point
 * 
 * @example
 * <div ngxScaleIn [startScale]="0.5" [duration]="500">Content</div>
 */
@Directive({
  selector: '[ngxScaleIn]',
  standalone: true
})
export class ScaleInDirective implements OnInit, OnDestroy {
  @Input() duration: number = 600;
  @Input() delay: number = 0;
  @Input() easing: EasingFunction = 'cubic-bezier(0.4, 0, 0.2, 1)';
  @Input() startScale: number = 0.5;
  @Input() endScale: number = 1;
  @Input() origin: ScaleOrigin = 'center';
  @Input() triggerOnScroll: boolean = false;
  @Input() threshold: number = 0.1;
  /**
   * When true and triggerOnScroll is enabled, the directive will
   * reset back to the startScale and opacity 0 when the element
   * leaves the viewport so the animation can replay.
   */
  @Input() resetOnExit: boolean = false;

  @Output() animationStart = new EventEmitter<void>();
  @Output() animationEnd = new EventEmitter<void>();

  private observer?: IntersectionObserver;
  private hasAnimated = signal(false);
  private platformId = inject(PLATFORM_ID);

  constructor(private el: ElementRef<HTMLElement>) {}

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const element = this.el.nativeElement;
    
    // Set transform origin
    element.style.transformOrigin = this.getTransformOrigin();
    element.style.transform = `scale(${this.startScale})`;
    element.style.opacity = '0';
    element.style.transition = `transform ${this.duration}ms ${this.easing} ${this.delay}ms, opacity ${this.duration}ms ${this.easing} ${this.delay}ms`;

    if (this.triggerOnScroll) {
      this.setupIntersectionObserver();
    } else {
      this.animate();
    }
  }

  private getTransformOrigin(): string {
    return this.origin.replace('-', ' ');
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
            if (this.resetOnExit) {
              const element = this.el.nativeElement;
              element.style.transform = `scale(${this.startScale})`;
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
      element.style.transform = `scale(${this.endScale})`;
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

