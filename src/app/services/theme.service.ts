import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private renderer: Renderer2;
  private _currentTheme = new BehaviorSubject<Theme>('light');

  public readonly currentTheme$ = this._currentTheme.asObservable();

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
    this.initializeTheme();
  }

  private initializeTheme(): void {
    // Check if user has previously selected a theme
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme) {
      this.setTheme(savedTheme);
    } else {
      // Check if user prefers dark mode
      const prefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches;
      this.setTheme(prefersDark ? 'dark' : 'light');
    }
  }

  public toggleTheme(): void {
    const newTheme = this._currentTheme.value === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }

  public setTheme(theme: Theme): void {
    this._currentTheme.next(theme);
    localStorage.setItem('theme', theme);
    this.renderer.setAttribute(document.documentElement, 'data-theme', theme);
  }

  public get currentTheme(): Theme {
    return this._currentTheme.value;
  }
}
