import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
  signal,
  effect,
  inject,
  PLATFORM_ID
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/**
 * Typewriter Component
 * Types out text character by character with RTL support
 * 
 * @example
 * <ngx-typewriter [text]="'Hello World!'" [speed]="50"></ngx-typewriter>
 */
@Component({
  selector: 'ngx-typewriter',
  standalone: true,
  template: `
    <span [class.rtl]="rtl" [style]="containerStyle()">
      {{ displayedText() }}<span class="cursor" [class.blink]="showCursor">|</span>
    </span>
  `,
  styles: [`
    :host {
      display: inline-block;
    }
    
    span {
      font-family: inherit;
      font-size: inherit;
      line-height: inherit;
    }
    
    .rtl {
      direction: rtl;
      unicode-bidi: bidi-override;
    }
    
    .cursor {
      opacity: 1;
      animation: none;
    }
    
    .cursor.blink {
      animation: blink 1s step-end infinite;
    }
    
    @keyframes blink {
      0%, 50% { opacity: 1; }
      51%, 100% { opacity: 0; }
    }
  `]
})
export class TypewriterComponent implements OnInit, OnDestroy {
  @Input() text: string = '';
  @Input() speed: number = 50; // milliseconds per character
  @Input() delay: number = 0;
  @Input() showCursor: boolean = true;
  @Input() loop: boolean = false;
  @Input() deleteSpeed: number = 30;
  @Input() pauseBeforeDelete: number = 2000;
  @Input() rtl: boolean = false;

  @Output() typingStart = new EventEmitter<void>();
  @Output() typingComplete = new EventEmitter<void>();
  @Output() deletingStart = new EventEmitter<void>();
  @Output() deletingComplete = new EventEmitter<void>();

  protected displayedText = signal('');
  private currentIndex = 0;
  private isDeleting = false;
  private timeoutId?: ReturnType<typeof setTimeout>;
  private platformId = inject(PLATFORM_ID);

  constructor() {
    // Watch for text changes
    effect(() => {
      const newText = this.text;
      if (newText && isPlatformBrowser(this.platformId)) {
        this.restart();
      }
    });
  }

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      this.displayedText.set(this.text);
      return;
    }

    this.start();
  }

  protected containerStyle(): string {
    return this.rtl ? 'direction: rtl; text-align: right;' : '';
  }

  private start(): void {
    if (this.delay > 0) {
      this.timeoutId = setTimeout(() => this.type(), this.delay);
    } else {
      this.type();
    }
  }

  private type(): void {
    if (!this.isDeleting && this.currentIndex === 0) {
      this.typingStart.emit();
    }

    if (!this.isDeleting) {
      // Typing forward
      if (this.currentIndex < this.text.length) {
        const nextChar = this.text.charAt(this.currentIndex);
        this.displayedText.update(current => current + nextChar);
        this.currentIndex++;
        this.timeoutId = setTimeout(() => this.type(), this.speed);
      } else {
        // Finished typing
        this.typingComplete.emit();
        
        if (this.loop) {
          this.timeoutId = setTimeout(() => {
            this.isDeleting = true;
            this.deletingStart.emit();
            this.type();
          }, this.pauseBeforeDelete);
        }
      }
    } else {
      // Deleting backward
      if (this.currentIndex > 0) {
        this.currentIndex--;
        this.displayedText.set(this.text.substring(0, this.currentIndex));
        this.timeoutId = setTimeout(() => this.type(), this.deleteSpeed);
      } else {
        // Finished deleting
        this.deletingComplete.emit();
        this.isDeleting = false;
        this.timeoutId = setTimeout(() => this.type(), this.speed);
      }
    }
  }

  private restart(): void {
    this.stop();
    this.currentIndex = 0;
    this.isDeleting = false;
    this.displayedText.set('');
    this.start();
  }

  private stop(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = undefined;
    }
  }

  ngOnDestroy(): void {
    this.stop();
  }
}

