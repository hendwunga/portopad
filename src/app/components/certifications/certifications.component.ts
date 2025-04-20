import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Certification {
  title: string;
  provider: string;
  completedDate: string;
  instructors: string[];
  certificateUrl?: string;
}

@Component({
  selector: 'app-certifications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './certifications.component.html',
  styleUrls: ['./certifications.component.scss'],
})
export class CertificationsComponent implements OnInit {
  allCertifications: Certification[] = [
    {
      title: 'Java Spring Boot: Professional eCommerce Project Masterclass',
      provider: 'Udemy',
      completedDate: 'Jan 2025',
      instructors: ['Faisal Memon (EmbarkX)', 'EmbarkX Official'],
      certificateUrl:
        'https://www.udemy.com/certificate/UC-44a6a723-2640-4d75-9163-127d1114bafa/',
    },
    {
      title: 'Java Masterclass 2025: 130+ Hours of Expert Lessons',
      provider: 'Udemy',
      completedDate: 'Jan 2025',
      instructors: [
        'Tim Buchalka',
        "Tim Buchalka's Learn Programming Academy",
        'Edwin Einsen Vásquez Velásquez',
        'Igor Popovic',
        'Eddie Chiang',
      ],
      certificateUrl:
        'https://www.udemy.com/certificate/UC-df9665a8-329a-4389-bbd7-86d146fdf362/',
    },
    {
      title: 'Master Microservices with Spring Boot and Spring Cloud',
      provider: 'Udemy',
      completedDate: 'Jan 2025',
      instructors: ['in28Minutes Official'],
      certificateUrl:
        'https://www.udemy.com/certificate/UC-1f4f0336-a850-47dc-9490-c243d8cc66ea/',
    },
  ];

  displayedCertifications: Certification[] = [];
  readonly displayLimit = 3;
  showAll = false;

  ngOnInit(): void {
    this.updateDisplayedCertifications();
  }

  private updateDisplayedCertifications(): void {
    if (this.showAll) {
      this.displayedCertifications = this.allCertifications;
    } else {
      this.displayedCertifications = this.allCertifications.slice(
        0,
        this.displayLimit
      );
    }
  }

  loadAllCertifications(): void {
    this.showAll = true;
    this.updateDisplayedCertifications();
  }

  get shouldShowLoadMoreButton(): boolean {
    return this.allCertifications.length > this.displayLimit && !this.showAll;
  }
}
