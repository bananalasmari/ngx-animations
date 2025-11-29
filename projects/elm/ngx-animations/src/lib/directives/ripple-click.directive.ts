import {
  Directive,
  ElementRef,
  Input,
  HostListener,
  inject,
  PLATFORM_ID,
  Renderer2
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/**
 * Ripple Click Directive
 * Creates Material Design-style ripple effect on click
 * Modern and performant implementation
 * 
 * @example
 * <button ngxRippleClick [rippleColor]="'rgba(255, 255, 255, 0.5)'">Click me</button>
 */
@Directive({
  selector: '[ngxRippleClick]',
  standalone: true
})
export class RippleClickDirective {
  @Input() rippleColor: string = 'rgba(255, 255, 255, 0.5)';
  @Input() rippleDuration: number = 600;
  @Input() rippleRadius: number = 0; // 0 means auto-calculate
  @Input() centered: boolean = false;

  private platformId = inject(PLATFORM_ID);
  private renderer = inject(Renderer2);

  constructor(private el: ElementRef<HTMLElement>) {
    this.setupHostElement();
  }

  private setupHostElement(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const element = this.el.nativeElement;
    const position = getComputedStyle(element).position;
    
    if (position === 'static') {
      this.renderer.setStyle(element, 'position', 'relative');
    }
    
    this.renderer.setStyle(element, 'overflow', 'hidden');
    this.renderer.setStyle(element, 'user-select', 'none');
    this.renderer.setStyle(element, '-webkit-tap-highlight-color', 'transparent');
  }

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent): void {
    if (!isPlatformBrowser(this.platformId)) return;

    this.createRipple(event);
  }

  private createRipple(event: MouseEvent): void {
    const element = this.el.nativeElement;
    const rect = element.getBoundingClientRect();

    // Calculate ripple position
    let x: number, y: number;
    
    if (this.centered) {
      x = rect.width / 2;
      y = rect.height / 2;
    } else {
      x = event.clientX - rect.left;
      y = event.clientY - rect.top;
    }

    // Calculate ripple size
    const radius = this.rippleRadius || Math.max(
      Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)),
      Math.sqrt(Math.pow(rect.width - x, 2) + Math.pow(y, 2)),
      Math.sqrt(Math.pow(x, 2) + Math.pow(rect.height - y, 2)),
      Math.sqrt(Math.pow(rect.width - x, 2) + Math.pow(rect.height - y, 2))
    );

    // Create ripple element
    const ripple = this.renderer.createElement('span');
    this.renderer.addClass(ripple, 'ngx-ripple');
    
    // Apply styles
    const styles = {
      'position': 'absolute',
      'border-radius': '50%',
      'background-color': this.rippleColor,
      'width': `${radius * 2}px`,
      'height': `${radius * 2}px`,
      'left': `${x - radius}px`,
      'top': `${y - radius}px`,
      'transform': 'scale(0)',
      'opacity': '1',
      'pointer-events': 'none',
      'transition': `transform ${this.rippleDuration}ms cubic-bezier(0.4, 0, 0.2, 1), opacity ${this.rippleDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`
    };

    Object.entries(styles).forEach(([key, value]) => {
      this.renderer.setStyle(ripple, key, value);
    });

    // Add to DOM
    this.renderer.appendChild(element, ripple);

    // Trigger animation
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        this.renderer.setStyle(ripple, 'transform', 'scale(1)');
        this.renderer.setStyle(ripple, 'opacity', '0');
      });
    });

    // Remove after animation
    setTimeout(() => {
      this.renderer.removeChild(element, ripple);
    }, this.rippleDuration);
  }
}

