import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faExternalLinkAlt,
  faCertificate,
} from '@fortawesome/free-solid-svg-icons';

interface Certificate {
  id: number;
  name: string;
  issuer: string;
  date: string;
  category: 'professional' | 'academic' | 'organization';
  imageUrl?: string;
  credentialUrl?: string;
}

@Component({
  selector: 'app-certificates',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './certificates.component.html',
  styleUrls: ['./certificates.component.scss'],
})
export class CertificatesComponent {
  faExternalLinkAlt = faExternalLinkAlt;
  faCertificate = faCertificate;

  filters = [
    { value: 'all', label: 'All' },
    { value: 'professional', label: 'Professional' },
    { value: 'academic', label: 'Academic' },
    { value: 'organization', label: 'Organization' },
  ];

  activeFilter = 'all';

  certificates: Certificate[] = [
    {
      id: 1,
      name: 'Java Spring Boot: Professional eCommerce Project Masterclass',
      issuer: 'Udemy',
      date: 'Jan 2025',
      category: 'professional',
      imageUrl:
        'https://www.udemy.com/certificate/UC-44a6a723-2640-4d75-9163-127d1114bafa/',
      credentialUrl:
        'https://www.udemy.com/certificate/UC-44a6a723-2640-4d75-9163-127d1114bafa/',
    },
    {
      id: 2,
      name: 'Java Masterclass 2025: 130+ Hours of Expert Lessons',
      issuer: 'Udemy',
      date: 'Jan 2025',
      category: 'professional',
      imageUrl:
        'https://www.udemy.com/certificate/UC-df9665a8-329a-4389-bbd7-86d146fdf362/',
      credentialUrl:
        'https://www.udemy.com/certificate/UC-df9665a8-329a-4389-bbd7-86d146fdf362/',
    },
    {
      id: 3,
      name: 'Master Microservices with Spring Boot and Spring Cloud',
      issuer: 'Udemy',
      date: 'Jan 2025',
      category: 'professional',
      imageUrl:
        'https://www.udemy.com/certificate/UC-d4439859-9957-4b62-b4f7-99244ec43f04/',
      credentialUrl:
        'https://www.udemy.com/certificate/UC-d4439859-9957-4b62-b4f7-99244ec43f04/',
    },
    {
      id: 4,
      name: 'GAMMAFEST 2024 : Data Science Competition (DSC)',
      issuer: 'GAMMA Sigma Beta IPB University',
      date: 'Mei 2024',
      category: 'academic',
      imageUrl:
        'https://drive.google.com/file/d/1la4pyxO9ttCn3lhqfEFWkdk86r397xw6/view?usp=sharing',
      credentialUrl:
        'https://drive.google.com/file/d/1la4pyxO9ttCn3lhqfEFWkdk86r397xw6/view?usp=sharing',
    },
    {
      id: 5,
      name: 'Informatics Student Organization',
      issuer: 'Sanata Dharma University',
      date: 'Nov 2023',
      category: 'organization',
      imageUrl:
        'https://drive.google.com/file/d/16GMJAy0L-5EutaHbSwxCcGdWhDxPC3Wt/view?usp=sharing',
      credentialUrl:
        'https://drive.google.com/file/d/16GMJAy0L-5EutaHbSwxCcGdWhDxPC3Wt/view?usp=sharing',
    },

    {
      id: 6,
      name: 'Sports Week Committee',
      issuer: 'Informatics Student Organization',
      date: 'April 2023',
      category: 'organization',
      imageUrl:
        'https://drive.google.com/file/d/1BIx23G-B6VfUUDXVuUupsjAcOSbMrn4b/view?usp=sharing',
      credentialUrl:
        'https://drive.google.com/file/d/1BIx23G-B6VfUUDXVuUupsjAcOSbMrn4b/view?usp=sharing',
    },
    {
      id: 7,
      name: 'General Election Committee',
      issuer: 'aculty of Science and Technology',
      date: 'Nov 2023',
      category: 'organization',
      imageUrl:
        'https://drive.google.com/file/d/1PvbUty0XiByNbRpHxKG7bQKtyA2Xxduq/view?usp=sharing',
      credentialUrl:
        'https://drive.google.com/file/d/1PvbUty0XiByNbRpHxKG7bQKtyA2Xxduq/view?usp=sharing',
    },
  ];

  get filteredCertificates(): Certificate[] {
    if (this.activeFilter === 'all') {
      return this.certificates;
    }
    return this.certificates.filter(
      (cert) => cert.category === this.activeFilter
    );
  }

  setFilter(filter: string): void {
    this.activeFilter = filter;
  }
}
