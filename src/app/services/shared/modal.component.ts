// modal.component.ts
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common'; // Import NgOptimizedImage
import { ModalService, ModalData } from './modal.service'; // Import ModalData
import { Subscription } from 'rxjs';
import { trigger, transition, style, animate } from '@angular/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'; // Import FontAwesomeModule
import { faGithub } from '@fortawesome/free-brands-svg-icons'; // Import GitHub icon
import { faLink } from '@fortawesome/free-solid-svg-icons'; // Import Link icon

// Interface untuk struktur data proyek (sesuaikan jika perlu)
interface ProjectDetails {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  category: 'web' | 'mobile' | 'design' | 'other' | 'backend' | 'frontend'; // Tambahkan kategori jika perlu
  images: string[];
  featured: boolean;
  imageUrl?: string;
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
  imports: [CommonModule, FontAwesomeModule],
  template: `
    <div
      class="modal-overlay"
      *ngIf="isOpen"
      (click)="onOverlayClick($event)"
      @fadeAnimation
    >
      <div
        class="modal-container"
        [class.is-large]="isLarge"
        role="dialog"
        aria-modal="true"
      >
        <div class="modal-header">
          <h3 class="modal-title">{{ title }}</h3>
          <button
            class="modal-close"
            (click)="closeModal()"
            aria-label="Close modal"
          >
            ×
          </button>
        </div>
        <div class="modal-body">
          <!-- Konten dinamis berdasarkan modal ID atau data -->

          <!-- Tampilkan detail proyek jika modal ID adalah 'project-details' dan ada data proyek -->
          <div
            *ngIf="modalId === 'project-details' && selectedProjectDetails"
            class="project-modal"
          >
            <div class="project-modal-gallery">
              <div class="main-image">
                <!-- Gunakan NgOptimizedImage jika sumber gambar statis, jika dinamis cukup src -->
                <img
                  [src]="selectedProjectDetails.images[currentImageIndex]"
                  [alt]="selectedProjectDetails.title"
                  width="800"
                  height="500"
                  loading="lazy"
                />
              </div>
              <div class="image-thumbnails">
                <div
                  *ngFor="
                    let image of selectedProjectDetails.images;
                    let i = index
                  "
                  class="thumbnail"
                  [class.active]="i === currentImageIndex"
                  (click)="setCurrentImage(i)"
                >
                  <!-- Gunakan NgOptimizedImage jika sumber gambar statis, jika dinamis cukup src -->
                  <img
                    [src]="image"
                    [alt]="selectedProjectDetails.title + ' thumbnail'"
                    width="80"
                    height="50"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

            <div class="project-modal-content">
              <h3>{{ selectedProjectDetails.title }}</h3>
              <p class="full-description">
                {{ selectedProjectDetails.description }}
              </p>

              <div class="tech-stack">
                <h4>Technologies</h4>
                <div class="tech-tags">
                  <span
                    *ngFor="let tech of selectedProjectDetails.technologies"
                    >{{ tech }}</span
                  >
                </div>
              </div>

              <div class="project-modal-links">
                <a
                  *ngIf="selectedProjectDetails.githubUrl"
                  [href]="selectedProjectDetails.githubUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="btn btn-outline"
                >
                  <fa-icon [icon]="faGithub" class="btn-icon"></fa-icon>
                  GitHub Repository
                </a>
                <a
                  *ngIf="selectedProjectDetails.liveUrl"
                  [href]="selectedProjectDetails.liveUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="btn btn-primary"
                >
                  <fa-icon [icon]="faLink" class="btn-icon"></fa-icon>
                  Live Preview
                </a>
              </div>
            </div>
          </div>

          <!-- Tambahkan template lain di sini untuk modal 'profile-modal' jika diperlukan -->
          <div
            *ngIf="
              modalId === 'profile-modal' && selectedProjectDetails?.imageUrl
            "
          >
            <!-- Isi template untuk modal profil, menggunakan selectedProjectDetails.imageUrl -->
            <img
              [src]="selectedProjectDetails?.imageUrl"
              alt="Profile"
              style="max-width: 100%; height: auto;"
            />
          </div>

          <!-- Konten default jika tidak ada yang cocok -->
          <div *ngIf="!selectedProjectDetails && modalId !== 'profile-modal'">
            <p>Loading content...</p>
            <!-- Atau pesan default lainnya -->
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      /* ... (CSS styles Anda sebelumnya untuk modal, pastikan styles untuk .project-modal, .project-modal-gallery, etc. juga ada di sini atau di global styles) ... */
      .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
        padding: var(--space-4);
      }

      .modal-container {
        background-color: var(--card-bg);
        border-radius: var(--border-radius);
        box-shadow: var(--box-shadow);
        width: 90%;
        max-width: 500px; /* Default max-width */
        max-height: 90vh;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
      }

      .modal-container.is-large {
        max-width: 800px; /* Max-width for large modal */
      }
      /* Override for specific modal content */
      .modal-container.is-large .modal-body > .project-modal {
        max-width: 900px; /* Sesuaikan dengan max-width yang Anda inginkan untuk konten proyek */
        width: 100%; /* Pastikan menggunakan lebar penuh container */
      }

      .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: var(--space-4);
        border-bottom: 1px solid var(--border-color);
      }

      .modal-title {
        margin: 0;
        font-size: 1.25rem;
      }

      .modal-close {
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        color: var(--text-muted);
        transition: color var(--transition-speed) var(--transition-timing);
      }

      .modal-close:hover {
        color: var(--error-color);
      }

      .modal-body {
        padding: var(--space-4);
        overflow-y: auto;
      }

      /* Styles for the project details content INSIDE the modal body */
      .project-modal {
        display: grid;
        grid-template-columns: 1fr 1fr; /* Layout 2 kolom di desktop */
        gap: var(--space-6);
      }

      .project-modal-gallery {
        width: 100%;
      }

      .main-image {
        margin-bottom: var(--space-4);
        border-radius: var(--border-radius);
        overflow: hidden;
        box-shadow: var(--box-shadow);
      }

      .main-image img {
        width: 100%;
        height: auto;
        object-fit: cover;
      }

      .image-thumbnails {
        display: flex;
        gap: var(--space-2);
        overflow-x: auto;
        padding-bottom: var(--space-2);
      }

      .thumbnail {
        width: 80px;
        height: 50px;
        border-radius: var(--border-radius-sm);
        overflow: hidden;
        cursor: pointer;
        opacity: 0.7;
        transition: opacity var(--transition-speed) var(--transition-timing);
        flex-shrink: 0;
      }

      .thumbnail.active,
      .thumbnail:hover {
        opacity: 1;
      }

      .thumbnail img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .tech-stack {
        margin: var(--space-4) 0;
      }

      .tech-stack h4 {
        margin-bottom: var(--space-2);
      }

      .tech-tags {
        display: flex;
        flex-wrap: wrap;
        gap: var(--space-2);
      }

      .tech-tags span {
        background-color: var(--primary-glow);
        color: var(--primary-color);
        padding: var(--space-1) var(--space-2);
        border-radius: var(--border-radius-sm);
        font-size: 0.875rem;
      }

      .full-description {
        line-height: 1.6;
        margin-bottom: var(--space-4);
      }

      .project-modal-links {
        display: flex;
        gap: var(--space-4);
        margin-top: var(--space-4);
      }

      @media (max-width: 768px) {
        .project-modal {
          grid-template-columns: 1fr; /* 1 kolom di layar kecil */
        }
      }

      @media (max-width: 576px) {
        .project-modal-links {
          flex-direction: column;
          gap: var(--space-3);
        }
      }
    `,
  ],
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
  title = '';
  modalId: string | undefined; // Properti baru untuk menyimpan ID modal
  private subscription: Subscription = new Subscription();

  // Properti untuk detail proyek
  selectedProjectDetails: ProjectDetails | null = null;
  currentImageIndex = 0;

  // Font Awesome Icons for modal content
  faGithub = faGithub;
  faLink = faLink;

  constructor(private modalService: ModalService) {}

  ngOnInit(): void {
    this.subscription = this.modalService.modalState$.subscribe(
      (state: ModalData) => {
        this.isOpen = state.isOpen;
        this.modalId = state.id; // Simpan ID modal
        this.title = state.data?.title || '';
        this.isLarge = state.data?.isLarge || false;

        // Jika modal adalah 'project-details', simpan data proyek
        if (this.modalId === 'project-details') {
          this.selectedProjectDetails = state.data?.projectDetails || null;
          this.currentImageIndex = 0; // Reset index gambar saat modal baru dibuka
        } else {
          this.selectedProjectDetails = null; // Clear proyek jika modal lain
        }

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
    // Pastikan overflow direset jika komponen hancur saat modal terbuka
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
    this.selectedProjectDetails = null; // Clear data saat modal ditutup
    this.currentImageIndex = 0; // Reset index gambar
  }

  // Method untuk galeri gambar di dalam modal
  setCurrentImage(index: number): void {
    if (
      this.selectedProjectDetails &&
      index >= 0 &&
      index < this.selectedProjectDetails.images.length
    ) {
      this.currentImageIndex = index;
    }
  }
}
