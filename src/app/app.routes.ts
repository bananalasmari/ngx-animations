import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./welcome/welcome.component').then(m => m.WelcomeComponent)
  },
  {
    path: 'docs',
    loadComponent: () => import('./docs/docs.component').then(m => m.DocsComponent)
  },
  {
    path: 'demo',
    loadComponent: () => import('./demo/demo.component').then(m => m.DemoComponent)
  },
  {
    path: 'ai',
    loadComponent: () =>
      import('./docs/ai-assistant/ai-assistant.component').then(m => m.AiAssistantComponent)
  }
];
