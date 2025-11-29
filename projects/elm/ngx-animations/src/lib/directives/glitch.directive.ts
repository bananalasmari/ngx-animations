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
 * Glitch Directive
 * Creates a cool glitch/distortion effect
 * 
 * @example
 * <div ngxGlitch [intensity]="5" [speed]="3000">Glitchy text!</div>
 */
@Directive({
  selector: '[ngxGlitch]',
  standalone: true
})
export class GlitchDirective implements OnInit, OnDestroy {
  @Input() intensity: number = 3; // 1-10, higher = more glitch
  @Input() speed: number = 3000; // how often glitch occurs (ms)
  @Input() duration: number = 200; // how long each glitch lasts
  @Input() continuous: boolean = true;

  private platformId = inject(PLATFORM_ID);
  private intervalId?: ReturnType<typeof setInterval>;

  constructor(private el: ElementRef<HTMLElement>) {}

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const element = this.el.nativeElement;
    element.style.position = 'relative';
    element.style.display = 'inline-block';

    if (this.continuous) {
      this.startGlitching();
    }
  }

  private startGlitching(): void {
    this.intervalId = setInterval(() => {
      this.glitch();
    }, this.speed);
  }

  private glitch(): void {
    const element = this.el.nativeElement;
    const originalText = element.textContent || '';

    // Create glitch effect with text-shadow and transform
    const glitchKeyframes = [
      {
        transform: 'translate(0, 0)',
        textShadow: `${this.intensity}px 0 red, -${this.intensity}px 0 blue`,
        offset: 0
      },
      {
        transform: `translate(${this.intensity}px, ${this.intensity}px)`,
        textShadow: `-${this.intensity}px 0 red, ${this.intensity}px 0 cyan`,
        offset: 0.25
      },
      {
        transform: `translate(-${this.intensity}px, -${this.intensity}px)`,
        textShadow: `${this.intensity}px 0 green, -${this.intensity}px 0 magenta`,
        offset: 0.5
      },
      {
        transform: `translate(${this.intensity}px, -${this.intensity}px)`,
        textShadow: `-${this.intensity}px 0 yellow, ${this.intensity}px 0 blue`,
        offset: 0.75
      },
      {
        transform: 'translate(0, 0)',
        textShadow: 'none',
        offset: 1
      }
    ];

    element.animate(glitchKeyframes, {
      duration: this.duration,
      easing: 'steps(4)'
    });
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}

