import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import {
  // Brand Icons (fa-brands)
  faJava,
  faPython,
  faLaravel,
  faAngular,
  faBootstrap,
  faNpm,
  faDocker,
  faGitAlt, // faGitAlt sekarang dideklarasikan juga sebagai properti faGitHubActions
  faLinux,
  faWindows,
  faJs,
} from '@fortawesome/free-brands-svg-icons';
import {
  // Solid Icons (fa-solid)
  faDatabase,
  faServer,
  faCode,
  faVial,
  faGear,
  faHammer,
  faNetworkWired,
  faFileCode,
  faPlug,
  faLayerGroup,
} from '@fortawesome/free-solid-svg-icons';

import {
  LanguageService,
  Language,
} from '../../services/shared/language.service';

type SkillCategoryType =
  | 'all'
  | 'languages'
  | 'frameworks'
  | 'databases'
  | 'devops-tools'
  | 'os-vcs';

interface Skill {
  name: string;
  icon: IconDefinition;
  category: Exclude<SkillCategoryType, 'all'>;
}

interface FilterCategory {
  value: SkillCategoryType;
  labelKey: string;
}

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss'],
})
export class SkillsComponent {
  // --- Deklarasi Ikon Font Awesome (Agar dapat diakses di template) ---
  // Deklarasikan semua ikon yang akan digunakan di template atau di array 'skills'
  faJava = faJava;
  faPython = faPython;
  faKotlin = faCode;
  faLaravel = faLaravel;
  faSpringBoot = faServer; // Menggunakan faServer sebagai pengganti faSpring (Font Awesome Free)
  faMySQL = faDatabase;
  faPostgreSQL = faDatabase;
  faMongoDB = faDatabase;
  faSQLDeveloper = faHammer;
  faDocker = faDocker;
  faKubernetes = faLayerGroup; // Menggunakan faLayerGroup sebagai alternatif gratis
  faPostman = faPlug;
  faGitHubActions = faGitAlt; // Properti ini yang memegang ikon faGitAlt
  faNGINX = faNetworkWired;
  faGradle = faGear; // Menggunakan faGear sebagai pengganti faCogs
  faApacheMaven = faGear; // Menggunakan faGear
  faNpm = faNpm;
  faJUnit = faVial;
  faOpenAPI = faFileCode;
  faIntelliJIDEA = faCode;
  faVSCode = faCode;
  faLinux = faLinux;
  faWindows11 = faWindows;
  faAngularJS = faAngular;
  faBootstrap = faBootstrap;
  faJs = faJs;
  // --- Akhir Deklarasi Ikon Font Awesome ---

  categories: FilterCategory[] = [
    { value: 'all', labelKey: 'filterAll' },
    { value: 'languages', labelKey: 'filterLanguages' },
    { value: 'frameworks', labelKey: 'filterFrameworks' },
    { value: 'databases', labelKey: 'filterDatabases' },
    { value: 'devops-tools', labelKey: 'filterDevOpsTools' },
    { value: 'os-vcs', labelKey: 'filterOsVcs' },
  ];

  selectedCategory: SkillCategoryType = 'all';

  skills: Skill[] = [
    { name: 'Java', icon: this.faJava, category: 'languages' },
    { name: 'Kotlin', icon: this.faKotlin, category: 'languages' },
    { name: 'JavaScript', icon: this.faJs, category: 'languages' },
    { name: 'Python', icon: this.faPython, category: 'languages' },

    { name: 'Spring Boot', icon: this.faSpringBoot, category: 'frameworks' },
    { name: 'Laravel', icon: this.faLaravel, category: 'frameworks' },
    { name: 'AngularJS', icon: this.faAngularJS, category: 'frameworks' },
    { name: 'Bootstrap', icon: this.faBootstrap, category: 'frameworks' },

    { name: 'MySQL', icon: this.faMySQL, category: 'databases' },
    { name: 'PostgreSQL', icon: this.faPostgreSQL, category: 'databases' },
    { name: 'MongoDB', icon: this.faMongoDB, category: 'databases' },

    {
      name: 'SQL Developer',
      icon: this.faSQLDeveloper,
      category: 'devops-tools',
    },
    { name: 'Docker', icon: this.faDocker, category: 'devops-tools' },
    { name: 'Kubernetes', icon: this.faKubernetes, category: 'devops-tools' },
    { name: 'Postman', icon: this.faPostman, category: 'devops-tools' },
    // --- KOREKSI DI SINI: Gunakan this.faGitHubActions ---
    {
      name: 'GitHub Actions',
      icon: this.faGitHubActions,
      category: 'devops-tools',
    },
    // --- AKHIR KOREKSI ---
    { name: 'NGINX', icon: this.faNGINX, category: 'devops-tools' },
    { name: 'Gradle', icon: this.faGradle, category: 'devops-tools' },
    {
      name: 'Apache Maven',
      icon: this.faApacheMaven,
      category: 'devops-tools',
    },
    { name: 'NPM', icon: this.faNpm, category: 'devops-tools' },
    { name: 'JUnit', icon: this.faJUnit, category: 'devops-tools' },
    { name: 'OpenAPI', icon: this.faOpenAPI, category: 'devops-tools' },
    {
      name: 'IntelliJ IDEA',
      icon: this.faIntelliJIDEA,
      category: 'devops-tools',
    },
    { name: 'VS Code', icon: this.faVSCode, category: 'devops-tools' },

    { name: 'Linux', icon: this.faLinux, category: 'os-vcs' },
    { name: 'Windows 11', icon: this.faWindows11, category: 'os-vcs' },
    // --- KOREKSI DI SINI: Gunakan this.faGitHubActions jika Anda ingin ikon yang sama untuk Git ---
    { name: 'Git', icon: this.faGitHubActions, category: 'os-vcs' },
    // --- AKHIR KOREKSI ---
  ];

  constructor(public languageService: LanguageService) {}

  get filteredSkills(): Skill[] {
    if (this.selectedCategory === 'all') {
      return this.skills;
    }
    return this.skills.filter(
      (skill) => skill.category === this.selectedCategory
    );
  }

  filterByCategory(category: SkillCategoryType): void {
    this.selectedCategory = category;
  }
}
