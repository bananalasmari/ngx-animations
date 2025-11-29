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
 * Parallax Scroll Directive
 * Creates smooth parallax effect on scroll
 * 
 * @example
 * <div ngxParallaxScroll [speed]="0.5">Content</div>
 */
@Directive({
  selector: '[ngxParallaxScroll]',
  standalone: true
})
export class ParallaxScrollDirective implements OnInit, OnDestroy {
  @Input() speed: number = 0.5; // 0 to 1, where 1 is normal scroll speed
  @Input() direction: 'vertical' | 'horizontal' = 'vertical';
  @Input() reverse: boolean = false;

  private platformId = inject(PLATFORM_ID);
  private scrollHandler?: () => void;
  private rafId?: number;

  constructor(private el: ElementRef<HTMLElement>) {}

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const element = this.el.nativeElement;
    element.style.willChange = 'transform';
    element.style.transition = 'transform 0.1s ease-out';

    this.scrollHandler = () => {
      if (this.rafId) {
        cancelAnimationFrame(this.rafId);
      }

      this.rafId = requestAnimationFrame(() => {
        this.updateParallax();
      });
    };

    window.addEventListener('scroll', this.scrollHandler, { passive: true });
    this.updateParallax();
  }

  private updateParallax(): void {
    const element = this.el.nativeElement;
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Calculate how much the element is in view (0 to 1)
    const elementMiddle = rect.top + rect.height / 2;
    const scrollProgress = 1 - (elementMiddle / windowHeight);

    // Apply parallax effect
    const multiplier = this.reverse ? -1 : 1;
    const offset = scrollProgress * 100 * this.speed * multiplier;

    if (this.direction === 'vertical') {
      element.style.transform = `translateY(${offset}px)`;
    } else {
      element.style.transform = `translateX(${offset}px)`;
    }
  }

  ngOnDestroy(): void {
    if (this.scrollHandler) {
      window.removeEventListener('scroll', this.scrollHandler);
    }
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
    }
  }
}

