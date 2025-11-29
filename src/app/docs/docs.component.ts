import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AiAssistantComponent } from './ai-assistant/ai-assistant.component';
import { SubHeaderComponent } from '../shared/sub-header/sub-header.component';

@Component({
  selector: 'app-docs',
  standalone: true,
  imports: [CommonModule, RouterLink, AiAssistantComponent, SubHeaderComponent],
  templateUrl: './docs.component.html',
  styleUrls: ['./docs.component.css']
})
export class DocsComponent {
  copied = false;
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

  // AI prompt generator state
  aiAnimationType: 'fade' | 'slide' | 'scroll' | 'countup' | 'timeline' = 'fade';
  aiGoal:
    | 'basic'
    | 'advanced'
    | 'performance'
    | 'interaction'
    | 'rtl'
    | 'integration' = 'basic';
  aiExperience: 'beginner' | 'intermediate' | 'advanced' = 'intermediate';
  aiExtraContext = '';
  generatedPrompt = '';

  // Simple client-side feedback loop (local only)
  feedbackRating = 0;
  feedbackComment = '';
  feedbackSubmitted = false;
  private feedbackSubmitHandle: any;
  feedbackEntries: { rating: number; comment?: string; createdAt: Date }[] = [];

  copyToClipboard(text: string): void {
    // Always show success feedback on click
    this.copied = true;
    if (this.copyResetHandle) {
      clearTimeout(this.copyResetHandle);
    }
    this.copyResetHandle = setTimeout(() => {
      this.copied = false;
    }, 2000);

    // Modern API
    if (typeof navigator !== 'undefined' && navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).catch(() => {
        // Fallback will run below
      });
      return;
    }

    // Fallback: temporary textarea for older browsers / non-secure context
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
      // Ignore copy errors; user still sees "Command copied!" feedback
    }
  }
  generateAiPrompt(): void {
    const parts: string[] = [];

    parts.push(
      `You are an expert Angular developer helping me use the elm-ngx-animations library in an Angular ${this.aiExperience} project.`
    );

    const animationLabelMap: Record<typeof this.aiAnimationType, string> = {
      fade: 'ngxFadeIn / ngxFadeOut',
      slide: 'ngxSlideIn',
      scroll: 'ngxScrollReveal and ngxParallaxScroll',
      countup: 'ngxCountUp',
      timeline: 'TimelineService with multiple directives/components'
    };

    const goalTextMap: Record<typeof this.aiGoal, string> = {
      basic: 'a simple, production-ready example of this animation with best practices.',
      advanced: 'an advanced effect that combines multiple directives/components together.',
      performance:
        'a version that is friendly to low-end devices and follows animation performance best practices (transforms/opacity, reduced motion, etc.).',
      interaction:
        'an example where the animation is controlled by user interaction (clicks, hovers, scroll, or router navigation).',
      rtl: 'an example that works great for Arabic/RTL layouts and respects RTL-friendly directions.',
      integration:
        'an example that integrates this animation with other UI libraries/components already in an Angular app.'
    };

    parts.push(
      `I want to focus on ${animationLabelMap[this.aiAnimationType]} and get ${goalTextMap[this.aiGoal]}`
    );

    parts.push(
      'Please return a complete Angular example that includes both the TypeScript (standalone component if possible) and the HTML template, using elm-ngx-animations directives/components directly.'
    );

    if (this.aiExtraContext.trim()) {
      parts.push(
        `Here is some extra context or existing code to consider and improve, without breaking the layout or design:\n${this.aiExtraContext.trim()}`
      );
    }

    parts.push(
      'Explain briefly why you chose certain durations, easings, and scroll thresholds, and suggest any performance or accessibility improvements (including prefers-reduced-motion).'
    );

    this.generatedPrompt = parts.join('\n\n');
  }

  setFeedbackRating(rating: number): void {
    this.feedbackRating = rating;
  }

  submitFeedback(): void {
    if (!this.feedbackRating) {
      return;
    }

    this.feedbackEntries = [
      ...this.feedbackEntries,
      {
        rating: this.feedbackRating,
        comment: this.feedbackComment.trim() || undefined,
        createdAt: new Date()
      }
    ];

    this.feedbackSubmitted = true;
    this.feedbackComment = '';

    if (this.feedbackSubmitHandle) {
      clearTimeout(this.feedbackSubmitHandle);
    }
    this.feedbackSubmitHandle = setTimeout(() => {
      this.feedbackSubmitted = false;
    }, 2500);
  }

  get averageFeedbackRating(): number | null {
    if (!this.feedbackEntries.length) {
      return null;
    }
    const total = this.feedbackEntries.reduce((sum, f) => sum + f.rating, 0);
    return Math.round((total / this.feedbackEntries.length) * 10) / 10;
  }
}


