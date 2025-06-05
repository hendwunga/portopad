import { Component, OnInit } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
// Impor ikon yang digunakan di template Hero
import {
  faGithub,
  faLinkedin,
  faTwitter, // Disertakan jika masih relevan
  faInstagram, // Impor faInstagram
  faTiktok, // Impor faTiktok
} from '@fortawesome/free-brands-svg-icons';
// Impor ikon solid (misal untuk email dan download)
import { faDownload, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { ModalService } from '../../services/shared/modal.service';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';


// Pastikan ikon Font Awesome (brands dan solid) sudah ditambahkan
// ke library global FontAwesome di proyek Anda (biasanya di app.config.ts atau app.module.ts)
// menggunakan `library.add(...)`.

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
  // Deklarasikan ikon Font Awesome yang akan digunakan
  faGithub = faGithub;
  faLinkedin = faLinkedin;
  faTwitter = faTwitter; // Jika masih ingin menampilkannya
  faInstagram = faInstagram; // Deklarasikan Instagram
  faTiktok = faTiktok; // Deklarasikan TikTok
  faDownload = faDownload;
  faEnvelope = faEnvelope; // Deklarasikan ikon email solid

  // Sample profile image (replace with your own)
  profileImage = 'assets/logos/gitPf.jpeg';

  constructor(private readonly modalService: ModalService) {}

  ngOnInit(): void {}

  openProfileModal(): void {
    this.modalService.openModal('profile-modal', {
      title: 'Profile',
      isLarge: false, // Sesuaikan ukuran modal jika perlu
      imageUrl: this.profileImage, // Teruskan URL gambar profil
      // Anda mungkin juga ingin meneruskan alt text atau data lain
      // altText: 'Hendro Wunga Profile Picture'
    });
  }
}

