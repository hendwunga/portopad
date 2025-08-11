import { Component, OnInit } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faGithub, faChrome } from '@fortawesome/free-brands-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons'; // Pastikan faTimes diimpor jika digunakan di modal

import { ModalService } from '../../services/shared/modal.service';
import {
  LanguageService,
  Language,
} from '../../services/shared/language.service';
import { Observable, map } from 'rxjs';

// --- DEFINE TIPE KATEGORI BARU ---
type ProjectCategory =
  | 'all'
  | 'backend'
  | 'frontend'
  | 'algorithms'
  | 'networking'
  | 'simulasi'
  | 'desktop'
  | 'design';

// --- UPDATE INTERFACE PROJECT ---
interface Project {
  id: number;
  title: { en: string; id: string };
  description: { en: string; id: string };
  thumbnail: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  category: Exclude<ProjectCategory, 'all'>;
  images: string[];
  featured: boolean;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, NgOptimizedImage],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit {
  faGithub = faGithub;
  faChrome = faChrome;
  faTimes = faTimes; // Pastikan ini diimpor jika relevan untuk modal

  filters$: Observable<{ value: ProjectCategory; label: string }[]>;

  activeFilter: ProjectCategory = 'all';

  // --- Properti "Show More" (BARU) ---
  initialProjectsToShow: number = 6; // Jumlah proyek awal yang ditampilkan
  projectsToLoadPerClick: number = 3; // Berapa banyak proyek dimuat setiap kali klik "Show More"
  currentDisplayProjectCount: number = 0; // Jumlah proyek yang sedang ditampilkan
  canShowMoreProjects: boolean = false; // Untuk mengontrol visibilitas tombol "Show More"
  // ---------------------------------

  // filteredProjects sekarang akan berisi hasil filter kategori,
  // tetapi yang ditampilkan di UI akan melalui displayedProjects
  filteredProjectsByCategory: Project[] = []; // BARU: Hasil filter kategori
  displayedProjects: Project[] = []; // BARU: Proyek yang benar-benar ditampilkan di grid

  // selectedProject dan currentImageIndex kemungkinan hanya digunakan di modal,
  // jika modal adalah komponen terpisah, Anda bisa menghapusnya dari sini
  selectedProject: Project | null = null;
  currentImageIndex = 0;

  projects: Project[] = [
    // Data proyek Anda seperti sebelumnya, pastikan semua title/description adalah objek {en, id}
    {
      id: 1,
      title: {
        en: 'E-commerce Backend API',
        id: 'API Backend E-commerce',
      },
      description: {
        en: 'Designed and implemented relational database schema (users, products, orders). Developed secure and RESTful APIs using Spring Boot and Spring Data JPA. Integrated Okta OAuth 2.0 for authentication and authorization. Implemented Stripe payment gateway for secure order transactions. Documented APIs with Swagger/OpenAPI for easy consumption. Containerized the backend with Docker for consistent deployment. Managed CI/CD pipeline with GitHub Actions for automated builds. Adopted GitHub Flow for collaborative version control.',
        id: 'Merancang dan mengimplementasikan skema database relasional (pengguna, produk, pesanan). Mengembangkan API RESTful yang aman menggunakan Spring Boot dan Spring Data JPA. Mengintegrasikan Okta OAuth 2.0 untuk autentikasi dan otorisasi. Mengimplementasikan gateway pembayaran Stripe untuk transaksi pesanan yang aman. Mendokumentasikan API dengan Swagger/OpenAPI untuk konsumsi yang mudah. Mengemas backend dengan Docker untuk deployment yang konsisten. Mengelola pipeline CI/CD dengan GitHub Actions untuk build otomatis. Mengadopsi GitHub Flow untuk kontrol versi kolaboratif.',
      },
      thumbnail: 'assets/projects/sw1.png',
      technologies: [
        'Spring Boot',
        'Spring Data JPA',
        'OAuth 2.0',
        'Stripe',
        'Swagger/OpenAPI',
        'Docker',
        'GitHub Actions',
      ],
      githubUrl:
        'https://github.com/hendrowunga/spring-boot-ecommerce-backend.git',
      category: 'backend',
      images: [
        'assets/projects/sw1.png',
        'assets/projects/sw2.png',
        'assets/projects/sw3.png',
        'assets/projects/sw41.png',
        'assets/projects/sw42.png',
      ],
      featured: false,
    },
    {
      id: 2,
      title: {
        en: 'E-commerce Frontend',
        id: 'Frontend E-commerce',
      },
      description: {
        en: 'Built responsive and dynamic UI using Angular and Angular Material. Integrated Okta OAuth 2.0 for user authentication flow. Integrated Stripe Checkout for secure and seamless payments. Consumed backend REST APIs to manage products, cart, and orders. Implemented state management and routing with Angular services and Router. Optimized frontend performance with lazy loading and modular structure. Adopted GitHub Flow for collaborative version control.',
        id: 'Membangun UI yang responsif dan dinamis menggunakan Angular dan Angular Material. Mengintegrasikan Okta OAuth 2.0 untuk alur autentikasi pengguna. Mengintegrasikan Stripe Checkout untuk pembayaran yang aman dan lancar. Mengonsumsi API REST backend untuk mengelola produk, keranjang, dan pesanan. Mengimplementasikan manajemen status dan routing dengan Angular services dan Router. Mengoptimalkan kinerja frontend dengan lazy loading dan struktur modular. Mengadopsi GitHub Flow untuk kontrol versi kolaboratif.',
      },
      thumbnail: 'assets/projects/f1.png',
      technologies: [
        'Angular',
        'Angular Material',
        'OAuth 2.0',
        'Stripe Checkout',
        'REST API',
        'Angular Router',
        'Lazy Loading',
      ],
      githubUrl:
        'https://github.com/hendrowunga/spring-boot-ecommerce-frontend.git',
      category: 'frontend',
      images: [
        'assets/projects/f2.png',
        'assets/projects/f3.png',
        'assets/projects/f4.png',
        'assets/projects/f5.png',
        'assets/projects/f6.png',
        'assets/projects/f7.png',
      ],
      featured: false,
    },
    {
      id: 3,
      title: {
        en: 'REST API Backend for DifabelZone Batik e-Commerce (Yogyakarta)',
        id: 'API Backend REST untuk E-commerce Batik DifabelZone (Yogyakarta)',
      },
      description: {
        en: 'Designed relational database schema covering catalog, cart, user, and payment entities. Developed RESTful APIs using Spring Boot to support frontend integration and business logic. Containerized the application with Docker to ensure environment consistency and scalability. Implemented API documentation and testing using Swagger and Postman. Adopted GitHub Flow for version control and collaborative development. Contributed to an inclusive e-commerce system empowering local disabled artisans.',
        id: 'Merancang skema database relasional yang mencakup entitas katalog, keranjang, pengguna, dan pembayaran. Mengembangkan API RESTful menggunakan Spring Boot untuk mendukung integrasi frontend dan logika bisnis. Mengemas aplikasi dengan Docker untuk memastikan konsistensi lingkungan dan skalabilitas. Mengimplementasikan dokumentasi dan pengujian API menggunakan Swagger dan Postman. Mengadopsi GitHub Flow untuk kontrol versi dan pengembangan kolaboratif. Berkontribusi pada sistem e-commerce inklusif yang memberdayakan perajin difabel lokal.',
      },
      thumbnail: 'assets/projects/dz1.png',
      technologies: [
        'Spring Boot',
        'REST API',
        'Docker',
        'Swagger',
        'Postman',
        'GitHub Flow',
      ],
      githubUrl: 'https://github.com/hendrowunga/batik-difabelzone.git',
      category: 'backend',
      images: [
        'assets/projects/dz1.png',
        'assets/projects/dz2.png',
        'assets/projects/dz3.png',
      ],
      featured: false,
    },
    {
      id: 4,
      title: {
        en: 'Monolithic e-Commerce Platform for Batik DifabelZone',
        id: 'Platform E-commerce Monolitik untuk Batik DifabelZone',
      },
      description: {
        en: 'Engineered a Laravel-based e-Commerce platform to support disabled artisans in Bantul, Indonesia. Designed system architecture, ERD, and relational database schema to support modular growth. Implemented backend logic for product catalog, user sessions, cart management, and payment workflow. Developed an admin panel for order processing and inventory tracking with role-based access control. Aligned software engineering with the mission of digital inclusion and social impact.',
        id: 'Merancang platform e-Commerce berbasis Laravel untuk mendukung perajin difabel di Bantul, Indonesia. Mendesain arsitektur sistem, ERD, dan skema database relasional untuk mendukung pertumbuhan modular. Mengimplementasikan logika backend untuk katalog produk, sesi pengguna, manajemen keranjang, dan alur pembayaran. Mengembangkan panel admin untuk pemrosesan pesanan dan pelacakan inventaris dengan kontrol akses berbasis peran. Menyelaraskan rekayasa perangkat lunak dengan misi inklusi digital dan dampak sosial.',
      },
      thumbnail: 'assets/projects/DifabelZone.png',
      technologies: [
        'Laravel',
        'PHP',
        'MySQL',
        'MVC',
        'Role-Based Access Control',
        'Admin Panel',
      ],
      githubUrl: 'https://github.com/hendrowunga/batik-difabelzone.git',
      category: 'backend',
      images: [
        'assets/projects/DifabelZone.png',
        'assets/projects/DifabelZone.png',
      ],
      featured: false,
    },
    {
      id: 5,
      title: {
        en: 'Opportunistic Network Environment Simulation',
        id: 'Simulasi Lingkungan Jaringan Oportunistik',
      },
      description: {
        en: 'Developed and customized Delay Tolerant Network (DTN) routing protocols such as Epidemic, Spray and Wait, Prophet, and PeopleRank. Implemented advanced Decision Engines within ONE Simulator using Java. Integrated real-world datasets (e.g., Haggle3, Reality) and mobility models. Refactored simulator components for modularity and extensibility. Automated batch simulation runs and organized output reports.',
        id: 'Mengembangkan dan menyesuaikan protokol routing Delay Tolerant Network (DTN) seperti Epidemic, Spray and Wait, Prophet, dan PeopleRank. Mengimplementasikan Mesin Keputusan (Decision Engine) canggih dalam ONE Simulator menggunakan Java. Mengintegrasikan dataset dunia nyata (misalnya, Haggle3, Reality) dan model mobilitas. Melakukan refaktorisasi komponen simulator untuk modularitas dan ekstensibilitas. Mengotomatiskan eksekusi simulasi batch dan mengatur laporan output.',
      },
      thumbnail: 'assets/projects/theOne.png',
      technologies: [
        'Java',
        'ONE Simulator',
        'DTN Routing Protocols',
        'Real-world Datasets (Haggle3, Reality)',
        'Custom Decision Engine',
        'Simulation Automation',
      ],
      githubUrl: 'https://github.com/hendrowunga/the-one-pitt.git',
      category: 'simulasi',
      images: ['assets/projects/theOne.png', 'assets/projects/theOne.png'],
      featured: true,
    },
    {
      id: 6,
      title: {
        en: 'Java-Naive-Bayes-Classifier',
        id: 'Pengklasifikasi Naive Bayes Berbasis Java',
      },
      description: {
        en: 'Developed a Java-based Naive Bayes classification program to predict computer purchase decisions using features such as age, income level, student status, and credit rating. Processed a dataset consisting of 14 records and calculated both prior and conditional probabilities using Laplace smoothing. Implemented probability computations to evaluate two possible outcome classes: "buys_computer=yes" and "buys_computer=no". Compared computed probabilities to determine the final prediction with the highest likelihood. Wrote clean, modular Java code with clear documentation to facilitate future enhancements and experiments. Ensured logical flow and accuracy of probability calculations to support learning-based decision making. Designed the implementation to serve as an educational example of basic machine learning with Naive Bayes in Java. Handled discrete categorical features and ensured proper feature handling for general use-case classification.',
        id: 'Mengembangkan program klasifikasi Naive Bayes berbasis Java untuk memprediksi keputusan pembelian komputer menggunakan fitur seperti usia, tingkat pendapatan, status pelajar, dan peringkat kredit. Memproses dataset yang terdiri dari 14 catatan dan menghitung probabilitas prior dan kondisional menggunakan penghalusan Laplace. Mengimplementasikan perhitungan probabilitas untuk mengevaluasi dua kelas hasil yang mungkin: "buys_computer=yes" dan "buys_computer=no". Membandingkan probabilitas yang dihitung untuk menentukan prediksi akhir dengan kemungkinan tertinggi. Menulis kode Java yang bersih, modular dengan dokumentasi yang jelas untuk memfasilitasi peningkatan dan eksperimen di masa mendatang. Memastikan alur logis dan akurasi perhitungan probabilitas untuk mendukung pengambilan keputusan berbasis pembelajaran. Merancang implementasi untuk berfungsi sebagai contoh edukasi dasar pembelajaran mesin dengan Naive Bayes di Java. Menangani fitur kategorikal diskrit dan memastikan penanganan fitur yang tepat untuk klasifikasi kasus penggunaan umum.',
      },
      thumbnail: 'assets/projects/NaviBayes.png',
      technologies: [
        'Java',
        'Naive Bayes',
        'Laplace Smoothing',
        'CLI',
        'Machine Learning (Basic)',
      ],
      githubUrl:
        'https://github.com/hendrowunga/Java-Naive-Bayes-Classifier.git',
      category: 'algorithms',
      images: [
        'assets/projects/NaviBayes.png',
        'assets/projects/NaviBayes.png',
      ],
      featured: false,
    },
    {
      id: 7,
      title: {
        en: 'JavaProbabilityStats',
        id: 'Statistik Probabilitas Java',
      },
      description: {
        en: 'Developed a Java program to calculate the Expected Value (E(X)) and Variance (σ²) for a given discrete random variable distribution. Processes input probability tables (X and P(X)) to compute E(X) = ∑[x * P(x)]. Computes Variance σ² = ∑[(x - E(X))² * P(x)] using the calculated expected value. Outputs intermediate calculation steps, such as x*P(x) and (x - E(X))² * P(x), in a clear tabular format for verification, as shown in the example. Includes functionality to determine and display the probability distribution of a Binomial random variable X (number of heads) resulting from K coin flips. Generates the probability P(X=k) for each possible outcome k (from 0 to K) in the coin flip scenario. Designed with a focus on clear output that mirrors the step-by-step presentation often used in statistical problem-solving.',
        id: 'Mengembangkan program Java untuk menghitung Nilai Harapan (E(X)) dan Variansi (σ²) untuk distribusi variabel acak diskrit yang diberikan. Memproses tabel probabilitas masukan (X dan P(X)) untuk menghitung E(X) = ∑[x * P(x)]. Menghitung Variansi σ² = ∑[(x - E(X))² * P(x)] menggunakan nilai harapan yang dihitung. Mengeluarkan langkah-langkah perhitungan menengah, seperti x*P(x) dan (x - E(X))² * P(x), dalam format tabel yang jelas untuk verifikasi, seperti yang ditunjukkan dalam contoh. Termasuk fungsionalitas untuk menentukan dan menampilkan distribusi probabilitas variabel acak Binomial X (jumlah kepala) yang dihasilkan dari K lemparan koin. Menghasilkan probabilitas P(X=k) untuk setiap hasil yang mungkin k (dari 0 hingga K) dalam skenario lemparan koin. Dirancang dengan fokus pada output yang jelas yang mencerminkan presentasi langkah-demi-langkah yang sering digunakan dalam pemecahan masalah statistik.',
      },
      thumbnail: 'assets/projects/javaProbability.png',
      technologies: [
        'Java',
        'Discrete Probability',
        'Statistics',
        'Binomial Distribution',
        'CLI',
      ],
      githubUrl: 'https://github.com/hendrowunga/JavaProbabilityStats',
      category: 'algorithms',
      images: [
        'assets/projects/javaProbability.png',
        'assets/projects/javaProbability.png',
      ],
      featured: false,
    },
    {
      id: 8,
      title: {
        en: 'SpringBoot-security',
        id: 'Keamanan SpringBoot',
      },
      description: {
        en: 'Developed a secure Sign Up and Log In system using the Spring Boot framework. Implemented robust security features utilizing Spring Security. Integrated JSON Web Tokens (JWT) for stateless authentication and authorization. Incorporated an email verification process to ensure validated user registrations. Focused on creating a secure backend service for user authentication management.',
        id: 'Mengembangkan sistem Pendaftaran dan Login yang aman menggunakan framework Spring Boot. Mengimplementasikan fitur keamanan yang kuat menggunakan Spring Security. Mengintegrasikan JSON Web Tokens (JWT) untuk autentikasi dan otorisasi tanpa status. Menggabungkan proses verifikasi email untuk memastikan registrasi pengguna yang divalidasi. Berfokus pada pembuatan layanan backend yang aman untuk manajemen autentikasi pengguna.',
      },
      thumbnail: 'assets/projects/springSecurity.png',
      technologies: [
        'Spring Boot',
        'Spring Security',
        'JWT',
        'Email Verification',
        'REST API',
        'Maven',
      ],
      githubUrl: 'https://github.com/hendrowunga/SpringBoot-security',
      category: 'backend',
      images: [
        'assets/projects/springSecurity.png',
        'assets/projects/springSecurity.png',
      ],
      featured: false,
    },
    {
      id: 9,
      title: {
        en: 'SpringBoot-refreshtoken',
        id: 'Token Refresh SpringBoot',
      },
      description: {
        en: 'Developed a secure authentication system using Spring Boot and JSON Web Tokens (JWT). Implemented functionality for generating JWT access tokens upon successful authentication. Integrated a refresh token mechanism to allow for seamless and secure user session renewal. Focused on efficient user session management by enabling the acquisition of new access tokens using refresh tokens. Provided a practical implementation of JWT access and refresh token patterns in a Spring Boot environment.',
        id: 'Mengembangkan sistem autentikasi yang aman menggunakan Spring Boot dan JSON Web Tokens (JWT). Mengimplementasikan fungsionalitas untuk menghasilkan token akses JWT setelah autentikasi berhasil. Mengintegrasikan mekanisme token refresh untuk memungkinkan pembaruan sesi pengguna yang mulus dan aman. Berfokus pada manajemen sesi pengguna yang efisien dengan memungkinkan perolehan token akses baru menggunakan token refresh. Menyediakan implementasi praktis pola token akses dan refresh JWT dalam lingkungan Spring Boot.',
      },
      thumbnail: 'assets/projects/rt1.png',
      technologies: [
        'Spring Boot',
        'JWT',
        'Access Token',
        'Refresh Token',
        'Authentication System',
        'Maven',
        'PostgreSQL',
      ],
      githubUrl: 'https://github.com/hendrowunga/SpringBoot-refreshtoken',
      category: 'backend',
      images: [
        'assets/projects/rt1.png',
        'assets/projects/rt2.png',
        'assets/projects/rt3.png',
        'assets/projects/rt4.png',
        'assets/projects/rt5.png',
      ],
      featured: false,
    },
    {
      id: 10,
      title: {
        en: 'Calculator_Application',
        id: 'Aplikasi Kalkulator',
      },
      description: {
        en: 'Developed a simple calculator application using Java Swing with a modern interface. Implemented basic arithmetic functionalities: addition, subtraction, multiplication, and division. Included additional features such as square root and squaring (power of two). Designed the graphical user interface (GUI) for a fast and efficient user experience. Utilized Java Swing components to build the interactive calculator interface.',
        id: 'Mengembangkan aplikasi kalkulator sederhana menggunakan Java Swing dengan antarmuka modern. Mengimplementasikan fungsionalitas aritmatika dasar: penjumlahan, pengurangan, perkalian, dan pembagian. Menyertakan fitur tambahan seperti akar kuadrat dan kuadrat (pangkat dua). Merancang antarmuka pengguna grafis (GUI) untuk pengalaman pengguna yang cepat dan efisien. Memanfaatkan komponen Java Swing untuk membangun antarmuka kalkulator interaktif.',
      },
      thumbnail: 'assets/projects/calculator.png',
      technologies: ['Java', 'Java Swing', 'GUI', 'Basic Arithmetic'],
      githubUrl: 'https://github.com/hendrowunga/Calculator_Application',
      category: 'desktop',
      images: [
        'assets/projects/calculator.png',
        'assets/projects/calculator.png',
      ],
      featured: false,
    },
    {
      id: 11,
      title: {
        en: 'Java Hidden Markov Models (HMM) Implementation',
        id: 'Implementasi Model Markov Tersembunyi (HMM) Java',
      },
      description: {
        en: 'A basic Java implementation of Hidden Markov Models (HMM). Supports model and data reading, Viterbi and Forward-Backward algorithms, and prediction estimation.',
        id: 'Implementasi dasar Hidden Markov Models (HMM) dalam Java. Mendukung pembacaan model dan data, algoritma Viterbi dan Forward-Backward, serta estimasi prediksi.',
      },
      thumbnail: 'assets/projects/hmm1.jpg',
      technologies: [
        'Java',
        'Hidden Markov Models (HMM)',
        'Viterbi Algorithm',
        'Forward-Backward Algorithm',
        'Probability',
      ],
      githubUrl: 'https://github.com/hendrowunga/java-hmm.git',
      category: 'algorithms',
      images: [
        'assets/projects/hmm1.jpg',
        'assets/projects/hmm2.png',
        'assets/projects/hmm3.png',
      ],
      featured: false,
    },
    {
      id: 12,
      title: {
        en: 'Spring Boot Microservices Architecture Demonstration',
        id: 'Demonstrasi Arsitektur Mikroservis Spring Boot',
      },
      description: {
        en: 'A demonstration project implementing a microservices architecture using Spring Boot. This project showcases essential microservices components, including an API Gateway for unified access, a Discovery Server (Eureka) for dynamic service registration and discovery, and a Config Server for centralized configuration management. It features example microservices (such as Student and School services as depicted) interacting with dedicated, containerized databases (via Docker). The architecture also integrates Zipkin for distributed tracing and observability, providing practical insight into microservice structure and implementation.',
        id: 'Sebuah proyek demonstrasi yang mengimplementasikan arsitektur mikroservis menggunakan Spring Boot. Proyek ini menampilkan komponen mikroservis esensial, termasuk API Gateway untuk akses terpadu, Discovery Server (Eureka) untuk registrasi dan penemuan layanan dinamis, dan Config Server untuk manajemen konfigurasi terpusat. Ini menampilkan contoh mikroservis (seperti layanan Siswa dan Sekolah seperti yang digambarkan) berinteraksi dengan database khusus yang dikontainerisasi (melalui Docker). Arsitektur ini juga mengintegrasikan Zipkin untuk pelacakan terdistribusi dan observabilitas, memberikan wawasan praktis tentang struktur dan implementasi mikroservis.',
      },
      thumbnail: 'assets/projects/ms1.png',
      technologies: [
        'Spring Boot',
        'Microservices Architecture',
        'API Gateway',
        'Eureka (Discovery)',
        'Config Server',
        'REST API',
        'Docker',
        'Zipkin',
        'Maven',
        'PostgreSQL',
      ],
      githubUrl: 'https://github.com/hendrowunga/SpringBoot-microservice.git',
      category: 'backend',
      images: ['assets/projects/ms1.png', 'assets/projects/ms1.png'],
      featured: false,
    },
    {
      id: 13,
      title: {
        en: 'E-commerce Backend API (Spring Security, JPA, JWT)',
        id: 'API Backend E-commerce (Spring Security, JPA, JWT)',
      },
      description: {
        en: 'A comprehensive backend API for an e-commerce platform, developed using the Spring Boot framework. It provides core functionalities for managing users, products, and orders, built with a focus on security and data persistence.Key Features:- User management (Registration, Login, and verification)- Product management (APIs for adding, removing, and updating products)- Order management (APIs for viewing and managing user orders)Utilizes Spring Security and JWT for robust authentication and authorization, Spring Data JPA for efficient database interactions (using Hibernate), and includes comprehensive testing coverage with JUnit 5 and MockMvc.',
        id: 'API backend komprehensif untuk platform e-commerce, dikembangkan menggunakan framework Spring Boot. Ini menyediakan fungsionalitas inti untuk mengelola pengguna, produk, dan pesanan, dibangun dengan fokus pada keamanan dan persistensi data.Fitur Utama:- Manajemen pengguna (Registrasi, Login, dan verifikasi)- Manajemen produk (API untuk menambah, menghapus, dan memperbarui produk)- Manajemen pesanan (API untuk melihat dan mengelola pesanan pengguna)Memanfaatkan Spring Security dan JWT untuk autentikasi dan otorisasi yang kuat, Spring Data JPA untuk interaksi database yang efisien (menggunakan Hibernate), dan mencakup cakupan pengujian komprehensif dengan JUnit 5 dan MockMvc.',
      },
      thumbnail: 'assets/projects/mos1.png',
      technologies: [
        'Spring Boot',
        'Spring Security',
        'Spring Data JPA',
        'JWT',
        'JUnit 5',
        'MockMvc',
        'MySQL',
        'Gradle',
      ],
      githubUrl: 'https://github.com/hendrowunga/SpringBoot-monolithic.git',
      category: 'backend',
      images: [
        'assets/projects/mos1.png',
        'assets/projects/mos2.png',
        'assets/projects/mos3.png',
        'assets/projects/mos4.png',
      ],
      featured: false,
    },
    {
      id: 14,
      title: {
        en: 'Ant Colony Optimization for Traveling Salesman Problem (TSP)',
        id: 'Optimasi Koloni Semut untuk Masalah Penjual Keliling (TSP)',
      },
      description: {
        en: 'Implemented the metaheuristic Ant Colony Optimization (ACO) algorithm to find efficient solutions for the Traveling Salesman Problem (TSP). This project simulates how a colony of ants collectively finds the shortest path, demonstrating the application of nature-inspired algorithms to NP-hard optimization problems.',
        id: 'Mengimplementasikan algoritma metaheuristik Ant Colony Optimization (ACO) untuk menemukan solusi efisien untuk Traveling Salesman Problem (TSP). Proyek ini mensimulasikan bagaimana koloni semut secara kolektif menemukan jalur terpendek, menunjukkan penerapan algoritma yang terinspirasi dari alam untuk masalah optimasi NP-hard.',
      },
      thumbnail: 'assets/projects/tsp1.png',
      technologies: [
        'Python',
        'Ant Colony Optimization',
        'Heuristics',
        'Graph Theory',
        'Optimization',
      ],
      githubUrl:
        'https://github.com/hendrowunga/ML-Learning-Path/tree/main/src/classical_algorithms/Tsp-ACO',
      category: 'algorithms',
      images: ['assets/projects/tsp1.png'],
      featured: true,
    },
    {
      id: 15,
      title: {
        en: 'Hill Climbing Algorithm for Local Search Optimization',
        id: 'Algoritma Hill Climbing untuk Optimasi Pencarian Lokal',
      },
      description: {
        en: 'Implementation of the Hill Climbing local search algorithm. This algorithm iteratively moves towards a better solution by making small changes to the current solution. This project serves as a basic demonstration of a simple yet effective heuristic optimization algorithm.',
        id: 'Implementasi algoritma pencarian lokal Hill Climbing. Algoritma ini secara iteratif bergerak menuju solusi yang lebih baik dengan membuat perubahan kecil pada solusi saat ini. Proyek ini berfungsi sebagai demonstrasi dasar dari algoritma optimasi heuristik yang sederhana namun efektif.',
      },
      thumbnail: 'assets/projects/hc1.png',
      technologies: [
        'Java',
        'Hill Climbing',
        'Local Search',
        'Heuristics',
        'Optimization',
      ],
      githubUrl:
        'https://github.com/hendrowunga/ML-Learning-Path/tree/main/src/classical_algorithms/Hill_Climbing',
      category: 'algorithms',
      images: ['assets/projects/hc1.png'],
      featured: false,
    },
    {
      id: 16,
      title: {
        en: 'Job Shop Scheduling using Particle Swarm Optimization (PSO)',
        id: 'Penjadwalan Job Shop menggunakan Particle Swarm Optimization (PSO)',
      },
      description: {
        en: 'Implementation of the Job Shop Scheduling Problem (JSSP) solved using the Particle Swarm Optimization (PSO) metaheuristic. This project demonstrates how population-based optimization techniques can be used to explore complex solution spaces and find near-optimal schedules.',
        id: 'Penerapan Job Shop Scheduling Problem (JSSP) yang diselesaikan menggunakan metaheuristik Particle Swarm Optimization (PSO). Proyek ini menunjukkan bagaimana teknik optimasi populasi dapat digunakan untuk menjelajahi ruang solusi yang kompleks dan menemukan jadwal yang mendekati optimal.',
      },
      thumbnail: 'assets/projects/jssp1.png',
      technologies: [
        'Python',
        'Particle Swarm Optimization',
        'Job Shop Scheduling',
        'Metaheuristics',
      ],
      githubUrl:
        'https://github.com/hendrowunga/ML-Learning-Path/tree/main/src/classical_algorithms/job_shop_scheduling',
      category: 'algorithms',
      images: [
        'assets/projects/jssp1.png',
        'assets/projects/jssp3.png',
        'assets/projects/jssp2.png',
        'assets/projects/jssp4.png',
      ],
      featured: true,
    },
    {
      id: 17,
      title: {
        en: 'Book Social Network API',
        id: 'API Jaringan Sosial Buku',
      },
      description: {
        en: 'A comprehensive backend API for a book-centric social networking platform, built with Spring Boot. This project enables users to register, manage their book collections, and interact by sharing and borrowing books from each other.\n\nKey features include:- Secure Authentication: JWT-based security (Access & Refresh Tokens) with email account activation.- Full RESTful API: Complete CRUD operations for books with response pagination.- Social Interaction Logic: A full lifecycle for borrowing, returning, and approving book transactions.- Containerized Environment: The entire development setup (PostgreSQL, MailDev) is managed with Docker Compose for consistency and ease of setup.',
        id: 'API backend komprehensif untuk platform jaringan sosial berbasis buku, dibangun dengan Spring Boot. Proyek ini memungkinkan pengguna untuk mendaftar, mengelola koleksi buku mereka, dan berinteraksi dengan berbagi dan meminjam buku dari satu sama lain.\n\nFitur utama meliputi:- Autentikasi Aman: Keamanan berbasis JWT (Token Akses & Refresh) dengan aktivasi akun email.- API RESTful Penuh: Operasi CRUD lengkap untuk buku dengan paginasi respons.- Logika Interaksi Sosial: Siklus hidup penuh untuk transaksi peminjaman, pengembalian, dan persetujuan buku.- Lingkungan Terkontainerisasi: Seluruh pengaturan pengembangan (PostgreSQL, MailDev) dikelola dengan Docker Compose untuk konsistensi dan kemudahan setup.',
      },
      thumbnail: 'assets/projects/sb3.png',
      technologies: [
        'Spring Boot',
        'Spring Security',
        'JWT',
        'PostgreSQL',
        'Spring Data JPA',
        'Docker',
        'Docker Compose',
        'REST API',
      ],
      githubUrl:
        'https://github.com/hendrowunga/SpringBoot-Book-Social-Networking.git',
      category: 'backend',
      images: [
        'assets/projects/sb3.png',
        'assets/projects/sb1.png',
        'assets/projects/sb0.png',
        'assets/projects/sb2.png',
      ],
      featured: true,
    },
    {
      id: 18,
      title: {
        en: 'Comparative Analysis of Monte Carlo Efficiency in Computational Finance',
        id: 'Analisis Komparatif Efisiensi Monte Carlo dalam Keuangan Komputasi',
      },
      description: {
        en: 'A comprehensive research project based on the paper "Monte Carlo scalable algorithms for Computational Finance". This work began by replicating the paper\'s scalable parallel algorithms, followed by a critical analysis that identified key limitations in its financial methodology. To address these, the project was extended with three major enhancements:\n\n1. **Variance Reduction Techniques:** Implemented Antithetic Variates to demonstrate a significant reduction in statistical error, a standard industry practice omitted from the original paper.\n2. **Advanced Financial Modeling:** Applied the algorithms to price Asian Options, a path-dependent derivative with no analytical solution, showcasing a more relevant and challenging use case.\n3. **Quasi-Monte Carlo (QMC) Comparison:** Developed a pricer using Sobol sequences and performed a comparative analysis of convergence rates, proving the superior efficiency of QMC for this problem class.',
        id: 'Sebuah proyek penelitian komprehensif berdasarkan makalah "Algoritma skalabel Monte Carlo untuk Keuangan Komputasi". Pekerjaan ini dimulai dengan mereplikasi algoritma paralel skalabel dari makalah tersebut, diikuti dengan analisis kritis yang mengidentifikasi batasan-batasan utama dalam metodologi keuangannya. Untuk mengatasi hal ini, proyek diperluas dengan tiga peningkatan besar:\n\n1. **Teknik Pengurangan Variansi:** Mengimplementasikan Variates Antithetic untuk menunjukkan pengurangan signifikan dalam kesalahan statistik, praktik standar industri yang dihilangkan dari makalah asli.\n2. **Pemodelan Keuangan Tingkat Lanjut:** Menerapkan algoritma untuk menilai Opsi Asia, derivatif yang bergantung pada jalur tanpa solusi analitis, menunjukkan kasus penggunaan yang lebih relevan dan menantang.\n3. **Perbandingan Quasi-Monte Carlo (QMC):** Mengembangkan penilai menggunakan urutan Sobol dan melakukan analisis komparatif tingkat konvergensi, membuktikan efisiensi QMC yang lebih unggul untuk kelas masalah ini.',
      },
      thumbnail: 'assets/projects/convergence_mc_vs_qmc.png',
      technologies: [
        'Python',
        'NumPy',
        'SciPy',
        'Matplotlib',
        'Pandas',
        'Multiprocessing',
        'Monte Carlo Simulation',
        'Quasi-Monte Carlo (Sobol)',
        'Variance Reduction',
        'Computational Finance',
      ],
      githubUrl:
        'https://github.com/hendrowunga/montecarlo-scalable-finance.git',
      liveUrl:
        'https://www.sciencedirect.com/science/article/pii/S1877050911002432',
      category: 'simulasi',
      images: [
        'assets/projects/convergence_mc_vs_qmc.png',
        'assets/projects/variance_reduction_comparison.png',
      ],
      featured: true,
    },
    // Tambahkan lebih banyak proyek placeholder jika Anda ingin menguji "Show More"
    // {
    //   id: 19,
    //   title: { en: 'Placeholder Project 19', id: 'Proyek Contoh 19' },
    //   description: {
    //     en: 'This is a placeholder description.',
    //     id: 'Ini adalah deskripsi placeholder.',
    //   },
    //   thumbnail: 'assets/projects/sw1.png',
    //   technologies: ['HTML', 'CSS'],
    //   category: 'frontend',
    //   images: ['assets/projects/sw1.png'],
    //   featured: false,
    // },
    // {
    //   id: 20,
    //   title: { en: 'Placeholder Project 20', id: 'Proyek Contoh 20' },
    //   description: {
    //     en: 'This is another placeholder description.',
    //     id: 'Ini adalah deskripsi placeholder lainnya.',
    //   },
    //   thumbnail: 'assets/projects/dz1.png',
    //   technologies: ['Node.js', 'Express'],
    //   category: 'backend',
    //   images: ['assets/projects/dz1.png'],
    //   featured: false,
    // },
    // {
    //   id: 21,
    //   title: { en: 'Placeholder Project 21', id: 'Proyek Contoh 21' },
    //   description: {
    //     en: 'This is a third placeholder description.',
    //     id: 'Ini adalah deskripsi placeholder ketiga.',
    //   },
    //   thumbnail: 'assets/projects/NaviBayes.png',
    //   technologies: ['Java', 'Algorithms'],
    //   category: 'algorithms',
    //   images: ['assets/projects/NaviBayes.png'],
    //   featured: false,
    // },
  ];

  constructor(
    private readonly modalService: ModalService,
    public languageService: LanguageService
  ) {
    this.filters$ = this.languageService.currentLang$.pipe(
      map((lang) => [
        {
          value: 'all',
          label: this.languageService.getTranslationSync('projectFilterAll'),
        },
        {
          value: 'backend',
          label: this.languageService.getTranslationSync(
            'projectFilterBackend'
          ),
        },
        {
          value: 'algorithms',
          label: this.languageService.getTranslationSync(
            'projectFilterAlgorithms'
          ),
        },
        {
          value: 'simulasi',
          label: this.languageService.getTranslationSync(
            'projectFilterSimulation'
          ),
        },
        {
          value: 'networking',
          label: this.languageService.getTranslationSync(
            'projectFilterNetworking'
          ),
        },
        {
          value: 'desktop',
          label: this.languageService.getTranslationSync(
            'projectFilterDesktop'
          ),
        },
        {
          value: 'frontend',
          label: this.languageService.getTranslationSync(
            'projectFilterFrontend'
          ),
        },
      ])
    );
  }

  ngOnInit(): void {
    this.updateDisplayedProjects(); // Panggil metode baru saat inisialisasi
  }

  // --- Ganti nama dan modifikasi get filteredProjects(): Project[] ---
  // filteredProjects sekarang akan menjadi filteredProjectsByCategory
  // dan kita akan memiliki displayedProjects yang di-slice
  updateDisplayedProjects(): void {
    // 1. Terapkan Filter Kategori
    if (this.activeFilter === 'all') {
      this.filteredProjectsByCategory = this.projects;
    } else {
      this.filteredProjectsByCategory = this.projects.filter(
        (project) => project.category === this.activeFilter
      );
    }

    // 2. Atur jumlah proyek yang ditampilkan (untuk "Show More")
    this.currentDisplayProjectCount = this.initialProjectsToShow;
    this.applyShowMoreLogicProjects(); // Panggil logika "Show More"

    // Optional: Reset filter lain jika ada, atau pastikan modal ditutup
    // if (this.isModalOpen) { this.closeProjectModal(); } // Jika Anda memiliki modal internal di ProjectsComponent
  }

  setFilter(filter: ProjectCategory): void {
    this.activeFilter = filter;
    this.updateDisplayedProjects(); // Panggil yang sudah dimodifikasi
  }

  // Helper method untuk mendapatkan teks terjemahan berdasarkan bahasa aktif
  getTranslatedText(textObject: { en: string; id: string }): string {
    const currentLang = this.languageService.currentLangValue;
    return textObject[currentLang];
  }

  openProjectDetails(project: Project): void {
    this.modalService.openModal('project-details', {
      title: this.getTranslatedText(project.title),
      isLarge: true,
      projectDetails: project,
    });
  }

  // --- Metode untuk "Show More" Projects (BARU) ---
  loadMoreProjects(): void {
    this.currentDisplayProjectCount += this.projectsToLoadPerClick;
    this.applyShowMoreLogicProjects();
  }

  applyShowMoreLogicProjects(): void {
    this.displayedProjects = this.filteredProjectsByCategory.slice(
      0,
      this.currentDisplayProjectCount
    );
    this.canShowMoreProjects =
      this.currentDisplayProjectCount < this.filteredProjectsByCategory.length;
  }
  // ------------------------------------------------
}
