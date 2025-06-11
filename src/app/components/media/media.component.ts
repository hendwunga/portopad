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
} from '@fortawesome/free-solid-svg-icons';
import {
  trigger,
  transition,
  style,
  animate,
  query,
  stagger,
} from '@angular/animations';

interface MediaItem {
  id: number;
  type: 'image' | 'video';
  title: string;
  description?: string;
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

  mediaItems: MediaItem[] = [
    {
      id: 1,
      type: 'video',
      title: 'Campus Event Video',
      videoProvider: 'youtube',
      videoId: '-sfUVBeZNPU',
      year: '2022',
      description: 'Dokumentasi acara kampus dengan sorotan kegiatan utama.',
      thumbnailUrl: 'assets/media/ppkmb.png',
      category: 'events',
    },
    {
      id: 2,
      type: 'image',
      title: 'Data Science Competition at Gammafest 2024',
      url: 'assets/activity/Gammafest.png',
      thumbnailUrl: 'assets/activity/Gammafest.png',
      year: '2024',
      description:
        'Partisipasi dalam lomba data science pada ajang Gammafest 2024, yang menantang peserta untuk menganalisis data dan menyusun solusi berbasis machine learning. Kompetisi ini menjadi wadah pengembangan keterampilan analisis data, pemodelan statistik, dan pemecahan masalah berbasis teknologi.',
      category: 'events',
    },

    {
      id: 3,
      type: 'image',
      title: 'Exploring IT Infrastructure at PT Kanisius',
      url: 'assets/activity/pt1.png',
      thumbnailUrl: 'assets/activity/pt2.png',
      year: '2024',
      description:
        'Kunjungan industri ke PT Kanisius untuk mempelajari penerapan sistem informasi, infrastruktur jaringan, dan workflow digital dalam mendukung operasional percetakan modern. Mahasiswa mendapatkan wawasan langsung tentang integrasi teknologi dalam dunia industri.',
      category: 'events',
    },

    // Contoh video TikTok
    // {
    //   id: 4, // Ubah ID jika perlu
    //   type: 'video',
    //   title: 'Project Feature Showcase (TikTok)',
    //   videoProvider: 'tiktok',
    //   videoId: 'TIKTOK_VIDEO_ID_ANDA_DI_SINI', // Ganti dengan ID video TikTok (angka di URL)
    //   year: '2024',
    //   description: 'Showcase singkat fitur terbaru dari proyek.',
    //   thumbnailUrl: 'assets/media/thumbnails/tiktok-showcase-thumb.jpg', // Thumbnail khusus
    //   category: 'projects',
    // },
    // {
    //   id: 5, // Ubah ID jika perlu
    //   type: 'image',
    //   title: 'Hackathon Team Photo',
    //   url: 'assets/media/images/hackathon-team.jpg',
    //   year: '2022',
    //   description: 'Foto tim setelah memenangkan hackathon.',
    //   thumbnailUrl: 'assets/media/thumbnails/event-thumb2.jpg',
    //   category: 'events',
    // },
    {
      id: 4, // Berikan ID unik yang belum digunakan
      type: 'video', // Sesuaikan jika ini screenshot (type: 'image')
      title: 'Proyek Jaringan: RIP Routing + Security', // Judul proyek
      videoProvider: 'tiktok',
      videoId: 'ZSkrhTsCT',
      year: '2023',
      description:
        'Screenshot yang menampilkan konfigurasi dan hasil pengujian RIP Routing dasar serta implementasi fitur keamanan pada jaringan simulasi.', // Deskripsi yang jelas
      thumbnailUrl: 'assets/media/RIPSecurity.jpeg', // Sesuaikan path thumbnail
      category: 'projects', // Kategori: Proyek
    },
    // Contoh Instagram Reel
    // {
    //   id: 7, // Ubah ID jika perlu
    //   type: 'video',
    //   title: 'Coding Timelapse (Instagram Reel)',
    //   videoProvider: 'instagram-reel', // Tandai sebagai Instagram Reel
    //   videoId: 'INSTAGRAM_REEL_ID_ANDA_DI_SINI', // Ganti dengan ID Reel (bagian dari URL)
    //   year: '2024',
    //   description: 'Timelapse singkat sesi coding.',
    //   thumbnailUrl: 'assets/media/thumbnails/instagram-reel-thumb.jpg', // Thumbnail khusus
    //   category: 'personal',
    // },
    {
      id: 5,
      type: 'image',
      title: 'Website E-commerce Batik DifabelZone',
      url: 'assets/media/projekInfo.jpg',
      thumbnailUrl: 'assets/media/projekInfo.jpg',
      year: '2023',
      description:
        'Dokumentasi proyek pengembangan website E-commerce untuk Batik DifabelZone, sebuah inisiatif sosial yang memberdayakan pengrajin difabel di Yogyakarta. Tim mengembangkan platform digital untuk memperluas jangkauan pemasaran produk batik lokal melalui integrasi fitur katalog, pembayaran online, dan sistem manajemen pesanan.',
      category: 'projects',
    },
    {
      id: 6,
      type: 'image',
      title: 'Aktif di HMIF - Divisi Kaderisasi',
      url: 'assets/activity/hmif.JPG',
      thumbnailUrl: 'assets/activity/hmif.JPG',
      year: '2022',
      description:
        'Berperan aktif dalam Himpunan Mahasiswa Informatika (HMIF) sebagai anggota Divisi Kaderisasi, yang fokus pada pengembangan karakter, kepemimpinan, dan pelatihan kader bagi mahasiswa baru. Terlibat dalam perencanaan serta pelaksanaan program pembinaan dan kegiatan internal organisasi.',
      category: 'personal',
    },
    {
      id: 7,
      type: 'image',
      title: 'Kegiatan Sosial Peduli Kasih ke Panti Asuhan',
      url: 'assets/activity/pdk.jpg',
      thumbnailUrl: 'assets/activity/pdk.jpg',
      year: '2022',
      description:
        "Partisipasi dalam kegiatan sosial 'Peduli Kasih' melalui kunjungan ke panti asuhan. Kegiatan ini bertujuan untuk menumbuhkan kepedulian sosial serta membagikan bantuan dan kebahagiaan kepada anak-anak panti melalui berbagai aktivitas interaktif dan edukatif.",
      category: 'personal',
    },
  ];

  filteredMediaItems: MediaItem[] = [];

  activeFilter: 'all' | 'events' | 'projects' | 'personal' = 'all';

  filters: {
    label: string;
    value: 'all' | 'events' | 'projects' | 'personal';
  }[] = [
    { label: 'All', value: 'all' },
    { label: 'Events', value: 'events' },
    { label: 'Projects', value: 'projects' },
    { label: 'Personal', value: 'personal' },
  ];

  isModalOpen = false;
  selectedMediaItem: MediaItem | null = null;
  currentIndex = 0;

  constructor(private readonly sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.updateFilteredMedia();
  }

  updateFilteredMedia(): void {
    if (this.activeFilter === 'all') {
      this.filteredMediaItems = this.mediaItems;
    } else {
      this.filteredMediaItems = this.mediaItems.filter(
        (item) => item.category === this.activeFilter
      );
    }
    this.currentIndex = 0;
    this.selectedMediaItem = null;
    if (this.isModalOpen) {
      this.closeMediaModal();
    }
  }

  setFilter(filter: 'all' | 'events' | 'projects' | 'personal'): void {
    this.activeFilter = filter;
    this.updateFilteredMedia();
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

  // === Modifikasi getSafeVideoEmbedUrl untuk YouTube, TikTok, Instagram Reels ===
  getSafeVideoEmbedUrl(item: MediaItem): SafeResourceUrl | null {
    if (!item || item.type !== 'video' || !item.videoId) {
      return null; // Hanya proses item video dengan videoId
    }

    let embedUrl = '';

    if (item.videoProvider === 'youtube') {
      // Format embed YouTube
      embedUrl = `https://www.youtube.com/embed/${item.videoId}`;
    } else if (item.videoProvider === 'tiktok') {
      // Format URL embed TikTok
      embedUrl = `https://www.tiktok.com/embed/${item.videoId}`;
      // Tambahkan parameter query jika perlu, misal '&autoplay=1'
      // embedUrl = `https://www.tiktok.com/embed/${item.videoId}?autoplay=1`;
    } else if (item.videoProvider === 'instagram-reel') {
      // Tambahkan kondisi Instagram Reel
      // Format URL embed Instagram Reel
      embedUrl = `https://www.instagram.com/reel/${item.videoId}/embed`;
      // Tambahkan parameter query jika perlu, misal '&autoplay=true'
      // embedUrl = `https://www.instagram.com/reel/${item.videoId}/embed?autoplay=true`;
    } else {
      return null; // Provider tidak didukung
    }

    return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
  }
  // =====================================================================

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
