import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

interface Project {
  title: string;
  year: number;
  role: string;
  details: string[];
  githubUrl: string;
  imageUrl: string;
  isExpanded?: boolean;
  id?: string;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  animations: [
    trigger('expandCollapse', [
      state(
        'false',
        style({
          height: '0px',
          opacity: 0,
          overflow: 'hidden',
          paddingTop: '0',
          marginTop: '0',
          borderTopWidth: '0',
        })
      ),
      state(
        'true',
        style({
          height: '*',
          opacity: 1,
          paddingTop: 'var(--spacing-md, 1rem)',
          marginTop: 'var(--spacing-md, 1rem)',
          borderTop: '1px solid var(--border-color, #dee2e6)',
        })
      ),
      transition('false <=> true', animate('300ms ease-in-out')),
    ]),
    trigger('fadeInOut', [
      state('void', style({ opacity: 0 })),
      state('*', style({ opacity: 1 })),
      transition('void <=> *', animate('300ms ease-in-out')),
    ]),
  ],
})
export class ProjectsComponent implements OnInit {
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
      githubUrl:
        'https://github.com/hendrowunga/online-agricultural-store-backend.git',
      imageUrl: 'assets/images/project-agri-store.png',
    },
    {
      title: 'REST API Backend for DifabelZone Batik e-Commerce (Yogyakarta)',
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
      imageUrl: 'assets/projects/RestApi.png',
    },
    {
      title: 'Monolithic e-Commerce Platform for Batik DifabelZone',
      year: 2024,
      role: 'System Design & Backend Development',
      details: [
        'Engineered a Laravel-based e-Commerce platform to support disabled artisans in Bantul, Indonesia.',
        'Designed system architecture, ERD, and relational database schema to support modular growth.',
        'Implemented backend logic for product catalog, user sessions, cart management, and payment workflow.',
        'Developed an admin panel for order processing and inventory tracking with role-based access control.',
        'Aligned software engineering with the mission of digital inclusion and social impact.',
      ],
      githubUrl: 'https://github.com/hendrowunga/batik-difabelzone.git',
      imageUrl: 'assets/projects/DifabelZone.png',
    },
    {
      title: 'Opportunistic Network Environment Simulation',
      year: 2024,
      role: 'DTN Protocol Developer & Simulation Engineer',
      details: [
        'Developed and customized Delay Tolerant Network (DTN) routing protocols such as Epidemic, Spray and Wait, Prophet, and PeopleRank.',
        'Implemented advanced Decision Engines within ONE Simulator using Java.',
        'Integrated real-world datasets (e.g., Haggle3, Reality) and mobility models.',
        'Refactored simulator components for modularity and extensibility.',
        'Automated batch simulation runs and organized output reports.',
      ],
      githubUrl: 'https://github.com/hendrowunga/the-one.git',
      imageUrl: 'assets/projects/theOne.png',
    },
    {
      title: 'Java-Naive-Bayes-Classifier',
      year: 2024,
      role: 'Naive Bayes Classifier Implementation',
      details: [
        'Developed a Java-based Naive Bayes classification program to predict computer purchase decisions using features such as age, income level, student status, and credit rating.',
        'Processed a dataset consisting of 14 records and calculated both prior and conditional probabilities using Laplace smoothing.',
        'Implemented probability computations to evaluate two possible outcome classes: "buys_computer=yes" and "buys_computer=no".',
        'Compared computed probabilities to determine the final prediction with the highest likelihood.',
        'Wrote clean, modular Java code with clear documentation to facilitate future enhancements and experiments.',
        'Ensured logical flow and accuracy of probability calculations to support learning-based decision making.',
        'Designed the implementation to serve as an educational example of basic machine learning with Naive Bayes in Java.',
        'Handled discrete categorical features and ensured proper feature handling for general use-case classification.',
      ],
      githubUrl:
        'https://github.com/hendrowunga/Java-Naive-Bayes-Classifier.git',
      imageUrl: 'assets/projects/NaviBayes.png',
    },
    {
      title: 'JavaProbabilityStats',
      year: 2024,
      role: 'Discrete Probability & Statistics Calculator in Java',
      details: [
        'Developed a Java program to calculate the Expected Value (E(X)) and Variance (σ²) for a given discrete random variable distribution.',
        'Processes input probability tables (X and P(X)) to compute E(X) = ∑[x * P(x)].',
        'Computes Variance σ² = ∑[(x - E(X))² * P(x)] using the calculated expected value.',
        'Outputs intermediate calculation steps, such as x*P(x) and (x - E(X))² * P(x), in a clear tabular format for verification, as shown in the example.',
        'Includes functionality to determine and display the probability distribution of a Binomial random variable X (number of heads) resulting from K coin flips.',
        'Generates the probability P(X=k) for each possible outcome k (from 0 to K) in the coin flip scenario.',
        'Designed with a focus on clear output that mirrors the step-by-step presentation often used in statistical problem-solving.',
      ],
      githubUrl: 'https://github.com/hendrowunga/JavaProbabilityStats',
      imageUrl: 'assets/projects/javaProbability.png',
    },
    {
      title: 'Calculator_Application',
      year: 2022,
      role: 'Java Swing Application Developer',
      details: [
        'Developed a simple calculator application using Java Swing with a modern interface.',
        'Implemented basic arithmetic functionalities: addition, subtraction, multiplication, and division.',
        'Included additional features such as square root and squaring (power of two).',
        'Designed the graphical user interface (GUI) for a fast and efficient user experience.',
        'Utilized Java Swing components to build the interactive calculator interface.',
      ],
      githubUrl: 'https://github.com/hendrowunga/Calculator_Application',
      imageUrl: 'assets/projects/calculator.png',
    },
    {
      title: 'SpringBoot-security',
      year: 2023,
      role: 'Spring Boot Developer (Security Focus)',
      details: [
        'Developed a secure Sign Up and Log In system using the Spring Boot framework.',
        'Implemented robust security features utilizing Spring Security.',
        'Integrated JSON Web Tokens (JWT) for stateless authentication and authorization.',
        'Incorporated an email verification process to ensure validated user registrations.',
        'Focused on creating a secure backend service for user authentication management.',
      ],
      githubUrl: 'https://github.com/hendrowunga/SpringBoot-security',
      imageUrl: 'assets/projects/springSecurity.png',
    },
    {
      title: 'SpringBoot-refreshtoken',
      year: 2023,
      role: 'Spring Boot Developer (Authentication Focus)',
      details: [
        'Developed a secure authentication system using Spring Boot and JSON Web Tokens (JWT).',
        'Implemented functionality for generating JWT access tokens upon successful authentication.',
        'Integrated a refresh token mechanism to allow for seamless and secure user session renewal.',
        'Focused on efficient user session management by enabling the acquisition of new access tokens using refresh tokens.',
        'Provided a practical implementation of JWT access and refresh token patterns in a Spring Boot environment.',
      ],
      githubUrl: 'https://github.com/hendrowunga/SpringBoot-refreshtoken',
      imageUrl: 'assets/projects/refresh_token.png',
    },
  ];

  displayedProjects: Project[] = [];
  readonly displayLimit = 3;
  showAll = false;
  selectedImageUrl: string | null = null;

  ngOnInit(): void {
    this.allProjects = this.allProjects.map((project, index) => ({
      ...project,
      isExpanded: false,
      id: this.generateSafeId(project.title, index),
    }));
    this.updateDisplayedProjects();
  }

  private updateDisplayedProjects(): void {
    if (this.showAll) {
      this.displayedProjects = this.allProjects;
    } else {
      this.displayedProjects = this.allProjects.slice(0, this.displayLimit);
    }
  }

  loadAllProjects(): void {
    this.showAll = true;
    this.updateDisplayedProjects();
  }

  get shouldShowLoadMoreButton(): boolean {
    return this.allProjects.length > this.displayLimit && !this.showAll;
  }

  toggleDetails(project: Project): void {
    project.isExpanded = !project.isExpanded;
  }

  private generateSafeId(title: string, index: number): string {
    const safeTitle = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
    return `project-details-${safeTitle}-${index}`;
  }

  handleImageError(event: Event): void {
    const element = event.target as HTMLImageElement;
    element.src = 'assets/images/placeholder-project.svg';
    element.classList.add('image-error');
  }

  showImageInLightbox(imageUrl: string): void {
    this.selectedImageUrl = imageUrl;
    document.body.style.overflow = 'hidden';
  }

  closeLightbox(): void {
    this.selectedImageUrl = null;
    document.body.style.overflow = '';
  }
}
