import {
  Component,
  OnInit,
  OnDestroy,
  AfterViewInit,
  PLATFORM_ID,
  Inject,
} from '@angular/core';
import {
  CommonModule,
  ViewportScroller,
  isPlatformBrowser,
} from '@angular/common';

import { HeaderComponent } from './components/header/header.component';
import { HeroComponent } from './components/hero/hero.component';
import { AboutComponent } from './components/about/about.component';
import { EducationComponent } from './components/education/education.component';
import { SkillsComponent } from './components/skills/skills.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { CertificationsComponent } from './components/certifications/certifications.component';
import { ContactComponent } from './components/contact/contact.component';
import { FooterComponent } from './components/footer/footer.component';
import { GalleryComponent } from './components/gallery/gallery.component';

import { ThemeService } from './services/theme.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    HeroComponent,
    AboutComponent,
    EducationComponent,
    SkillsComponent,
    ProjectsComponent,
    CertificationsComponent,
    GalleryComponent,
    ContactComponent,
    FooterComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  title = 'portopad';
  private themeSubscription?: Subscription;
  private clickListener?: (e: Event) => void;

  constructor(
    private themeService: ThemeService,
    private viewportScroller: ViewportScroller,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.themeService.initializeTheme();
    }
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.setupSmoothScrolling();
    }
  }

  ngOnDestroy(): void {
    this.themeSubscription?.unsubscribe();

    if (this.clickListener) {
      document.removeEventListener('click', this.clickListener);
    }
  }

  private setupSmoothScrolling(): void {
    this.clickListener = (e: Event) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]') as HTMLAnchorElement | null;

      if (anchor) {
        const href = anchor.getAttribute('href');

        if (href === '#') {
          e.preventDefault();
          this.viewportScroller.scrollToPosition([0, 0]);
        } else if (href && href.length > 1) {
          e.preventDefault();
          const elementId = href.substring(1);
          this.viewportScroller.scrollToAnchor(elementId);
        }
      }
    };

    document.addEventListener('click', this.clickListener);
  }
}
