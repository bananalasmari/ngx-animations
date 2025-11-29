import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
  ElementRef,
  ViewChild,
  signal,
  inject,
  PLATFORM_ID
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type RevealAnimation = 'fade' | 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right' | 'scale' | 'rotate';

/**
 * Scroll Reveal Component
 * Reveals content when it comes into viewport
 * 
 * @example
 * <ngx-scroll-reveal animation="slide-up">
 *   <h1>Content to reveal</h1>
 * </ngx-scroll-reveal>
 */
@Component({
  selector: 'ngx-scroll-reveal',
  standalone: true,
  template: `
    <div #container [class.revealed]="isRevealed()" [style]="containerStyle()">
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
    
    div {
      transition-property: opacity, transform;
      transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .revealed {
      opacity: 1 !important;
      transform: translate(0, 0) scale(1) rotate(0) !important;
    }
  `]
})
export class ScrollRevealComponent implements OnInit, OnDestroy {
  @Input() animation: RevealAnimation = 'fade';
  @Input() duration: number = 600;
  @Input() delay: number = 0;
  @Input() threshold: number = 0.1;
  @Input() once: boolean = true;
  @Input() distance: number = 50;

  @Output() revealed = new EventEmitter<void>();
  @Output() hidden = new EventEmitter<void>();

  @ViewChild('container', { static: true }) container!: ElementRef<HTMLElement>;

  protected isRevealed = signal(false);
  private observer?: IntersectionObserver;
  private platformId = inject(PLATFORM_ID);

  constructor(private el: ElementRef<HTMLElement>) {}

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      this.isRevealed.set(true);
      return;
    }

    this.setupIntersectionObserver();
  }

  protected containerStyle(): string {
    const styles = [
      `transition-duration: ${this.duration}ms`,
      `transition-delay: ${this.delay}ms`
    ];

    if (!this.isRevealed()) {
      styles.push('opacity: 0');
      styles.push(this.getInitialTransform());
    }

    return styles.join('; ');
  }

  private getInitialTransform(): string {
    switch (this.animation) {
      case 'fade':
        return 'transform: none';
      case 'slide-up':
        return `transform: translateY(${this.distance}px)`;
      case 'slide-down':
        return `transform: translateY(-${this.distance}px)`;
      case 'slide-left':
        return `transform: translateX(${this.distance}px)`;
      case 'slide-right':
        return `transform: translateX(-${this.distance}px)`;
      case 'scale':
        return 'transform: scale(0.8)';
      case 'rotate':
        return 'transform: rotate(10deg)';
      default:
        return 'transform: none';
    }
  }

  private setupIntersectionObserver(): void {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.isRevealed.set(true);
            this.revealed.emit();
            
            if (this.once) {
              this.observer?.unobserve(entry.target);
            }
          } else if (!this.once) {
            this.isRevealed.set(false);
            this.hidden.emit();
          }
        });
      },
      { threshold: this.threshold }
    );

    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}

