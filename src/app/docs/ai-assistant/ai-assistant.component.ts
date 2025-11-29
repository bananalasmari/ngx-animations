import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubHeaderComponent } from '../../shared/sub-header/sub-header.component';

@Component({
  selector: 'app-ai-assistant',
  standalone: true,
  imports: [CommonModule, SubHeaderComponent],
  templateUrl: './ai-assistant.component.html',
  styleUrls: ['./ai-assistant.component.css']
})
export class AiAssistantComponent {
  // Track which prompt was recently copied (for per-card feedback)
  copiedKey: string | null = null;
  private copyResetHandle: any;

  // Predefined example prompts for quick copy
  promptFadeOnScroll =
    'How do I create a fade-in on scroll using <div ngxFadeIn> from elm-ngx-animations?\n\nShow a full Angular standalone component example.';

  promptBounceRotate =
    'Give me a code snippet that uses ngxBounceIn and ngxRotateIn together to build a bouncing, flipping card with hover effects in elm-ngx-animations.';

  promptPerfBestPractices =
    'What are best practices for optimizing performance when using ngxParallaxScroll and ngxScrollReveal in elm-ngx-animations?\n\nFocus on transforms/opacity, avoiding layout thrashing, and respecting prefers-reduced-motion.';

  promptSlideOnClick =
    'Show how to combine ngxSlideIn with a button click event so the animation only plays when the user interacts with the UI in elm-ngx-animations.';

  copyPrompt(text: string, key: string): void {
    this.copiedKey = key;

    if (this.copyResetHandle) {
      clearTimeout(this.copyResetHandle);
    }

    this.copyResetHandle = setTimeout(() => {
      this.copiedKey = null;
    }, 2000);

    // Modern API
    if (typeof navigator !== 'undefined' && navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).catch(() => {
        // Fallback will run below
      });
      return;
    }

    // Fallback for older / non-secure contexts
    try {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    } catch {
      // Ignore copy errors; user still sees local feedback
    }
  }
}


