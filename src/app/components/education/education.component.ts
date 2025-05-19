import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface EducationEntry {
  institution: string;
  degree: string;
  major: string;
  years: string;
  location?: string;
  focus?: string;
  gpa?: string;
  thesisTitle?: string;
}

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss'],
})
export class EducationComponent {
  educationHistory: EducationEntry[] = [
    {
      institution: 'Sanata Dharma University',
      degree: 'S.Kom',
      major: 'Informatics Engineering',
      years: '2022 - Present',
      location: 'Yogyakarta, Indonesia',
      focus: 'Backend Development & DevOps Engineering',
      gpa: '3.13 / 4.00',
      thesisTitle: '--',
    },
    {
      institution: 'SMA Negeri 1 Bajawa',
      degree: 'Graduate',
      major: 'Natural Science',
      years: '2018 - 2021',
      location: 'Nusa Tenggara Timur, Indonesia',
    },
  ];
}
