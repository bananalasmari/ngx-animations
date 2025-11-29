# @elm/ngx-animations - Quick Start Guide

Get started with @elm/ngx-animations in 5 minutes!

## 📦 Installation

```bash
npm install @elm/ngx-animations
```

## 🚀 Your First Animation

### Step 1: Import the Directive

```typescript
import { Component } from '@angular/core';
import { FadeInDirective } from '@elm/ngx-animations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FadeInDirective],
  template: `
    <div ngxFadeIn>
      <h1>Hello, Animations! 🎨</h1>
    </div>
  `
})
export class AppComponent {}
```

### Step 2: Run Your App

```bash
ng serve
```

That's it! Your content now fades in smoothly! ✨

## 🎯 More Examples

### Slide Animation

```typescript
import { SlideInDirective } from '@elm/ngx-animations';

@Component({
  imports: [SlideInDirective],
  template: `
    <div ngxSlideIn direction="left" [duration]="600">
      Slides in from the left!
    </div>
  `
})
```

### Scroll Reveal

```typescript
import { ScrollRevealComponent } from '@elm/ngx-animations';

@Component({
  imports: [ScrollRevealComponent],
  template: `
    <ngx-scroll-reveal animation="slide-up">
      <div class="card">Reveals when you scroll!</div>
    </ngx-scroll-reveal>
  `
})
```

### Typewriter Effect

```typescript
import { TypewriterComponent } from '@elm/ngx-animations';

@Component({
  imports: [TypewriterComponent],
  template: `
    <ngx-typewriter 
      [text]="'Welcome to next-level animations!'"
      [speed]="50">
    </ngx-typewriter>
  `
})
```

### Timeline (GSAP-like)

```typescript
import { Component, inject, viewChild, ElementRef } from '@angular/core';
import { TimelineService } from '@elm/ngx-animations';

@Component({
  template: `
    <div #box1>Box 1</div>
    <div #box2>Box 2</div>
  `
})
export class MyComponent {
  private timeline = inject(TimelineService);
  private box1 = viewChild<ElementRef>('box1');
  private box2 = viewChild<ElementRef>('box2');

  ngAfterViewInit() {
    const tl = this.timeline.create();
    
    tl.to(this.box1()!, { opacity: '1' }, 500)
      .to(this.box2()!, { opacity: '1' }, 500)
      .play();
  }
}
```

## 🌍 RTL Support (Arabic/Hebrew)

```typescript
import { TypewriterComponent, SlideInDirective } from '@elm/ngx-animations';

@Component({
  imports: [TypewriterComponent, SlideInDirective],
  template: `
    <!-- RTL Typewriter -->
    <ngx-typewriter 
      [text]="'مرحبا بكم'"
      [rtl]="true">
    </ngx-typewriter>

    <!-- RTL Slide -->
    <div ngxSlideIn direction="left" [rtl]="true">
      يتحرك من اليمين
    </div>
  `
})
```

## 🎨 All Available Components & Directives

### Directives
- `ngxFadeIn` - Fade animations
- `ngxSlideIn` - Slide from any direction
- `ngxScaleIn` - Scale with origin point
- `ngxRotateIn` - 3D rotations
- `ngxParallaxScroll` - Parallax effects
- `ngxRippleClick` - Material ripple effect

### Components
- `<ngx-scroll-reveal>` - Reveal on scroll
- `<ngx-stagger-list>` - Staggered list animations
- `<ngx-typewriter>` - Typewriter effect
- `<ngx-marquee>` - Continuous scrolling
- `<ngx-orbit-animation>` - Circular orbits

### Services
- `TimelineService` - Chain animations (GSAP-like)

## 📚 Next Steps

- Read the [Full Documentation](./projects/elm/ngx-animations/README.md)
- Check the [API Reference](./projects/elm/ngx-animations/docs/API.md)
- Explore the [Usage Guide](./projects/elm/ngx-animations/docs/USAGE_GUIDE.md)
- Run the demo app: `ng serve`

## 💡 Common Use Cases

### Hero Section
```typescript
<ngx-stagger-list animation="slide-up" [staggerDelay]="150">
  <h1>Welcome</h1>
  <p>Next-level animations</p>
  <button>Get Started</button>
</ngx-stagger-list>
```

### Card Grid
```typescript
@for (card of cards; track card.id) {
  <ngx-scroll-reveal animation="scale">
    <div class="card">{{ card.title }}</div>
  </ngx-scroll-reveal>
}
```

### Animated Button
```typescript
<button ngxRippleClick [rippleColor]="'rgba(255,255,255,0.5)'">
  Click Me!
</button>
```

## 🎯 Tips

1. **Performance**: Use `[triggerOnScroll]="true"` for off-screen elements
2. **Accessibility**: Respect `prefers-reduced-motion`
3. **Smoothness**: Prefer `transform` and `opacity` for best performance

## 🆘 Need Help?

- [Full Documentation](./projects/elm/ngx-animations/README.md)
- [API Reference](./projects/elm/ngx-animations/docs/API.md)
- [GitHub Issues](https://github.com/yourusername/ngx-animations/issues)

---

**Happy Animating! 🚀**

