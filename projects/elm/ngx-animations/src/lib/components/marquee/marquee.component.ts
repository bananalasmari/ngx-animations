import {
  Component,
  Input,
  OnInit,
  inject,
  PLATFORM_ID,
  signal
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type MarqueeDirection = 'left' | 'right' | 'up' | 'down';

/**
 * Marquee Component
 * Continuous scrolling text/content with RTL support
 * 
 * @example
 * <ngx-marquee [speed]="50" direction="left">
 *   Scrolling text content here...
 * </ngx-marquee>
 */
@Component({
  selector: 'ngx-marquee',
  standalone: true,
  styleUrls: ['./marquee.component.scss'],
  template: `
    <div class="marquee-container" [class.vertical]="isVertical()" [class.rtl]="rtl">
      <div class="marquee-content" [style]="animationStyle()">
        <div class="marquee-item">
          <ng-content></ng-content>
        </div>
        <div class="marquee-item" aria-hidden="true">
          <ng-content></ng-content>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      overflow: hidden;
    }
    
    .marquee-container {
      position: relative;
      width: 100%;
      height: 100%;
      overflow: hidden;
    }
    
    .marquee-container.rtl {
      direction: rtl;
    }
    
    .marquee-content {
      display: flex;
      width: fit-content;
      animation-timing-function: linear;
      animation-iteration-count: infinite;
    }
    
    .marquee-container.vertical .marquee-content {
      flex-direction: column;
    }
    
    .marquee-item {
      display: flex;
      align-items: center;
      white-space: nowrap;
      padding-right: 2rem;
    }
    
    .marquee-container.vertical .marquee-item {
      padding-right: 0;
      padding-bottom: 2rem;
    }
    
    .marquee-container.rtl .marquee-item {
      padding-right: 0;
      padding-left: 2rem;
    }
  `]
})
export class MarqueeComponent implements OnInit {
  @Input() speed: number = 50; // pixels per second
  @Input() direction: MarqueeDirection = 'left';
  @Input() pauseOnHover: boolean = true;
  @Input() rtl: boolean = false;
  @Input() gap: number = 32; // gap between items in pixels

  protected isVertical = signal(false);
  private platformId = inject(PLATFORM_ID);

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    this.isVertical.set(this.direction === 'up' || this.direction === 'down');
  }

  protected animationStyle(): string {
    const duration = this.calculateDuration();
    const animationName = this.getAnimationName();
    const playState = this.pauseOnHover ? 'running' : 'running';
    
    const styles = [
      `animation-name: ${animationName}`,
      `animation-duration: ${duration}s`,
      `animation-play-state: ${playState}`,
      `gap: ${this.gap}px`
    ];

    if (this.pauseOnHover) {
      styles.push('&:hover { animation-play-state: paused; }');
    }

    return styles.join('; ');
  }

  private calculateDuration(): number {
    // Duration based on speed (slower speed = longer duration)
    return 100 / this.speed;
  }

  private getAnimationName(): string {
    if (this.isVertical()) {
      return this.direction === 'up' ? 'marquee-up' : 'marquee-down';
    }
    
    // For RTL, we might want to reverse the direction
    if (this.rtl) {
      return this.direction === 'left' ? 'marquee-right' : 'marquee-left';
    }
    
    return this.direction === 'left' ? 'marquee-left' : 'marquee-right';
  }
}

