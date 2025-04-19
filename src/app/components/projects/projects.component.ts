import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Diperlukan untuk *ngFor

// Definisikan struktur data untuk sebuah project
interface Project {
  title: string;
  year: number;
  role: string;
  details: string[]; // Array string untuk daftar detail
  githubUrl: string;
}

@Component({
  selector: 'app-projects', // Selector untuk digunakan di HTML lain
  standalone: true, // Komponen ini berdiri sendiri (tidak butuh NgModule)
  imports: [CommonModule], // Mengimpor CommonModule agar bisa pakai *ngFor di template
  templateUrl: './projects.component.html', // Path ke file template HTML
  styleUrls: ['./projects.component.scss'], // Path ke file CSS
})
export class ProjectsComponent implements OnInit {
  // Mengimplementasikan OnInit lifecycle hook

  // --- DATA PROPERTY ---
  // Array ini menyimpan SEMUA data project Anda
  allProjects: Project[] = [
    {
      title: 'Online Agricultural Store, NTT',
      year: 2022,
      role: 'Backend Developer',
      details: [
        'Designed database architecture (inventory, transactions, users).',
        'Built performant & secure backend APIs with Spring Boot.',
        'Utilized Docker for consistent development environments.',
        'Documented APIs using Swagger for clarity.',
        'Managed CI/CD pipeline with GitHub Actions.',
        'Implemented GitHub Flow for version control.',
      ],
      githubUrl: 'https://github.com/hendrowunga/DifabelZone.git',
    },
    {
      title:
        'RESTful API Backend for DifabelZone Batik e-Commerce (Yogyakarta)',
      year: 2023,
      role: 'Backend Engineer (Spring Boot & System Design)',
      details: [
        'Designed relational database schema covering catalog, cart, user, and payment entities.',
        'Developed RESTful APIs using Spring Boot to support frontend integration and business logic.',
        'Containerized the application with Docker to ensure environment consistency and scalability.',
        'Implemented API documentation and testing using Swagger and Postman.',
        'Adopted GitHub Flow for version control and collaborative development.',
        'Contributed to an inclusive e-commerce system empowering local disabled artisans.',
      ],
      githubUrl: 'https://github.com/hendrowunga/DifabelZone.git',
    },
    {
      title: 'Monolithic e-Commerce Platform for Batik DifabelZone',
      year: 2025,
      role: 'System Design & Backend Development',
      details: [
        'Engineered a Laravel-based e-Commerce platform to support disabled artisans in Bantul, Indonesia.',
        'Designed system architecture, ERD, and relational database schema to support modular growth.',
        'Implemented backend logic for product catalog, user sessions, cart management, and payment workflow.',
        'Developed an admin panel for order processing and inventory tracking with role-based access control.',
        'Aligned software engineering with the mission of digital inclusion and social impact.',
      ],
      githubUrl: 'https://github.com/hendrowunga/batik-difabelzone.git',
    },

    {
      title: 'The Opportunistic Network Environment Simulation',
      year: 2025,
      role: 'DTN Protocol Developer & Simulation Engineer',
      details: [
        'Developed and customized Delay Tolerant Network (DTN) routing protocols such as Epidemic, Spray and Wait, Prophet, and PeopleRank.',
        'Implemented advanced Decision Engines (e.g., PeopleRankCombined, SprayAndFocusDuration) within ONE Simulator using Java.',
        'Integrated real-world datasets (e.g., Haggle3, Reality) and mobility models for realistic scenario testing.',
        'Refactored simulator components to support modular routing decision logic and extensibility.',
        'Automated batch simulation runs and organized output reports for comparative analysis.',
      ],
      githubUrl: 'https://github.com/hendrowunga/the-one.git',
    },
  ];

  // --- STATE PROPERTIES ---
  // Array ini HANYA menyimpan project yang akan ditampilkan di template saat ini
  displayedProjects: Project[] = [];
  // Batas jumlah project yang ditampilkan awalnya
  readonly displayLimit = 2;
  // Penanda apakah semua project sedang ditampilkan
  showAll = false;

  // --- LIFECYCLE HOOK ---
  // Fungsi ini dijalankan sekali saat komponen pertama kali dimuat
  ngOnInit(): void {
    // Inisialisasi tampilan awal dengan jumlah project terbatas
    this.updateDisplayedProjects();
  }

  // --- METHODS ---
  // Fungsi internal untuk mengupdate array 'displayedProjects' berdasarkan status 'showAll'
  private updateDisplayedProjects(): void {
    if (this.showAll) {
      // Jika 'showAll' true, tampilkan semua project
      this.displayedProjects = this.allProjects;
    } else {
      // Jika 'showAll' false, tampilkan hanya sejumlah 'displayLimit' project
      // slice(0, limit) mengambil elemen dari indeks 0 sampai sebelum indeks limit
      this.displayedProjects = this.allProjects.slice(0, this.displayLimit);
    }
  }

  // Method yang dipanggil oleh tombol 'Show All' di template HTML
  loadAllProjects(): void {
    this.showAll = true; // Ubah status menjadi tampilkan semua
    this.updateDisplayedProjects(); // Perbarui daftar yang ditampilkan
  }

  // --- GETTER ---
  // Helper getter untuk memudahkan pengecekan di template HTML (*ngIf)
  // Mengembalikan true jika jumlah total project > batas tampilan DAN belum semua ditampilkan
  get shouldShowLoadMoreButton(): boolean {
    return this.allProjects.length > this.displayLimit && !this.showAll;
  }
}
