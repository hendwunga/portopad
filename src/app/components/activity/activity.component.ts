import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';

interface Activity {
  id: number;
  title: string;
  description: string; // Deskripsi akan diubah ke bahasa Inggris
  year: string;
  link?: string;
}

@Component({
  selector: 'app-activity',
  standalone: true,
  imports: [CommonModule], // FaIconComponent removed as it is not used in the template
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss'],
})
export class ActivityComponent {
  faLink = faLink;

  activities: Activity[] = [
    {
      id: 1,
      title: 'Software Development Team Lead',
      // Deskripsi diubah ke Bahasa Inggris
      description:
        'Led a team of 3 developers to build the DifabelZone e-commerce application in Yogyakarta. ' +
        'Contributed to the architecture design and implementation of key features.',
      year: '2024', // Sesuaikan tahun
    },
    {
      id: 2,
      title: 'Member of Informatics Student Association (HMIF)',
      // Deskripsi diubah ke Bahasa Inggris
      description:
        'Actively participated in activities and events organized by the Informatics Student Association.',
      year: '2022',
    },
    {
      id: 3,
      title: 'Committee Member for PORSI Event',
      // Deskripsi diubah ke Bahasa Inggris
      description:
        'Served as a committee member for the annual Faculty Sports and Arts Week (PORSI) event, managing one of the event divisions.',
      year: '2022',
    },
    {
      id: 4,
      title: 'Committee Member for Faculty General Election',
      // Deskripsi diubah ke Bahasa Inggris
      description:
        'Involved in the committee for organizing the General Election process at the Faculty of Science and Technology level.',
      year: '2023',
    },
    {
      id: 5,
      title: 'Leading Database Project (Final Project)',
      // Deskripsi diubah ke Bahasa Inggris
      description:
        'Led a team in designing and implementing a database as part of the final project for an Informatics course.',
      year: '2023',
    },
    {
      id: 6,
      title: 'Participant in GAMMAFEST Data Science Competition',
      // Deskripsi diubah ke Bahasa Inggris
      description:
        'Participated in the Data Science Competition as part of the GAMMAFEST event series.',
      year: '2024',
      // link: 'URL_INFO_LOMBA_ATAU_HASIL',
    },
    {
      id: 7,
      title: 'Leading Software Design Project for Farming Store',
      // Deskripsi diubah ke Bahasa Inggris
      description:
        'Led a team in designing the software architecture and details for a farming store system.',
      year: '2024',
      // link: 'URL_DOKUMENTASI_RANCANGAN',
    },
    // Jika Anda juga ingin memasukkan kembali aktivitas lama (deskripsi dalam Bahasa Inggris):
    /*
    {
      id: 8,
      title: 'Hackathon Winner',
      description: 'Won first place in a 48-hour hackathon by developing an innovative solution...',
      year: '2022', // Sesuaikan tahun
      link: 'https://example.com/hackathon', // Ganti jika ada link aktual
    },
     {
      id: 9,
      title: 'Research Assistant',
      description: 'Assisted in research on artificial intelligence applications in healthcare...',
      year: '2021', // Sesuaikan tahun
      // link: 'URL_PUBLIKASI_JIKA_ADA',
    },
    {
      id: 10,
      title: 'Workshop Facilitator',
      description: 'Organized and conducted workshops on web development technologies...',
      year: '2020', // Sesuaikan tahun
      // link: 'URL_INFO_WORKSHOP_JIKA_ADA',
    },
    */
  ];

  get sortedActivities(): Activity[] {
    return this.activities
      .slice()
      .sort((a, b) => parseInt(b.year) - parseInt(a.year));
  }
}
