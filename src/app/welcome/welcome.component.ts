import { Component, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Import animations
import { FadeInDirective } from '../../../projects/elm/ngx-animations/src/lib/directives/fade-in.directive';
import { SlideInDirective } from '../../../projects/elm/ngx-animations/src/lib/directives/slide-in.directive';
import { ScaleInDirective } from '../../../projects/elm/ngx-animations/src/lib/directives/scale-in.directive';
import { StaggerListComponent } from '../../../projects/elm/ngx-animations/src/lib/components/stagger-list/stagger-list.component';
import { ScrollRevealComponent } from '../../../projects/elm/ngx-animations/src/lib/components/scroll-reveal/scroll-reveal.component';
import { TypewriterComponent } from '../../../projects/elm/ngx-animations/src/lib/components/typewriter/typewriter.component';
import { TextScrambleComponent } from '../../../projects/elm/ngx-animations/src/lib/components/text-scramble/text-scramble.component';
import { MouseFollowerComponent } from '../../../projects/elm/ngx-animations/src/lib/components/mouse-follower/mouse-follower.component';
import { MagneticDirective } from '../../../projects/elm/ngx-animations/src/lib/directives/magnetic.directive';
import { Tilt3dDirective } from '../../../projects/elm/ngx-animations/src/lib/directives/tilt-3d.directive';
import { ParallaxScrollDirective } from '../../../projects/elm/ngx-animations/src/lib/directives/parallax-scroll.directive';
import { RippleClickDirective } from '../../../projects/elm/ngx-animations/src/lib/directives/ripple-click.directive';
import { PulseDirective } from '../../../projects/elm/ngx-animations/src/lib/directives/pulse.directive';
import { RtlLanguageService } from '../../../projects/elm/ngx-animations/src/lib/services/rtl-language.service';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    FadeInDirective,
    SlideInDirective,
    ScaleInDirective,
    StaggerListComponent,
    ScrollRevealComponent,
    TypewriterComponent,
    TextScrambleComponent,
    MouseFollowerComponent,
    MagneticDirective,
    Tilt3dDirective,
    ParallaxScrollDirective,
    RippleClickDirective,
    PulseDirective
  ],
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  private platformId = inject(PLATFORM_ID);
  private rtl = inject(RtlLanguageService);
  
  showMouseFollower = true;
  email = '';

  showcaseItems = [
    { id: 1, label: 'Fade', gradient: 'linear-gradient(135deg, #763CBC, #5A2C83)' },
    { id: 2, label: 'Slide', gradient: 'linear-gradient(135deg, #5A2C83, #763CBC)' },
    { id: 3, label: 'Bounce', gradient: 'linear-gradient(135deg, #763CBC, #5A2C83)' },
    { id: 4, label: 'Flip', gradient: 'linear-gradient(135deg, #5A2C83, #763CBC)' },
    { id: 5, label: '3D Tilt', gradient: 'linear-gradient(135deg, #763CBC, #5A2C83)' },
    { id: 6, label: 'Magnetic', gradient: 'linear-gradient(135deg, #5A2C83, #763CBC)' },
    { id: 7, label: 'Scramble', gradient: 'linear-gradient(135deg, #763CBC, #5A2C83)' },
    { id: 8, label: 'Morph', gradient: 'linear-gradient(135deg, #5A2C83, #763CBC)' },
    { id: 9, label: 'Parallax', gradient: 'linear-gradient(135deg, #763CBC, #5A2C83)' },
    { id: 10, label: 'Typewriter', gradient: 'linear-gradient(135deg, #5A2C83, #763CBC)' },
    { id: 11, label: 'Confetti', gradient: 'linear-gradient(135deg, #763CBC, #5A2C83)' },
    { id: 12, label: 'Timeline', gradient: 'linear-gradient(135deg, #5A2C83, #763CBC)' }
  ];

  // Language / RTL bindings
  locale = this.rtl.locale;
  isRtl = this.rtl.isRtl;

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
  }

  subscribe(): void {
    if (this.email) {
      alert(`Thanks for subscribing! We'll send updates to ${this.email}`);
      this.email = '';
    }
  }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  setArabic(): void {
    this.rtl.setLocale('ar');
  }

  setEnglish(): void {
    this.rtl.setLocale('en');
  }

  toggleLanguage(): void {
    this.rtl.toggleLocale();
  }
}

