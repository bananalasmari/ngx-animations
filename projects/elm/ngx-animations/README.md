# @elm/ngx-animations

<div align="center">
  <h3>🎨 Next-Level Animation Library for Angular</h3>
  <p>Production-ready, lightweight, and high-performance animation components for Angular 18+</p>
</div>

## ✨ Features

- 🚀 **High Performance** - Optimized animations using native CSS and Web Animations API
- 📦 **Standalone Components** - Full Angular 18+ standalone architecture
- 🌍 **RTL Support** - First-class support for Arabic and RTL layouts
- 🎯 **TypeScript First** - Fully typed with excellent IntelliSense support
- 📱 **Mobile Friendly** - Smooth performance on all devices
- 🎪 **GSAP-like API** - Familiar timeline and animation chaining
- 🔧 **Highly Customizable** - Extensive inputs for every animation
- 🪶 **Lightweight** - Zero dependencies, tree-shakeable

## 📦 Installation

```bash
npm install elm-ngx-animations
```

## 🎯 Quick Start

### Standalone Component (Recommended)

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

```html
<!-- some-feature.component.html -->
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

### NgModule Usage

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

If nothing animates, temporarily remove `triggerOnScroll`:

```html
<div ngxFadeIn [duration]="600">
  Fade Animation
</div>
```

If it still doesn’t animate, the directives are not correctly in `imports` or you’re not importing from `'elm-ngx-animations'`.

## 🎨 Available Components & Directives

### Directives

#### `ngxFadeIn` - Fade Animation
Smooth fade in/out animations.

```typescript
<div ngxFadeIn
     [duration]="600"
     [delay]="0"
     [easing]="'ease-out'"
     [direction]="'in'"
     [triggerOnScroll]="false"
     [threshold]="0.1"
     (animationStart)="onStart()"
     (animationEnd)="onEnd()">
  Content
</div>
```

#### `ngxSlideIn` - Slide Animation
Slide elements from any direction with RTL support.

```typescript
<div ngxSlideIn
     [direction]="'left'"
     [duration]="600"
     [distance]="50"
     [rtl]="false"
     [triggerOnScroll]="false">
  Content
</div>
```

#### `ngxScaleIn` - Scale Animation
Scale elements from any origin point.

```typescript
<div ngxScaleIn
     [startScale]="0.5"
     [endScale]="1"
     [origin]="'center'"
     [duration]="600">
  Content
</div>
```

#### `ngxRotateIn` - Rotate Animation
Rotate elements on any axis.

```typescript
<div ngxRotateIn
     [axis]="'y'"
     [degrees]="90"
     [duration]="600">
  Content
</div>
```

#### `ngxParallaxScroll` - Parallax Effect
Create smooth parallax scrolling effects.

```typescript
<div ngxParallaxScroll
     [speed]="0.5"
     [direction]="'vertical'"
     [reverse]="false">
  Content
</div>
```

#### `ngxRippleClick` - Ripple Effect
Material Design-inspired ripple effect.

```typescript
<button ngxRippleClick
        [rippleColor]="'rgba(255,255,255,0.5)'"
        [rippleDuration]="600"
        [centered]="false">
  Click Me
</button>
```

### Components

#### `<ngx-scroll-reveal>` - Scroll Reveal
Reveal content when scrolling into view.

```typescript
<ngx-scroll-reveal
  [animation]="'slide-up'"
  [duration]="600"
  [threshold]="0.1"
  [once]="true"
  (revealed)="onRevealed()">
  <h1>Revealed on scroll!</h1>
</ngx-scroll-reveal>
```

**Animations:** `'fade' | 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right' | 'scale' | 'rotate'`

#### `<ngx-stagger-list>` - Stagger Animations
Animate list items with staggered delays.

```typescript
<ngx-stagger-list
  [animation]="'slide-up'"
  [duration]="600"
  [staggerDelay]="100"
  [reverse]="false">
  <div class="item">Item 1</div>
  <div class="item">Item 2</div>
  <div class="item">Item 3</div>
</ngx-stagger-list>
```

#### `<ngx-typewriter>` - Typewriter Effect
Type out text character by character with RTL support.

```typescript
<ngx-typewriter
  [text]="'Hello, World!'"
  [speed]="50"
  [showCursor]="true"
  [loop]="false"
  [rtl]="false"
  (typingComplete)="onComplete()">
</ngx-typewriter>
```

**RTL Example:**
```typescript
<ngx-typewriter
  [text]="'مرحبا بالعالم'"
  [rtl]="true"
  [speed]="50">
</ngx-typewriter>
```

#### `<ngx-marquee>` - Marquee Scroll
Continuous scrolling content.

```typescript
<ngx-marquee
  [speed]="50"
  [direction]="'left'"
  [pauseOnHover]="true"
  [rtl]="false">
  Scrolling text content...
</ngx-marquee>
```

#### `<ngx-orbit-animation>` - Orbit Animation
Circular orbit animations.

```typescript
<ngx-orbit-animation
  [radius]="100"
  [speed]="5"
  [direction]="'clockwise'"
  [showPath]="false">
  <div class="planet">🌍</div>
</ngx-orbit-animation>
```

### Timeline Service

Chain multiple animations like GSAP!

```typescript
import { Component, inject, ElementRef, viewChild } from '@angular/core';
import { TimelineService } from '@elm/ngx-animations';

@Component({
  selector: 'app-demo',
  template: `
    <div #box1>Box 1</div>
    <div #box2>Box 2</div>
    <div #box3>Box 3</div>
  `
})
export class DemoComponent {
  private timeline = inject(TimelineService);
  private box1 = viewChild<ElementRef>('box1');
  private box2 = viewChild<ElementRef>('box2');
  private box3 = viewChild<ElementRef>('box3');

  ngAfterViewInit() {
    const tl = this.timeline.create({
      onComplete: () => console.log('Done!')
    });

    tl.to(this.box1()!, { opacity: '1', transform: 'translateX(100px)' }, 500)
      .to(this.box2()!, { opacity: '1', transform: 'scale(1.5)' }, 300)
      .to(this.box3()!, { opacity: '1', transform: 'rotate(45deg)' }, 400)
      .play();
  }
}
```

**Timeline Methods:**
- `to()` - Animate to properties
- `from()` - Animate from properties
- `fromTo()` - Animate from-to
- `wait()` - Add delay
- `parallel()` - Run animations in parallel
- `play()` - Start timeline
- `pause()` - Pause timeline
- `resume()` - Resume timeline
- `stop()` - Stop and reset
- `restart()` - Restart from beginning
- `reverse()` - Reverse timeline

## 🎯 Common Inputs

Most components/directives support:

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `duration` | `number` | `600` | Animation duration in ms |
| `delay` | `number` | `0` | Delay before animation starts |
| `easing` | `string` | `'cubic-bezier(0.4, 0, 0.2, 1)'` | CSS easing function |
| `triggerOnScroll` | `boolean` | `false` | Trigger when element enters viewport |
| `threshold` | `number` | `0.1` | Intersection threshold (0-1) |

## 🎯 Common Outputs

| Output | Type | Description |
|--------|------|-------------|
| `animationStart` | `EventEmitter<void>` | Emitted when animation starts |
| `animationEnd` | `EventEmitter<void>` | Emitted when animation ends |

## 🌍 RTL Support

All components respect RTL layouts:

```typescript
// Automatic RTL detection
<div ngxSlideIn direction="left">
  يتم اكتشاف RTL تلقائيًا
</div>

// Explicit RTL
<div ngxSlideIn direction="left" [rtl]="true">
  Content slides from right in RTL
</div>

// RTL Typewriter
<ngx-typewriter
  [text]="'مرحبا بك في المكتبة'"
  [rtl]="true">
</ngx-typewriter>
```

## 🎨 Best Practices

### Performance Tips

1. **Use `triggerOnScroll`** for elements below the fold
```typescript
<div ngxFadeIn [triggerOnScroll]="true">
  Only animates when visible
</div>
```

2. **Prefer transforms** over position/dimensions
```typescript
// Good ✅
timeline.to(element, { transform: 'translateX(100px)' }, 500);

// Avoid ❌
timeline.to(element, { left: '100px' } as any, 500);
```

3. **Use `will-change` for complex animations**
```css
.animated-element {
  will-change: transform, opacity;
}
```

### Accessibility

Add `prefers-reduced-motion` support:

```typescript
@Component({
  template: `
    <div ngxFadeIn [duration]="reducedMotion ? 0 : 600">
      Content
    </div>
  `
})
export class MyComponent {
  reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
```

## 📚 Examples

### Hero Section with Stagger

```typescript
<ngx-stagger-list animation="slide-up" [staggerDelay]="150">
  <h1 class="hero-title">Welcome</h1>
  <p class="hero-subtitle">Next-level animations</p>
  <button class="hero-cta">Get Started</button>
</ngx-stagger-list>
```

### Card Grid with Scroll Reveal

```typescript
@for (card of cards; track card.id) {
  <ngx-scroll-reveal animation="scale" [delay]="$index * 50">
    <div class="card">{{ card.content }}</div>
  </ngx-scroll-reveal>
}
```

### Parallax Hero

```typescript
<section class="hero">
  <div ngxParallaxScroll [speed]="0.3">
    <h1>Parallax Title</h1>
  </div>
  <div ngxParallaxScroll [speed]="0.6">
    <p>Background moves slower</p>
  </div>
</section>
```

### Complex Timeline

```typescript
const tl = this.timeline.create({ repeat: true });

tl.parallel((ptl) => {
  ptl.to(element1, { opacity: '1' }, 500);
  ptl.to(element2, { transform: 'scale(1)' }, 500);
})
.wait(200)
.to(element3, { transform: 'translateY(0)' }, 300)
.play();
```

## 🔧 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📄 License

MIT License - feel free to use in commercial projects!

## 🤝 Contributing

Contributions welcome! Please open an issue or PR.

## 🚀 Roadmap

- [ ] More easing functions
- [ ] Path animations
- [ ] Morph animations
- [ ] Gesture-based animations
- [ ] 3D transforms
- [ ] Physics-based spring animations

---

<div align="center">
  Made with ❤️ for the Angular community
</div>
