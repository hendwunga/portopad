import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common'; // Import NgOptimizedImage
import { ModalService, ModalData } from './modal.service'; // Import ModalData
import { Subscription } from 'rxjs';
import { trigger, transition, style, animate } from '@angular/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import {
  LanguageService,
  Language,
} from './language.service'; // IMPOR LANGUAGE SERVICE

// --- PERBARUI INTERFACE INI ---
// Interface untuk struktur data proyek (sesuaikan jika perlu)
interface ProjectDetails {
  id: number;
  // Ubah title dan description menjadi objek untuk mendukung i18n
  title: { en: string; id: string };
  description: { en: string; id: string };
  thumbnail: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  category:
    | 'web'
    | 'mobile'
    | 'design'
    | 'other'
    | 'backend'
    | 'frontend'
    | 'algorithms'
    | 'networking'
    | 'simulasi'
    | 'desktop'; // Tambahkan kategori jika perlu
  images: string[];
  featured: boolean;
  // imageUrl?: string; // Hapus ini jika imageUrl hanya untuk ActivityDetails
}

// Interface untuk struktur data aktivitas (dari ActivityComponent)
interface ActivityDetails {
  id: number;
  title: string;
  shortDescription: string;
  fullDescription: string;
  year: string;
  modalImageUrl: string;
  externalLink?: string;
}

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, FontAwesomeModule], // Tambahkan NgOptimizedImage
  templateUrl: 'modal.component.html', // Lebih baik jika template di file terpisah
  styleUrls: ['modal.component.scss'], // Lebih baik jika styles di file terpisah
  animations: [
    trigger('fadeAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-out', style({ opacity: 1 })),
      ]),
      transition(':leave', [animate('200ms ease-in', style({ opacity: 0 }))]),
    ]),
  ],
})
export class ModalComponent implements OnInit, OnDestroy {
  isOpen = false;
  isLarge = false;
  title = ''; // Ini akan menerima judul modal (sudah diterjemahkan dari ProjectsComponent)
  modalId: string | undefined;
  private subscription: Subscription = new Subscription();

  selectedProjectDetails: ProjectDetails | null = null;
  selectedActivityDetails: ActivityDetails | null = null; // Tambah properti ini untuk aktivitas
  currentImageIndex = 0;

  faGithub = faGithub;
  faLink = faLink;
  // faTimes tidak diimpor di sini karena tombol close menggunakan '×' karakter, bukan ikon.
  // Jika ingin pakai faTimes, impor dan gunakan: import { faTimes } from '@fortawesome/free-solid-svg-icons';

  constructor(
    private modalService: ModalService,
    public languageService: LanguageService
  ) {} // INJEKSI LANGUAGE SERVICE

  ngOnInit(): void {
    this.subscription = this.modalService.modalState$.subscribe(
      (state: ModalData) => {
        this.isOpen = state.isOpen;
        this.modalId = state.id;
        this.title = state.data?.title || ''; // Judul modal dari data

        // Reset semua detail saat modal dibuka atau tipe modal berubah
        this.selectedProjectDetails = null;
        this.selectedActivityDetails = null;
        this.currentImageIndex = 0;

        if (this.modalId === 'project-details') {
          // Casting data.projectDetails ke ProjectDetails
          this.selectedProjectDetails =
            (state.data?.projectDetails as ProjectDetails) || null;
          this.isLarge = true; // Proyek selalu besar
        } else if (this.modalId === 'activity-details') {
          // ASUMSI ID MODAL BARU UNTUK AKTIVITAS
          this.selectedActivityDetails =
            (state.data?.activityDetails as ActivityDetails) || null;
          this.isLarge = state.data?.isLarge || false; // Aktivitas bisa punya ukuran custom
        }
        // ... Tambahkan kondisi untuk jenis modal lain jika ada

        // Tangani overflow body
        if (this.isOpen) {
          document.body.style.overflow = 'hidden';
        } else {
          document.body.style.overflow = '';
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    document.body.style.overflow = '';
  }

  @HostListener('document:keydown.escape')
  onEscKeydown(): void {
    if (this.isOpen) {
      this.closeModal();
    }
  }

  onOverlayClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.closeModal();
    }
  }

  closeModal(): void {
    this.modalService.closeModal();
    this.selectedProjectDetails = null;
    this.selectedActivityDetails = null; // Clear activity data
    this.currentImageIndex = 0;
  }

  setCurrentImage(index: number): void {
    if (
      this.selectedProjectDetails &&
      index >= 0 &&
      index < this.selectedProjectDetails.images.length
    ) {
      this.currentImageIndex = index;
    }
  }

  // Helper method untuk mendapatkan teks terjemahan dari objek
  // Digunakan untuk title dan description dari selectedProjectDetails
  getTranslatedText(textObject: { en: string; id: string }): string {
    const currentLang = this.languageService.currentLangValue;
    return textObject[currentLang];
  }
}
