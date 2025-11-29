# @elm/ngx-animations

<div align="center">
  <h1>🎨 Next-Level Animation Library for Angular</h1>
  <p><strong>Production-ready • Lightweight • High-performance • RTL Support</strong></p>
  
  <p>
    <img src="https://img.shields.io/badge/Angular-18%2B-red?style=flat-square&logo=angular" alt="Angular 18+">
    <img src="https://img.shields.io/badge/TypeScript-5.9-blue?style=flat-square&logo=typescript" alt="TypeScript">
    <img src="https://img.shields.io/badge/License-MIT-green?style=flat-square" alt="MIT License">
    <img src="https://img.shields.io/badge/PRs-welcome-brightgreen?style=flat-square" alt="PRs Welcome">
  </p>
</div>

---

## ✨ What is @elm/ngx-animations?

A complete, production-ready Angular animation library inspired by GSAP but optimized specifically for Angular applications. Built with Angular 18+ standalone components, it provides a rich set of animation directives, components, and a powerful timeline service for creating stunning UI animations.

### 🎯 Key Features

- 🚀 **High Performance** - Optimized with RAF and CSS animations
- 📦 **Standalone Components** - Full Angular 18+ architecture
- 🌍 **RTL Support** - First-class Arabic and Hebrew support
- 🎪 **GSAP-like Timeline** - Chain animations with ease
- 💪 **TypeScript First** - Complete type safety
- 📱 **Mobile Friendly** - Smooth on all devices
- 🪶 **Lightweight** - Zero dependencies, tree-shakeable
- ♿ **Accessible** - Respects prefers-reduced-motion

---

## 📦 Installation

```bash
npm install @elm/ngx-animations
```

## 🚀 Quick Start

```typescript
import { Component } from '@angular/core';
import { FadeInDirective, SlideInDirective } from '@elm/ngx-animations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FadeInDirective, SlideInDirective],
  template: `
    <div ngxFadeIn [duration]="500">
      <h1>Fade In Animation!</h1>
    </div>

    <div ngxSlideIn direction="left" [triggerOnScroll]="true">
      <p>Slides in when you scroll!</p>
    </div>
  `
})
export class AppComponent {}
```

👉 **See [QUICKSTART.md](./QUICKSTART.md) for a 5-minute getting started guide!**

---

## 🎨 What's Included?

### Animation Directives (6)

| Directive | Description |
|-----------|-------------|
| `ngxFadeIn` | Smooth fade in/out animations |
| `ngxSlideIn` | Slide from any direction with RTL support |
| `ngxScaleIn` | Scale animations from any origin |
| `ngxRotateIn` | 3D rotation on any axis |
| `ngxParallaxScroll` | Smooth parallax scrolling |
| `ngxRippleClick` | Material Design ripple effect |

### Animation Components (4)

| Component | Description |
|-----------|-------------|
| `<ngx-scroll-reveal>` | Reveal content on scroll |
| `<ngx-stagger-list>` | Stagger list item animations |
| `<ngx-typewriter>` | Typewriter effect with RTL |
| `<ngx-marquee>` | Continuous scrolling content |

### Services (1)

| Service | Description |
|---------|-------------|
| `TimelineService` | GSAP-like timeline for chaining animations |

---

## 📚 Documentation

### 📖 Core Documentation
- **[Quick Start Guide](./QUICKSTART.md)** - Get started in 5 minutes
- **[Complete README](./projects/elm/ngx-animations/README.md)** - Full library documentation
- **[API Reference](./projects/elm/ngx-animations/docs/API.md)** - Detailed API docs
- **[Usage Guide](./projects/elm/ngx-animations/docs/USAGE_GUIDE.md)** - Comprehensive examples

### 🤖 AI Assistant Integration
- **AI Assistant Docs (`src/app/docs/ai-assistant`)**: Ready-to-use prompts for tools like ChatGPT, Claude, or Copilot to generate Angular examples using `@elm/ngx-animations`.
- **Use with any LLM**: Describe the motion you want (fade on scroll, bounce + rotate, performance tips, interaction-driven slides), then paste one of the provided prompts to get tailored code.

### 🚀 Publishing & Development
- **[Publishing Guide](./projects/elm/ngx-animations/docs/PUBLISHING.md)** - How to publish to NPM
- **[Changelog](./projects/elm/ngx-animations/CHANGELOG.md)** - Version history

---

## 💡 Examples

### Hero Section Animation

```typescript
<ngx-stagger-list animation="slide-up" [staggerDelay]="150">
  <h1 class="hero-title">Welcome to Our Site</h1>
  <p class="hero-subtitle">Next-level animations</p>
  <button class="hero-cta">Get Started</button>
</ngx-stagger-list>
```

### Card Grid with Scroll Reveal

```typescript
@for (card of cards; track card.id) {
  <ngx-scroll-reveal animation="scale" [delay]="$index * 50">
    <div class="card">
      <h3>{{ card.title }}</h3>
      <p>{{ card.content }}</p>
    </div>
  </ngx-scroll-reveal>
}
```

### Typewriter Effect (with RTL Support)

```typescript
<!-- English -->
<ngx-typewriter 
  [text]="'Welcome to next-level animations!'"
  [speed]="50"
  [showCursor]="true">
</ngx-typewriter>

<!-- Arabic (RTL) -->
<ngx-typewriter 
  [text]="'مرحبا بكم في مكتبة الرسوم المتحركة'"
  [rtl]="true"
  [speed]="50">
</ngx-typewriter>
```

### Timeline Animation (GSAP-like)

```typescript
import { Component, inject, viewChild, ElementRef } from '@angular/core';
import { TimelineService } from '@elm/ngx-animations';

@Component({
  template: `
    <div #box1>Box 1</div>
    <div #box2>Box 2</div>
    <div #box3>Box 3</div>
  `
})
export class AnimationDemo {
  private timeline = inject(TimelineService);
  private box1 = viewChild<ElementRef>('box1');
  private box2 = viewChild<ElementRef>('box2');
  private box3 = viewChild<ElementRef>('box3');

  ngAfterViewInit() {
    const tl = this.timeline.create({ repeat: true });
    
    tl.to(this.box1()!, { opacity: '1', transform: 'translateX(100px)' }, 500)
      .to(this.box2()!, { opacity: '1', transform: 'scale(1.5)' }, 300)
      .parallel((ptl) => {
        ptl.to(this.box2()!, { transform: 'rotate(45deg)' }, 400);
        ptl.to(this.box3()!, { opacity: '1' }, 400);
      })
      .play();
  }
}
```

---

## 🎬 Demo Application

This project includes a comprehensive demo application showcasing all components and directives.

**Live Demo**: [ngx-animations on Vercel](https://ngx-animations-1d6mb6ca4-bananalasmaris-projects.vercel.app/)

### Run the Demo

```bash
# Install dependencies
npm install

# Serve the demo app
npm start

# Open browser to http://localhost:4200
```

The demo application includes:
- ✅ All 11 animation components/directives
- ✅ RTL examples (Arabic/Hebrew)
- ✅ Timeline demonstrations
- ✅ Interactive examples
- ✅ Performance best practices

---

## 🛠️ Development

### Build the Library

```bash
# Development build
npm run build:lib:dev

# Production build
npm run build:lib

# Watch mode
npm run watch:lib
```

### Test Locally

```bash
# Build and pack
npm run build:lib
npm run pack:lib

# Install in another project
npm install /path/to/elm-ngx-animations-1.0.0.tgz
```

### Publish to NPM

```bash
# Dry run (test without publishing)
npm run publish:lib:dry

# Actual publish
npm run publish:lib
```

**See [Publishing Guide](./projects/elm/ngx-animations/docs/PUBLISHING.md) for detailed instructions.**

---

## 🌍 RTL Support

All components fully support RTL layouts for Arabic, Hebrew, and other right-to-left languages.

### Automatic Detection

```html
<div dir="rtl">
  <div ngxSlideIn direction="left">
    <!-- Automatically adjusts for RTL -->
    محتوى عربي
  </div>
</div>
```

### Explicit RTL

```typescript
<div ngxSlideIn direction="left" [rtl]="true">
  Forces RTL behavior
</div>
```

---

## ♿ Accessibility

### Respecting User Preferences

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

---

## 📊 Performance Tips

1. **Use `triggerOnScroll`** for below-the-fold content
2. **Prefer `transform` and `opacity`** over other CSS properties
3. **Use `will-change`** CSS property for complex animations
4. **Adjust `threshold`** for intersection observer optimization

```typescript
<div ngxFadeIn 
     [triggerOnScroll]="true" 
     [threshold]="0.5">
  Only animates when 50% visible
</div>
```

---

## 🗂️ Project Structure

```
animation-lib/
├── projects/
│   └── elm/
│       └── ngx-animations/          # Library source
│           ├── src/
│           │   ├── lib/
│           │   │   ├── directives/  # Animation directives
│           │   │   ├── components/  # Animation components
│           │   │   └── services/    # Timeline service
│           │   └── public-api.ts    # Public exports
│           ├── docs/                # Documentation
│           │   ├── API.md
│           │   ├── USAGE_GUIDE.md
│           │   └── PUBLISHING.md
│           ├── README.md
│           ├── CHANGELOG.md
│           └── package.json
├── src/
│   └── app/
│       └── demo/                    # Demo application
└── README.md                        # This file
```

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Guidelines

1. Follow the existing code style
2. Write tests for new features
3. Update documentation
4. Add examples to demo app

---

## 📄 License

MIT © 2025 elm By Banan Aladmari

See [LICENSE](./projects/elm/ngx-animations/LICENSE) for details.

---

## 🙏 Acknowledgments

Inspired by:
- [GSAP](https://greensock.com/gsap/) - For animation API patterns
- [Framer Motion](https://www.framer.com/motion/) - For modern animation concepts
- Angular Community - For continuous support

---

## 📞 Support

- 📖 [Documentation](./projects/elm/ngx-animations/README.md)
- 🐛 [Issue Tracker](https://github.com/bananalasmari/ngx-animations/issues)
- 💬 [Discussions](https://github.com/bananalasmari/ngx-animations/discussions)

---

## 🗺️ Roadmap

- [ ] Path-based animations
- [ ] Morphing animations
- [ ] Gesture-based animations
- [ ] Physics-based spring animations
- [ ] 3D transforms
- [ ] More easing functions
- [ ] Animation presets library

---

## ⭐ Show Your Support

If you find this library helpful, please consider:
- ⭐ Starring the repository
- 🐦 Sharing on social media
- 📝 Writing a blog post
- 🤝 Contributing to the project

---

<div align="center">
  <strong>Made with ❤️ for the ELM Angular community</strong>
  
  <p>
    <a href="./QUICKSTART.md">Quick Start</a> •
    <a href="./projects/elm/ngx-animations/README.md">Full Docs</a> •
    <a href="./projects/elm/ngx-animations/docs/API.md">API Reference</a> •
    <a href="./projects/elm/ngx-animations/docs/PUBLISHING.md">Publish Guide</a>
  </p>
</div>
