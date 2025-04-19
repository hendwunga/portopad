import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface GalleryImage {
  src: string;
  alt: string;
  title: string; // Renamed caption to title for clarity
  description: string; // Added description field
}

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'], // Use SCSS file
})
export class GalleryComponent {
  galleryTitle = 'My Activity'; // Section title remains the same
  images: GalleryImage[] = [
    {
      src: 'assets/activity/hmif.JPG',
      alt: 'Anggota HMIF',
      title: 'Himpunan Mahasiswa', // Use as the title below the image
      description:
        'Active participation in the Informatics Student Association activities and events.', // Add a description
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
