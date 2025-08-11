import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faMapMarkerAlt,
  faPhone,
  faEnvelope,
  faPaperPlane,
} from '@fortawesome/free-solid-svg-icons';

import { LanguageService } from '../../services/shared/language.service'; // <-- Import LanguageService

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FontAwesomeModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent {
  faMapMarkerAlt = faMapMarkerAlt;
  faPhone = faPhone;
  faEnvelope = faEnvelope;
  faPaperPlane = faPaperPlane;

  contactForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    subject: new FormControl(''),
    message: new FormControl('', [Validators.required]),
  });

  get nameControl() {
    return this.contactForm.get('name') as FormControl;
  }
  get emailControl() {
    return this.contactForm.get('email') as FormControl;
  }
  get subjectControl() {
    return this.contactForm.get('subject') as FormControl;
  }
  get messageControl() {
    return this.contactForm.get('message') as FormControl;
  }

  // Inject LanguageService (public agar bisa diakses di template)
  constructor(public readonly languageService: LanguageService) {}

  get mailtoLink(): string {
    const formValue = this.contactForm.value;
    // Menggunakan getTranslationSync untuk subjek dan body karena mereka akan digunakan dalam URL mailto
    // yang tidak mendukung Observable.
    const subjectPrefix =
      this.languageService.getTranslationSync('subjectField');
    const nameLabel = this.languageService.getTranslationSync('nameFieldLabel');
    const emailLabel =
      this.languageService.getTranslationSync('emailFieldLabel');
    const messageLabel =
      this.languageService.getTranslationSync('messageFieldLabel');

    const subject = encodeURIComponent(
      `${subjectPrefix}: ${formValue.subject || ''}`
    );
    const body = encodeURIComponent(
      `${nameLabel}: ${formValue.name || ''}\r\n` +
        `${emailLabel}: ${formValue.email || ''}\r\n\r\n` +
        `${messageLabel}:\r\n${formValue.message || ''}`
    );

    const recipient = 'hendrowunga073@gmail.com';

    return `mailto:${recipient}?subject=${subject}&body=${body}`;
  }

  handleMailtoClick(event: MouseEvent): void {
    if (this.contactForm.invalid) {
      event.preventDefault();
      this.contactForm.markAllAsTouched();
    }
  }
}
