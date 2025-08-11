import { Component, OnInit } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faYoutube,
  faTiktok,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons';
import {
  faImage,
  faVideo,
  faChevronLeft,
  faChevronRight,
  faTimes, // Import faTimes untuk tombol close modal
} from '@fortawesome/free-solid-svg-icons'; // Tambahkan faTimes jika tombol close menggunakan ikon
import {
  trigger,
  transition,
  style,
  animate,
  query,
  stagger,
} from '@angular/animations';

import {
  LanguageService,
  Language,
} from '../../services/shared/language.service';
import { Observable, map } from 'rxjs';

// --- PERBARUI INTERFACE MEDIAITEM ---
interface MediaItem {
  id: number;
  type: 'image' | 'video';
  title: { en: string; id: string };
  description?: { en: string; id: string };
  url?: string;
  thumbnailUrl?: string;
  videoProvider?: 'youtube' | 'tiktok' | 'instagram-reel';
  videoId?: string;
  year: string;
  category: 'events' | 'projects' | 'personal';
}

@Component({
  selector: 'app-media',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, FontAwesomeModule],
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss'],
  animations: [
    trigger('galleryAnimation', [
      transition(':enter', [
        query(
          '.media-card',
          [
            style({ opacity: 0, transform: 'translateY(30px)' }),
            stagger(100, [
              animate(
                '0.5s ease-out',
                style({ opacity: 1, transform: 'translateY(0)' })
              ),
            ]),
          ],
          { optional: true }
        ),
      ]),
    ]),
    // Animasi untuk modal media viewer
    trigger('modalAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.9)' }),
        animate('200ms ease-out', style({ opacity: 1, transform: 'scale(1)' })),
      ]),
      transition(':leave', [
        animate(
          '150ms ease-in',
          style({ opacity: 0, transform: 'scale(0.9)' })
        ),
      ]),
    ]),
  ],
})
export class MediaComponent implements OnInit {
  faYoutube = faYoutube;
  faTiktok = faTiktok;
  faInstagram = faInstagram;
  faImage = faImage;
  faVideo = faVideo;
  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;
  faTimes = faTimes;

  filters$: Observable<
    { value: 'all' | 'events' | 'projects' | 'personal'; label: string }[]
  >;

  mediaItems: MediaItem[] = [
    // Pastikan semua item memiliki 'title' dan 'description' sebagai objek { en: string; id: string; }
    {
      id: 1,
      type: 'video',
      title: { en: 'Campus Event Video', id: 'Video Acara Kampus' },
      videoProvider: 'youtube',
      videoId: '-sfUVBeZNPU',
      year: '2022',
      description: {
        en: 'Documentation of campus events highlighting key activities.',
        id: 'Dokumentasi acara kampus dengan sorotan kegiatan utama.',
      },
      thumbnailUrl: 'assets/media/ppkmb.png',
      category: 'events',
    },
    {
      id: 2,
      type: 'image',
      title: {
        en: 'Data Science Competition at Gammafest 2024',
        id: 'Lomba Data Science di Gammafest 2024',
      },
      url: 'assets/activity/Gammafest.png',
      thumbnailUrl: 'assets/activity/Gammafest.png',
      year: '2024',
      description: {
        en: 'Participation in the data science competition at Gammafest 2024, challenging participants to analyze data and develop machine learning-based solutions. This competition served as a platform for developing data analysis, statistical modeling, and technology-based problem-solving skills.',
        id: 'Partisipasi dalam lomba data science pada ajang Gammafest 2024, yang menantang peserta untuk menganalisis data dan menyusun solusi berbasis machine learning. Kompetisi ini menjadi wadah pengembangan keterampilan analisis data, pemodelan statistik, dan pemecahan masalah berbasis teknologi.',
      },
      category: 'events',
    },
    {
      id: 3,
      type: 'image',
      title: {
        en: 'Exploring IT Infrastructure at PT Kanisius',
        id: 'Eksplorasi Infrastruktur IT di PT Kanisius',
      },
      url: 'assets/activity/pt1.png',
      thumbnailUrl: 'assets/activity/pt2.png',
      year: '2024',
      description: {
        en: 'Industrial visit to PT Kanisius to learn about the implementation of information systems, network infrastructure, and digital workflows in supporting modern printing operations. Students gained direct insight into the integration of technology in the industrial world.',
        id: 'Kunjungan industri ke PT Kanisius untuk mempelajari penerapan sistem informasi, infrastruktur jaringan, dan workflow digital dalam mendukung operasional percetakan modern. Mahasiswa mendapatkan wawasan langsung tentang integrasi teknologi dalam dunia industri.',
      },
      category: 'events',
    },
    {
      id: 4,
      type: 'video',
      title: {
        en: 'Network Project: RIP Routing + Security',
        id: 'Proyek Jaringan: RIP Routing + Keamanan',
      },
      videoProvider: 'tiktok',
      videoId: 'ZSkrhTsCT',
      year: '2023',
      description: {
        en: 'Screenshot showing the configuration and testing results of basic RIP Routing and security feature implementation on a simulated network.',
        id: 'Screenshot yang menampilkan konfigurasi dan hasil pengujian RIP Routing dasar serta implementasi fitur keamanan pada jaringan simulasi.',
      },
      thumbnailUrl: 'assets/media/RIPSecurity.jpeg',
      category: 'projects',
    },
    {
      id: 5,
      type: 'image',
      title: {
        en: 'DifabelZone Batik E-commerce Website',
        id: 'Website E-commerce Batik DifabelZone',
      },
      url: 'assets/media/projekInfo.jpg',
      thumbnailUrl: 'assets/media/projekInfo.jpg',
      year: '2023',
      description: {
        en: 'Documentation of the e-commerce website development project for DifabelZone Batik, a social initiative empowering disabled artisans in Yogyakarta. The team developed a digital platform to expand the market reach of local batik products through the integration of catalog features, online payments, and an order management system.',
        id: 'Dokumentasi proyek pengembangan website E-commerce untuk Batik DifabelZone, sebuah inisiatif sosial yang memberdayakan pengrajin difabel di Yogyakarta. Tim mengembangkan platform digital untuk memperluas jangkauan pemasaran produk batik lokal melalui integrasi fitur katalog, pembayaran online, dan sistem manajemen pesanan.',
      },
      category: 'projects',
    },
    {
      id: 6,
      type: 'image',
      title: {
        en: 'Active in HMIF - Cadre Division',
        id: 'Aktif di HMIF - Divisi Kaderisasi',
      },
      url: 'assets/activity/hmif.JPG',
      thumbnailUrl: 'assets/activity/hmif.JPG',
      year: '2022',
      description: {
        en: 'Actively involved in the Informatics Student Association (HMIF) as a member of the Cadre Division, which focuses on character development, leadership, and cadre training for new students. Involved in the planning and implementation of coaching programs and internal organizational activities.',
        id: 'Berperan aktif dalam Himpunan Mahasiswa Informatika (HMIF) sebagai anggota Divisi Kaderisasi, yang fokus pada pengembangan karakter, kepemimpinan, dan pelatihan kader bagi mahasiswa baru. Terlibat dalam perencanaan serta pelaksanaan program pembinaan dan kegiatan internal organisasi.',
      },
      category: 'personal',
    },
    {
      id: 7,
      type: 'image',
      title: {
        en: 'Social Activity "Peduli Kasih" to Orphanage',
        id: 'Kegiatan Sosial Peduli Kasih ke Panti Asuhan',
      },
      url: 'assets/activity/pdk.jpg',
      thumbnailUrl: 'assets/activity/pdk.jpg',
      year: '2022',
      description: {
        en: 'Participation in the "Peduli Kasih" social activity through a visit to an orphanage. This activity aims to foster social awareness and distribute aid and happiness to orphanage children through various interactive and educational activities.',
        id: 'Partisipasi dalam kegiatan sosial "Peduli Kasih" melalui kunjungan ke panti asuhan. Kegiatan ini bertujuan untuk menumbuhkan kepedulian sosial serta membagikan bantuan dan kebahagiaan kepada anak-anak panti melalui berbagai aktivitas interaktif dan edukatif.',
      },
      category: 'personal',
    },
    // // Tambahkan lebih banyak item di sini untuk melihat efek "Show More"
    // {
    //   id: 8,
    //   type: 'image',
    //   title: { en: 'Placeholder Project 8', id: 'Proyek Contoh 8' },
    //   url: 'assets/activity/hmif.JPG',
    //   thumbnailUrl: 'assets/activity/hmif.JPG',
    //   year: '2023',
    //   category: 'projects',
    // },
    // {
    //   id: 9,
    //   type: 'image',
    //   title: { en: 'Placeholder Event 9', id: 'Acara Contoh 9' },
    //   url: 'assets/activity/pt1.png',
    //   thumbnailUrl: 'assets/activity/pt2.png',
    //   year: '2024',
    //   category: 'events',
    // },
    // {
    //   id: 10,
    //   type: 'video',
    //   title: { en: 'Placeholder Video 10', id: 'Video Contoh 10' },
    //   videoProvider: 'youtube',
    //   videoId: '-sfUVBeZNPU',
    //   year: '2023',
    //   thumbnailUrl: 'assets/media/ppkmb.png',
    //   category: 'personal',
    // },
    // {
    //   id: 11,
    //   type: 'image',
    //   title: { en: 'Placeholder Project 11', id: 'Proyek Contoh 11' },
    //   url: 'assets/activity/Gammafest.png',
    //   thumbnailUrl: 'assets/activity/Gammafest.png',
    //   year: '2024',
    //   category: 'projects',
    // },
  ];

  filteredMediaItems: MediaItem[] = []; // Ini akan berisi item setelah filter kategori
  displayedMediaItems: MediaItem[] = []; // BARU: Ini adalah item yang benar-benar ditampilkan di grid

  activeFilter: 'all' | 'events' | 'projects' | 'personal' = 'all';

  // --- Properti "Show More" ---
  initialItemsToShow: number = 6; // Jumlah item awal yang ditampilkan
  itemsToLoadPerClick: number = 3; // Berapa banyak item dimuat setiap kali klik "Show More"
  currentDisplayCount: number = 0; // Jumlah item yang sedang ditampilkan
  canShowMore: boolean = false; // Untuk mengontrol visibilitas tombol "Show More"
  // -------------------------

  isModalOpen = false;
  selectedMediaItem: MediaItem | null = null;
  currentIndex = 0;

  constructor(
    private readonly sanitizer: DomSanitizer,
    public languageService: LanguageService
  ) {
    this.filters$ = this.languageService.currentLang$.pipe(
      map((lang) => [
        {
          value: 'all',
          label: this.languageService.getTranslationSync('mediaFilterAll'),
        },
        {
          value: 'events',
          label: this.languageService.getTranslationSync('mediaFilterEvents'),
        },
        {
          value: 'projects',
          label: this.languageService.getTranslationSync('mediaFilterProjects'),
        },
        {
          value: 'personal',
          label: this.languageService.getTranslationSync('mediaFilterPersonal'),
        },
      ])
    );
  }

  ngOnInit(): void {
    this.updateDisplayedMedia(); // Ganti pemanggilan awal
  }

  // --- Ganti nama dan modifikasi updateFilteredMedia() ---
  updateDisplayedMedia(): void {
    // 1. Terapkan Filter Kategori
    if (this.activeFilter === 'all') {
      this.filteredMediaItems = this.mediaItems;
    } else {
      this.filteredMediaItems = this.mediaItems.filter(
        (item) => item.category === this.activeFilter
      );
    }

    // 2. Atur jumlah item yang ditampilkan (untuk "Show More")
    this.currentDisplayCount = this.initialItemsToShow;
    this.applyShowMoreLogic(); // Panggil logika "Show More"

    // Reset modal jika perlu
    this.currentIndex = 0;
    this.selectedMediaItem = null;
    if (this.isModalOpen) {
      this.closeMediaModal();
    }
  }

  setFilter(filter: 'all' | 'events' | 'projects' | 'personal'): void {
    this.activeFilter = filter;
    this.updateDisplayedMedia(); // Panggil yang sudah dimodifikasi
  }

  openMediaModal(item: MediaItem): void {
    this.selectedMediaItem = item;
    this.currentIndex = this.filteredMediaItems.findIndex(
      (m) => m.id === item.id
    );
    this.isModalOpen = true;
    document.body.classList.add('modal-open');
  }

  closeMediaModal(): void {
    this.isModalOpen = false;
    this.selectedMediaItem = null;
    document.body.classList.remove('modal-open');
  }

  getTranslatedText(
    textObject: { en: string; id: string } | undefined
  ): string {
    if (!textObject) {
      return '';
    }
    const currentLang = this.languageService.currentLangValue;
    return textObject[currentLang];
  }

  getSafeVideoEmbedUrl(item: MediaItem): SafeResourceUrl | null {
    if (!item || item.type !== 'video' || !item.videoId) {
      return null;
    }

    let embedUrl = '';

    if (item.videoProvider === 'youtube') {
      embedUrl = `https://www.youtube.com/embed/${item.videoId}`;
    } else if (item.videoProvider === 'tiktok') {
      embedUrl = `https://www.tiktok.com/embed/${item.videoId}`;
    } else if (item.videoProvider === 'instagram-reel') {
      embedUrl = `https://www.instagram.com/embed/reel/${item.videoId}/`;
    } else {
      return null;
    }

    return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
  }

  // --- Metode untuk "Show More" ---
  loadMoreItems(): void {
    this.currentDisplayCount += this.itemsToLoadPerClick;
    this.applyShowMoreLogic();
  }

  applyShowMoreLogic(): void {
    this.displayedMediaItems = this.filteredMediaItems.slice(
      0,
      this.currentDisplayCount
    );
    this.canShowMore =
      this.currentDisplayCount < this.filteredMediaItems.length;
  }
  // ---------------------------------

  // Metode untuk navigasi modal (tidak berubah)
  get hasPrevious(): boolean {
    return this.currentIndex > 0;
  }

  get hasNext(): boolean {
    return this.currentIndex < this.filteredMediaItems.length - 1;
  }

  showPrevious(): void {
    if (this.hasPrevious) {
      this.currentIndex--;
      this.selectedMediaItem = this.filteredMediaItems[this.currentIndex];
    }
  }

  showNext(): void {
    if (this.hasNext) {
      this.currentIndex++;
      this.selectedMediaItem = this.filteredMediaItems[this.currentIndex];
    }
  }
}
