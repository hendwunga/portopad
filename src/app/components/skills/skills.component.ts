import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Skill {
  name: string;
  altText: string;
  iconUrl: string;
}

interface SkillCategory {
  categoryName: string;
  skills: Skill[];
}

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss'],
})
export class SkillsComponent implements OnInit {
  private skillCategoriesData: SkillCategory[] = [
    {
      categoryName: 'Languages & Frameworks',
      skills: [
        {
          name: 'Java',
          altText: 'Java Logo',
          iconUrl: 'assets/logos/java-14.svg',
        },
        {
          name: 'Spring Boot',
          altText: 'Spring Boot Logo',
          iconUrl: 'assets/logos/spring-boot-1.svg',
        },
        {
          name: 'Kotlin',
          altText: 'Kotlin Logo',
          iconUrl: 'assets/logos/kotlin-2.svg',
        },
        {
          name: 'Laravel',
          altText: 'Laravel Logo',
          iconUrl: 'assets/logos/laravel-svgrepo-com.svg',
        },
        {
          name: 'AngularJS',
          altText: 'AngularJS Logo',
          iconUrl: 'assets/logos/AngularJS.svg',
        },
        {
          name: 'Bootstrap',
          altText: 'Bootstrap Logo',
          iconUrl: 'assets/logos/Bootstrap.svg',
        },
      ],
    },
    {
      categoryName: 'Databases',
      skills: [
        {
          name: 'MySQL',
          altText: 'MySQL Logo',
          iconUrl: 'assets/logos/mysql-logo-pure.svg',
        },
        {
          name: 'PostgreSQL',
          altText: 'PostgreSQL Logo',
          iconUrl: 'assets/logos/postgresql-logo-svgrepo-com.svg',
        },
        {
          name: 'MongoDB',
          altText: 'MongoDB Logo',
          iconUrl: 'assets/logos/MongoDB.svg',
        },
        {
          name: 'SQL Developer',
          altText: 'SQL Developer Logo',
          iconUrl: 'assets/logos/SQL-Developer.svg',
        },
      ],
    },
    {
      categoryName: 'DevOps & Tools',
      skills: [
        {
          name: 'Docker',
          altText: 'Docker Logo',
          iconUrl: 'assets/logos/docker-icon.svg',
        },
        {
          name: 'Kubernetes',
          altText: 'Kubernetes Logo',
          iconUrl: 'assets/logos/kubernets.svg',
        },
        {
          name: 'Postman',
          altText: 'Postman Logo',
          iconUrl: 'assets/logos/postman.svg',
        },
        {
          name: 'GitHub Actions',
          altText: 'GitHub Actions Logo',
          iconUrl: 'assets/logos/GitHub-Actions.svg',
        },
        {
          name: 'NGINX',
          altText: 'NGINX Logo',
          iconUrl: 'assets/logos/NGINX.svg',
        },
        {
          name: 'Gradle',
          altText: 'Gradle Logo',
          iconUrl: 'assets/logos/Gradle.png',
        },
        {
          name: 'Apache Maven',
          altText: 'Apache Maven Logo',
          iconUrl: 'assets/logos/Apache-Maven.svg',
        },
        { name: 'NPM', altText: 'NPM Logo', iconUrl: 'assets/logos/NPM.svg' },
        {
          name: 'JUnit',
          altText: 'JUnit Logo',
          iconUrl: 'assets/logos/JUnit.svg',
        },
        {
          name: 'OpenAPI',
          altText: 'OpenAPI Logo',
          iconUrl: 'assets/logos/OpenAPI.png',
        },
      ],
    },
    {
      categoryName: 'Development Environment',
      skills: [
        {
          name: 'IntelliJ IDEA',
          altText: 'IntelliJ IDEA Logo',
          iconUrl: 'assets/logos/intellij-idea-svgrepo-com.svg',
        },
        {
          name: 'VS Code',
          altText: 'Visual Studio Code Logo',
          iconUrl: 'assets/logos/visual-studio-code-1.svg',
        },
      ],
    },
    {
      categoryName: 'Operating Systems',
      skills: [
        {
          name: 'Linux',
          altText: 'Linux Logo',
          iconUrl: 'assets/logos/Linux.png',
        },
        {
          name: 'Windows 11',
          altText: 'Windows 11 Logo',
          iconUrl: 'assets/logos/Windows-11.svg',
        },
      ],
    },
  ];

  allSkills: Skill[] = [];

  ngOnInit(): void {
    this.allSkills = this.skillCategoriesData.flatMap(
      (category) => category.skills
    );
    this.allSkills.sort((a, b) => a.name.localeCompare(b.name));
  }
}
