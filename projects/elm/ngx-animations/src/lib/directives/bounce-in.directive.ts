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

export type BounceDirection = 'up' | 'down' | 'left' | 'right' | 'center';
type EasingFunction = 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'linear';

/**
 * Bounce In Directive
 * Creates a playful bounce effect when element appears
 * 
 * @example
 * <div ngxBounceIn direction="up" [duration]="800">Bouncy content!</div>
 */
@Directive({
  selector: '[ngxBounceIn]',
  standalone: true
})
export class BounceInDirective implements OnInit, OnDestroy {
  @Input() duration: number = 800;
  @Input() delay: number = 0;
  @Input() direction: BounceDirection = 'up';
  @Input() distance: number = 50;
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
    
    // Set initial state
    this.setInitialState(element);

    if (this.triggerOnScroll) {
      this.setupIntersectionObserver();
    } else {
      this.animate();
    }
  }

  private setInitialState(element: HTMLElement): void {
    element.style.opacity = '0';
    element.style.transform = this.getInitialTransform();
  }

  private getInitialTransform(): string {
    switch (this.direction) {
      case 'up':
        return `translateY(${this.distance}px) scale(0.3)`;
      case 'down':
        return `translateY(-${this.distance}px) scale(0.3)`;
      case 'left':
        return `translateX(${this.distance}px) scale(0.3)`;
      case 'right':
        return `translateX(-${this.distance}px) scale(0.3)`;
      case 'center':
        return 'scale(0.3)';
      default:
        return 'scale(0.3)';
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
      // Create bounce keyframes animation
      const keyframes = [
        { transform: this.getInitialTransform(), opacity: '0', offset: 0 },
        { transform: 'translate(0, 0) scale(1.1)', opacity: '1', offset: 0.6 },
        { transform: 'translate(0, 0) scale(0.95)', opacity: '1', offset: 0.8 },
        { transform: 'translate(0, 0) scale(1.02)', opacity: '1', offset: 0.9 },
        { transform: 'translate(0, 0) scale(1)', opacity: '1', offset: 1 }
      ];

      element.animate(keyframes, {
        duration: this.duration,
        easing: 'ease-out',
        fill: 'forwards'
      });

      setTimeout(() => {
        element.style.opacity = '1';
        element.style.transform = 'translate(0, 0) scale(1)';
        this.animationEnd.emit();
      }, this.duration);
    }, this.delay);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}

