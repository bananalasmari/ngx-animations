import {
  Directive,
  ElementRef,
  Input,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy,
  effect,
  signal,
  inject,
  PLATFORM_ID
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type FadeDirection = 'in' | 'out' | 'in-out';
export type EasingFunction = 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'linear' | 'cubic-bezier(0.4, 0, 0.2, 1)';

/**
 * Fade In/Out Directive
 * Applies smooth fade animations to any element
 * 
 * @example
 * <div ngxFadeIn [duration]="500" [delay]="100">Content</div>
 */
@Directive({
  selector: '[ngxFadeIn]',
  standalone: true
})
export class FadeInDirective implements OnInit, OnDestroy {
  @Input() duration: number = 600;
  @Input() delay: number = 0;
  @Input() easing: EasingFunction = 'ease-out';
  @Input() direction: FadeDirection = 'in';
  @Input() triggerOnScroll: boolean = false;
  @Input() threshold: number = 0.1;
  @Input() startOpacity: number = 0;
  @Input() endOpacity: number = 1;
  /**
   * When true and triggerOnScroll is enabled, the directive will
   * reset back to the startOpacity when the element leaves the viewport
   * so the animation can replay on the next entry.
   */
  @Input() resetOnExit: boolean = false;

  @Output() animationStart = new EventEmitter<void>();
  @Output() animationEnd = new EventEmitter<void>();

  private observer?: IntersectionObserver;
  private hasAnimated = signal(false);
  private platformId = inject(PLATFORM_ID);

  constructor(private el: ElementRef<HTMLElement>) {}

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      // SSR: Set final state
      const element = this.el.nativeElement;
      element.style.opacity = this.endOpacity.toString();
      return;
    }

    const element = this.el.nativeElement;
    
    // Set initial state
    element.style.opacity = this.startOpacity.toString();
    element.style.transition = `opacity ${this.duration}ms ${this.easing} ${this.delay}ms`;

    if (this.triggerOnScroll) {
      this.setupIntersectionObserver();
    } else {
      this.animate();
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
            if (this.resetOnExit) {
              const element = this.el.nativeElement;
              element.style.opacity = this.startOpacity.toString();
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
    if (!isPlatformBrowser(this.platformId)) {
      // SSR: Set final state immediately
      const element = this.el.nativeElement;
      element.style.opacity = this.endOpacity.toString();
      return;
    }

    const element = this.el.nativeElement;
    
    this.animationStart.emit();

    // Trigger animation on next frame
    requestAnimationFrame(() => {
      if (this.direction === 'in' || this.direction === 'in-out') {
        element.style.opacity = this.endOpacity.toString();
      } else {
        element.style.opacity = this.startOpacity.toString();
      }
    });

    // Emit end event after animation completes
    setTimeout(() => {
      this.animationEnd.emit();
    }, this.duration + this.delay);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}

