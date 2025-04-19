import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../services/theme.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isDarkMode$: Observable<'light' | 'dark'>;
  isMobileMenuOpen = false; // State untuk menu mobile

  constructor(private themeService: ThemeService) {
    this.isDarkMode$ = this.themeService.isDarkTheme;
  }

  ngOnInit(): void {}

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  // Fungsi untuk membuka/menutup menu mobile
  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  // Fungsi untuk menutup menu mobile (dipanggil saat link diklik)
  closeMobileMenu(): void {
    if (this.isMobileMenuOpen) {
      // Hanya tutup jika sedang terbuka
      this.isMobileMenuOpen = false;
    }
  }
}
