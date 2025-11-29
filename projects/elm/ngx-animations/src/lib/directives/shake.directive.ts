import {
  Directive,
  ElementRef,
  Input,
  HostListener,
  inject,
  PLATFORM_ID
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type ShakeIntensity = 'soft' | 'medium' | 'hard';

/**
 * Shake Directive
 * Creates a shake/wobble effect on interaction or programmatically
 * 
 * @example
 * <div ngxShake [shakeOnHover]="true" intensity="medium">Shake on hover!</div>
 */
@Directive({
  selector: '[ngxShake]',
  standalone: true
})
export class ShakeDirective {
  @Input() intensity: ShakeIntensity = 'medium';
  @Input() duration: number = 500;
  @Input() shakeOnHover: boolean = false;
  @Input() shakeOnClick: boolean = false;
  @Input() continuous: boolean = false;

  private platformId = inject(PLATFORM_ID);
  private intervalId?: ReturnType<typeof setInterval>;

  constructor(private el: ElementRef<HTMLElement>) {}

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    if (this.continuous) {
      this.startContinuousShake();
    }
  }

  @HostListener('mouseenter')
  onMouseEnter(): void {
    if (this.shakeOnHover) {
      this.shake();
    }
  }

  @HostListener('click')
  onClick(): void {
    if (this.shakeOnClick) {
      this.shake();
    }
  }

  private getShakeDistance(): number {
    switch (this.intensity) {
      case 'soft':
        return 5;
      case 'medium':
        return 10;
      case 'hard':
        return 15;
      default:
        return 10;
    }
  }

  shake(): void {
    const element = this.el.nativeElement;
    const distance = this.getShakeDistance();

    const keyframes = [
      { transform: 'translateX(0)' },
      { transform: `translateX(-${distance}px)` },
      { transform: `translateX(${distance}px)` },
      { transform: `translateX(-${distance}px)` },
      { transform: `translateX(${distance}px)` },
      { transform: `translateX(-${distance / 2}px)` },
      { transform: `translateX(${distance / 2}px)` },
      { transform: 'translateX(0)' }
    ];

    element.animate(keyframes, {
      duration: this.duration,
      easing: 'ease-in-out'
    });
  }

  private startContinuousShake(): void {
    this.shake();
    this.intervalId = setInterval(() => {
      this.shake();
    }, this.duration + 2000);
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}

