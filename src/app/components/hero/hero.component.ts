import { Component, OnInit } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
// Impor ikon yang digunakan di template Hero
import {
  faGithub,
  faLinkedin,
  faTwitter, // Jika ingin menambahkan Twitter
  faInstagram,
  faTiktok,
} from '@fortawesome/free-brands-svg-icons';
import { faDownload, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { ModalService } from '../../services/shared/modal.service';
import { LanguageService } from '../../services/shared/language.service';

import {
  trigger,
  transition,
  style,
  animate,
  query,
  stagger,
} from '@angular/animations';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, NgOptimizedImage],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
  animations: [
    trigger('heroAnimation', [
      transition(':enter', [
        query(
          '.hero-title, .hero-subtitle, .hero-description, .hero-cta, .social-links',
          [
            style({ opacity: 0, transform: 'translateY(20px)' }),
            stagger(100, [
              animate(
                '0.6s ease-out',
                style({ opacity: 1, transform: 'translateY(0)' })
              ),
            ]),
          ],
          { optional: true }
        ),
      ]),
    ]),
    trigger('heroImageAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(40px)' }),
        animate(
          '0.8s 0.3s ease-out',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
    ]),
  ],
})
export class HeroComponent implements OnInit {
  faGithub = faGithub;
  faLinkedin = faLinkedin;
  faTwitter = faTwitter;
  faInstagram = faInstagram;
  faTiktok = faTiktok;
  faDownload = faDownload;
  faEnvelope = faEnvelope;

  profileImage = 'assets/logos/gitPf.jpeg'; // Path lokal untuk gambar profil

  // URL CV Anda. Ganti dengan URL RAW GitHub Anda atau CDN lainnya.
  // Contoh GitHub Raw:
  // cvUrl ='https://raw.githubusercontent.com/hendrowunga/portopad/main/src/assets/resume.pdf';
  // Jika Anda menyimpannya di folder assets lokal dan ingin mengunduhnya langsung (seperti sebelumnya):
  cvUrl = 'assets/Resume_Hendrikus_Wunga.pdf';

  constructor(
    private readonly modalService: ModalService,
    public readonly languageService: LanguageService // <-- Inject LanguageService (public agar diakses di HTML)
  ) {}

  ngOnInit(): void {
    // Tidak ada logika khusus di sini untuk bahasa, karena `getTranslation` dari service sudah `Observable`
  }

  // Metode untuk membuka modal profil
  openProfileModal(): void {
    this.modalService.openModal('profile-modal', {
      title: 'Profile', // Judul ini akan ditimpa atau diterjemahkan di ModalComponent
      isLarge: false,
      imageUrl: this.profileImage, // Mengirim URL gambar untuk ditampilkan di modal
    });
  }
}
