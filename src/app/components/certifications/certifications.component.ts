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
  professionalCertifications: Certification[] = [
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
      instructors: ['Tim Buchalka', /*...*/ 'Eddie Chiang'],
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
    {
      title: 'GAMMAFEST 2024 : Data Science Competition (DSC)',
      provider: 'Gamma Sigma Beta IPB University',
      completedDate: 'Mei 2024',
      instructors: ['Gamma Sigma Beta IPB University'],
      certificateUrl:
        'https://drive.google.com/file/d/1la4pyxO9ttCn3lhqfEFWkdk86r397xw6/view?usp=sharing',
    },
  ];

  organizationCertifications: Certification[] = [
    {
      title: 'Informatics Student Organization',
      provider: 'Sanata Dharma University',
      completedDate: 'Nov 2023',
      instructors: ['Sanata Dharma University'],
      certificateUrl:
        'https://drive.google.com/file/d/16GMJAy0L-5EutaHbSwxCcGdWhDxPC3Wt/view?usp=sharing',
    },
    {
      title: 'Webinars: How to Become a DevOps Engineer',
      provider: 'Informatics Student Organization',
      completedDate: 'Okt 2022',
      instructors: ['Informatics Student Organization'],
      certificateUrl:
        'https://drive.google.com/file/d/1yg-L_NvxtEmcHTkdjv-WOQflL5I0Xcf0/view?usp=sharing',
    },
    {
      title: 'Informatics Learning ',
      provider: 'Informatics Student Organization',
      completedDate: 'Nov 2022',
      instructors: ['Informatics Student Organization'],
      certificateUrl:
        'https://drive.google.com/file/d/1XJaUyPg92rfOOF7Njx4IgQQcAuKJfvVh/view?usp=sharing',
    },
    {
      title: 'Metaverse Webinar ',
      provider: 'Informatics Student Organization',
      completedDate: 'Sept 2022',
      instructors: ['Informatics Student Organization'],
      certificateUrl:
        'https://drive.google.com/file/d/1XJaUyPg92rfOOF7Njx4IgQQcAuKJfvVh/view?usp=sharing',
    },
    {
      title: 'Sports Week Committee',
      provider: 'Informatics Student Organization',
      completedDate: 'April 2023',
      instructors: ['Informatics Student Organization'],
      certificateUrl:
        'https://drive.google.com/file/d/1BIx23G-B6VfUUDXVuUupsjAcOSbMrn4b/view?usp=sharing',
    },
    {
      title: 'General Election Committee',
      provider: 'Faculty of Science and Technology',
      completedDate: 'Nov 2023',
      instructors: ['Faculty of Science and Technology'],
      certificateUrl:
        'https://drive.google.com/file/d/1PvbUty0XiByNbRpHxKG7bQKtyA2Xxduq/view?usp=sharing',
    },
  ];

  displayedProfessionalCertifications: Certification[] = [];
  displayedOrganizationCertifications: Certification[] = [];

  showAllProfessional = false;
  showAllOrganization = false;

  readonly displayLimit = 3;

  constructor() {}

  ngOnInit(): void {
    this.updateProfessionalList();
    this.updateOrganizationList();
  }

  private updateProfessionalList(): void {
    if (this.showAllProfessional) {
      this.displayedProfessionalCertifications =
        this.professionalCertifications;
    } else {
      this.displayedProfessionalCertifications =
        this.professionalCertifications.slice(0, this.displayLimit);
    }
  }

  private updateOrganizationList(): void {
    if (this.showAllOrganization) {
      this.displayedOrganizationCertifications =
        this.organizationCertifications;
    } else {
      this.displayedOrganizationCertifications =
        this.organizationCertifications.slice(0, this.displayLimit);
    }
  }

  loadAllProfessional(): void {
    this.showAllProfessional = true;
    this.updateProfessionalList();
  }

  loadAllOrganization(): void {
    this.showAllOrganization = true;
    this.updateOrganizationList();
  }

  get shouldShowProfessionalLoadMore(): boolean {
    return (
      this.professionalCertifications.length > this.displayLimit &&
      !this.showAllProfessional
    );
  }

  get shouldShowOrganizationLoadMore(): boolean {
    return (
      this.organizationCertifications.length > this.displayLimit &&
      !this.showAllOrganization
    );
  }
}
