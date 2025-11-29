# Changelog

All notable changes to @elm/ngx-animations will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.2] - 2025-11-29

### Changed
- Updated root README to document the AI assistant prompts and integration.
- Removed the `OrbitAnimationComponent` from the public component list in the root README to reflect the current recommended set of components.

---

## [1.0.0] - 2025-11-23

### Added

#### Core Features
- 🎨 **Animation Directives**
  - `ngxFadeIn` - Smooth fade in/out animations
  - `ngxSlideIn` - Slide animations from any direction with RTL support
  - `ngxScaleIn` - Scale animations with customizable origin points
  - `ngxRotateIn` - 3D rotation animations on any axis

- 🌊 **Scroll-Based Animations**
  - `ngxParallaxScroll` - Smooth parallax scrolling effects
  - `ScrollRevealComponent` - Reveal content on scroll with multiple animation types

- ✨ **Advanced Components**
  - `StaggerListComponent` - Stagger animations for lists
  - `TypewriterComponent` - Typewriter effect with full RTL support
  - `MarqueeComponent` - Continuous scrolling content
  - `OrbitAnimationComponent` - Circular orbit animations

- 🎯 **Interactions**
  - `ngxRippleClick` - Material Design-inspired ripple effect

- ⏱️ **Timeline Service**
  - GSAP-like timeline for chaining animations
  - Support for sequential and parallel animations
  - Methods: `to()`, `from()`, `fromTo()`, `wait()`, `parallel()`
  - Timeline controls: `play()`, `pause()`, `resume()`, `stop()`, `restart()`, `reverse()`

#### Features
- 🌍 **Full RTL Support** - All components respect RTL layouts
- 📱 **Mobile Friendly** - Optimized for touch devices
- 🚀 **High Performance** - RequestAnimationFrame and CSS-based animations
- 🎯 **Intersection Observer** - Efficient scroll-triggered animations
- 💪 **TypeScript First** - Full type safety and IntelliSense support
- 🌳 **Tree Shakeable** - Import only what you need
- 📦 **Standalone Components** - Angular 18+ standalone architecture
- ♿ **Accessible** - Respects `prefers-reduced-motion`

#### Documentation
- Comprehensive README with examples
- Complete API documentation
- Publishing guide
- Demo application with all components
- Code examples for every feature

### Technical Details
- Built with Angular 18+
- Zero external dependencies
- Uses modern Web APIs (Intersection Observer, RequestAnimationFrame)
- Fully typed with TypeScript
- Supports Server-Side Rendering (SSR)

---

## [Unreleased]

### Planned Features
- [ ] Additional easing functions
- [ ] Path-based animations
- [ ] Morphing animations
- [ ] Gesture-based animations
- [ ] Physics-based spring animations
- [ ] More animation presets
- [ ] Animation composition utilities
- [ ] Performance monitoring tools

---

## Version History

### How to Read This Changelog

- **Added** for new features
- **Changed** for changes in existing functionality
- **Deprecated** for soon-to-be removed features
- **Removed** for now removed features
- **Fixed** for any bug fixes
- **Security** in case of vulnerabilities

---

## Upgrade Guides

### From 0.x to 1.0.0

Initial release - no upgrade path needed.

---

## Breaking Changes

### 1.0.0
No breaking changes - initial release.

---

## Contributors

Thanks to all contributors who helped make this library possible!

- elm By Banan Aladmari - Initial work

---

## License

[MIT](LICENSE) © elm By Banan Aladmari

