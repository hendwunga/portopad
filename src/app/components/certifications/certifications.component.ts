import { Component, OnInit } from '@angular/core'; // Import OnInit
import { CommonModule } from '@angular/common'; // Diperlukan untuk *ngFor, *ngIf

interface Certification {
  title: string;
  provider: string;
  completedDate: string; // Bisa string atau Date
  instructors: string[];
  certificateUrl?: string; // URL opsional
}

@Component({
  selector: 'app-certifications',
  standalone: true,
  imports: [CommonModule], // Import CommonModule
  templateUrl: './certifications.component.html',
  styleUrls: ['./certifications.component.scss'],
})
export class CertificationsComponent implements OnInit {
  // Implement OnInit

  // --- DATA PROPERTY ---
  // Simpan semua sertifikasi di sini
  allCertifications: Certification[] = [
    {
      title: 'Java Spring Boot: Professional eCommerce Project Masterclass',
      provider: 'Udemy',
      completedDate: 'Jan 2025',
      instructors: ['Faisal Memon (EmbarkX)', 'EmbarkX Official'],
      certificateUrl:
        'https://www.udemy.com/certificate/UC-44a6a723-2640-4d75-9163-127d1114bafa/',
    },
    {
      title: 'Java Masterclass 2025: 130+ Hours of Expert Lessons',
      provider: 'Udemy',
      completedDate: 'Jan 2025',
      instructors: [
        'Tim Buchalka',
        "Tim Buchalka's Learn Programming Academy",
        'Edwin Einsen Vásquez Velásquez',
        'Igor Popovic',
        'Eddie Chiang',
      ],
      certificateUrl:
        'https://www.udemy.com/certificate/UC-df9665a8-329a-4389-bbd7-86d146fdf362/',
    },
    {
      title: 'Master Microservices with Spring Boot and Spring Cloud',
      provider: 'Udemy',
      completedDate: 'Jan 2025',
      instructors: ['in28Minutes Official'],
      certificateUrl:
        'https://www.udemy.com/certificate/UC-1f4f0336-a850-47dc-9490-c243d8cc66ea/',
    },
  ];

  // --- STATE PROPERTIES ---
  // Array untuk sertifikasi yang ditampilkan di template
  displayedCertifications: Certification[] = [];
  // Batas tampilan awal
  readonly displayLimit = 3;
  // Status apakah semua ditampilkan
  showAll = false;

  // --- LIFECYCLE HOOK ---
  ngOnInit(): void {
    // Saat komponen siap, tampilkan sejumlah 'displayLimit' sertifikasi
    this.updateDisplayedCertifications();
  }

  // --- METHODS ---
  // Fungsi untuk mengupdate daftar yang tampil
  private updateDisplayedCertifications(): void {
    if (this.showAll) {
      this.displayedCertifications = this.allCertifications;
    } else {
      // Ambil sejumlah 'displayLimit' dari awal array
      this.displayedCertifications = this.allCertifications.slice(
        0,
        this.displayLimit
      );
    }
  }

  // Fungsi yang dipanggil saat tombol "Show All" diklik
  loadAllCertifications(): void {
    this.showAll = true; // Set status untuk tampilkan semua
    this.updateDisplayedCertifications(); // Update array yang ditampilkan
  }

  // --- GETTER ---
  // Helper getter untuk mengecek di template apakah perlu tombol "Show All"
  get shouldShowLoadMoreButton(): boolean {
    return this.allCertifications.length > this.displayLimit && !this.showAll;
  }
}
