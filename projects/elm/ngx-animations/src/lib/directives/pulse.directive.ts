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
 * Pulse Directive
 * Creates a continuous pulsing/heartbeat effect
 * 
 * @example
 * <div ngxPulse [speed]="1000" [scale]="1.1">Pulsing content!</div>
 */
@Directive({
  selector: '[ngxPulse]',
  standalone: true
})
export class PulseDirective implements OnInit, OnDestroy {
  @Input() speed: number = 1000; // duration of one pulse cycle
  @Input() scale: number = 1.05; // how much to scale (1.0 = no scale, 1.1 = 10% larger)
  @Input() continuous: boolean = true;
  @Input() pauseOnHover: boolean = false;

  private platformId = inject(PLATFORM_ID);
  private animation?: Animation;

  constructor(private el: ElementRef<HTMLElement>) {}

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const element = this.el.nativeElement;
    element.style.willChange = 'transform';

    if (this.continuous) {
      this.startPulse();
    }

    if (this.pauseOnHover) {
      element.addEventListener('mouseenter', () => this.pause());
      element.addEventListener('mouseleave', () => this.resume());
    }
  }

  private startPulse(): void {
    const element = this.el.nativeElement;

    const keyframes = [
      { transform: 'scale(1)', offset: 0 },
      { transform: `scale(${this.scale})`, offset: 0.5 },
      { transform: 'scale(1)', offset: 1 }
    ];

    this.animation = element.animate(keyframes, {
      duration: this.speed,
      iterations: Infinity,
      easing: 'ease-in-out'
    });
  }

  private pause(): void {
    if (this.animation) {
      this.animation.pause();
    }
  }

  private resume(): void {
    if (this.animation) {
      this.animation.play();
    }
  }

  ngOnDestroy(): void {
    if (this.animation) {
      this.animation.cancel();
    }
  }
}

