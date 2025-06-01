import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faMoon,
  faSun,
  faBars,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { ThemeService } from '../../services/theme.service';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  scrolled = false;
  isDarkTheme = false;
  isMobileNavOpen = false;

  // Font Awesome icons
  faMoon = faMoon;
  faSun = faSun;
  faBars = faBars;
  faTimes = faTimes;

  constructor(private readonly themeService: ThemeService) {}

  ngOnInit(): void {
    this.themeService.currentTheme$.subscribe((theme) => {
      this.isDarkTheme = theme === 'dark';
    });

    // Check initial scroll position
    this.checkScroll();
  }

  @HostListener('window:scroll')
  checkScroll(): void {
    this.scrolled = window.scrollY > 10;
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  toggleMobileNav(): void {
    this.isMobileNavOpen = !this.isMobileNavOpen;
  }

  closeMobileNav(): void {
    this.isMobileNavOpen = false;
  }
}
