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
  faPaperPlane, // Tetap butuh icon paper plane untuk tombol
} from '@fortawesome/free-solid-svg-icons';

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
  faPaperPlane = faPaperPlane; // Gunakan ini untuk icon kirim

  contactForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    subject: new FormControl(''), // Subjek tetap opsional
    message: new FormControl('', [Validators.required]),
  });

  // Hapus:
  // isSubmitting = false;
  // submitMessage = '';
  // submitSuccess = false;

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

  // Hapus atau kosongkan method onSubmit jika tidak ada logika lain yang dibutuhkan
  // Kita akan menggunakan event click pada link di HTML untuk membuka mailto
  // Method ini bisa dihapus sepenuhnya jika hanya berisi simulasi submit
  // onSubmit(): void {
  //   // Logika simulasi submit dihapus
  // }

  // Method untuk membuat link mailto
  // Menggunakan getter agar selalu update dengan nilai form
  get mailtoLink(): string {
    const formValue = this.contactForm.value;
    const subject = encodeURIComponent(formValue.subject || ''); // Encode subject, gunakan string kosong jika null
    const body = encodeURIComponent(
      `Name: ${formValue.name || ''}\r\n` + // \r\n untuk baris baru
        `Email: ${formValue.email || ''}\r\n\r\n` + // Dua \r\n untuk jarak baris
        `Message:\r\n${formValue.message || ''}`
    );

    // Pastikan email tujuan sudah benar
    const recipient = 'hendrowunga073@gmail.com';

    return `mailto:${recipient}?subject=${subject}&body=${body}`;
  }

  // Method untuk mencegah default klik jika form tidak valid
  handleMailtoClick(event: MouseEvent): void {
    if (this.contactForm.invalid) {
      event.preventDefault(); // Mencegah navigasi mailto
      // Opsional: Tampilkan pesan error atau tandai field yang salah
      this.contactForm.markAllAsTouched(); // Menampilkan pesan error validasi
    }
  }
}
