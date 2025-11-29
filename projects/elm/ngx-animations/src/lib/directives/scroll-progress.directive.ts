import {
  Directive,
  ElementRef,
  Input,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter,
  inject,
  PLATFORM_ID
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/**
 * Scroll Progress Directive
 * Animates elements based on scroll progress (GSAP ScrollTrigger-inspired)
 * Perfect for parallax and scroll-driven animations
 * 
 * @example
 * <div ngxScrollProgress [startProgress]="0" [endProgress]="100">Content</div>
 */
@Directive({
  selector: '[ngxScrollProgress]',
  standalone: true
})
export class ScrollProgressDirective implements OnInit, OnDestroy {
  @Input() startProgress: number = 0; // Start at this scroll percentage
  @Input() endProgress: number = 100; // End at this scroll percentage
  @Input() animateOpacity: boolean = true;
  @Input() animateScale: boolean = false;
  @Input() animateX: number = 0; // Translate X distance
  @Input() animateY: number = 0; // Translate Y distance
  @Input() animateRotate: number = 0; // Rotation degrees

  @Output() progressChange = new EventEmitter<number>();

  private platformId = inject(PLATFORM_ID);
  private scrollHandler?: () => void;
  private rafId?: number;

  constructor(private el: ElementRef<HTMLElement>) {}

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const element = this.el.nativeElement;
    element.style.willChange = 'transform, opacity';

    this.scrollHandler = () => {
      if (this.rafId) {
        cancelAnimationFrame(this.rafId);
      }
      this.rafId = requestAnimationFrame(() => this.updateProgress());
    };

    window.addEventListener('scroll', this.scrollHandler, { passive: true });
    this.updateProgress();
  }

  private updateProgress(): void {
    const element = this.el.nativeElement;
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Calculate progress (0 to 1)
    const elementTop = rect.top;
    const elementHeight = rect.height;
    const scrollProgress = (windowHeight - elementTop) / (windowHeight + elementHeight);
    const clampedProgress = Math.max(0, Math.min(1, scrollProgress));

    // Map to start/end range
    const rangeStart = this.startProgress / 100;
    const rangeEnd = this.endProgress / 100;
    const normalizedProgress = (clampedProgress - rangeStart) / (rangeEnd - rangeStart);
    const progress = Math.max(0, Math.min(1, normalizedProgress));

    this.progressChange.emit(progress);

    // Apply transformations
    const transforms: string[] = [];
    
    if (this.animateX !== 0) {
      const x = this.animateX * (1 - progress);
      transforms.push(`translateX(${x}px)`);
    }
    
    if (this.animateY !== 0) {
      const y = this.animateY * (1 - progress);
      transforms.push(`translateY(${y}px)`);
    }
    
    if (this.animateScale) {
      const scale = 0.5 + (progress * 0.5);
      transforms.push(`scale(${scale})`);
    }
    
    if (this.animateRotate !== 0) {
      const rotate = this.animateRotate * progress;
      transforms.push(`rotate(${rotate}deg)`);
    }

    element.style.transform = transforms.join(' ');

    if (this.animateOpacity) {
      element.style.opacity = progress.toString();
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

