import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  // Icons from the original list that are still relevant
  faHtml5,
  faCss3Alt,
  faJs,
  faAngular,
  faNode,
  faGit,
  faNpm,
  faDocker,

  // New icons from the brands pack (if available in free tier)
  faJava,
  faLaravel,
  // faKubernetes, // Icon for Kubernetes (Available in free brands)
  // faJetBrains, // Icon for JetBrains (Available in free brands)
  faLinux, // Icon for Linux (Available in free brands)
  faWindows, // Icon for Windows (Available in free brands)
  faBootstrap, // Icon for Bootstrap (Available in free brands)

  // faReact, // Removed as React is not in the new list
  // faVuejs, // Removed as Vue.js is not in the new list
} from '@fortawesome/free-brands-svg-icons';
import {
  // Icons from the original list that are still relevant
  faDatabase,
  faServer, // Often used for backend/APIs

  // New icons from the solid pack (or generic)
  faToolbox, // Generic for tools
  faCogs, // Generic for build/configuration
  faVial, // Generic for testing (JUnit)
  faFileCode, // Generic for code/specifications (OpenAPI)
  faCode, // Generic code icon (Kotlin, VS Code)

  // faMobileScreen, // Removed as responsive design is not listed separately
  // faGlobe, // Removed as web performance is not listed separately
} from '@fortawesome/free-solid-svg-icons';

// Interface should stay in the .ts file as it defines data structure used by the class
interface Skill {
  name: string;
  icon: any;
  category: 'frontend' | 'backend' | 'tools' | 'other';
}

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  // References the external template and style files
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss'],
})
export class SkillsComponent {
  categories = [
    { value: 'all', label: 'All' },
    { value: 'frontend', label: 'Frontend' },
    { value: 'backend', label: 'Backend' },
    { value: 'tools', label: 'Tools' },
    { value: 'other', label: 'Other' },
  ];

  selectedCategory: string = 'all';

  // Font Awesome icons declaration (updated)
  faHtml5 = faHtml5;
  faCss3Alt = faCss3Alt;
  faJs = faJs;
  faAngular = faAngular;
  faNode = faNode;
  faGit = faGit;
  faNpm = faNpm;
  faDocker = faDocker;
  faJava = faJava;
  faLaravel = faLaravel;
  // faKubernetes = faKubernetes;
  // faJetBrains = faJetBrains;
  faLinux = faLinux;
  faWindows = faWindows;
  faBootstrap = faBootstrap; // Declare the new Bootstrap icon
  faDatabase = faDatabase;
  faServer = faServer;
  faToolbox = faToolbox; // Declare the new Toolbox icon
  faCogs = faCogs; // Declare the new Cogs icon
  faVial = faVial; // Declare the new Vial icon
  faFileCode = faFileCode; // Declare the new FileCode icon
  faCode = faCode; // Declare the new Code icon

  skills: Skill[] = [
    // Backend Skills
    { name: 'Java', icon: this.faJava, category: 'backend' },
    { name: 'Spring Boot', icon: this.faServer, category: 'backend' }, // Using faServer as a stand-in for Spring Boot
    { name: 'Kotlin', icon: this.faCode, category: 'backend' }, // Using faCode for Kotlin
    { name: 'Laravel', icon: this.faLaravel, category: 'backend' },
    { name: 'MySQL', icon: this.faDatabase, category: 'backend' },
    { name: 'PostgreSQL', icon: this.faDatabase, category: 'backend' }, // Using faDatabase for PostgreSQL
    { name: 'MongoDB', icon: this.faDatabase, category: 'backend' }, // Using faDatabase for MongoDB
    { name: 'RESTful APIs', icon: this.faServer, category: 'backend' }, // Using faServer for APIs
    { name: 'JUnit', icon: this.faVial, category: 'backend' }, // Using faVial for testing framework

    // Frontend Skills (Assuming you still want these based on your original code)
    // Keep only the ones relevant to your experience if you have them.
    // For a backend focus, maybe keep HTML, CSS, JS, Bootstrap, and Angular/AngularJS if applicable.
    // Let's keep the core web techs + Bootstrap + AngularJS from your list.
    { name: 'HTML5', icon: this.faHtml5, category: 'frontend' },
    { name: 'CSS3', icon: this.faCss3Alt, category: 'frontend' },
    { name: 'JavaScript', icon: this.faJs, category: 'frontend' },
    { name: 'AngularJS', icon: this.faAngular, category: 'frontend' }, // Using faAngular icon for AngularJS
    { name: 'Bootstrap', icon: this.faBootstrap, category: 'frontend' },

    // Tools
    { name: 'SQL Developer', icon: this.faToolbox, category: 'tools' }, // Using faToolbox
    { name: 'Docker', icon: this.faDocker, category: 'tools' },
    // { name: 'Kubernetes', icon: this.faKubernetes, category: 'tools' },
    { name: 'Postman', icon: this.faToolbox, category: 'tools' }, // Using faToolbox
    { name: 'GitHub Actions', icon: this.faGit, category: 'tools' }, // Using faGit
    { name: 'NGINX', icon: this.faServer, category: 'tools' }, // Using faServer for NGINX
    { name: 'Gradle', icon: this.faCogs, category: 'tools' }, // Using faCogs
    { name: 'Apache Maven', icon: this.faCogs, category: 'tools' }, // Using faCogs
    { name: 'NPM', icon: this.faNpm, category: 'tools' },
    { name: 'OpenAPI', icon: this.faFileCode, category: 'tools' }, // Using faFileCode
    // { name: 'IntelliJ IDEA', icon: this.faJetBrains, category: 'tools' },
    { name: 'VS Code', icon: this.faCode, category: 'tools' }, // Using faCode

    // Other Skills (Operating Systems)
    { name: 'Linux', icon: this.faLinux, category: 'other' },
    { name: 'Windows 11', icon: this.faWindows, category: 'other' },

    // Removed: React, Vue.js, Responsive Design, Web Performance
  ];

  get filteredSkills(): Skill[] {
    if (this.selectedCategory === 'all') {
      return this.skills;
    }
    return this.skills.filter(
      (skill) => skill.category === this.selectedCategory
    );
  }

  filterByCategory(category: string): void {
    this.selectedCategory = category;
  }
}
