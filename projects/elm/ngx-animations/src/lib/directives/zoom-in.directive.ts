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

export type ZoomStyle = 'smooth' | 'bounce' | 'elastic';

/**
 * Zoom In Directive
 * Creates various zoom-in effects with different styles
 * 
 * @example
 * <div ngxZoomIn style="bounce" [intensity]="1.5">Zoom content!</div>
 */
@Directive({
  selector: '[ngxZoomIn]',
  standalone: true
})
export class ZoomInDirective implements OnInit, OnDestroy {
  @Input() duration: number = 600;
  @Input() delay: number = 0;
  @Input() style: ZoomStyle = 'smooth';
  @Input() intensity: number = 1.2; // peak zoom scale
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
    element.style.opacity = '0';
    element.style.transform = 'scale(0)';

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
      const keyframes = this.getKeyframes();

      element.animate(keyframes, {
        duration: this.duration,
        easing: this.getEasing(),
        fill: 'forwards'
      });

      setTimeout(() => {
        element.style.opacity = '1';
        element.style.transform = 'scale(1)';
        this.animationEnd.emit();
      }, this.duration);
    }, this.delay);
  }

  private getKeyframes(): Keyframe[] {
    switch (this.style) {
      case 'smooth':
        return [
          { transform: 'scale(0)', opacity: '0', offset: 0 },
          { transform: 'scale(1)', opacity: '1', offset: 1 }
        ];

      case 'bounce':
        return [
          { transform: 'scale(0)', opacity: '0', offset: 0 },
          { transform: `scale(${this.intensity})`, opacity: '1', offset: 0.6 },
          { transform: 'scale(0.9)', opacity: '1', offset: 0.8 },
          { transform: 'scale(1)', opacity: '1', offset: 1 }
        ];

      case 'elastic':
        return [
          { transform: 'scale(0)', opacity: '0', offset: 0 },
          { transform: `scale(${this.intensity})`, opacity: '1', offset: 0.5 },
          { transform: 'scale(0.85)', opacity: '1', offset: 0.7 },
          { transform: 'scale(1.05)', opacity: '1', offset: 0.85 },
          { transform: 'scale(1)', opacity: '1', offset: 1 }
        ];

      default:
        return [
          { transform: 'scale(0)', opacity: '0', offset: 0 },
          { transform: 'scale(1)', opacity: '1', offset: 1 }
        ];
    }
  }

  private getEasing(): string {
    switch (this.style) {
      case 'smooth':
        return 'cubic-bezier(0.4, 0, 0.2, 1)';
      case 'bounce':
        return 'ease-out';
      case 'elastic':
        return 'ease-out';
      default:
        return 'ease-out';
    }
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}

