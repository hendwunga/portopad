import { Injectable, Type } from '@angular/core'; // Type if you want to pass component type
import { BehaviorSubject, Observable } from 'rxjs';

// --- PERBARUI INTERFACE INI ---
// Import atau definisikan ulang ProjectDetails dan ActivityDetails di sini
// agar ModalService mengetahui strukturnya.
// Idealnya, Anda memiliki file shared/interfaces.ts
interface ProjectDetailsForModal {
  id: number;
  title: { en: string; id: string }; // Pastikan ini objek
  description: { en: string; id: string }; // Pastikan ini objek
  thumbnail: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  category: string; // Bisa ProjectCategory jika diimpor
  images: string[];
  featured: boolean;
}

interface ActivityDetailsForModal {
  id: number;
  title: string;
  shortDescription: string;
  fullDescription: string;
  year: string;
  modalImageUrl: string;
  externalLink?: string;
}

export interface ModalData {
  isOpen: boolean;
  id?: string; // ID modal (misal: 'project-details', 'activity-details')
  data?: {
    // Judul modal yang dikirim (ProjectsComponent akan mengirimkan string yang sudah diterjemahkan)
    title?: string;
    isLarge?: boolean;
    // Data spesifik untuk project modal
    projectDetails?: ProjectDetailsForModal;
    // Data spesifik untuk activity modal
    activityDetails?: ActivityDetailsForModal;
    // ... properti lain yang mungkin ingin Anda kirimkan ke modal
  };
}

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private _modalState = new BehaviorSubject<ModalData>({ isOpen: false });
  public modalState$: Observable<ModalData> = this._modalState.asObservable();

  constructor() {}

  // Metode untuk membuka modal
  // `data` bisa berupa objek apa pun yang dibutuhkan modal
  openModal(id: string, data?: any): void {
    // 'any' untuk fleksibilitas di sini, tapi di ModalData sudah didefinisikan
    this._modalState.next({ isOpen: true, id, data });
  }

  // Metode untuk menutup modal
  closeModal(): void {
    this._modalState.next({ isOpen: false });
  }

  // Metode untuk mengecek apakah modal tertentu sedang terbuka
  isModalOpen(modalId: string): boolean {
    const currentState = this._modalState.getValue();
    return currentState.isOpen && currentState.id === modalId;
  }
}
