import { Injectable, effect, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { signal, computed } from '@angular/core';

/**
 * RTL & Language Service
 * Provides runtime toggle between LTR/RTL and EN/AR.
 *
 * This is intentionally simple – you can use it or plug it into your own i18n layer.
 */
@Injectable({
  providedIn: 'root'
})
export class RtlLanguageService {
  private platformId = inject(PLATFORM_ID);

  /** Current locale: 'en' or 'ar'. Default 'en'. */
  readonly locale = signal<'en' | 'ar'>('en');

  /** Text direction derived from locale. */
  readonly direction = computed<'ltr' | 'rtl'>(() =>
    this.locale() === 'ar' ? 'rtl' : 'ltr'
  );

  /** True when current direction is RTL. */
  readonly isRtl = computed(() => this.direction() === 'rtl');

  constructor() {
    // Keep <html> dir/lang in sync with current locale (browser only).
    effect(() => {
      if (!isPlatformBrowser(this.platformId)) return;

      const dir = this.direction();
      const lang = this.locale();

      document.documentElement.setAttribute('dir', dir);
      document.documentElement.setAttribute('lang', lang);
    });
  }

  setLocale(locale: 'en' | 'ar'): void {
    this.locale.set(locale);
  }

  toggleLocale(): void {
    this.locale.update((current) => (current === 'en' ? 'ar' : 'en'));
  }
}


