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
      institution: 'Universitas Sanata Dharma',
      degree: 'S.Kom',
      major: 'Teknik Informatika',
      years: '2022 - Present',
      location: 'Yogyakarta, Indonesia',
      focus: 'Backend Development & DevOps Engineering',
      gpa: '3.16 / 4.00',
      thesisTitle: '-',
    },
    {
      institution: 'SMA Negeri 1 Bajawa',
      degree: 'Lulusan',
      major: 'Ilmu Pengetahuan Alam',
      years: '2018 - 2021',
      location: 'Bajawa, Indonesia',
    },
  ];
}
