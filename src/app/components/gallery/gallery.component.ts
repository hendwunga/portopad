import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface GalleryImage {
  src: string;
  alt: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
})
export class GalleryComponent {
  galleryTitle = 'My Activity';
  images: GalleryImage[] = [
    {
      src: 'assets/activity/hmif.JPG',
      alt: 'Anggota HMIF',
      title: 'Himpunan Mahasiswa',
      description:
        'Active participation in the Informatics Student Association activities and events.',
    },
    {
      src: 'assets/activity/projekInfo.jpg',
      alt: 'Presentasi Proyek Informatika',
      title: 'Project Presentation',
      description:
        'Presenting a group project for the final assessment in an Informatics course.',
    },
    {
      src: 'assets/activity/ITDay.JPG',
      alt: 'Panitia IT Day',
      title: 'IT Day Committee',
      description:
        'Volunteering as part of the organizing committee for the campus IT Day event.',
    },
  ];
}
