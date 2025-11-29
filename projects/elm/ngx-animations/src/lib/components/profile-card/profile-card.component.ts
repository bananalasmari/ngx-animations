import {
  Component,
  Input,
  OnInit,
  inject,
  PLATFORM_ID
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';
import { Tilt3dDirective } from '../../directives/tilt-3d.directive';
import { MagneticDirective } from '../../directives/magnetic.directive';

// Export interface for use in other components
export interface ProfileCardData {
  id?: string | number;
  name: string; // Arabic name
  username: string; // English username
  jobTitle: string; // Arabic job title
  gradient: string; // CSS gradient
  icon?: string; // Emoji or icon
  iconSvg?: string; // SVG path for custom icons
  stats?: {
    documents?: number;
    views?: number;
    links?: number;
  };
}

/**
 * Profile Card Component
 * Creates an interactive profile card with gradient background and hover effects
 * Perfect for team showcases, portfolios, and user grids
 * 
 * @example
 * <ngx-profile-card
 *   [name]="'سارة الزهراني'"
 *   [username]="'sara_zahrani@'"
 *   [jobTitle]="'عالمة بيانات'"
 *   [gradient]="'linear-gradient(135deg, #FF5D36, #763CBC)'"
 *   icon="📊">
 * </ngx-profile-card>
 */
@Component({
  selector: 'ngx-profile-card',
  standalone: true,
  imports: [CommonModule, Tilt3dDirective, MagneticDirective],
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.css']
})
export class ProfileCardComponent implements OnInit {
  @Input() name: string = '';
  @Input() username: string = '';
  @Input() jobTitle: string = '';
  @Input() gradient: string = 'linear-gradient(135deg, #763CBC, #FF5D36)';
  @Input() icon: string = '👤';
  @Input() iconSvg?: string;
  @Input() stats?: { documents?: number; views?: number; links?: number };
  @Input() showStats: boolean = true;
  @Input() enableTilt: boolean = true;
  @Input() enableMagnetic: boolean = false;
  @Input() magneticStrength: number = 0.3;
  @Input() tiltMax: number = 15;
  @Input() tiltGlare: boolean = true;

  private platformId = inject(PLATFORM_ID);

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
  }

  get cardClasses(): string {
    const classes = ['profile-card'];
    if (this.enableTilt) classes.push('tilt-enabled');
    if (this.enableMagnetic) classes.push('magnetic-enabled');
    return classes.join(' ');
  }
}

