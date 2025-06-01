import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faBriefcase,
  faGraduationCap,
  faCode,
} from '@fortawesome/free-solid-svg-icons';
import {
  trigger,
  transition,
  style,
  animate,
  query,
  stagger,
} from '@angular/animations';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  // Use templateUrl and styleUrls to reference external files
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'], // Changed to .scss
  animations: [
    trigger('fadeInStagger', [
      transition(':enter', [
        query(
          '.about-text, .detail-item',
          [
            style({ opacity: 0, transform: 'translateY(30px)' }),
            stagger(100, [
              animate(
                '0.7s ease-out',
                style({ opacity: 1, transform: 'translateY(0)' })
              ),
            ]),
          ],
          { optional: true }
        ),
      ]),
    ]),
  ],
})
export class AboutComponent {
  // Font Awesome icons
  faBriefcase = faBriefcase;
  faGraduationCap = faGraduationCap;
  faCode = faCode;
}
