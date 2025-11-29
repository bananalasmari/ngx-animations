import {
  Component,
  Input,
  OnInit,
  signal,
  inject,
  PLATFORM_ID
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type OrbitDirection = 'clockwise' | 'counterclockwise';

/**
 * Orbit Animation Component
 * Rotates content in circular orbit around center point
 * 
 * @example
 * <ngx-orbit-animation [radius]="100" [speed]="5">
 *   <div class="planet">🌍</div>
 * </ngx-orbit-animation>
 */
@Component({
  selector: 'ngx-orbit-animation',
  standalone: true,
  template: `
    <div class="orbit-container" [style]="containerStyle()">
      <div class="orbit-path" [style]="orbitPathStyle()">
        <div class="orbit-item" [style]="orbitItemStyle()">
          <ng-content></ng-content>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: inline-block;
    }
    
    .orbit-container {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .orbit-path {
      position: relative;
      border-radius: 50%;
      animation-timing-function: linear;
      animation-iteration-count: infinite;
    }
    
    .orbit-item {
      position: absolute;
      top: 50%;
      left: 50%;
      transform-origin: center;
    }
    
    @keyframes orbit-clockwise {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
    
    @keyframes orbit-counterclockwise {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(-360deg);
      }
    }
  `]
})
export class OrbitAnimationComponent implements OnInit {
  @Input() radius: number = 100; // orbit radius in pixels
  @Input() speed: number = 5; // seconds per revolution
  @Input() direction: OrbitDirection = 'clockwise';
  @Input() startAngle: number = 0; // starting angle in degrees
  @Input() pauseOnHover: boolean = false;
  @Input() showPath: boolean = false;

  private platformId = inject(PLATFORM_ID);

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
  }

  protected containerStyle(): string {
    const size = this.radius * 2;
    return `width: ${size}px; height: ${size}px;`;
  }

  protected orbitPathStyle(): string {
    const size = this.radius * 2;
    const animationName = this.direction === 'clockwise' ? 'orbit-clockwise' : 'orbit-counterclockwise';
    const playState = this.pauseOnHover ? 'paused' : 'running';
    
    const styles = [
      `width: ${size}px`,
      `height: ${size}px`,
      `animation-name: ${animationName}`,
      `animation-duration: ${this.speed}s`,
      `animation-play-state: ${playState}`
    ];

    if (this.showPath) {
      styles.push('border: 2px dashed rgba(0, 0, 0, 0.1)');
    }

    return styles.join('; ');
  }

  protected orbitItemStyle(): string {
    const offset = -this.radius;
    const counterRotation = this.direction === 'clockwise' ? 'orbit-counterclockwise' : 'orbit-clockwise';
    
    return [
      `transform: translate(-50%, -50%) rotate(${this.startAngle}deg) translateX(${this.radius}px)`,
      `animation: ${counterRotation} ${this.speed}s linear infinite`
    ].join('; ');
  }
}

