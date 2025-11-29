import { Injectable, ElementRef } from '@angular/core';

export interface TimelineStep {
  element: HTMLElement | ElementRef<HTMLElement>;
  properties: Partial<CSSStyleDeclaration>;
  duration: number;
  delay?: number;
  easing?: string;
}

export interface TimelineOptions {
  repeat?: boolean;
  repeatDelay?: number;
  onComplete?: () => void;
  onStart?: () => void;
  onRepeat?: () => void;
}

/**
 * Timeline Service
 * Chain multiple animations in sequence or parallel
 * Similar to GSAP Timeline but Angular-friendly
 * 
 * @example
 * const timeline = this.timelineService.create();
 * timeline
 *   .to(element1, { opacity: '1', transform: 'translateX(0)' }, 500)
 *   .to(element2, { opacity: '1' }, 300, 100)
 *   .play();
 */
@Injectable({
  providedIn: 'root'
})
export class TimelineService {
  createTimeline(options?: TimelineOptions): Timeline {
    return new Timeline(options);
  }

  // Convenience method
  create(options?: TimelineOptions): Timeline {
    return this.createTimeline(options);
  }
}

export class Timeline {
  private steps: TimelineStep[] = [];
  private parallelSteps: TimelineStep[][] = [];
  private currentStep = 0;
  private isPlaying = false;
  private isPaused = false;
  private options: TimelineOptions;
  private currentTimeouts: ReturnType<typeof setTimeout>[] = [];

  constructor(options: TimelineOptions = {}) {
    this.options = options;
  }

  /**
   * Add animation step to timeline
   */
  to(
    element: HTMLElement | ElementRef<HTMLElement>,
    properties: Partial<CSSStyleDeclaration>,
    duration: number,
    delay: number = 0,
    easing: string = 'cubic-bezier(0.4, 0, 0.2, 1)'
  ): this {
    const htmlElement = element instanceof ElementRef ? element.nativeElement : element;
    
    this.steps.push({
      element: htmlElement,
      properties,
      duration,
      delay,
      easing
    });

    return this;
  }

  /**
   * Add animation step that starts from current properties
   */
  from(
    element: HTMLElement | ElementRef<HTMLElement>,
    properties: Partial<CSSStyleDeclaration>,
    duration: number,
    delay: number = 0,
    easing: string = 'cubic-bezier(0.4, 0, 0.2, 1)'
  ): this {
    const htmlElement = element instanceof ElementRef ? element.nativeElement : element;
    
    // Set initial properties
    Object.assign(htmlElement.style, properties);

    // Then animate to normal state
    const finalProperties: Partial<CSSStyleDeclaration> = {};
    Object.keys(properties).forEach(key => {
      finalProperties[key as any] = '';
    });

    return this.to(htmlElement, finalProperties, duration, delay, easing);
  }

  /**
   * Add animation step relative to current state
   */
  fromTo(
    element: HTMLElement | ElementRef<HTMLElement>,
    fromProperties: Partial<CSSStyleDeclaration>,
    toProperties: Partial<CSSStyleDeclaration>,
    duration: number,
    delay: number = 0,
    easing: string = 'cubic-bezier(0.4, 0, 0.2, 1)'
  ): this {
    const htmlElement = element instanceof ElementRef ? element.nativeElement : element;
    
    // Set from properties
    Object.assign(htmlElement.style, fromProperties);

    // Animate to properties
    return this.to(htmlElement, toProperties, duration, delay, easing);
  }

  /**
   * Add multiple animations to run in parallel
   */
  parallel(callback: (timeline: Timeline) => void): this {
    const parallelTimeline = new Timeline();
    callback(parallelTimeline);
    this.parallelSteps.push(parallelTimeline.steps);
    return this;
  }

  /**
   * Add a delay in the timeline
   */
  wait(duration: number): this {
    this.steps.push({
      element: document.createElement('div'),
      properties: {},
      duration,
      delay: 0
    });
    return this;
  }

  /**
   * Add a label for positioning
   */
  addLabel(label: string): this {
    // Labels can be implemented for more complex timelines
    return this;
  }

  /**
   * Play the timeline
   */
  play(): Promise<void> {
    if (this.isPlaying && !this.isPaused) return Promise.resolve();

    this.isPlaying = true;
    this.isPaused = false;

    if (this.options.onStart) {
      this.options.onStart();
    }

    return this.playSteps();
  }

  /**
   * Pause the timeline
   */
  pause(): this {
    this.isPaused = true;
    this.clearTimeouts();
    return this;
  }

  /**
   * Resume the timeline
   */
  resume(): this {
    if (!this.isPaused) return this;
    
    this.isPaused = false;
    this.playSteps();
    return this;
  }

  /**
   * Stop and reset the timeline
   */
  stop(): this {
    this.isPlaying = false;
    this.isPaused = false;
    this.currentStep = 0;
    this.clearTimeouts();
    return this;
  }

  /**
   * Restart the timeline from beginning
   */
  restart(): Promise<void> {
    this.stop();
    return this.play();
  }

  /**
   * Reverse the timeline
   */
  reverse(): this {
    this.steps.reverse();
    return this;
  }

  private async playSteps(): Promise<void> {
    while (this.currentStep < this.steps.length && this.isPlaying && !this.isPaused) {
      const step = this.steps[this.currentStep];
      await this.animateStep(step);
      this.currentStep++;
    }

    // Play parallel steps
    if (this.parallelSteps.length > 0 && this.isPlaying && !this.isPaused) {
      await this.playParallelSteps();
    }

    if (this.currentStep >= this.steps.length && this.isPlaying) {
      this.onComplete();
    }
  }

  private async playParallelSteps(): Promise<void> {
    const promises = this.parallelSteps[0].map(step => this.animateStep(step));
    await Promise.all(promises);
    this.parallelSteps.shift();
  }

  private animateStep(step: TimelineStep): Promise<void> {
    return new Promise((resolve) => {
      const { element, properties, duration, delay = 0, easing = 'ease' } = step;
      const htmlElement = element instanceof ElementRef ? element.nativeElement : element;

      // Set transition
      const transitionProperties = Object.keys(properties).join(', ');
      htmlElement.style.transition = `${transitionProperties} ${duration}ms ${easing}`;

      const timeoutId = setTimeout(() => {
        // Apply properties
        Object.assign(htmlElement.style, properties);

        // Resolve after animation completes
        const completeTimeoutId = setTimeout(() => {
          resolve();
        }, duration);

        this.currentTimeouts.push(completeTimeoutId);
      }, delay);

      this.currentTimeouts.push(timeoutId);
    });
  }

  private onComplete(): void {
    this.isPlaying = false;
    this.currentStep = 0;

    if (this.options.onComplete) {
      this.options.onComplete();
    }

    if (this.options.repeat) {
      const delay = this.options.repeatDelay || 0;
      setTimeout(() => {
        if (this.options.onRepeat) {
          this.options.onRepeat();
        }
        this.play();
      }, delay);
    }
  }

  private clearTimeouts(): void {
    this.currentTimeouts.forEach(timeout => clearTimeout(timeout));
    this.currentTimeouts = [];
  }
}

