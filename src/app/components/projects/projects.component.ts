import { Component } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faGithub, faChrome } from '@fortawesome/free-brands-svg-icons';
import {
  faLink,
  faDatabase,
  faServer,
  faToolbox,
  faCogs,
  faVial,
  faFileCode,
  faCode,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';

import { ModalService } from '../../services/shared/modal.service';

// Update interface Project untuk menyertakan 'simulasi' dalam tipe 'category'
interface Project {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  // Tambahkan 'simulasi' ke tipe kategori yang valid
  category: 'web' | 'mobile' | 'design' | 'other' | 'simulasi';
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
export class ProjectsComponent {
  faGithub = faGithub;
  faChrome = faChrome;
  faLink = faLink;
  faTimes = faTimes;

  // Tambahkan filter 'Simulasi' ke daftar filters
  filters = [
    { value: 'all', label: 'All' },
    { value: 'web', label: 'Web' },
    { value: 'mobile', label: 'Mobile' },
    { value: 'design', label: 'Design' },
    { value: 'simulasi', label: 'Simulasi' }, // Filter baru
    { value: 'other', label: 'Other' },
  ];

  // Update tipe activeFilter untuk menyertakan 'simulasi'
  activeFilter: 'all' | 'web' | 'mobile' | 'design' | 'other' | 'simulasi' =
    'all';

  selectedProject: Project | null = null;
  currentImageIndex = 0;

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
      thumbnail: 'assets/projects/FullStackSpringBoot.png',
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
      category: 'web',
      images: [
        'assets/projects/FullStackSpringBoot.png',
        'assets/projects/FullStackSpringBoot.png',
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
      thumbnail: 'assets/projects/FullStackFrontendAngular.png',
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
      category: 'web',
      images: [
        'assets/projects/FullStackFrontendAngular.png',
        'assets/projects/FullStackFrontendAngular.png',
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
      thumbnail: 'assets/projects/RestApi.png',
      technologies: [
        'Spring Boot',
        'REST API',
        'Docker',
        'Swagger',
        'Postman',
        'GitHub Flow',
      ],

      githubUrl: 'https://github.com/hendrowunga/batik-difabelzone.git',
      category: 'web',
      images: ['assets/projects/RestApi.png', 'assets/projects/RestApi.png'],
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

      category: 'web',
      images: [
        'assets/projects/DifabelZone.png',
        'assets/projects/DifabelZone.png',
      ],
      featured: false,
    },

    // Project "Opportunistic Network Environment Simulation" diubah kategorinya
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

      // Kategori diubah menjadi 'simulasi'
      category: 'simulasi',
      images: ['assets/projects/theOne.png', 'assets/projects/theOne.png'],
      featured: true, // Pertahankan featured jika perlu
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
        'CLI',
        'Machine Learning (Basic)',
      ],

      githubUrl:
        'https://github.com/hendrowunga/Java-Naive-Bayes-Classifier.git',

      category: 'other',
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

      category: 'other',
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
      ],

      githubUrl: 'https://github.com/hendrowunga/SpringBoot-security',

      category: 'web',
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
      thumbnail: 'assets/projects/refresh_token.png',
      technologies: [
        'Spring Boot',
        'JWT',
        'Access Token',
        'Refresh Token',
        'Authentication System',
      ],

      githubUrl: 'https://github.com/hendrowunga/SpringBoot-refreshtoken',

      category: 'web',
      images: [
        'assets/projects/refresh_token.png',
        'assets/projects/refresh_token.png',
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
      category: 'mobile',
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
      thumbnail: 'assets/projects/hmm1.jpg', // Path ke thumbnail proyek HMM
      technologies: [
        'Java',
        'Hidden Markov Models (HMM)',
        'Viterbi Algorithm',
        'Forward-Backward Algorithm',
        'Probability',
      ],
      githubUrl: 'https://github.com/hendrowunga/java-hmm.git', // Link GitHub Anda
      // liveUrl: Jika ada demo live
      category: 'other', // Kategori 'other' cocok, atau 'simulasi' jika lebih fokus ke simulasi data
      images: [
        'assets/projects/hmm1.jpg',
        'assets/projects/hmm2.png',
        'assets/projects/hmm3.png',
        // Tambahkan path screenshot lainnya jika ada
      ],
      featured: false, // Sesuaikan jika ingin ditampilkan sebagai unggulan
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

  setFilter(filter: string): void {
    // Menggunakan type assertion untuk memastikan filter adalah tipe yang benar
    this.activeFilter = filter as
      | 'all'
      | 'web'
      | 'mobile'
      | 'design'
      | 'other'
      | 'simulasi';
  }

  // Metode untuk membuka modal (menggunakan ModalService eksternal)
  openProjectDetails(project: Project): void {
    this.modalService.openModal('project-details', {
      title: project.title, // Judul modal header
      isLarge: true, // Jika modal proyek ingin ukuran besar
      projectDetails: project, // Data proyek lengkap untuk ditampilkan di modal
    });
  }
}
