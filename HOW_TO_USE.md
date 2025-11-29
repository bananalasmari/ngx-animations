# 🚀 How to Use Your New Animation Library

## Quick Start - Get Running in 3 Steps!

### Step 1: Install Dependencies (if not already done)

```bash
cd /Users/elmalasmari/Desktop/animation-lib
npm install
```

### Step 2: Run the Demo Application

```bash
npm start
```

Then open your browser to: **http://localhost:4200**

You'll see a beautiful demo showcasing all 11 animation components! 🎨

### Step 3: Explore the Code

The demo application is in: `src/app/demo/`

---

## 📦 Building the Library

### Development Build

```bash
npm run build:lib:dev
```

This creates a development build in `dist/elm/ngx-animations/`

### Production Build

```bash
npm run build:lib
```

This creates an optimized production build ready for publishing.

### Watch Mode (for development)

```bash
npm run watch:lib
```

Automatically rebuilds when you make changes to the library source.

---

## 🧪 Testing the Library Locally

### Method 1: Link the Library

```bash
# Build the library
npm run build:lib

# Link it
cd dist/elm/ngx-animations
npm link

# In your test project
cd /path/to/your-test-project
npm link @elm/ngx-animations
```

### Method 2: Install from Local Package

```bash
# Build and pack
npm run build:lib
npm run pack:lib

# This creates: dist/elm/ngx-animations/elm-ngx-animations-1.0.0.tgz

# Install in your project
cd /path/to/your-project
npm install /Users/elmalasmari/Desktop/animation-lib/dist/elm/ngx-animations/elm-ngx-animations-1.0.0.tgz
```

---

## 📤 Publishing to NPM

### Prerequisites

1. **Create NPM Account**: https://www.npmjs.com/signup
2. **Login to NPM**:
   ```bash
   npm login
   ```

### Update Package Information

Before publishing, update these files:

**File: `projects/elm/ngx-animations/package.json`**

```json
{
  "name": "@elm/ngx-animations",
  "version": "1.0.0",
  "author": "Your Name <your.email@example.com>",
  "repository": {
    "type": "git",
    "url": "https://github.com/YOURUSERNAME/ngx-animations.git"
  }
}
```

### Publish Steps

#### 1. Dry Run (Test Without Publishing)

```bash
npm run publish:lib:dry
```

This shows you what will be published without actually publishing.

#### 2. Actual Publish

```bash
npm run publish:lib
```

This will:
1. Build the library for production
2. Navigate to the dist folder
3. Publish to NPM with public access

### Verify Publication

After publishing, check:
- NPM: https://www.npmjs.com/package/@elm/ngx-animations
- Install: `npm install @elm/ngx-animations`

---

## 💻 Using in Your Projects

### Installation

```bash
npm install @elm/ngx-animations
```

### Basic Usage

```typescript
import { Component } from '@angular/core';
import { FadeInDirective, SlideInDirective } from '@elm/ngx-animations';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [FadeInDirective, SlideInDirective],
  template: `
    <div ngxFadeIn [duration]="500">
      <h1>Fade in animation!</h1>
    </div>

    <div ngxSlideIn direction="left" [triggerOnScroll]="true">
      <p>Slides in when scrolled into view!</p>
    </div>
  `
})
export class ExampleComponent {}
```

---

## 📚 Documentation Files

All documentation is located in the library folder:

### Main Documentation
- **README.md** - Project overview (you are here)
- **QUICKSTART.md** - 5-minute getting started guide
- **PROJECT_SUMMARY.md** - Complete project summary

### Library Documentation
Location: `projects/elm/ngx-animations/`

- **README.md** - Complete library documentation
- **CHANGELOG.md** - Version history
- **LICENSE** - MIT License

### Detailed Guides
Location: `projects/elm/ngx-animations/docs/`

- **API.md** - Complete API reference for all components
- **USAGE_GUIDE.md** - Comprehensive usage examples
- **PUBLISHING.md** - Detailed NPM publishing guide

---

## 🎨 Available Components

### Directives (6)

```typescript
import {
  FadeInDirective,      // ngxFadeIn
  SlideInDirective,     // ngxSlideIn
  ScaleInDirective,     // ngxScaleIn
  RotateInDirective,    // ngxRotateIn
  ParallaxScrollDirective, // ngxParallaxScroll
  RippleClickDirective  // ngxRippleClick
} from '@elm/ngx-animations';
```

### Components (5)

```typescript
import {
  ScrollRevealComponent,    // <ngx-scroll-reveal>
  StaggerListComponent,     // <ngx-stagger-list>
  TypewriterComponent,      // <ngx-typewriter>
  MarqueeComponent,         // <ngx-marquee>
  OrbitAnimationComponent   // <ngx-orbit-animation>
} from '@elm/ngx-animations';
```

### Services (1)

```typescript
import { TimelineService } from '@elm/ngx-animations';
```

---

## 🔥 Quick Examples

### 1. Fade In on Scroll

```typescript
<div ngxFadeIn [triggerOnScroll]="true" [duration]="800">
  Content fades in when scrolled into view
</div>
```

### 2. Stagger List Animation

```typescript
<ngx-stagger-list animation="slide-up" [staggerDelay]="100">
  <div class="item">Item 1</div>
  <div class="item">Item 2</div>
  <div class="item">Item 3</div>
</ngx-stagger-list>
```

### 3. Typewriter Effect

```typescript
<ngx-typewriter
  [text]="'Welcome to next-level animations!'"
  [speed]="50"
  [showCursor]="true">
</ngx-typewriter>
```

### 4. RTL (Arabic) Typewriter

```typescript
<ngx-typewriter
  [text]="'مرحبا بكم في مكتبة الرسوم المتحركة'"
  [rtl]="true"
  [speed]="50">
</ngx-typewriter>
```

### 5. Timeline Animation

```typescript
import { TimelineService } from '@elm/ngx-animations';

@Component({ /* ... */ })
export class MyComponent {
  private timeline = inject(TimelineService);

  ngAfterViewInit() {
    const tl = this.timeline.create();
    
    tl.to(element1, { opacity: '1' }, 500)
      .to(element2, { opacity: '1' }, 500)
      .play();
  }
}
```

---

## 🛠️ Development Commands

```bash
# Start demo app
npm start

# Build library (development)
npm run build:lib:dev

# Build library (production)
npm run build:lib

# Watch library for changes
npm run watch:lib

# Pack library (creates .tgz file)
npm run pack:lib

# Publish to NPM (dry run)
npm run publish:lib:dry

# Publish to NPM (actual)
npm run publish:lib
```

---

## 📂 Project Structure

```
animation-lib/
├── projects/elm/ngx-animations/     # YOUR LIBRARY
│   ├── src/lib/
│   │   ├── directives/                # Animation directives
│   │   ├── components/                # Animation components
│   │   └── services/                  # Timeline service
│   ├── docs/                          # Documentation
│   └── README.md                      # Library docs
│
├── src/app/demo/                       # DEMO APP
│   ├── demo.component.ts
│   ├── demo.component.html
│   └── demo.component.css
│
├── dist/elm/ngx-animations/         # BUILD OUTPUT (after building)
│
└── README.md                           # Project README
```

---

## ✅ Checklist Before Publishing

Before you publish to NPM, make sure:

- [ ] Update `package.json` with your author name and repository URL
- [ ] Update `README.md` with your GitHub links
- [ ] Test all components in the demo app
- [ ] Build the library successfully: `npm run build:lib`
- [ ] Test locally using `npm link` or local install
- [ ] Run dry publish to verify: `npm run publish:lib:dry`
- [ ] Have an NPM account and are logged in: `npm login`
- [ ] Choose a unique package name (or use @yourname/ngx-animations)

---

## 🌍 RTL Support

All components support RTL (Right-to-Left) for Arabic and Hebrew!

### Automatic Detection

```html
<div dir="rtl">
  <div ngxSlideIn direction="left">
    <!-- Automatically adjusts for RTL -->
    محتوى عربي
  </div>
</div>
```

### Manual RTL

```typescript
<div ngxSlideIn direction="left" [rtl]="true">
  Forces RTL behavior
</div>

<ngx-typewriter [text]="'مرحبا'" [rtl]="true"></ngx-typewriter>
```

---

## 🎯 Common Use Cases

### Hero Section

```typescript
<ngx-stagger-list animation="slide-up" [staggerDelay]="150">
  <h1>Welcome</h1>
  <p>Amazing animations</p>
  <button>Get Started</button>
</ngx-stagger-list>
```

### Card Grid

```typescript
<div class="grid">
  @for (card of cards; track card.id) {
    <ngx-scroll-reveal animation="scale" [delay]="$index * 50">
      <div class="card">{{ card.title }}</div>
    </ngx-scroll-reveal>
  }
</div>
```

### Animated Button

```typescript
<button ngxRippleClick [rippleColor]="'rgba(255,255,255,0.5)'">
  Click Me!
</button>
```

---

## 🐛 Troubleshooting

### Issue: "Module not found"

**Solution:** Make sure you've built the library:
```bash
npm run build:lib
```

### Issue: "Cannot find '@elm/ngx-animations'"

**Solution:** If testing locally, use npm link:
```bash
cd dist/elm/ngx-animations
npm link
```

### Issue: Demo app not starting

**Solution:** Install dependencies:
```bash
npm install
npm start
```

### Issue: Build errors

**Solution:** Clean and rebuild:
```bash
rm -rf node_modules dist
npm install
npm run build:lib
```

---

## 📞 Support & Resources

- 📖 [Complete Documentation](./projects/elm/ngx-animations/README.md)
- 📚 [API Reference](./projects/elm/ngx-animations/docs/API.md)
- 🎓 [Usage Guide](./projects/elm/ngx-animations/docs/USAGE_GUIDE.md)
- 📤 [Publishing Guide](./projects/elm/ngx-animations/docs/PUBLISHING.md)
- 🎨 [Demo Application](./src/app/demo/)

---

## 🎉 You're All Set!

Your animation library is complete and ready to use! Here's what to do next:

1. **Test it**: `npm start` - See the demo
2. **Build it**: `npm run build:lib` - Build for production
3. **Publish it**: `npm run publish:lib` - Share with the world
4. **Use it**: Install in your projects and create amazing animations!

**Happy Animating! 🚀**

---

<div align="center">
  <strong>@elm/ngx-animations</strong> - Next-Level Animation Library for Angular
</div>

