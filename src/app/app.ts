import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RtlLanguageService } from '../../projects/elm/ngx-animations/src/lib/services/rtl-language.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {
  title = '@elm/ngx-animations Demo';

  private rtl = inject(RtlLanguageService);

  direction = this.rtl.direction;
}
