import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private renderer: Renderer2;
  private currentTheme = new BehaviorSubject<'light' | 'dark'>('light');
  isDarkTheme = this.currentTheme.asObservable();

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  initializeTheme() {
    const savedTheme = localStorage.getItem('darkMode');
    const prefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      // Pastikan dijalankan di browser
      const savedTheme = localStorage.getItem('darkMode');
      const prefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches;
      if (savedTheme === 'enabled' || (!savedTheme && prefersDark)) {
        this.setTheme('dark');
      } else {
        this.setTheme('light');
      }
    } else {
      // Default jika tidak di browser (misal: SSR)
      this.setTheme('light');
    }
  }

  setTheme(theme: 'light' | 'dark') {
    const isDark = theme === 'dark';
    this.currentTheme.next(theme);

    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      localStorage.setItem('darkMode', isDark ? 'enabled' : 'disabled');
    }

    if (typeof document !== 'undefined') {
      // Pastikan document ada
      if (isDark) {
        this.renderer.addClass(document.body, 'dark-mode');
      } else {
        this.renderer.removeClass(document.body, 'dark-mode');
      }
    }
  }

  toggleTheme() {
    const newTheme = this.currentTheme.value === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }
}
