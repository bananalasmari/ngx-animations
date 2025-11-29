/*
 * Public API Surface of @elm/ngx-animations
 */

// Directives - Basic
export * from './lib/directives/fade-in.directive';
export * from './lib/directives/slide-in.directive';
export * from './lib/directives/scale-in.directive';
export * from './lib/directives/rotate-in.directive';
export * from './lib/directives/parallax-scroll.directive';
export * from './lib/directives/ripple-click.directive';

// Directives - Advanced
export * from './lib/directives/bounce-in.directive';
export * from './lib/directives/flip-in.directive';
export * from './lib/directives/shake.directive';
export * from './lib/directives/pulse.directive';
export * from './lib/directives/glitch.directive';
export * from './lib/directives/zoom-in.directive';
export * from './lib/directives/hover-lift.directive';
export * from './lib/directives/count-up.directive';

// Directives - GSAP-Inspired (Premium Effects)
export * from './lib/directives/magnetic.directive';
export * from './lib/directives/tilt-3d.directive';
export * from './lib/directives/scroll-progress.directive';
export * from './lib/directives/morph.directive';

// Components
export * from './lib/components/scroll-reveal/scroll-reveal.component';
export * from './lib/components/stagger-list/stagger-list.component';
export * from './lib/components/typewriter/typewriter.component';
export * from './lib/components/marquee/marquee.component';
export * from './lib/components/orbit-animation/orbit-animation.component';
export * from './lib/components/confetti/confetti.component';
export * from './lib/components/text-scramble/text-scramble.component';
export * from './lib/components/mouse-follower/mouse-follower.component';
export * from './lib/components/profile-card/profile-card.component';
export * from './lib/components/profile-grid/profile-grid.component';
export * from './lib/components/glass-card/glass-card.component';

// Export types
export type { ProfileCardData } from './lib/components/profile-card/profile-card.component';

// Services
export * from './lib/services/timeline.service';
export * from './lib/services/rtl-language.service';
