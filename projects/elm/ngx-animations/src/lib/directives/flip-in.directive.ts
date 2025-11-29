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

export type FlipAxis = 'horizontal' | 'vertical' | 'diagonal';

/**
 * Flip In Directive
 * Creates a 3D flip animation effect
 * 
 * @example
 * <div ngxFlipIn axis="horizontal" [duration]="600">Flip me!</div>
 */
@Directive({
  selector: '[ngxFlipIn]',
  standalone: true
})
export class FlipInDirective implements OnInit, OnDestroy {
  @Input() duration: number = 600;
  @Input() delay: number = 0;
  @Input() axis: FlipAxis = 'horizontal';
  @Input() triggerOnScroll: boolean = false;
  @Input() threshold: number = 0.1;

  @Output() animationStart = new EventEmitter<void>();
  @Output() animationEnd = new EventEmitter<void>();

  private observer?: IntersectionObserver;
  private hasAnimated = signal(false);
  private platformId = inject(PLATFORM_ID);

  constructor(private el: ElementRef<HTMLElement>) {}

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const element = this.el.nativeElement;
    
    // Add perspective to parent for 3D effect
    const parent = element.parentElement;
    if (parent) {
      parent.style.perspective = '1000px';
    }

    // Set initial state
    element.style.opacity = '0';
    element.style.transform = this.getInitialTransform();
    element.style.backfaceVisibility = 'visible';

    if (this.triggerOnScroll) {
      this.setupIntersectionObserver();
    } else {
      this.animate();
    }
  }

  private getInitialTransform(): string {
    switch (this.axis) {
      case 'horizontal':
        return 'rotateY(-90deg)';
      case 'vertical':
        return 'rotateX(-90deg)';
      case 'diagonal':
        return 'rotate3d(1, 1, 0, -90deg)';
      default:
        return 'rotateY(-90deg)';
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

    setTimeout(() => {
      element.style.transition = `all ${this.duration}ms cubic-bezier(0.4, 0, 0.2, 1)`;
      element.style.opacity = '1';
      element.style.transform = 'rotate3d(0, 0, 0, 0deg)';

      setTimeout(() => {
        this.animationEnd.emit();
      }, this.duration);
    }, this.delay);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}

