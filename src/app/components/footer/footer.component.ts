import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faGithub,
  faLinkedin,
  faInstagram,
  faTiktok,
  faKaggle,
} from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

import { LanguageService } from '../../services/shared/language.service';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  faGithub = faGithub;
  faLinkedin = faLinkedin;
  faInstagram = faInstagram;
  faTiktok = faTiktok;
  faKaggle = faKaggle;
  faEnvelope = faEnvelope;

  currentYear: number = new Date().getFullYear();

  formattedCopyrightText$: Observable<string>;

  constructor(public readonly languageService: LanguageService) {
    this.formattedCopyrightText$ = this.languageService
      .getTranslation('footerCopyright')
      .pipe(
        map((translation) => {
          const yearStr = this.currentYear.toString();
          return translation
            .replace('%YEAR%', yearStr) // Ganti untuk EN
            .replace('%TAHUN%', yearStr); // Ganti untuk ID
        })
      );
  }

  ngOnInit(): void {
  }
}
