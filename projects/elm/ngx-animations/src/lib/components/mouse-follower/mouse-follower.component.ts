import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  inject,
  PLATFORM_ID,
  signal
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/**
 * Mouse Follower Component
 * Creates a custom cursor that follows the mouse (GSAP-inspired)
 * Adds a premium feel to any website
 * 
 * @example
 * <ngx-mouse-follower [size]="20" [color]="'#667eea'"></ngx-mouse-follower>
 */
@Component({
  selector: 'ngx-mouse-follower',
  standalone: true,
  template: `
    <div class="mouse-follower" 
         [style.width.px]="size"
         [style.height.px]="size"
         [style.background]="color"
         [style.transform]="transform()"
         [style.opacity]="opacity()">
    </div>
    <div class="mouse-follower-dot"
         [style.width.px]="dotSize"
         [style.height.px]="dotSize"
         [style.background]="dotColor"
         [style.transform]="dotTransform()">
    </div>
  `,
  styles: [`
    :host {
      pointer-events: none;
      position: fixed;
      top: 0;
      left: 0;
      z-index: 9999;
      mix-blend-mode: difference;
    }
    
    .mouse-follower {
      position: fixed;
      border-radius: 50%;
      pointer-events: none;
      transition: transform 0.2s ease-out, opacity 0.3s;
      will-change: transform;
    }
    
    .mouse-follower-dot {
      position: fixed;
      border-radius: 50%;
      pointer-events: none;
      transition: transform 0.1s ease-out;
      will-change: transform;
    }
  `]
})
export class MouseFollowerComponent implements OnInit, OnDestroy {
  @Input() size: number = 40;
  @Input() dotSize: number = 8;
  @Input() color: string = 'rgba(255, 255, 255, 0.5)';
  @Input() dotColor: string = 'rgba(255, 255, 255, 0.8)';
  @Input() speed: number = 0.15;

  protected transform = signal('translate(-50%, -50%)');
  protected dotTransform = signal('translate(-50%, -50%)');
  protected opacity = signal(0);

  private platformId = inject(PLATFORM_ID);
  private mouseX = 0;
  private mouseY = 0;
  private currentX = 0;
  private currentY = 0;
  private dotX = 0;
  private dotY = 0;
  private rafId?: number;
  private mouseMoveHandler?: (e: MouseEvent) => void;

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    this.mouseMoveHandler = (e: MouseEvent) => {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
      this.opacity.set(1);
    };

    window.addEventListener('mousemove', this.mouseMoveHandler);
    this.animate();
  }

  private animate(): void {
    // Smooth follow with lerp
    this.currentX += (this.mouseX - this.currentX) * this.speed;
    this.currentY += (this.mouseY - this.currentY) * this.speed;

    // Dot follows instantly
    this.dotX = this.mouseX;
    this.dotY = this.mouseY;

    this.transform.set(`translate(${this.currentX}px, ${this.currentY}px) translate(-50%, -50%)`);
    this.dotTransform.set(`translate(${this.dotX}px, ${this.dotY}px) translate(-50%, -50%)`);

    this.rafId = requestAnimationFrame(() => this.animate());
  }

  ngOnDestroy(): void {
    if (this.mouseMoveHandler) {
      window.removeEventListener('mousemove', this.mouseMoveHandler);
    }
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
    }
  }
}

