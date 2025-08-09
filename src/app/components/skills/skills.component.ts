import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import {
  // Brand Icons (fa-brands) - Pastikan ini adalah ikon gratis yang tersedia
  faJava,
  faPython,
  faLaravel,
  faAngular,
  faBootstrap,
  faNpm,
  faDocker,
  faGitAlt, // <-- KOREKSI: Tambahkan deklarasi ini
  faGithub, // Ini juga brand icon
  faLinux,
  faWindows,
  faJs,
  // faSpring tidak tersedia di free-brands-svg-icons
} from '@fortawesome/free-brands-svg-icons';
import {
  // Solid Icons (fa-solid) - Pastikan ini adalah ikon gratis yang tersedia
  faDatabase,
  faServer, // <-- KOREKSI: Menggunakan faServer untuk Spring Boot
  faCode, // Untuk Kotlin, VS Code, IntelliJ IDEA
  faVial, // Untuk JUnit
  faGear, // <-- KOREKSI: Menggunakan faGear sebagai pengganti faCogs (untuk Gradle, Maven)
  faHammer, // Untuk SQL Developer
  faNetworkWired, // Untuk NGINX
  faFileCode, // Untuk OpenAPI
  faPlug, // Untuk Postman
  faLayerGroup, // Untuk Kubernetes (alternatif gratis)
  faTimes, // Untuk tombol tutup, jika digunakan di sini juga
  faChevronLeft, // Jika ikon navigasi digunakan di sini
  faChevronRight, // Jika ikon navigasi digunakan di sini
} from '@fortawesome/free-solid-svg-icons';

// --- Definisi Interface Baru ---
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
  label: string;
}
// --- Akhir Definisi Interface Baru ---

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss'],
})
export class SkillsComponent {
  // --- Deklarasi Ikon Font Awesome (Agar dapat diakses di template) ---
  faJava = faJava;
  faPython = faPython;
  faKotlin = faCode;
  faLaravel = faLaravel;
  faSpringBoot = faServer; // <-- KOREKSI: Menggunakan faServer
  faMySQL = faDatabase;
  faPostgreSQL = faDatabase;
  faMongoDB = faDatabase;
  faSQLDeveloper = faHammer;
  faDocker = faDocker;
  faKubernetes = faLayerGroup;
  faPostman = faPlug;
  faGitHubActions = faGitAlt; // <-- KOREKSI: Tambahkan deklarasi ini
  faNGINX = faNetworkWired;
  faGradle = faGear; // <-- KOREKSI: Menggunakan faGear
  faApacheMaven = faGear; // <-- KOREKSI: Menggunakan faGear
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
  faTimes = faTimes; // Jika digunakan di template ini (misal di modal)
  faChevronLeft = faChevronLeft; // Jika digunakan di template ini
  faChevronRight = faChevronRight; // Jika digunakan di template ini
  // --- Akhir Deklarasi Ikon Font Awesome ---

  // --- Filter Kategori Baru ---
  categories: FilterCategory[] = [
    { value: 'all', label: 'All' },
    { value: 'languages', label: 'Languages' },
    { value: 'frameworks', label: 'Frameworks' },
    { value: 'databases', label: 'Databases' },
    { value: 'devops-tools', label: 'DevOps & Tools' },
    { value: 'os-vcs', label: 'OS & VCS' },
  ];

  selectedCategory: SkillCategoryType = 'all';

  // --- Data Keahlian Baru dengan Ikon Font Awesome dan Kategori yang Disesuaikan ---
  skills: Skill[] = [
    // Languages
    { name: 'Java', icon: this.faJava, category: 'languages' },
    { name: 'Kotlin', icon: this.faKotlin, category: 'languages' },
    { name: 'JavaScript', icon: this.faJs, category: 'languages' },
    { name: 'Python', icon: this.faPython, category: 'languages' },

    // Frameworks
    { name: 'Spring Boot', icon: this.faSpringBoot, category: 'frameworks' }, // Menggunakan faServer
    { name: 'Laravel', icon: this.faLaravel, category: 'frameworks' },
    { name: 'AngularJS', icon: this.faAngularJS, category: 'frameworks' },
    { name: 'Bootstrap', icon: this.faBootstrap, category: 'frameworks' },

    // Databases
    { name: 'MySQL', icon: this.faMySQL, category: 'databases' },
    { name: 'PostgreSQL', icon: this.faPostgreSQL, category: 'databases' },
    { name: 'MongoDB', icon: this.faMongoDB, category: 'databases' },

    // DevOps & Tools
    {
      name: 'SQL Developer',
      icon: this.faSQLDeveloper,
      category: 'devops-tools',
    },
    { name: 'Docker', icon: this.faDocker, category: 'devops-tools' },
    { name: 'Kubernetes', icon: this.faKubernetes, category: 'devops-tools' },
    { name: 'Postman', icon: this.faPostman, category: 'devops-tools' },
    {
      name: 'GitHub Actions',
      icon: this.faGitHubActions,
      category: 'devops-tools',
    },
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

    // Operating Systems & Version Control Systems
    { name: 'Linux', icon: this.faLinux, category: 'os-vcs' },
    { name: 'Windows 11', icon: this.faWindows11, category: 'os-vcs' },
    { name: 'Git', icon: this.faGitHubActions, category: 'os-vcs' }, // Menggunakan ikon yang sama dengan GitHub Actions
  ];

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
