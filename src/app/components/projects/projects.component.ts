import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Project {
  title: string;
  year: number;
  role: string;
  details: string[];
  githubUrl: string;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
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

  displayedProjects: Project[] = [];
  readonly displayLimit = 2;
  showAll = false;

  ngOnInit(): void {
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
}
