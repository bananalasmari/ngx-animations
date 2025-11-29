import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  ContentChildren,
  QueryList,
  AfterContentInit,
  ElementRef,
  inject,
  PLATFORM_ID
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type StaggerAnimation = 'fade' | 'slide-up' | 'slide-down' | 'scale' | 'rotate';

/**
 * Stagger List Component
 * Animates child elements with staggered delays
 * 
 * @example
 * <ngx-stagger-list animation="slide-up" [staggerDelay]="100">
 *   <div class="item">Item 1</div>
 *   <div class="item">Item 2</div>
 *   <div class="item">Item 3</div>
 * </ngx-stagger-list>
 */
@Component({
  selector: 'ngx-stagger-list',
  standalone: true,
  template: `
    <div class="stagger-container">
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
    
    .stagger-container {
      display: contents;
    }
  `]
})
export class StaggerListComponent implements OnInit, AfterContentInit {
  @Input() animation: StaggerAnimation = 'fade';
  @Input() duration: number = 600;
  @Input() staggerDelay: number = 100;
  @Input() initialDelay: number = 0;
  @Input() triggerOnScroll: boolean = true;
  @Input() threshold: number = 0.1;
  @Input() reverse: boolean = false;

  @Output() animationStart = new EventEmitter<number>();
  @Output() animationComplete = new EventEmitter<void>();

  private observer?: IntersectionObserver;
  private hasAnimated = false;
  private platformId = inject(PLATFORM_ID);

  constructor(private el: ElementRef<HTMLElement>) {}

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    if (this.triggerOnScroll) {
      this.setupIntersectionObserver();
    } else {
      setTimeout(() => this.animateChildren(), this.initialDelay);
    }
  }

  ngAfterContentInit(): void {
    // Animation will be triggered by intersection observer or immediately
  }

  private setupIntersectionObserver(): void {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.animateChildren();
            this.hasAnimated = true;
          } else {
            this.hasAnimated = false;
          }
        });
      },
      { threshold: this.threshold }
    );

    this.observer.observe(this.el.nativeElement);
  }

  private animateChildren(): void {
    const container = this.el.nativeElement.querySelector('.stagger-container');
    if (!container) return;

    const children = Array.from(container.children) as HTMLElement[];
    const itemsToAnimate = this.reverse ? children.reverse() : children;

    itemsToAnimate.forEach((child, index) => {
      // Set initial state
      this.setInitialState(child);

      // Animate with stagger
      const delay = this.initialDelay + (index * this.staggerDelay);
      
      setTimeout(() => {
        this.animationStart.emit(index);
        this.animateElement(child);
      }, delay);

      // Emit complete event after last animation
      if (index === itemsToAnimate.length - 1) {
        setTimeout(() => {
          this.animationComplete.emit();
        }, delay + this.duration);
      }
    });
  }

  private setInitialState(element: HTMLElement): void {
    element.style.transition = `all ${this.duration}ms cubic-bezier(0.4, 0, 0.2, 1)`;
    
    switch (this.animation) {
      case 'fade':
        element.style.opacity = '0';
        break;
      case 'slide-up':
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        break;
      case 'slide-down':
        element.style.opacity = '0';
        element.style.transform = 'translateY(-30px)';
        break;
      case 'scale':
        element.style.opacity = '0';
        element.style.transform = 'scale(0.8)';
        break;
      case 'rotate':
        element.style.opacity = '0';
        element.style.transform = 'rotate(-10deg)';
        break;
    }
  }

  private animateElement(element: HTMLElement): void {
    requestAnimationFrame(() => {
      element.style.opacity = '1';
      element.style.transform = 'translate(0, 0) scale(1) rotate(0)';
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}

