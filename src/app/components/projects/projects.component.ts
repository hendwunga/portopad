import { Component } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common'; // Pastikan NgOptimizedImage diimpor
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faGithub, faChrome } from '@fortawesome/free-brands-svg-icons';
import {
  faLink,
  faDatabase, // Tetap impor jika digunakan di tempat lain
  faServer, // Tetap impor jika digunakan di tempat lain
  faToolbox, // Tetap impor jika digunakan di tempat lain
  faCogs, // Tetap impor jika digunakan di tempat lain
  faVial, // Tetap impor jika digunakan di tempat lain
  faFileCode, // Tetap impor jika digunakan di tempat lain
  faCode, // Tetap impor jika digunakan di tempat lain
  faTimes,
} from '@fortawesome/free-solid-svg-icons';

import { ModalService } from '../../services/shared/modal.service'; // Pastikan path ini benar

// --- DEFINE TIPE KATEGORI BARU ---
// Union type untuk semua nilai kategori yang mungkin, termasuk 'all'
type ProjectCategory =
  | 'all'
  | 'backend'
  | 'frontend'
  | 'algorithms'
  | 'networking'
  | 'simulasi'
  | 'desktop'
  | 'design'; // Sertakan 'design' jika Anda berencana menggunakannya

// --- UPDATE INTERFACE PROJECT ---
interface Project {
  id: number;
  title: string;
  description: string;
  thumbnail: string; // Gunakan NgOptimizedImage untuk ini di template HTML
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  // Gunakan ProjectCategory (tanpa 'all' karena 'all' bukan kategori proyek)
  category: Exclude<ProjectCategory, 'all'>;
  images: string[]; // Gunakan NgOptimizedImage untuk gambar di modal
  featured: boolean;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  // Tambahkan NgOptimizedImage ke imports
  imports: [CommonModule, FontAwesomeModule, NgOptimizedImage],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent {
  faGithub = faGithub;
  faChrome = faChrome;
  faLink = faLink;
  faTimes = faTimes;

  // --- UPDATE DAFTAR FILTER DENGAN KATEGORI BARU ---
  filters: { value: ProjectCategory; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'backend', label: 'Backend' },
    { value: 'algorithms', label: 'Algorithms & Tools' },
    { value: 'simulasi', label: 'Simulation (ONE)' },
    { value: 'networking', label: 'Networking (GNS3)' },
    { value: 'desktop', label: 'Desktop' },
    { value: 'frontend', label: 'Frontend' },

    // { value: 'design', label: 'Design' }, // Komen/Hapus jika tidak ada proyek design
  ];

  // --- UPDATE TIPE activeFilter ---
  activeFilter: ProjectCategory = 'all';

  selectedProject: Project | null = null;
  currentImageIndex = 0;

  // --- UPDATE DATA PROYEK DENGAN KATEGORI BARU ---
  projects: Project[] = [
    {
      id: 1,
      title: 'E-commerce Backend API',
      description:
        'Designed and implemented relational database schema (users, products, orders). ' +
        'Developed secure and RESTful APIs using Spring Boot and Spring Data JPA. ' +
        'Integrated Okta OAuth 2.0 for authentication and authorization. ' +
        'Implemented Stripe payment gateway for secure order transactions. ' +
        'Documented APIs with Swagger/OpenAPI for easy consumption. ' +
        'Containerized the backend with Docker for consistent deployment. ' +
        'Managed CI/CD pipeline with GitHub Actions for automated builds. ' +
        'Adopted GitHub Flow for collaborative version control.',
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
      category: 'backend', // Kategori diperbarui dari 'web'
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
      title: 'E-commerce Frontend',
      description:
        'Built responsive and dynamic UI using Angular and Angular Material. ' +
        'Integrated Okta OAuth 2.0 for user authentication flow. ' +
        'Integrated Stripe Checkout for secure and seamless payments. ' +
        'Consumed backend REST APIs to manage products, cart, and orders. ' +
        'Implemented state management and routing with Angular services and Router. ' +
        'Optimized frontend performance with lazy loading and modular structure. ' +
        'Adopted GitHub Flow for collaborative version control.',
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
      category: 'frontend', // Kategori diperbarui dari 'web'
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
      title: 'REST API Backend for DifabelZone Batik e-Commerce (Yogyakarta)',
      description:
        'Designed relational database schema covering catalog, cart, user, and payment entities. ' +
        'Developed RESTful APIs using Spring Boot to support frontend integration and business logic. ' +
        'Containerized the application with Docker to ensure environment consistency and scalability. ' +
        'Implemented API documentation and testing using Swagger and Postman. ' +
        'Adopted GitHub Flow for version control and collaborative development. ' +
        'Contributed to an inclusive e-commerce system empowering local disabled artisans.',
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

      category: 'backend', // Kategori diperbarui dari 'web'
      images: [
        'assets/projects/dz1.png',
        'assets/projects/dz2.png',
        'assets/projects/dz3.png',
      ],
      featured: false,
    },
    {
      id: 4,
      title: 'Monolithic e-Commerce Platform for Batik DifabelZone',
      description:
        'Engineered a Laravel-based e-Commerce platform to support disabled artisans in Bantul, Indonesia. ' +
        'Designed system architecture, ERD, and relational database schema to support modular growth. ' +
        'Implemented backend logic for product catalog, user sessions, cart management, and payment workflow. ' +
        'Developed an admin panel for order processing and inventory tracking with role-based access control. ' +
        'Aligned software engineering with the mission of digital inclusion and social impact.',
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

      category: 'backend', // Kategori diperbarui dari 'web' (tetap backend karena fokusnya kuat di backend)
      images: [
        'assets/projects/DifabelZone.png',
        'assets/projects/DifabelZone.png',
      ],
      featured: false,
    },

    {
      id: 5,
      title: 'Opportunistic Network Environment Simulation',
      description:
        'Developed and customized Delay Tolerant Network (DTN) routing protocols such as Epidemic, Spray and Wait, Prophet, and PeopleRank. ' +
        'Implemented advanced Decision Engines within ONE Simulator using Java. ' +
        'Integrated real-world datasets (e.g., Haggle3, Reality) and mobility models. ' +
        'Refactored simulator components for modularity and extensibility. ' +
        'Automated batch simulation runs and organized output reports.',
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

      category: 'simulasi', // Kategori tetap 'simulasi'
      images: ['assets/projects/theOne.png', 'assets/projects/theOne.png'],
      featured: true,
    },

    {
      id: 6,
      title: 'Java-Naive-Bayes-Classifier',
      description:
        'Developed a Java-based Naive Bayes classification program to predict computer purchase decisions using features such as age, income level, student status, and credit rating. ' +
        'Processed a dataset consisting of 14 records and calculated both prior and conditional probabilities using Laplace smoothing. ' +
        'Implemented probability computations to evaluate two possible outcome classes: "buys_computer=yes" and "buys_computer=no". ' +
        'Compared computed probabilities to determine the final prediction with the highest likelihood. ' +
        'Wrote clean, modular Java code with clear documentation to facilitate future enhancements and experiments. ' +
        'Ensured logical flow and accuracy of probability calculations to support learning-based decision making. ' +
        'Designed the implementation to serve as an educational example of basic machine learning with Naive Bayes in Java. ' +
        'Handled discrete categorical features and ensured proper feature handling for general use-case classification.',
      thumbnail: 'assets/projects/NaviBayes.png',
      technologies: [
        'Java',
        'Naive Bayes',
        'Laplace Smoothing',
        'CLI', // Command Line Interface
        'Machine Learning (Basic)',
      ],

      githubUrl:
        'https://github.com/hendrowunga/Java-Naive-Bayes-Classifier.git',

      category: 'algorithms', // Kategori diperbarui dari 'other'
      images: [
        'assets/projects/NaviBayes.png',
        'assets/projects/NaviBayes.png',
      ],
      featured: false,
    },

    {
      id: 7,
      title: 'JavaProbabilityStats',
      description:
        'Developed a Java program to calculate the Expected Value (E(X)) and Variance (σ²) for a given discrete random variable distribution. ' +
        'Processes input probability tables (X and P(X)) to compute E(X) = ∑[x * P(x)]. ' +
        'Computes Variance σ² = ∑[(x - E(X))² * P(x)] using the calculated expected value. ' +
        'Outputs intermediate calculation steps, such as x*P(x) and (x - E(X))² * P(x), in a clear tabular format for verification, as shown in the example. ' +
        'Includes functionality to determine and display the probability distribution of a Binomial random variable X (number of heads) resulting from K coin flips. ' +
        'Generates the probability P(X=k) for each possible outcome k (from 0 to K) in the coin flip scenario. ' +
        'Designed with a focus on clear output that mirrors the step-by-step presentation often used in statistical problem-solving.',
      thumbnail: 'assets/projects/javaProbability.png',
      technologies: [
        'Java',
        'Discrete Probability',
        'Statistics',
        'Binomial Distribution',
        'CLI',
      ],

      githubUrl: 'https://github.com/hendrowunga/JavaProbabilityStats',

      category: 'algorithms', // Kategori diperbarui dari 'other'
      images: [
        'assets/projects/javaProbability.png',
        'assets/projects/javaProbability.png',
      ],
      featured: false,
    },

    {
      id: 8,
      title: 'SpringBoot-security',
      description:
        'Developed a secure Sign Up and Log In system using the Spring Boot framework. ' +
        'Implemented robust security features utilizing Spring Security. ' +
        'Integrated JSON Web Tokens (JWT) for stateless authentication and authorization. ' +
        'Incorporated an email verification process to ensure validated user registrations. ' +
        'Focused on creating a secure backend service for user authentication management.',
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

      category: 'backend', // Kategori diperbarui dari 'web'
      images: [
        'assets/projects/springSecurity.png',
        'assets/projects/springSecurity.png',
      ],
      featured: false,
    },

    {
      id: 9,
      title: 'SpringBoot-refreshtoken',
      description:
        'Developed a secure authentication system using Spring Boot and JSON Web Tokens (JWT). ' +
        'Implemented functionality for generating JWT access tokens upon successful authentication. ' +
        'Integrated a refresh token mechanism to allow for seamless and secure user session renewal. ' +
        'Focused on efficient user session management by enabling the acquisition of new access tokens using refresh tokens. ' +
        'Provided a practical implementation of JWT access and refresh token patterns in a Spring Boot environment.',
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

      category: 'backend', // Kategori diperbarui dari 'web'
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
      title: 'Calculator_Application',
      description:
        'Developed a simple calculator application using Java Swing with a modern interface. ' +
        'Implemented basic arithmetic functionalities: addition, subtraction, multiplication, and division. ' +
        'Included additional features such as square root and squaring (power of two). ' +
        'Designed the graphical user interface (GUI) for a fast and efficient user experience. ' +
        'Utilized Java Swing components to build the interactive calculator interface.',
      thumbnail: 'assets/projects/calculator.png',
      technologies: ['Java', 'Java Swing', 'GUI', 'Basic Arithmetic'],
      githubUrl: 'https://github.com/hendrowunga/Calculator_Application',
      category: 'desktop', // Kategori diperbarui dari 'mobile'
      images: [
        'assets/projects/calculator.png',
        'assets/projects/calculator.png',
      ],
      featured: false,
    },
    {
      id: 11, // ID unik
      title: 'Java Hidden Markov Models (HMM) Implementation',
      description:
        'A basic Java implementation of Hidden Markov Models (HMM). Supports model and data reading, Viterbi and Forward-Backward algorithms, and prediction estimation.',
      thumbnail: 'assets/projects/hmm1.jpg',
      technologies: [
        'Java',
        'Hidden Markov Models (HMM)',
        'Viterbi Algorithm',
        'Forward-Backward Algorithm',
        'Probability',
      ],
      githubUrl: 'https://github.com/hendrowunga/java-hmm.git',
      category: 'algorithms', // Kategori diperbarui dari 'other'
      images: [
        'assets/projects/hmm1.jpg',
        'assets/projects/hmm2.png',
        'assets/projects/hmm3.png',
      ],
      featured: false,
    },

    // --- TAMBAHKAN DATA UNTUK PROYEK MICROSERVICE DAN GNS3 DI SINI ---

    {
      id: 12,
      title: 'Spring Boot Microservices Architecture Demonstration', // Judul profesional
      description:
        'A demonstration project implementing a microservices architecture using Spring Boot. ' +
        'This project showcases essential microservices components, including an API Gateway for unified access, ' +
        'a Discovery Server (Eureka) for dynamic service registration and discovery, ' +
        'and a Config Server for centralized configuration management. ' +
        'It features example microservices (such as Student and School services as depicted) ' + // Sesuai diagram
        'interacting with dedicated, containerized databases (via Docker). ' +
        'The architecture also integrates Zipkin for distributed tracing and observability, ' +
        'providing practical insight into microservice structure and implementation.',
      thumbnail: 'assets/projects/ms1.png', // Path relatif yang benar
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
      githubUrl: 'https://github.com/hendrowunga/SpringBoot-microservice.git', // URL GitHub Anda
      category: 'backend', // Kategori backend
      images: ['assets/projects/ms1.png', 'assets/projects/ms1.png'],
      featured: false, // Sesuai keinginan
    },

    {
      id: 13,
      title: 'E-commerce Backend API (Spring Security, JPA, JWT)', // Judul lebih spesifik
      description:
        'A comprehensive backend API for an e-commerce platform, developed using the Spring Boot framework. ' +
        'It provides core functionalities for managing users, products, and orders, built with a focus on security and data persistence.' +
        'Key Features:' +
        '- User management (Registration, Login, and verification)' +
        '- Product management (APIs for adding, removing, and updating products)' +
        '- Order management (APIs for viewing and managing user orders)' +
        'Utilizes Spring Security and JWT for robust authentication and authorization, ' +
        'Spring Data JPA for efficient database interactions (using Hibernate), ' +
        'and includes comprehensive testing coverage with JUnit 5 and MockMvc.',
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
    // {
    //   id: 13, // ID unik baru
    //   title: 'Network Configuration on GNS3',
    //   description: 'Configuration and simulation of network topologies using GNS3...',
    //   thumbnail: 'assets/projects/gns3-thumb.png', // Ganti path
    //   technologies: ['GNS3', 'Cisco IOS', 'Routing Protocols (OSPF, EIGRP)', 'Networking Concepts'], // Contoh teknologi
    //   githubUrl: 'https://github.com/your-username/your-gns3-configs', // Ganti URL jika konfigurasi disimpan
    //   category: 'networking', // Masuk kategori 'networking'
    //   images: ['assets/projects/gns3-ss1.png', 'assets/projects/gns3-ss2.png'], // Screenshot modal
    //   featured: false, // Sesuaikan
    // },

    // ------------------------------------------------------------------

    // ... (setelah proyek dengan id: 13) ...

    {
      id: 14,
      title: 'Ant Colony Optimization for Traveling Salesman Problem (TSP)',
      description:
        'Mengimplementasikan algoritma metaheuristik Ant Colony Optimization (ACO) untuk menemukan solusi efisien untuk Traveling Salesman Problem (TSP). Proyek ini mensimulasikan bagaimana koloni semut secara kolektif menemukan jalur terpendek, menunjukkan penerapan algoritma yang terinspirasi dari alam untuk masalah optimasi NP-hard.',
      thumbnail: 'assets/projects/tsp1.png', // GANTI: Visualisasi jalur terpendek
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
      images: ['assets/projects/tsp1.png'], // GANTI: gambar hasil dan grafik konvergensi
      featured: true, // Sangat direkomendasikan untuk jadi unggulan
    },
    {
      id: 15,
      title: 'Hill Climbing Algorithm for Local Search Optimization',
      description:
        'Implementasi algoritma pencarian lokal Hill Climbing. Algoritma ini secara iteratif bergerak menuju solusi yang lebih baik dengan membuat perubahan kecil pada solusi saat ini. Proyek ini berfungsi sebagai demonstrasi dasar dari algoritma optimasi heuristik yang sederhana namun efektif.',
      thumbnail: 'assets/projects/hc1.png', // GANTI: Visualisasi ruang pencarian atau grafik
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
      images: ['assets/projects/hc1.png'], // GANTI: gambar hasil atau grafik konvergensi
      featured: false,
    },

    {
      id: 16,
      title: 'Job Shop Scheduling using Particle Swarm Optimization (PSO)',
      description:
        'Penerapan Job Shop Scheduling Problem (JSSP) yang diselesaikan menggunakan metaheuristik Particle Swarm Optimization (PSO). Proyek ini menunjukkan bagaimana teknik optimasi populasi dapat digunakan untuk menjelajahi ruang solusi yang kompleks dan menemukan jadwal yang mendekati optimal.',
      thumbnail: 'assets/projects/jssp1.png', // GANTI: Visualisasi pergerakan partikel atau grafik konvergensi
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
      featured: true, // Kandidat bagus untuk jadi unggulan karena menggunakan PSO
    },

    {
      id: 17, // ID UNIK BARU
      title: 'Book Social Network API',
      description:
        'A comprehensive backend API for a book-centric social networking platform, built with Spring Boot. ' +
        'This project enables users to register, manage their book collections, and interact by sharing and borrowing books from each other.\n\n' +
        'Key features include:' +
        '- Secure Authentication: JWT-based security (Access & Refresh Tokens) with email account activation.' +
        '- Full RESTful API: Complete CRUD operations for books with response pagination.' +
        '- Social Interaction Logic: A full lifecycle for borrowing, returning, and approving book transactions.' +
        '- Containerized Environment: The entire development setup (PostgreSQL, MailDev) is managed with Docker Compose for consistency and ease of setup.',
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
      category: 'backend', // Kategori yang sangat sesuai
      images: [
        'assets/projects/sb3.png',
        'assets/projects/sb1.png',
        'assets/projects/sb0.png',
        'assets/projects/sb2.png',
      ],
      featured: true, // WAJIB, ini adalah proyek unggulan yang sangat kuat!
    },
  ];

  constructor(private readonly modalService: ModalService) {}

  get filteredProjects(): Project[] {
    if (this.activeFilter === 'all') {
      return this.projects;
    }
    return this.projects.filter(
      (project) => project.category === this.activeFilter
    );
  }

  // --- UPDATE TIPE PARAMETER setFilter ---
  setFilter(filter: ProjectCategory): void {
    this.activeFilter = filter;
  }

  // Metode untuk membuka modal (menggunakan ModalService eksternal)
  openProjectDetails(project: Project): void {
    this.modalService.openModal('project-details', {
      title: project.title,
      isLarge: true,
      projectDetails: project,
    });
  }

  // Metode untuk menutup modal (jika Anda memiliki modal di dalam komponen ini seperti sebelumnya)
  // Jika Anda menggunakan ModalService eksternal, Anda mungkin tidak memerlukan metode closeModal di sini
  // kecuali jika ModalService Anda memanggil metode ini.
  // Jika modal HTML ada di ProjectsComponent template:
  // closeModal(): void {
  //    this.selectedProject = null;
  //    this.currentImageIndex = 0;
  // }
}
