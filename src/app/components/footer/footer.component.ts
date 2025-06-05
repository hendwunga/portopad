import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faGithub,
  faLinkedin,
  faTwitter,
  faInstagram,
  faTiktok,
  faKaggle,
} from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  faGithub = faGithub;
  faLinkedin = faLinkedin;
  faTwitter = faTwitter;
  faInstagram = faInstagram;
  faTiktok = faTiktok;
  faKaggle = faKaggle;
  faEnvelope = faEnvelope;

  get currentYear(): number {
    return new Date().getFullYear();
  }
}
