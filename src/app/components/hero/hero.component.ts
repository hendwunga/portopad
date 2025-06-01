import { Component, OnInit } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faGithub,
  faLinkedin,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { faDownload, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import {
  trigger,
  transition,
  style,
  animate,
  query,
  stagger,
} from '@angular/animations';

import { ModalService } from '../../services/shared/modal.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, NgOptimizedImage],
  // Use templateUrl and styleUrls to reference external files
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'], // Changed to .scss
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
  // Font Awesome icons
  faGithub = faGithub;
  faLinkedin = faLinkedin;
  faTwitter = faTwitter;
  faDownload = faDownload;
  faEnvelope = faEnvelope;

  // Sample profile image (replace with your own)
  profileImage = 'assets/logos/gitPf.jpeg';
  // profileImage = 'assets/logos/profil.JPG';

  constructor(private readonly modalService: ModalService) {}

  ngOnInit(): void {}

  openProfileModal(): void {
    this.modalService.openModal('profile-modal', {
      title: 'Profile',
      isLarge: true,
      imageUrl: this.profileImage,
    });
  }
}
