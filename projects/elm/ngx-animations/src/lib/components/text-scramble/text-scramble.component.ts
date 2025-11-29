import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  signal,
  inject,
  PLATFORM_ID
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/**
 * Text Scramble Component
 * Creates a cool text scrambling effect (GSAP/Matrix-inspired)
 * Text appears to decode/unscramble character by character
 * 
 * @example
 * <ngx-text-scramble [text]="'Hello World'" [speed]="50"></ngx-text-scramble>
 */
@Component({
  selector: 'ngx-text-scramble',
  standalone: true,
  template: `
    <span [class]="customClass">{{ displayedText() }}</span>
  `,
  styles: [`
    :host {
      display: inline-block;
      font-family: 'Courier New', monospace;
    }
  `]
})
export class TextScrambleComponent implements OnInit {
  @Input() text: string = '';
  @Input() speed: number = 50; // ms per character
  @Input() scrambleChars: string = '!<>-_\\/[]{}—=+*^?#________';
  @Input() delay: number = 0;
  @Input() customClass: string = '';

  @Output() complete = new EventEmitter<void>();

  protected displayedText = signal('');

  private platformId = inject(PLATFORM_ID);
  private frame = 0;
  private queue: Array<{ from: string; to: string; start: number; end: number }> = [];
  private rafId?: number;

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      this.displayedText.set(this.text);
      return;
    }

    setTimeout(() => this.scramble(), this.delay);
  }

  private scramble(): void {
    const length = this.text.length;
    this.queue = [];

    for (let i = 0; i < length; i++) {
      const from = this.randomChar();
      const to = this.text[i];
      const start = Math.floor(Math.random() * 40);
      const end = start + Math.floor(Math.random() * 40);
      
      this.queue.push({ from, to, start, end });
    }

    this.update();
  }

  private update(): void {
    let output = '';
    let complete = 0;

    for (let i = 0; i < this.queue.length; i++) {
      const { from, to, start, end } = this.queue[i];

      if (this.frame >= end) {
        complete++;
        output += to;
      } else if (this.frame >= start) {
        output += this.randomChar();
      } else {
        output += '';
      }
    }

    this.displayedText.set(output);

    if (complete === this.queue.length) {
      this.complete.emit();
    } else {
      this.frame++;
      this.rafId = requestAnimationFrame(() => this.update());
    }
  }

  private randomChar(): string {
    return this.scrambleChars[Math.floor(Math.random() * this.scrambleChars.length)];
  }

  ngOnDestroy(): void {
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
    }
  }
}

