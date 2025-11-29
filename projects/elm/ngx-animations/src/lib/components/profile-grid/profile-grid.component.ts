import {
  Component,
  Input,
  OnInit,
  inject,
  PLATFORM_ID
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';
import { ProfileCardComponent } from '../profile-card/profile-card.component';
import { ProfileCardData } from '../profile-card/profile-card.component';
import { StaggerListComponent } from '../stagger-list/stagger-list.component';
import { ScrollRevealComponent } from '../scroll-reveal/scroll-reveal.component';

/**
 * Profile Grid Component
 * Displays a grid of profile cards with stagger animations
 * Perfect for team showcases, user directories, and portfolio grids
 * 
 * @example
 * <ngx-profile-grid
 *   [profiles]="profileData"
 *   [columns]="4"
 *   [staggerDelay]="100">
 * </ngx-profile-grid>
 */
@Component({
  selector: 'ngx-profile-grid',
  standalone: true,
  imports: [
    CommonModule,
    ProfileCardComponent,
    StaggerListComponent,
    ScrollRevealComponent
  ],
  templateUrl: './profile-grid.component.html',
  styleUrls: ['./profile-grid.component.css']
})
export class ProfileGridComponent implements OnInit {
  @Input() profiles: ProfileCardData[] = [];
  @Input() columns: number = 4; // Number of columns in grid
  @Input() staggerDelay: number = 100; // Delay between each card animation
  @Input() staggerAnimation: 'fade' | 'slide-up' | 'slide-down' | 'scale' | 'rotate' = 'slide-up';
  @Input() enableStagger: boolean = true;
  @Input() enableScrollReveal: boolean = false;
  @Input() gap: number = 1.5; // Gap in rem units
  @Input() cardHeight: string = 'auto'; // Card height

  private platformId = inject(PLATFORM_ID);

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
  }

  get gridStyle(): string {
    return `
      grid-template-columns: repeat(${this.columns}, 1fr);
      gap: ${this.gap}rem;
    `;
  }
}

