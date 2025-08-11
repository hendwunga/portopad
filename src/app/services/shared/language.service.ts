// src/app/services/shared/language.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';

export type Language = 'en' | 'id';

interface Translations {
  [key: string]: {
    en: string;
    id: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private _currentLang = new BehaviorSubject<Language>(
    this.getInitialLanguage()
  );
  public currentLang$: Observable<Language> = this._currentLang.asObservable();

  public get currentLangValue(): Language {
    return this._currentLang.getValue();
  }

  private translations: Translations = {
    // Header Navigation Links (Sudah ada)
    homeLink: { en: 'Home', id: 'Beranda' },
    aboutLink: { en: 'About', id: 'Tentang' },
    skillsLink: { en: 'Skills', id: 'Keahlian' },
    projectsLink: { en: 'Projects', id: 'Proyek' },
    certificatesLink: { en: 'Certificates', id: 'Sertifikat' },
    activityLink: { en: 'Activity', id: 'Aktivitas' },
    mediaLink: { en: 'Media', id: 'Media' },
    contactLink: { en: 'Contact', id: 'Kontak' },

    // Hero Section (Diperbarui)
    heroGreeting: { en: "Hi, I'm", id: 'Halo, saya' },
    heroSubtitle: {
      en: 'Backend Developer with a DevOps Focus',
      id: 'Pengembang Backend dengan Fokus DevOps',
    },
    heroDescription: {
      en: 'Focusing on robust server-side development and implementing DevOps practices for automation and deployment, my practical experience is built through dedicated personal projects.',
      id: 'Berfokus pada pengembangan sisi server yang tangguh dan penerapan praktik DevOps untuk otomatisasi dan deployment, pengalaman praktis saya dibangun melalui proyek-proyek pribadi yang berdedikasi.',
    },
    contactMeButton: { en: 'Contact Me', id: 'Hubungi Saya' },
    downloadCvButton: { en: 'Download Resume', id: 'Unduh Resume' },
    emailMeLabel: { en: 'Send Email', id: 'Kirim Email' }, // BARU
    linkedinProfileLabel: { en: 'LinkedIn Profile', id: 'Profil LinkedIn' }, // BARU
    githubProfileLabel: { en: 'GitHub Profile', id: 'Profil GitHub' }, // BARU
    instagramProfileLabel: { en: 'Instagram Profile', id: 'Profil Instagram' }, // BARU
    tiktokProfileLabel: { en: 'TikTok Profile', id: 'Profil TikTok' }, // BARU

    // About Section (Sudah ada)
    aboutMeTitle: { en: 'About Me', id: 'Tentang Saya' },
    aboutLeadText: {
      en: 'I am a Backend Developer with a focus on building robust, scalable, and efficient server-side applications.',
      id: 'Saya adalah Pengembang Backend yang berfokus pada pembangunan aplikasi sisi server yang tangguh, skalabel, dan efisien.',
    },
    aboutParagraph2: {
      en: "My practical experience has been forged through hands-on work on numerous personal projects. I've successfully tackled complex problems and transformed concepts into functional realities by applying technologies such as Java Spring Boot, Docker, and relational databases.",
      id: 'Pengalaman praktis saya terbentuk melalui pekerjaan langsung pada berbagai proyek pribadi. Saya telah berhasil menangani masalah kompleks dan mengubah konsep menjadi realitas fungsional dengan menerapkan teknologi seperti Java Spring Boot, Docker, dan basis data relasional.',
    },
    aboutParagraph3: {
      en: 'I actively integrate DevOps principles into my workflow, including containerization and automating CI/CD pipelines, to ensure reliable and streamlined deployments. My core technical competencies include API design, database management, and effective collaboration within development teams using methodologies like GitHub Flow.',
      id: 'Saya secara aktif mengintegrasikan prinsip-prinsip DevOps ke dalam alur kerja saya, termasuk kontainerisasi dan otomatisasi pipeline CI/CD, untuk memastikan deployment yang andal dan efisien. Kompetensi teknis inti saya meliputi desain API, manajemen basis data, dan kolaborasi yang efektif dalam tim pengembangan menggunakan metodologi seperti GitHub Flow.',
    },
    aboutParagraph4: {
      en: 'I am seeking opportunities to contribute my proven backend development and DevOps-aligned skills in a challenging and collaborative professional setting.',
      id: 'Saya mencari peluang untuk berkontribusi dengan keahlian pengembangan backend dan DevOps saya yang terbukti dalam lingkungan profesional yang menantang dan kolaboratif.',
    },
    experienceTitle: { en: 'Experience', id: 'Pengalaman' },
    experienceDescription: { en: 'Project-based', id: 'Berbasis Proyek' },
    educationTitle: { en: 'Education', id: 'Pendidikan' },
    educationUniversity: {
      en: 'B.Sc. Computer Science, Sanata Dharma University',
      id: 'S.Kom. Ilmu Komputer, Universitas Sanata Dharma',
    },
    educationGpaLabel: { en: 'GPA:', id: 'IPK:' },
    projectsTitleAbout: { en: 'Projects', id: 'Proyek' },
    projectsCompletedAbout: { en: '10+ completed', id: '10+ selesai' },

    // Skills Section (Sudah ada)
    skillsTitle: { en: 'Skills & Expertise', id: 'Keahlian & Kompetensi' },
    filterAll: { en: 'All', id: 'Semua' },
    filterLanguages: { en: 'Languages', id: 'Bahasa Pemrograman' },
    filterFrameworks: { en: 'Frameworks', id: 'Frameworks' },
    filterDatabases: { en: 'Databases', id: 'Basis Data' },
    filterDevOpsTools: { en: 'DevOps & Tools', id: 'DevOps & Peralatan' },
    filterOsVcs: { en: 'OS & VCS', id: 'Sistem Operasi & VCS' },

    // Projects Section Translations (sudah ada)
    projectsSectionTitle: { en: 'Projects', id: 'Proyek' },
    projectFilterAll: { en: 'All', id: 'Semua' },
    projectFilterBackend: { en: 'Backend', id: 'Backend' },
    projectFilterFrontend: { en: 'Frontend', id: 'Frontend' },
    projectFilterAlgorithms: {
      en: 'Algorithms & Tools',
      id: 'Algoritma & Peralatan',
    },
    projectFilterNetworking: { en: 'Networking (GNS3)', id: 'Jaringan (GNS3)' },
    projectFilterSimulation: { en: 'Simulation (ONE)', id: 'Simulasi (ONE)' },
    projectFilterDesktop: { en: 'Desktop', id: 'Desktop' },
    projectFilterDesign: { en: 'Design', id: 'Desain' },
    viewDetailsButton: { en: 'View Details', id: 'Lihat Detail' },
    technologiesUsed: { en: 'Technologies Used:', id: 'Teknologi Digunakan:' },
    githubRepoButton: { en: 'GitHub Repository', id: 'Repositori GitHub' },
    liveDemoButton: { en: 'Live Demo', id: 'Demo Langsung' },
    featuredLabel: { en: 'Featured', id: 'Unggulan' },

    certificatesSectionTitle: { en: 'Certificates', id: 'Sertifikat' },
    certFilterAll: { en: 'All', id: 'Semua' },
    certFilterProfessional: { en: 'Professional', id: 'Profesional' },
    certFilterAcademic: { en: 'Academic', id: 'Akademik' },
    certFilterOrganizational: { en: 'Organizational', id: 'Organisasi' },
    viewCertificateButton: { en: 'View Certificate', id: 'Lihat Sertifikat' },

    // --- Media Section Translations (BARU/Diperbarui) ---
    mediaSectionTitle: { en: 'Media Gallery', id: 'Galeri Media' },
    mediaFilterAll: { en: 'All', id: 'Semua' },
    mediaFilterEvents: { en: 'Events', id: 'Acara' },
    mediaFilterProjects: { en: 'Projects', id: 'Proyek' },
    mediaFilterPersonal: { en: 'Personal', id: 'Pribadi' },
    videoLoadError: {
      en: 'Could not load video.',
      id: 'Video tidak dapat dimuat.',
    },
    previousMediaLabel: { en: 'Previous media', id: 'Media sebelumnya' },
    nextMediaLabel: { en: 'Next media', id: 'Media selanjutnya' },
    closeModalButton: { en: 'Close modal', id: 'Tutup modal' }, // Tambahkan ini jika menggunakan ikon 'x'
    noMediaItemsFound: {
      en: 'No items found in this category.',
      id: 'Tidak ada item ditemukan dalam kategori ini.',
    }, // BARU
    showMoreButtonLabel: { en: 'Show More', id: 'Tampilkan Lebih Banyak' }, // BARU
    // ---------------------------------------------------

    // Contact Section Translations (Sudah ada)
    contactSectionTitle: { en: 'Contact Me', id: 'Hubungi Saya' },
    getInTouchTitle: { en: 'Get in Touch', id: 'Kontak Langsung' },
    getInTouchDescription: {
      en: "I'm always open to new opportunities, collaborations, or just a friendly chat. Feel free to reach out using any of the methods below.",
      id: 'Saya selalu terbuka untuk peluang baru, kolaborasi, atau sekadar obrolan ramah. Jangan ragu untuk menghubungi saya menggunakan salah satu metode di bawah ini.',
    },
    locationLabel: { en: 'Location', id: 'Lokasi' },
    phoneLabel: { en: 'Phone', id: 'Telepon' },
    emailLabel: { en: 'Email', id: 'Email' },
    sendMessageTitle: { en: 'Send a Message', id: 'Kirim Pesan' },
    nameFieldLabel: { en: 'Name', id: 'Nama' },
    nameFieldPlaceholder: { en: 'Your Name', id: 'Nama Anda' },
    emailFieldLabel: { en: 'Email', id: 'Email' },
    emailFieldPlaceholder: { en: 'Your Email', id: 'Email Anda' },
    subjectFieldLabel: { en: 'Subject', id: 'Subjek' },
    subjectFieldPlaceholder: { en: 'Subject', id: 'Subjek' },
    messageFieldLabel: { en: 'Message', id: 'Pesan' },
    messageFieldPlaceholder: { en: 'Your Message', id: 'Pesan Anda' },
    sendMessageButton: { en: 'Send Message', id: 'Kirim Pesan' },
    nameRequiredError: { en: 'Name is required', id: 'Nama wajib diisi' },
    emailRequiredError: { en: 'Email is required', id: 'Email wajib diisi' },
    emailInvalidError: {
      en: 'Please enter a valid email',
      id: 'Harap masukkan email yang valid',
    },
    messageRequiredError: {
      en: 'Message is required',
      id: 'Pesan wajib diisi',
    },

    footerCopyright: {
      en: '© %YEAR% Hendro Wunga',
      id: '© %TAHUN% Hendro Wunga',
    },
    footerDescription: {
      en: 'All Rights Reserved.',
      id: 'Hak Cipta Dilindungi Undang-Undang.',
    },
  };

  constructor() {
    this.currentLang$.subscribe((lang) => {
      if (typeof document !== 'undefined') {
        document.documentElement.lang = lang;
      }
    });
  }

  private getInitialLanguage(): Language {
    if (typeof localStorage !== 'undefined') {
      const savedLang = localStorage.getItem('portfolioLang');
      return savedLang === 'en' || savedLang === 'id'
        ? (savedLang as Language)
        : 'en';
    }
    return 'en';
  }

  setLanguage(lang: Language): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('portfolioLang', lang);
    }
    this._currentLang.next(lang);
  }

  getTranslation(key: string): Observable<string> {
    return this.currentLang$.pipe(
      map((lang) => this.translations[key]?.[lang] || key)
    );
  }

  getTranslationSync(key: string): string {
    const currentLang = this._currentLang.getValue();
    return this.translations[key]?.[currentLang] || key;
  }
}
