import { Component } from '@angular/core';
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
export class SkillsComponent {
  skillCategories: SkillCategory[] = [
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
    // Tambahkan kategori lain jika perlu
  ];
}
