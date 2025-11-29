# Usage Guide

Comprehensive guide for using @elm/ngx-animations in your Angular applications.

## Table of Contents

1. [Installation](#installation)
2. [Quick Start](#quick-start)
3. [Basic Animations](#basic-animations)
4. [Scroll Animations](#scroll-animations)
5. [Advanced Components](#advanced-components)
6. [Timeline Animations](#timeline-animations)
7. [RTL Support](#rtl-support)
8. [Performance Optimization](#performance-optimization)
9. [Accessibility](#accessibility)
10. [Common Patterns](#common-patterns)

---

## Installation

Install via npm:

```bash
npm install @elm/ngx-animations
```

Or yarn:

```bash
yarn add @elm/ngx-animations
```

---

## Quick Start

### Using in Standalone Components (Angular 18+)

```typescript
import { Component } from '@angular/core';
import { FadeInDirective, SlideInDirective } from '@elm/ngx-animations';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [FadeInDirective, SlideInDirective],
  template: `
    <div ngxFadeIn>
      <h1>Hello World!</h1>
    </div>
    <p ngxSlideIn direction="left">
      This slides in from the left
    </p>
  `
})
export class ExampleComponent {}
```

### Using with NgModule (Angular <18)

```typescript
import { NgModule } from '@angular/core';
import { FadeInDirective, SlideInDirective } from '@elm/ngx-animations';

@NgModule({
  imports: [
    FadeInDirective,
    SlideInDirective
  ],
  // ...
})
export class AppModule {}
```

### Using in Another Project (Standalone Recommended)

1. **Install the library in your project**

```bash
npm install elm-ngx-animations
```

2. **Use it in a standalone component**

`some-feature.component.ts`:

```typescript
import { Component } from '@angular/core';
import {
  FadeInDirective,
  SlideInDirective,
  ScaleInDirective,
  RotateInDirective
} from 'elm-ngx-animations';

@Component({
  selector: 'app-some-feature',
  standalone: true,
  templateUrl: './some-feature.component.html',
  imports: [
    FadeInDirective,
    SlideInDirective,
    ScaleInDirective,
    RotateInDirective
  ]
})
export class SomeFeatureComponent {}
```

`some-feature.component.html`:

```html
<div style="padding: 80px">
  <div ngxFadeIn [duration]="600" [triggerOnScroll]="true" [resetOnExit]="true">
    Fade Animation
  </div>

  <div ngxSlideIn [direction]="'left'" [duration]="600" [triggerOnScroll]="true" [resetOnExit]="true">
    Slide from Left
  </div>

  <div ngxScaleIn [startScale]="0.5" [duration]="600" [triggerOnScroll]="true" [resetOnExit]="true">
    Scale Animation
  </div>

  <div ngxRotateIn [axis]="'y'" [degrees]="90" [duration]="600" [triggerOnScroll]="true" [resetOnExit]="true">
    Rotate on Y-axis
  </div>
</div>
```

> Make sure this component is used in your routes or bootstrapped so it actually renders.

3. **If you use NgModule instead of standalone**

`some-feature.module.ts`:

```typescript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FadeInDirective,
  SlideInDirective,
  ScaleInDirective,
  RotateInDirective
} from 'elm-ngx-animations';
import { SomeFeatureComponent } from './some-feature.component';

@NgModule({
  declarations: [SomeFeatureComponent],
  imports: [
    CommonModule,
    FadeInDirective,
    SlideInDirective,
    ScaleInDirective,
    RotateInDirective
  ]
})
export class SomeFeatureModule {}
```

Use the same HTML as above.

4. **Quick check**

If nothing animates, temporarily remove `triggerOnScroll`:

```html
<div ngxFadeIn [duration]="600">
  Fade Animation
</div>
```

If it still doesn’t animate, the directives are not correctly in `imports` → re-check step 2/3 and that you’re importing from `'elm-ngx-animations'`.

---

## Basic Animations

### Fade Animations

#### Simple Fade In

```typescript
<div ngxFadeIn>
  Fades in on load
</div>
```

#### Fade with Custom Duration

```typescript
<div ngxFadeIn [duration]="1000" [delay]="500">
  Fades in slowly after delay
</div>
```

#### Fade on Scroll

```typescript
<div ngxFadeIn [triggerOnScroll]="true" [threshold]="0.5">
  Fades in when 50% visible
</div>
```

#### With Event Handlers

```typescript
<div ngxFadeIn
     (animationStart)="onStart()"
     (animationEnd)="onEnd()">
  Track animation lifecycle
</div>
```

### Slide Animations

#### Slide from Different Directions

```typescript
<!-- From left -->
<div ngxSlideIn direction="left">Content</div>

<!-- From right -->
<div ngxSlideIn direction="right">Content</div>

<!-- From top -->
<div ngxSlideIn direction="top">Content</div>

<!-- From bottom -->
<div ngxSlideIn direction="bottom">Content</div>
```

#### Custom Distance

```typescript
<div ngxSlideIn direction="left" [distance]="100">
  Slides 100px from left
</div>
```

### Scale Animations

#### Scale from Different Origins

```typescript
<!-- From center -->
<div ngxScaleIn origin="center">Content</div>

<!-- From top-left corner -->
<div ngxScaleIn origin="top-left">Content</div>

<!-- From bottom-right corner -->
<div ngxScaleIn origin="bottom-right">Content</div>
```

#### Custom Scale Values

```typescript
<div ngxScaleIn [startScale]="0.3" [endScale]="1.2">
  Scales from 30% to 120%
</div>
```

### Rotate Animations

#### Rotate on Different Axes

```typescript
<!-- Rotate on Z-axis (2D) -->
<div ngxRotateIn axis="z" [degrees]="180">Content</div>

<!-- Rotate on Y-axis (flip) -->
<div ngxRotateIn axis="y" [degrees]="90">Content</div>

<!-- Rotate on X-axis -->
<div ngxRotateIn axis="x" [degrees]="45">Content</div>
```

---

## Scroll Animations

### Parallax Scrolling

#### Vertical Parallax

```typescript
<section class="hero">
  <div ngxParallaxScroll [speed]="0.5">
    <h1>Moves slower than scroll</h1>
  </div>
</section>
```

#### Horizontal Parallax

```typescript
<div ngxParallaxScroll
     [speed]="0.3"
     direction="horizontal">
  Horizontal parallax
</div>
```

#### Reverse Parallax

```typescript
<div ngxParallaxScroll [speed]="0.5" [reverse]="true">
  Moves in opposite direction
</div>
```

### Scroll Reveal

#### Different Animation Types

```typescript
<!-- Fade reveal -->
<ngx-scroll-reveal animation="fade">
  <p>Fades in</p>
</ngx-scroll-reveal>

<!-- Slide up reveal -->
<ngx-scroll-reveal animation="slide-up">
  <p>Slides up</p>
</ngx-scroll-reveal>

<!-- Scale reveal -->
<ngx-scroll-reveal animation="scale">
  <p>Scales in</p>
</ngx-scroll-reveal>
```

#### Repeat Animation

```typescript
<ngx-scroll-reveal
  animation="slide-up"
  [once]="false">
  <p>Animates every time you scroll</p>
</ngx-scroll-reveal>
```

#### With Callback

```typescript
<ngx-scroll-reveal
  animation="fade"
  (revealed)="onRevealed()"
  (hidden)="onHidden()">
  <p>Track visibility</p>
</ngx-scroll-reveal>
```

---

## Advanced Components

### Stagger List

#### Basic Stagger

```typescript
<ngx-stagger-list animation="slide-up">
  <div class="item">Item 1</div>
  <div class="item">Item 2</div>
  <div class="item">Item 3</div>
</ngx-stagger-list>
```

#### With Custom Delays

```typescript
<ngx-stagger-list
  animation="fade"
  [staggerDelay]="200"
  [initialDelay]="500">
  <div class="item">Item 1</div>
  <div class="item">Item 2</div>
  <div class="item">Item 3</div>
</ngx-stagger-list>
```

#### Dynamic Lists

```typescript
<ngx-stagger-list animation="slide-up" [staggerDelay]="100">
  @for (item of items; track item.id) {
    <div class="card">{{ item.name }}</div>
  }
</ngx-stagger-list>
```

#### Reverse Order

```typescript
<ngx-stagger-list
  animation="fade"
  [reverse]="true">
  <!-- Animates from last to first -->
  <div class="item">Item 1</div>
  <div class="item">Item 2</div>
  <div class="item">Item 3</div>
</ngx-stagger-list>
```

### Typewriter Effect

#### Simple Typewriter

```typescript
<ngx-typewriter [text]="'Hello, World!'">
</ngx-typewriter>
```

#### With Custom Speed

```typescript
<ngx-typewriter
  [text]="longText"
  [speed]="30"
  [delay]="1000">
</ngx-typewriter>
```

#### Looping Typewriter

```typescript
<ngx-typewriter
  [text]="'Type, delete, repeat...'"
  [loop]="true"
  [deleteSpeed]="20"
  [pauseBeforeDelete]="2000">
</ngx-typewriter>
```

#### RTL Typewriter (Arabic/Hebrew)

```typescript
<ngx-typewriter
  [text]="'مرحبا بكم في مكتبة الرسوم المتحركة'"
  [rtl]="true"
  [speed]="50">
</ngx-typewriter>
```

#### With Callbacks

```typescript
<ngx-typewriter
  [text]="message"
  (typingStart)="onTypingStart()"
  (typingComplete)="onTypingComplete()"
  (deletingStart)="onDeletingStart()"
  (deletingComplete)="onDeletingComplete()">
</ngx-typewriter>
```

### Marquee

#### Basic Marquee

```typescript
<ngx-marquee>
  <span>Scrolling text goes here...</span>
</ngx-marquee>
```

#### With Custom Speed and Direction

```typescript
<ngx-marquee
  [speed]="30"
  direction="right"
  [pauseOnHover]="true">
  <span>Scrolls right and pauses on hover</span>
</ngx-marquee>
```

#### Vertical Marquee

```typescript
<ngx-marquee
  direction="up"
  [speed]="20">
  <div class="news-item">Breaking News 1</div>
  <div class="news-item">Breaking News 2</div>
</ngx-marquee>
```

#### RTL Marquee

```typescript
<ngx-marquee [rtl]="true" direction="left">
  <span>يتحرك النص من اليمين إلى اليسار</span>
</ngx-marquee>
```

### Orbit Animation

#### Simple Orbit

```typescript
<ngx-orbit-animation [radius]="100" [speed]="5">
  <div class="satellite">🛰️</div>
</ngx-orbit-animation>
```

#### Multiple Orbiting Elements

```typescript
<div class="solar-system">
  <div class="sun">☀️</div>
  
  <ngx-orbit-animation [radius]="60" [speed]="3">
    <div class="planet">🌍</div>
  </ngx-orbit-animation>
  
  <ngx-orbit-animation [radius]="100" [speed]="6">
    <div class="planet">♂️</div>
  </ngx-orbit-animation>
</div>
```

#### With Path Visible

```typescript
<ngx-orbit-animation
  [radius]="80"
  [speed]="4"
  [showPath]="true">
  <div>⭐</div>
</ngx-orbit-animation>
```

### Ripple Click

#### Button Ripple

```typescript
<button ngxRippleClick>
  Click me
</button>
```

#### Custom Ripple Color

```typescript
<button
  class="primary-btn"
  ngxRippleClick
  [rippleColor]="'rgba(255, 255, 255, 0.5)'">
  Primary Button
</button>

<button
  class="secondary-btn"
  ngxRippleClick
  [rippleColor]="'rgba(0, 0, 0, 0.2)'">
  Secondary Button
</button>
```

#### Centered Ripple

```typescript
<div
  class="card"
  ngxRippleClick
  [centered]="true"
  [rippleDuration]="800">
  Ripple always starts from center
</div>
```

---

### Hover Lift (Cards & Buttons)

Useful for any clickable card or button hover effect:

```ts
import { HoverLiftDirective } from '@elm/ngx-animations';

@Component({
  imports: [HoverLiftDirective],
  template: `
    <div class="card" ngxHoverLift>
      Hover me
    </div>
  `
})
export class CardComponent {}
```

Customize:

```html
<div
  class="card"
  ngxHoverLift
  [liftScale]="1.05"
  [shadowStrength]="0.35">
  Elevated hover
</div>
```

---

### Count Up (Stats & KPIs)

```ts
import { CountUpDirective } from '@elm/ngx-animations';

@Component({
  imports: [CountUpDirective],
  template: `
    <div class="stat">
      <span
        ngxCountUp
        [start]="0"
        [end]="2500"
        [duration]="1200"
        [prefix]="'$'"
        [decimals]="2">
      </span>
      <p>Monthly Revenue</p>
    </div>
  `
})
export class StatsComponent {}
```

Trigger only when visible:

```html
<span
  ngxCountUp
  [end]="10000"
  [triggerOnScroll]="true"
  [threshold]="0.3">
</span>
```

---

## Timeline Animations

### Basic Timeline

```typescript
import { Component, inject, ElementRef, viewChild, AfterViewInit } from '@angular/core';
import { TimelineService } from '@elm/ngx-animations';

@Component({
  selector: 'app-timeline-demo',
  template: `
    <div #box1>Box 1</div>
    <div #box2>Box 2</div>
    <div #box3>Box 3</div>
  `
})
export class TimelineDemoComponent implements AfterViewInit {
  private timeline = inject(TimelineService);
  private box1 = viewChild<ElementRef>('box1');
  private box2 = viewChild<ElementRef>('box2');
  private box3 = viewChild<ElementRef>('box3');

  ngAfterViewInit() {
    const tl = this.timeline.create();

    tl.to(this.box1()!, { opacity: '1' }, 500)
      .to(this.box2()!, { opacity: '1' }, 500)
      .to(this.box3()!, { opacity: '1' }, 500)
      .play();
  }
}
```

### Parallel Animations

```typescript
const tl = this.timeline.create();

tl.parallel((ptl) => {
    ptl.to(element1, { opacity: '1' }, 500);
    ptl.to(element2, { transform: 'scale(1)' }, 500);
    ptl.to(element3, { transform: 'rotate(45deg)' }, 500);
  })
  .play();
```

### With Delays

```typescript
const tl = this.timeline.create();

tl.to(element1, { opacity: '1' }, 500, 200) // 200ms delay
  .wait(500) // Wait 500ms
  .to(element2, { opacity: '1' }, 500)
  .play();
```

### Looping Timeline

```typescript
const tl = this.timeline.create({
  repeat: true,
  repeatDelay: 1000,
  onComplete: () => console.log('Loop complete'),
  onRepeat: () => console.log('Repeating')
});

tl.to(element, { transform: 'rotate(360deg)' }, 1000)
  .play();
```

### Complex Animation Sequence

```typescript
const tl = this.timeline.create();

tl.fromTo(
    header,
    { opacity: '0', transform: 'translateY(-50px)' },
    { opacity: '1', transform: 'translateY(0)' },
    500
  )
  .wait(200)
  .parallel((ptl) => {
    ptl.to(card1, { opacity: '1', transform: 'scale(1)' }, 400);
    ptl.to(card2, { opacity: '1', transform: 'scale(1)' }, 400);
    ptl.to(card3, { opacity: '1', transform: 'scale(1)' }, 400);
  })
  .to(footer, { opacity: '1' }, 300)
  .play();
```

### Timeline Controls

```typescript
const tl = this.timeline.create();

// Play
tl.play();

// Pause
tl.pause();

// Resume
tl.resume();

// Stop and reset
tl.stop();

// Restart from beginning
tl.restart();

// Reverse direction
tl.reverse();
```

---

## RTL Support

### Automatic RTL Detection

Most components automatically detect RTL from the parent element:

```html
<div dir="rtl">
  <div ngxSlideIn direction="left">
    <!-- Automatically slides from right in RTL -->
    محتوى عربي
  </div>
</div>
```

### Explicit RTL

Force RTL mode:

```typescript
<div ngxSlideIn direction="left" [rtl]="true">
  Forces RTL behavior
</div>
```

### RTL Components

#### Typewriter RTL

```typescript
<ngx-typewriter
  [text]="'مرحبا بكم'"
  [rtl]="true">
</ngx-typewriter>
```

#### Marquee RTL

```typescript
<ngx-marquee [rtl]="true">
  <span>النص المتحرك</span>
</ngx-marquee>
```

### Mixed Content

```typescript
<!-- English -->
<div ngxSlideIn direction="left" [rtl]="false">
  Slides from left
</div>

<!-- Arabic -->
<div ngxSlideIn direction="left" [rtl]="true">
  يتحرك من اليمين
</div>
```

---

## Performance Optimization

### Use `triggerOnScroll` for Below-Fold Content

```typescript
<div ngxFadeIn [triggerOnScroll]="true">
  <!-- Only animates when visible -->
</div>
```

### Adjust Intersection Threshold

```typescript
<div ngxFadeIn
     [triggerOnScroll]="true"
     [threshold]="0.5">
  <!-- Triggers when 50% visible -->
</div>
```

### Use CSS `will-change`

```css
.animated-element {
  will-change: transform, opacity;
}
```

### Prefer Transform and Opacity

```typescript
// Good ✅
timeline.to(element, { 
  transform: 'translateX(100px)',
  opacity: '1'
}, 500);

// Avoid ❌
timeline.to(element, { 
  left: '100px',
  width: '200px'
} as any, 500);
```

---

## Accessibility

### Respect `prefers-reduced-motion`

```typescript
@Component({
  template: `
    <div ngxFadeIn [duration]="animationDuration">
      Content
    </div>
  `
})
export class MyComponent {
  animationDuration = window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    ? 0 
    : 600;
}
```

### Add ARIA Labels

```typescript
<ngx-scroll-reveal animation="fade">
  <div role="region" aria-label="Featured content">
    Important content
  </div>
</ngx-scroll-reveal>
```

### Skip Decorative Animations

```typescript
<div ngxFadeIn aria-hidden="true">
  <!-- Decorative element -->
</div>
```

---

## Common Patterns

### Hero Section

```typescript
<section class="hero">
  <ngx-stagger-list animation="slide-up" [staggerDelay]="150">
    <h1>Welcome to Our Site</h1>
    <p>Amazing animations</p>
    <button>Get Started</button>
  </ngx-stagger-list>
</section>
```

### Card Grid

```typescript
<div class="grid">
  @for (card of cards; track card.id) {
    <ngx-scroll-reveal 
      animation="scale" 
      [delay]="$index * 50">
      <div class="card">{{ card.title }}</div>
    </ngx-scroll-reveal>
  }
</div>
```

### Scrollable Stacked Cards (Parallax)

Create a layered, scroll-driven card stack using `ngxParallaxScroll` + `ngxFadeIn`:

```ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParallaxScrollDirective, FadeInDirective, RippleClickDirective } from '@elm/ngx-animations';

@Component({
  standalone: true,
  selector: 'app-stacked-cards-demo',
  imports: [CommonModule, ParallaxScrollDirective, FadeInDirective, RippleClickDirective],
  template: `
    <section class="stacked-cards-container">
      @for (card of stackedCards; track card.id; let i = $index) {
        <div
          class="stacked-card-wrapper"
          ngxParallaxScroll
          [speed]="0.15 + i * 0.08"
        >
          <article
            class="stacked-card"
            [class.expanded]="expandedId === card.id"
            [style.zIndex]="100 - i"
            (click)="toggle(card.id)"
          >
            <div class="stacked-card-media"></div>

            <div class="stacked-card-body" ngxFadeIn [triggerOnScroll]="true" [duration]="600">
              <h3>{{ card.title }}</h3>
              <p>{{ card.description }}</p>

              <div class="stacked-card-footer">
                <button
                  class="stacked-card-cta"
                  type="button"
                  ngxRippleClick
                  (click)="$event.stopPropagation()"
                >
                  {{ card.cta }}
                </button>
              </div>

              @if (expandedId === card.id) {
                <div class="stacked-card-details">
                  <!-- Expanded content -->
                </div>
              }
            </div>
          </article>
        </div>
      }
    </section>
  `
})
export class StackedCardsDemoComponent {
  stackedCards = [
    { id: 1, title: 'Story 1', description: 'Intro section', cta: 'Learn more' },
    { id: 2, title: 'Story 2', description: 'Deeper details', cta: 'Dive in' },
    { id: 3, title: 'Story 3', description: 'Call to action', cta: 'Get started' }
  ];

  expandedId: number | null = null;

  toggle(id: number) {
    this.expandedId = this.expandedId === id ? null : id;
  }
}
```

Example CSS for the stacking + responsiveness:

```css
.stacked-cards-container {
  position: relative;
  max-width: 720px;
  margin: 0 auto;
  padding: 3rem 0 1rem;
}

.stacked-card-wrapper {
  position: relative;
  margin-top: -3rem; /* overlap previous card */
}

.stacked-card-wrapper:first-child {
  margin-top: 0;
}

.stacked-card {
  position: sticky;
  top: 5rem;
  border-radius: 18px;
  background: #00143a;
  border: 1px solid rgba(148, 163, 184, 0.5);
  box-shadow: 0 18px 45px rgba(15, 23, 42, 0.65);
  padding: 1.75rem;
  display: grid;
  grid-template-columns: minmax(0, 2fr) minmax(0, 3fr);
  gap: 1.5rem;
  cursor: pointer;
  transform-origin: center;
  transition:
    transform 260ms ease,
    box-shadow 260ms ease,
    max-height 260ms ease;
  max-height: 260px;
  overflow: hidden;
}

.stacked-card.expanded {
  max-height: 420px;
  transform: translateY(-6px) scale(1.02);
}

@media (max-width: 768px) {
  .stacked-card {
    grid-template-columns: 1fr;
    top: 4.5rem;
    max-height: none;
  }

  .stacked-card-wrapper {
    margin-top: -4rem;
  }
}
```

**Best practices:**

- **Prefer transforms/opacity**: All motion (parallax, expansion) should use `transform` + `opacity` for 60fps scrolling.
- **Wrapper for transforms**: Put `ngxParallaxScroll` on a wrapper and keep additional transforms (scale/hover) on the inner card to avoid transform conflicts.
- **Limit stack size**: 3–6 cards works best; very large stacks can feel heavy and impact performance.
- **Respect reduced motion**: Optionally disable parallax / reduce durations when `prefers-reduced-motion: reduce` is set.

### Animated Navigation

```typescript
<nav ngxSlideIn direction="top" [duration]="400">
  <a href="/">Home</a>
  <a href="/about">About</a>
  <a href="/contact">Contact</a>
</nav>
```

### Loading Sequence

```typescript
ngAfterViewInit() {
  const tl = this.timeline.create();
  
  tl.to(this.logo()!, { opacity: '1', transform: 'scale(1)' }, 500)
    .to(this.title()!, { opacity: '1' }, 300)
    .parallel((ptl) => {
      this.navItems().forEach((item, i) => {
        ptl.to(item.nativeElement, { opacity: '1' }, 200);
      });
    })
    .play();
}
```

---

## Troubleshooting

### Animation Not Triggering

1. Check if element is in viewport
2. Verify `triggerOnScroll` is set correctly
3. Adjust `threshold` value

### Performance Issues

1. Use `will-change` CSS property
2. Reduce number of simultaneous animations
3. Use `triggerOnScroll` for off-screen elements

### RTL Not Working

1. Ensure parent has `dir="rtl"`
2. Use `[rtl]="true"` to force RTL
3. Check CSS direction property

---

For more information, see:
- [API Documentation](./API.md)
- [README](../README.md)
- [Demo Application](../../src/app/demo/)

