import {
  Directive,
  ElementRef,
  Input,
  HostListener,
  inject,
  PLATFORM_ID,
  OnInit
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/**
 * Hover Lift Directive
 * Adds a subtle scale + shadow effect on hover.
 *
 * Useful for cards, buttons, and tiles.
 *
 * @example
 * <div ngxHoverLift [liftScale]="1.03" [shadowStrength]="0.25">Card</div>
 */
@Directive({
  selector: '[ngxHoverLift]',
  standalone: true
})
export class HoverLiftDirective implements OnInit {
  /** Scale factor on hover (1 = no scale) */
  @Input() liftScale: number = 1.03;

  /** Shadow strength 0–1 */
  @Input() shadowStrength: number = 0.25;

  /** Transition duration in ms */
  @Input() hoverDuration: number = 200;

  private platformId = inject(PLATFORM_ID);
  private originalTransform = '';
  private originalBoxShadow = '';

  constructor(private el: ElementRef<HTMLElement>) {}

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const element = this.el.nativeElement;
    const style = getComputedStyle(element);
    this.originalTransform = style.transform === 'none' ? '' : style.transform;
    this.originalBoxShadow = style.boxShadow || 'none';

    element.style.transition =
      element.style.transition ||
      `transform ${this.hoverDuration}ms ease-out, box-shadow ${this.hoverDuration}ms ease-out`;
    element.style.willChange = 'transform, box-shadow';
  }

  @HostListener('mouseenter')
  onEnter(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    const element = this.el.nativeElement;

    const shadowAlpha = this.shadowStrength;
    const shadow = `0 12px 25px rgba(0, 0, 0, ${shadowAlpha})`;

    element.style.transform = `${this.originalTransform} scale(${this.liftScale})`.trim();
    element.style.boxShadow = shadow;
  }

  @HostListener('mouseleave')
  onLeave(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    const element = this.el.nativeElement;
    element.style.transform = this.originalTransform || 'none';
    element.style.boxShadow = this.originalBoxShadow;
  }
}


