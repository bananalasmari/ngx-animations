# API Documentation

Complete API reference for @elm/ngx-animations

## Table of Contents

- [Directives](#directives)
  - [FadeInDirective](#fadein-directive)
  - [SlideInDirective](#slidein-directive)
  - [ScaleInDirective](#scalein-directive)
  - [RotateInDirective](#rotatein-directive)
  - [ParallaxScrollDirective](#parallaxscroll-directive)
  - [RippleClickDirective](#rippleclick-directive)
- [Components](#components)
  - [ScrollRevealComponent](#scrollreveal-component)
  - [StaggerListComponent](#staggerlist-component)
  - [TypewriterComponent](#typewriter-component)
  - [MarqueeComponent](#marquee-component)
  - [OrbitAnimationComponent](#orbitanimation-component)
- [Services](#services)
  - [TimelineService](#timeline-service)

---

## Directives

### FadeIn Directive

**Selector:** `[ngxFadeIn]`

Applies smooth fade in/out animations to any element.

#### Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `duration` | `number` | `600` | Animation duration in milliseconds |
| `delay` | `number` | `0` | Delay before animation starts (ms) |
| `easing` | `EasingFunction` | `'ease-out'` | CSS easing function |
| `direction` | `'in' \| 'out' \| 'in-out'` | `'in'` | Fade direction |
| `triggerOnScroll` | `boolean` | `false` | Trigger when element enters viewport |
| `threshold` | `number` | `0.1` | Intersection observer threshold (0-1) |
| `startOpacity` | `number` | `0` | Starting opacity value |
| `endOpacity` | `number` | `1` | Ending opacity value |

#### Outputs

| Output | Type | Description |
|--------|------|-------------|
| `animationStart` | `EventEmitter<void>` | Emits when animation starts |
| `animationEnd` | `EventEmitter<void>` | Emits when animation completes |

#### Example

```typescript
<div ngxFadeIn
     [duration]="500"
     [delay]="100"
     [triggerOnScroll]="true"
     (animationEnd)="onFadeComplete()">
  Fade content
</div>
```

---

### SlideIn Directive

**Selector:** `[ngxSlideIn]`

Slides element from specified direction with full RTL support.

#### Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `duration` | `number` | `600` | Animation duration (ms) |
| `delay` | `number` | `0` | Delay before animation (ms) |
| `easing` | `EasingFunction` | `'cubic-bezier(0.4, 0, 0.2, 1)'` | Easing function |
| `direction` | `'left' \| 'right' \| 'top' \| 'bottom'` | `'left'` | Slide direction |
| `distance` | `number` | `50` | Distance to slide (pixels) |
| `triggerOnScroll` | `boolean` | `false` | Trigger on scroll |
| `threshold` | `number` | `0.1` | Intersection threshold |
| `rtl` | `boolean` | `false` | Force RTL mode |

#### Outputs

| Output | Type | Description |
|--------|------|-------------|
| `animationStart` | `EventEmitter<void>` | Emits when animation starts |
| `animationEnd` | `EventEmitter<void>` | Emits when animation completes |

#### Example

```typescript
<div ngxSlideIn
     direction="left"
     [distance]="100"
     [rtl]="isRTL">
  Slide content
</div>
```

---

### ScaleIn Directive

**Selector:** `[ngxScaleIn]`

Scales element from specified origin point.

#### Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `duration` | `number` | `600` | Animation duration (ms) |
| `delay` | `number` | `0` | Delay before animation (ms) |
| `easing` | `EasingFunction` | `'cubic-bezier(0.4, 0, 0.2, 1)'` | Easing function |
| `startScale` | `number` | `0.5` | Starting scale value |
| `endScale` | `number` | `1` | Ending scale value |
| `origin` | `ScaleOrigin` | `'center'` | Transform origin |
| `triggerOnScroll` | `boolean` | `false` | Trigger on scroll |
| `threshold` | `number` | `0.1` | Intersection threshold |

#### Types

```typescript
type ScaleOrigin = 'center' | 'top' | 'bottom' | 'left' | 'right' | 
                   'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
```

#### Example

```typescript
<div ngxScaleIn
     [startScale]="0.3"
     [endScale]="1.2"
     origin="center">
  Scale content
</div>
```

---

### RotateIn Directive

**Selector:** `[ngxRotateIn]`

Rotates element on specified axis.

#### Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `duration` | `number` | `600` | Animation duration (ms) |
| `delay` | `number` | `0` | Delay before animation (ms) |
| `easing` | `EasingFunction` | `'cubic-bezier(0.4, 0, 0.2, 1)'` | Easing function |
| `axis` | `'x' \| 'y' \| 'z'` | `'z'` | Rotation axis |
| `degrees` | `number` | `180` | Rotation degrees |
| `triggerOnScroll` | `boolean` | `false` | Trigger on scroll |
| `threshold` | `number` | `0.1` | Intersection threshold |

#### Example

```typescript
<div ngxRotateIn
     axis="y"
     [degrees]="90">
  Rotate content
</div>
```

---

### ParallaxScroll Directive

**Selector:** `[ngxParallaxScroll]`

Creates smooth parallax scrolling effect.

#### Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `speed` | `number` | `0.5` | Parallax speed (0-1) |
| `direction` | `'vertical' \| 'horizontal'` | `'vertical'` | Parallax direction |
| `reverse` | `boolean` | `false` | Reverse parallax direction |

#### Example

```typescript
<div ngxParallaxScroll
     [speed]="0.3"
     direction="vertical">
  Parallax content
</div>
```

---

### RippleClick Directive

**Selector:** `[ngxRippleClick]`

Material Design-inspired ripple effect on click.

#### Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `rippleColor` | `string` | `'rgba(255, 255, 255, 0.5)'` | Ripple color |
| `rippleDuration` | `number` | `600` | Ripple animation duration (ms) |
| `rippleRadius` | `number` | `0` | Ripple radius (0 = auto) |
| `centered` | `boolean` | `false` | Center ripple on element |

#### Example

```typescript
<button ngxRippleClick
        [rippleColor]="'rgba(0, 0, 0, 0.2)'"
        [centered]="true">
  Click me
</button>
```

---

### BounceIn Directive

**Selector:** `[ngxBounceIn]`

Bounce entrance animation, great for cards and hero elements.

#### Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `duration` | `number` | `800` | Animation duration (ms) |
| `delay` | `number` | `0` | Delay before animation (ms) |
| `direction` | `'up' \| 'down' \| 'left' \| 'right' \| 'center'` | `'up'` | Bounce direction |
| `distance` | `number` | `50` | Offset distance in px |
| `triggerOnScroll` | `boolean` | `false` | Trigger when entering viewport |
| `threshold` | `number` | `0.1` | Intersection threshold |

#### Outputs

Same as `FadeInDirective` (`animationStart`, `animationEnd`).

#### Example

```html
<div ngxBounceIn direction="up" [duration]="800">
  Bouncy card
</div>
```

---

### FlipIn Directive

**Selector:** `[ngxFlipIn]`

3D flip animation on X/Y/diagonal axis.

#### Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `duration` | `number` | `600` | Duration in ms |
| `delay` | `number` | `0` | Delay in ms |
| `axis` | `'horizontal' \| 'vertical' \| 'diagonal'` | `'horizontal'` | Flip axis |
| `triggerOnScroll` | `boolean` | `false` | Trigger on scroll |
| `threshold` | `number` | `0.1` | Intersection threshold |

#### Example

```html
<div ngxFlipIn axis="horizontal" [duration]="600">
  Flip in card
</div>
```

---

### Shake Directive

**Selector:** `[ngxShake]`

Shake / wobble effect for attention or error states.

#### Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `intensity` | `'soft' \| 'medium' \| 'hard'` | `'medium'` | Shake intensity |
| `duration` | `number` | `500` | Duration per shake (ms) |
| `shakeOnHover` | `boolean` | `false` | Trigger on hover |
| `shakeOnClick` | `boolean` | `false` | Trigger on click |
| `continuous` | `boolean` | `false` | Repeat periodically |

#### Example

```html
<button ngxShake [shakeOnClick]="true" intensity="hard">
  Delete
</button>
```

---

### Pulse Directive

**Selector:** `[ngxPulse]`

Continuous pulsing / heartbeat effect.

#### Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `speed` | `number` | `1000` | Duration of one pulse (ms) |
| `scale` | `number` | `1.05` | Max scale value |
| `continuous` | `boolean` | `true` | Run indefinitely |
| `pauseOnHover` | `boolean` | `false` | Pause when hovering |

#### Example

```html
<div ngxPulse [speed]="800" [scale]="1.08">
  Live status
</div>
```

---

### Glitch Directive

**Selector:** `[ngxGlitch]`

Retro “glitch” text effect.

#### Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `intensity` | `number` | `3` | Glitch strength (1–10) |
| `speed` | `number` | `3000` | Time between glitches (ms) |
| `duration` | `number` | `200` | Duration of each glitch (ms) |
| `continuous` | `boolean` | `true` | Loop glitches |

#### Example

```html
<h2 ngxGlitch [intensity]="4">SYSTEM ERROR</h2>
```

---

### ZoomIn Directive

**Selector:** `[ngxZoomIn]`

Zoom-in animation with different easing styles.

#### Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `duration` | `number` | `600` | Duration (ms) |
| `delay` | `number` | `0` | Delay (ms) |
| `style` | `'smooth' \| 'bounce' \| 'elastic'` | `'smooth'` | Zoom style |
| `intensity` | `number` | `1.2` | Peak zoom scale |
| `triggerOnScroll` | `boolean` | `false` | Trigger on scroll |
| `threshold` | `number` | `0.1` | Intersection threshold |

#### Example

```html
<div ngxZoomIn style="bounce" [intensity]="1.3">
  Zoom with bounce
</div>
```

---

### Magnetic Directive

**Selector:** `[ngxMagnetic]`

Magnetic hover effect – element follows the cursor slightly.

#### Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `strength` | `number` | `0.4` | Pull strength (0–1) |
| `speed` | `number` | `0.3` | Follow speed (0–1) |

#### Example

```html
<button ngxMagnetic [strength]="0.5">
  Hover me
</button>
```

---

### Tilt3d Directive

**Selector:** `[ngxTilt3d]`

3D tilt effect based on mouse position.

#### Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `maxTilt` | `number` | `20` | Max tilt angle in degrees |
| `perspective` | `number` | `1000` | CSS perspective |
| `scale` | `number` | `1.05` | Scale on hover |
| `speed` | `number` | `400` | Transition duration (ms) |
| `glare` | `boolean` | `false` | Enable glare overlay |

#### Example

```html
<div ngxTilt3d [maxTilt]="15" [glare]="true">
  3D Card
</div>
```

---

### ScrollProgress Directive

**Selector:** `[ngxScrollProgress]`

Animates transform/opacity based on scroll position (ScrollTrigger‑style).

#### Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `startProgress` | `number` | `0` | Start percentage (0–100) |
| `endProgress` | `number` | `100` | End percentage (0–100) |
| `animateOpacity` | `boolean` | `true` | Animate opacity |
| `animateScale` | `boolean` | `false` | Animate scale |
| `animateX` | `number` | `0` | Translate X distance |
| `animateY` | `number` | `0` | Translate Y distance |
| `animateRotate` | `number` | `0` | Rotation degrees |

#### Outputs

| Output | Type | Description |
|--------|------|-------------|
| `progressChange` | `EventEmitter<number>` | Emits progress value 0–1 |

#### Example

```html
<div
  ngxScrollProgress
  [animateOpacity]="true"
  [animateY]="100"
  [animateRotate]="360">
  Scroll-driven block
</div>
```

---

### Morph Directive

**Selector:** `[ngxMorph]`

Smoothly morphs `border-radius` to create organic shapes.

#### Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `morphOnHover` | `boolean` | `true` | Morph on hover |
| `morphOnClick` | `boolean` | `false` | Morph on click |
| `duration` | `number` | `600` | Morph duration (ms) |
| `continuous` | `boolean` | `false` | Morph periodically |

#### Example

```html
<div ngxMorph [morphOnHover]="true" [duration]="800">
  Organic blob
</div>
```

---

### HoverLift Directive

**Selector:** `[ngxHoverLift]`

Utility directive for common card/button hover lift effect.

#### Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `liftScale` | `number` | `1.03` | Scale on hover |
| `shadowStrength` | `number` | `0.25` | Shadow strength (0–1) |
| `hoverDuration` | `number` | `200` | Transition duration (ms) |

#### Example

```html
<div class="card" ngxHoverLift>
  Hoverable card
</div>
```

---

### CountUp Directive

**Selector:** `[ngxCountUp]`

Animates numeric values (counters, stats, KPIs).

#### Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `start` | `number` | `0` | Starting value |
| `end` | `number` | `100` | Target value |
| `duration` | `number` | `1000` | Duration in ms |
| `decimals` | `number` | `0` | Decimal places |
| `prefix` | `string` | `''` | Prefix string (`$`, `+`, etc.) |
| `suffix` | `string` | `''` | Suffix string (`%`, `k`, etc.) |
| `triggerOnScroll` | `boolean` | `true` | Start when visible |
| `threshold` | `number` | `0.2` | Intersection threshold |

#### Example

```html
<span
  ngxCountUp
  [start]="0"
  [end]="2500"
  [duration]="1200"
  [prefix]="'$'"
  [decimals]="2">
</span>
```

---

## Components

### ScrollReveal Component

**Selector:** `<ngx-scroll-reveal>`

Reveals content when it comes into viewport.

#### Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `animation` | `RevealAnimation` | `'fade'` | Animation type |
| `duration` | `number` | `600` | Animation duration (ms) |
| `delay` | `number` | `0` | Delay before animation (ms) |
| `threshold` | `number` | `0.1` | Intersection threshold |
| `once` | `boolean` | `true` | Animate only once |
| `distance` | `number` | `50` | Distance for slide animations (px) |

#### Types

```typescript
type RevealAnimation = 'fade' | 'slide-up' | 'slide-down' | 
                      'slide-left' | 'slide-right' | 'scale' | 'rotate';
```

#### Outputs

| Output | Type | Description |
|--------|------|-------------|
| `revealed` | `EventEmitter<void>` | Emits when element is revealed |
| `hidden` | `EventEmitter<void>` | Emits when element is hidden (if once=false) |

#### Example

```typescript
<ngx-scroll-reveal
  animation="slide-up"
  [duration]="800"
  (revealed)="onRevealed()">
  <h1>Content to reveal</h1>
</ngx-scroll-reveal>
```

---

### StaggerList Component

**Selector:** `<ngx-stagger-list>`

Animates child elements with staggered delays.

#### Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `animation` | `StaggerAnimation` | `'fade'` | Animation type |
| `duration` | `number` | `600` | Animation duration (ms) |
| `staggerDelay` | `number` | `100` | Delay between each item (ms) |
| `initialDelay` | `number` | `0` | Initial delay before first item (ms) |
| `triggerOnScroll` | `boolean` | `true` | Trigger on scroll |
| `threshold` | `number` | `0.1` | Intersection threshold |
| `reverse` | `boolean` | `false` | Reverse animation order |

#### Types

```typescript
type StaggerAnimation = 'fade' | 'slide-up' | 'slide-down' | 'scale' | 'rotate';
```

#### Outputs

| Output | Type | Description |
|--------|------|-------------|
| `animationStart` | `EventEmitter<number>` | Emits item index when animation starts |
| `animationComplete` | `EventEmitter<void>` | Emits when all animations complete |

#### Example

```typescript
<ngx-stagger-list
  animation="slide-up"
  [staggerDelay]="150">
  <div class="item">Item 1</div>
  <div class="item">Item 2</div>
  <div class="item">Item 3</div>
</ngx-stagger-list>
```

---

### Typewriter Component

**Selector:** `<ngx-typewriter>`

Types out text character by character with full RTL support.

#### Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `text` | `string` | `''` | Text to type out |
| `speed` | `number` | `50` | Milliseconds per character |
| `delay` | `number` | `0` | Initial delay (ms) |
| `showCursor` | `boolean` | `true` | Show blinking cursor |
| `loop` | `boolean` | `false` | Loop the animation |
| `deleteSpeed` | `number` | `30` | Speed when deleting (ms per char) |
| `pauseBeforeDelete` | `number` | `2000` | Pause before deleting (ms) |
| `rtl` | `boolean` | `false` | RTL mode for Arabic/Hebrew |

#### Outputs

| Output | Type | Description |
|--------|------|-------------|
| `typingStart` | `EventEmitter<void>` | Emits when typing starts |
| `typingComplete` | `EventEmitter<void>` | Emits when typing completes |
| `deletingStart` | `EventEmitter<void>` | Emits when deleting starts |
| `deletingComplete` | `EventEmitter<void>` | Emits when deleting completes |

#### Example

```typescript
<ngx-typewriter
  [text]="'Hello, World!'"
  [speed]="50"
  [loop]="true"
  (typingComplete)="onComplete()">
</ngx-typewriter>

<!-- RTL Example -->
<ngx-typewriter
  [text]="'مرحبا بالعالم'"
  [rtl]="true">
</ngx-typewriter>
```

---

### Marquee Component

**Selector:** `<ngx-marquee>`

Continuous scrolling content with RTL support.

#### Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `speed` | `number` | `50` | Scroll speed (pixels/second) |
| `direction` | `MarqueeDirection` | `'left'` | Scroll direction |
| `pauseOnHover` | `boolean` | `true` | Pause on mouse hover |
| `rtl` | `boolean` | `false` | RTL mode |
| `gap` | `number` | `32` | Gap between items (px) |

#### Types

```typescript
type MarqueeDirection = 'left' | 'right' | 'up' | 'down';
```

#### Example

```typescript
<ngx-marquee
  [speed]="30"
  direction="left"
  [pauseOnHover]="true">
  Scrolling text content...
</ngx-marquee>
```

---

### Confetti Component

**Selector:** `<ngx-confetti>`

Full-screen confetti explosion effect.

#### Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `particleCount` | `number` | `150` | Number of confetti particles |
| `duration` | `number` | `3000` | Duration in ms |
| `colors` | `string[]` | preset | Array of CSS color strings |
| `autoStart` | `boolean` | `true` | Start automatically on init |

#### Example

```html
<button (click)="show = true">Celebrate</button>
@if (show) {
  <ngx-confetti [particleCount]="200" [duration]="2500"></ngx-confetti>
}
```

---

### TextScramble Component

**Selector:** `<ngx-text-scramble>`

Scrambles characters and “decodes” into the final text.

#### Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `text` | `string` | `''` | Final text |
| `speed` | `number` | `50` | Frame speed (ms) |
| `scrambleChars` | `string` | `'!<>-_\\/[]{}—=+*^?#________'` | Character set |
| `delay` | `number` | `0` | Delay before start (ms) |
| `customClass` | `string` | `''` | Extra CSS class on `<span>` |

#### Outputs

| Output | Type | Description |
|--------|------|-------------|
| `complete` | `EventEmitter<void>` | Fires when scramble is done |

#### Example

```html
<ngx-text-scramble
  [text]="'PREMIUM EFFECTS'"
  [speed]="30"
  customClass="scramble-text">
</ngx-text-scramble>
```

---

### MouseFollower Component

**Selector:** `<ngx-mouse-follower>`

Custom cursor that smoothly follows the mouse.

#### Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `size` | `number` | `40` | Outer circle size (px) |
| `dotSize` | `number` | `8` | Inner dot size (px) |
| `color` | `string` | `'rgba(255, 255, 255, 0.5)'` | Circle color |
| `dotColor` | `string` | `'rgba(255, 255, 255, 0.8)'` | Dot color |
| `speed` | `number` | `0.15` | Follow smoothing factor |

#### Example

```html
<ngx-mouse-follower [size]="30" [dotSize]="6"></ngx-mouse-follower>
```

---

### ProfileCard Component

**Selector:** `<ngx-profile-card>`

Single profile / team member card with gradient background and stats.

#### Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `name` | `string` | `''` | Display name (supports Arabic) |
| `username` | `string` | `''` | Secondary label / handle |
| `jobTitle` | `string` | `''` | Job title |
| `gradient` | `string` | preset | CSS gradient background |
| `icon` | `string` | `'👤'` | Emoji icon |
| `iconSvg` | `string` | `undefined` | Custom SVG path data |
| `stats` | `{ documents?: number; views?: number; links?: number }` | `undefined` | Optional stats |
| `showStats` | `boolean` | `true` | Show stats row |
| `enableTilt` | `boolean` | `true` | Enable 3D tilt |
| `enableMagnetic` | `boolean` | `false` | Enable magnetic hover |
| `magneticStrength` | `number` | `0.3` | Magnetic strength |
| `tiltMax` | `number` | `15` | Max tilt angle |
| `tiltGlare` | `boolean` | `true` | Enable glare overlay |

#### Example

```html
<ngx-profile-card
  name="سارة الزهراني"
  username="sara_zahrani@"
  jobTitle="عالمة بيانات"
  gradient="linear-gradient(135deg, #FF5D36, #E63946)"
  icon="📊"
  [stats]="{ documents: 12, views: 234, links: 8 }">
</ngx-profile-card>
```

---

### ProfileGrid Component

**Selector:** `<ngx-profile-grid>`

Responsive grid of profile cards with stagger / reveal animations.

#### Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `profiles` | `ProfileCardData[]` | `[]` | Array of profile data |
| `columns` | `number` | `4` | Number of columns (desktop) |
| `staggerDelay` | `number` | `100` | Delay between items (ms) |
| `staggerAnimation` | `'fade' \| 'slide-up' \| 'slide-down' \| 'scale' \| 'rotate'` | `'slide-up'` | Stagger style |
| `enableStagger` | `boolean` | `true` | Use `StaggerListComponent` |
| `enableScrollReveal` | `boolean` | `false` | Use `ScrollRevealComponent` |
| `gap` | `number` | `1.5` | Gap between cards (rem) |
| `cardHeight` | `string` | `'auto'` | Custom card height |

#### Example

```html
<ngx-profile-grid
  [profiles]="teamMembers"
  [columns]="4"
  [staggerDelay]="120">
</ngx-profile-grid>
```

---
## Services

### Timeline Service

**Injectable:** `TimelineService`

GSAP-like timeline for chaining animations.

#### Methods

##### `createTimeline(options?: TimelineOptions): Timeline`

Creates a new timeline instance.

```typescript
const timeline = this.timelineService.createTimeline({
  repeat: true,
  onComplete: () => console.log('Done!')
});
```

---

### RtlLanguageService

**Injectable:** `RtlLanguageService`

Global service to control locale (`'en' | 'ar'`) and text direction (`'ltr' | 'rtl'`).

#### Properties

| Property | Type | Description |
|----------|------|-------------|
| `locale` | `Signal<'en' \| 'ar'>` | Current locale signal |
| `direction` | `Signal<'ltr' \| 'rtl'>` | Current direction signal |
| `isRtl` | `Signal<boolean>` | Convenience flag for RTL |

#### Methods

| Method | Description |
|--------|-------------|
| `setLocale('en' \| 'ar')` | Set explicit locale |
| `toggleLocale()` | Toggle between EN / AR |

#### Example

```ts
import { RtlLanguageService } from '@elm/ngx-animations';

const rtl = inject(RtlLanguageService);

rtl.setLocale('ar'); // Arabic + RTL
rtl.setLocale('en'); // English + LTR
```


#### Timeline Class

##### Methods

**`to(element, properties, duration, delay?, easing?): this`**

Animate to specified properties.

```typescript
timeline.to(element, { opacity: '1', transform: 'translateX(0)' }, 500);
```

**`from(element, properties, duration, delay?, easing?): this`**

Animate from specified properties.

```typescript
timeline.from(element, { opacity: '0' }, 500);
```

**`fromTo(element, from, to, duration, delay?, easing?): this`**

Animate from one state to another.

```typescript
timeline.fromTo(
  element,
  { opacity: '0', transform: 'scale(0)' },
  { opacity: '1', transform: 'scale(1)' },
  500
);
```

**`wait(duration): this`**

Add a pause in the timeline.

```typescript
timeline.to(el1, props, 500)
  .wait(200)
  .to(el2, props, 500);
```

**`parallel(callback): this`**

Run multiple animations in parallel.

```typescript
timeline.parallel((tl) => {
  tl.to(element1, { opacity: '1' }, 500);
  tl.to(element2, { transform: 'scale(1)' }, 500);
});
```

**`play(): Promise<void>`**

Start the timeline.

**`pause(): this`**

Pause the timeline.

**`resume(): this`**

Resume the timeline.

**`stop(): this`**

Stop and reset the timeline.

**`restart(): Promise<void>`**

Restart from the beginning.

**`reverse(): this`**

Reverse the timeline direction.

#### TimelineOptions

```typescript
interface TimelineOptions {
  repeat?: boolean;
  repeatDelay?: number;
  onComplete?: () => void;
  onStart?: () => void;
  onRepeat?: () => void;
}
```

#### Complete Example

```typescript
import { Component, inject, ElementRef, viewChild } from '@angular/core';
import { TimelineService } from '@elm/ngx-animations';

@Component({
  selector: 'app-demo',
  template: `
    <div #box1>Box 1</div>
    <div #box2>Box 2</div>
  `
})
export class DemoComponent {
  private timeline = inject(TimelineService);
  private box1 = viewChild<ElementRef>('box1');
  private box2 = viewChild<ElementRef>('box2');

  ngAfterViewInit() {
    const tl = this.timeline.create({
      repeat: true,
      repeatDelay: 1000
    });

    tl.to(this.box1()!, { opacity: '1' }, 500)
      .wait(200)
      .parallel((ptl) => {
        ptl.to(this.box1()!, { transform: 'translateX(100px)' }, 500);
        ptl.to(this.box2()!, { opacity: '1' }, 500);
      })
      .play();
  }
}
```

---

## Common Types

### EasingFunction

```typescript
type EasingFunction = 
  | 'ease'
  | 'ease-in'
  | 'ease-out'
  | 'ease-in-out'
  | 'linear'
  | 'cubic-bezier(0.4, 0, 0.2, 1)'
  | string; // Any valid CSS easing
```

### Common Patterns

#### Scroll-Triggered Animation

```typescript
<div ngxFadeIn
     [triggerOnScroll]="true"
     [threshold]="0.5">
  Content
</div>
```

#### RTL Support

```typescript
<div ngxSlideIn
     direction="left"
     [rtl]="true">
  RTL Content
</div>
```

#### Chained Animations

```typescript
timeline
  .to(el1, { opacity: '1' }, 500)
  .to(el2, { opacity: '1' }, 500)
  .to(el3, { opacity: '1' }, 500)
  .play();
```

---

## Browser Support

All features work in:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Performance Notes

1. Use `will-change` CSS property for complex animations
2. Prefer `transform` and `opacity` for best performance
3. Use `triggerOnScroll` for off-screen elements
4. Implement `prefers-reduced-motion` support

---

For more examples, see the [README](../README.md) and [demo application](../../src/app/demo/).

