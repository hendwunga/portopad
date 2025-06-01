import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeroComponent } from './components/hero/hero.component';
import { AboutComponent } from './components/about/about.component';
import { SkillsComponent } from './components/skills/skills.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { CertificatesComponent } from './components/certificates/certificates.component';
import { ActivityComponent } from './components/activity/activity.component';
import { ContactComponent } from './components/contact/contact.component';
import { ModalComponent } from './services/shared/modal.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    HeroComponent,
    AboutComponent,
    SkillsComponent,
    ProjectsComponent,
    CertificatesComponent,
    ActivityComponent,
    ContactComponent,
    ModalComponent,
  ],
  template: `
    <app-header></app-header>
    <main>
      <app-hero></app-hero>
      <app-about></app-about>
      <app-skills></app-skills>
      <app-projects></app-projects>
      <app-certificates></app-certificates>
      <app-activity></app-activity>
      <app-contact></app-contact>
    </main>
    <app-footer></app-footer>
    <router-outlet></router-outlet>
    <app-modal></app-modal>
  `,
  styles: [
    `
      :host {
        display: block;
        min-height: 100vh;
      }

      main {
        padding-top: 0;
      }
    `,
  ],
})
export class AppComponent {
  public title = 'portopad';
}
