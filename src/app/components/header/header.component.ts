// src/app/components/header/header.component.ts
import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faMoon,
  faSun,
  faBars,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { ThemeService } from '../../services/theme.service'; // Pastikan path benar
import {
  Language,
  LanguageService,
} from '../../services/shared/language.service'; // Import LanguageService dan Language type

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'], // Menggunakan styleUrls bukan styleUrl
})
export class HeaderComponent implements OnInit {
  scrolled = false;
  isDarkTheme = false;
  isMobileNavOpen = false;
  currentLanguage: Language = 'en'; // Untuk menampilkan label bahasa di tombol

  // Font Awesome icons
  faMoon = faMoon;
  faSun = faSun;
  faBars = faBars;
  faTimes = faTimes;

  // Inject ThemeService dan LanguageService
  constructor(
    private readonly themeService: ThemeService,
    public readonly languageService: LanguageService // Public agar bisa diakses di template
  ) {}

  ngOnInit(): void {
    // Langganan ke perubahan tema
    this.themeService.currentTheme$.subscribe((theme) => {
      this.isDarkTheme = theme === 'dark';
    });

    // Langganan ke perubahan bahasa
    this.languageService.currentLang$.subscribe((lang) => {
      this.currentLanguage = lang;
    });

    // Periksa posisi scroll awal
    if (typeof window !== 'undefined') {
      this.checkScroll();
    }
  }

  @HostListener('window:scroll')
  checkScroll(): void {
    if (typeof window !== 'undefined') {
      this.scrolled = window.scrollY > 10;
    }
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  toggleMobileNav(): void {
    this.isMobileNavOpen = !this.isMobileNavOpen;
    // Mengontrol scrolling body saat mobile nav terbuka
    if (typeof document !== 'undefined') {
      if (this.isMobileNavOpen) {
        document.body.classList.add('modal-open');
      } else {
        document.body.classList.remove('modal-open');
      }
    }
  }

  closeMobileNav(): void {
    this.isMobileNavOpen = false;
    if (typeof document !== 'undefined') {
      document.body.classList.remove('modal-open');
    }
  }

  toggleLanguage(): void {
    const newLang: Language = this.currentLanguage === 'en' ? 'id' : 'en';
    this.languageService.setLanguage(newLang);
  }
}
