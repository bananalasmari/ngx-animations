import { Component, ElementRef, viewChild, inject, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SubHeaderComponent } from '../shared/sub-header/sub-header.component';

// Import all animation components and directives from source files
import { FadeInDirective } from '../../../projects/elm/ngx-animations/src/lib/directives/fade-in.directive';
import { SlideInDirective } from '../../../projects/elm/ngx-animations/src/lib/directives/slide-in.directive';
import { ScaleInDirective } from '../../../projects/elm/ngx-animations/src/lib/directives/scale-in.directive';
import { RotateInDirective } from '../../../projects/elm/ngx-animations/src/lib/directives/rotate-in.directive';
import { ParallaxScrollDirective } from '../../../projects/elm/ngx-animations/src/lib/directives/parallax-scroll.directive';
import { RippleClickDirective } from '../../../projects/elm/ngx-animations/src/lib/directives/ripple-click.directive';
import { BounceInDirective } from '../../../projects/elm/ngx-animations/src/lib/directives/bounce-in.directive';
import { FlipInDirective } from '../../../projects/elm/ngx-animations/src/lib/directives/flip-in.directive';
import { ShakeDirective } from '../../../projects/elm/ngx-animations/src/lib/directives/shake.directive';
import { PulseDirective } from '../../../projects/elm/ngx-animations/src/lib/directives/pulse.directive';
import { GlitchDirective } from '../../../projects/elm/ngx-animations/src/lib/directives/glitch.directive';
import { ZoomInDirective } from '../../../projects/elm/ngx-animations/src/lib/directives/zoom-in.directive';
import { HoverLiftDirective } from '../../../projects/elm/ngx-animations/src/lib/directives/hover-lift.directive';
import { ScrollRevealComponent } from '../../../projects/elm/ngx-animations/src/lib/components/scroll-reveal/scroll-reveal.component';
import { StaggerListComponent } from '../../../projects/elm/ngx-animations/src/lib/components/stagger-list/stagger-list.component';
import { TypewriterComponent } from '../../../projects/elm/ngx-animations/src/lib/components/typewriter/typewriter.component';
import { ConfettiComponent } from '../../../projects/elm/ngx-animations/src/lib/components/confetti/confetti.component';
import { MagneticDirective } from '../../../projects/elm/ngx-animations/src/lib/directives/magnetic.directive';
import { Tilt3dDirective } from '../../../projects/elm/ngx-animations/src/lib/directives/tilt-3d.directive';
import { TextScrambleComponent } from '../../../projects/elm/ngx-animations/src/lib/components/text-scramble/text-scramble.component';
import { MouseFollowerComponent } from '../../../projects/elm/ngx-animations/src/lib/components/mouse-follower/mouse-follower.component';
import { GlassCardComponent } from '../../../projects/elm/ngx-animations/src/lib/components/glass-card/glass-card.component';
import { TimelineService } from '../../../projects/elm/ngx-animations/src/lib/services/timeline.service';

@Component({
  selector: 'app-demo',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    SubHeaderComponent,
    FadeInDirective,
    SlideInDirective,
    ScaleInDirective,
    RotateInDirective,
    ParallaxScrollDirective,
    RippleClickDirective,
    BounceInDirective,
    FlipInDirective,
    ShakeDirective,
    PulseDirective,
    GlitchDirective,
    ZoomInDirective,
    ScrollRevealComponent,
    StaggerListComponent,
    TypewriterComponent,
    ConfettiComponent,
    MagneticDirective,
    Tilt3dDirective,
    HoverLiftDirective,
    TextScrambleComponent,
    MouseFollowerComponent,
    GlassCardComponent
  ],
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent implements AfterViewInit {
  private timeline = inject(TimelineService);
  private timelineBox1 = viewChild<ElementRef>('timelineBox1');
  private timelineBox2 = viewChild<ElementRef>('timelineBox2');
  private timelineBox3 = viewChild<ElementRef>('timelineBox3');

  // Demo data
  listItems = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];
  cards = [
    { id: 1, title: 'Card 1', content: 'Beautiful animations' },
    { id: 2, title: 'Card 2', content: 'RTL Support' },
    { id: 3, title: 'Card 3', content: 'High Performance' },
    { id: 4, title: 'Card 4', content: 'Easy to Use' }
  ];

  // Scrollable stacked cards demo data
  stackedCards = [
    {
      id: 1,
      title: 'Smooth Parallax Cards',
      imageAlt: 'Abstract gradient background',
      description: 'Cards that gently float at different speeds as you scroll.',
      cta: 'View Parallax Pattern'
    },
    {
      id: 2,
      title: 'Layered Storytelling',
      imageAlt: 'Layered UI blocks',
      description: 'Use stacking to tell a progressive story as the user scrolls.',
      cta: 'See Story Flow'
    },
    {
      id: 3,
      title: 'Interactive Details',
      imageAlt: 'Expanded details view',
      description: 'Tap a card to expand, reveal extra content, or actions.',
      cta: 'Explore Interactions'
    },
    {
      id: 4,
      title: 'Mobile Friendly',
      imageAlt: 'Responsive stacked layout',
      description: 'Fully responsive and tuned for smooth 60fps scrolling.',
      cta: 'Test Responsiveness'
    }
  ];

  expandedStackedCardId: number | null = null;

  glassCards = [
    { id: 1, label: 'Glass Motion', text: 'Soft blur, subtle depth, and hover motion.' },
    { id: 2, label: 'UI Blocks', text: 'Perfect for stats, feature cards, and hero sections.' },
    { id: 3, label: 'Dark Mode Ready', text: 'Designed for your #051D49 background.' }
  ];

  typewriterText = 'Welcome to @elm/ngx-animations - Next-level animation library!';
  arabicText = 'مرحبا بكم في مكتبة الرسوم المتحركة';
  showConfetti = false;
  showMouseFollower = true;
  scrambleTexts = [
    'GSAP-INSPIRED',
    'PREMIUM EFFECTS',
    'NO DEPENDENCIES',
    'PURE ANGULAR'
  ];
  currentScrambleIndex = 0;

  ngAfterViewInit() {
    // Demo timeline animation
    setTimeout(() => this.playTimelineDemo(), 1000);
  }

  playTimelineDemo() {
    const box1 = this.timelineBox1();
    const box2 = this.timelineBox2();
    const box3 = this.timelineBox3();

    if (!box1 || !box2 || !box3) return;

    const tl = this.timeline.create({
      repeat: true,
      repeatDelay: 2000,
      onComplete: () => console.log('Timeline completed!')
    });

    tl.to(box1.nativeElement, { 
        opacity: '1', 
        transform: 'translateX(0) scale(1)' 
      }, 500)
      .to(box2.nativeElement, { 
        opacity: '1', 
        transform: 'translateX(0) scale(1)' 
      }, 500)
      .to(box3.nativeElement, { 
        opacity: '1', 
        transform: 'translateX(0) scale(1)' 
      }, 500)
      .play();
  }

  onAnimationStart() {
    console.log('Animation started!');
  }

  onAnimationEnd() {
    console.log('Animation ended!');
  }

  onTypingComplete() {
    console.log('Typing complete!');
  }

  onRevealed() {
    console.log('Element revealed!');
  }

  triggerConfetti() {
    this.showConfetti = true;
    setTimeout(() => {
      this.showConfetti = false;
    }, 3500);
  }

  toggleStackedCard(cardId: number): void {
    this.expandedStackedCardId = this.expandedStackedCardId === cardId ? null : cardId;
  }
}

