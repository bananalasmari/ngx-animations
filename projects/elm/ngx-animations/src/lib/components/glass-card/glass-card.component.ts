import { Component, Input, HostBinding, HostListener } from '@angular/core';

@Component({
  selector: 'ngx-glass-card',
  standalone: true,
  template: `
    <div class="glass-card-inner">
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      border-radius: 16px;
      overflow: hidden;
      position: relative;
      cursor: default;
      will-change: transform, box-shadow;
      transition: transform 200ms ease, box-shadow 200ms ease;
    }

    .glass-card-inner {
      position: relative;
      padding: 1.5rem;
      border-radius: inherit;
      background: radial-gradient(circle at top left, rgba(255, 255, 255, 0.25), rgba(255, 255, 255, 0.02));
      backdrop-filter: blur(18px);
      -webkit-backdrop-filter: blur(18px);
      border: 1px solid rgba(255, 255, 255, 0.08);
      box-shadow:
        0 18px 45px rgba(0, 0, 0, 0.45),
        0 0 0 1px rgba(255, 255, 255, 0.03);
      color: #f7fafc;
    }

    :host(.elevated) {
      box-shadow:
        0 24px 60px rgba(0, 0, 0, 0.6),
        0 0 0 1px rgba(255, 255, 255, 0.06);
    }

    :host(.hoverable:hover) {
      transform: translateY(-6px);
    }

    :host(.accent-border) .glass-card-inner {
      border: 1px solid rgba(255, 93, 54, 0.75);
      box-shadow:
        0 22px 55px rgba(255, 93, 54, 0.45),
        0 0 0 1px rgba(255, 255, 255, 0.08);
    }
  `]
})
export class GlassCardComponent {
  /** Slightly larger radius for very rounded cards */
  @Input() borderRadius: string = '16px';

  /** Hover lift effect */
  @Input() hover: boolean = true;

  /** Stronger shadow preset */
  @Input() elevated: boolean = false;

  /** Accent border using the primary color */
  @Input() accent: boolean = false;

  @HostBinding('style.borderRadius')
  get hostRadius() {
    return this.borderRadius;
  }

  @HostBinding('class.hoverable')
  get hoverClass() {
    return this.hover;
  }

  @HostBinding('class.elevated')
  get elevatedClass() {
    return this.elevated;
  }

  @HostBinding('class.accent-border')
  get accentClass() {
    return this.accent;
  }

  // Small tilt-on-hover effect for extra motion
  @HostBinding('style.transform')
  transform: string | null = null;

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (!this.hover) return;
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    const rotateX = y * -6;
    const rotateY = x * 6;
    this.transform = `perspective(700px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.transform = null;
  }
}


