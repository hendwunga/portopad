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
          'padding-top': '0',
          'margin-top': '0',
          'border-top': 'none',
        })
      ),
      state(
        'true',
        style({
          height: '*',
          opacity: 1,
          'padding-top': 'var(--spacing-md, 1rem)',
          'border-top': '1px solid var(--border-color)',
          'margin-top': 'var(--spacing-md, 1rem)',
        })
      ),
      transition('false <=> true', animate('300ms ease-in-out')),
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
      githubUrl: 'https://github.com/hendrowunga/DifabelZone.git',
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
  ];

  displayedProjects: Project[] = [];
  readonly displayLimit = 2;
  showAll = false;

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
    element.src = 'assets/logos/placeholder-project.svg';
    element.classList.add('image-error');
  }
}
