import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Activity {
  id: number;
  title: string;
  description: string;
  year: string;
  link?: string;
}

@Component({
  selector: 'app-activity',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss'],
})
export class ActivityComponent {
  activities: Activity[] = [
    {
      id: 1,
      title: 'Software Development Team Lead',
      description:
        'Led a team of 5 developers to create a campus event management system. Implemented Agile methodologies and delivered the project ahead of schedule.',
      year: '2023',
      link: 'https://drive.google.com/file/d/1ra3pYftfQIUKffIEIjD4R6witcopYKzD/view?usp=sharing',
    },
    {
      id: 2,
      title: 'Open Source Contribution',
      description:
        'Contributed to a popular open-source library by fixing bugs and improving documentation. Received recognition from the project maintainers.',
      year: '2022',
    },
    {
      id: 3,
      title: 'Hackathon Winner',
      description:
        'Won first place in a 48-hour hackathon by developing an innovative solution for community healthcare access using mobile technology.',
      year: '2022',
      link: 'https://example.com/hackathon',
    },
    {
      id: 4,
      title: 'Research Assistant',
      description:
        'Assisted in research on artificial intelligence applications in healthcare, focusing on data analysis and visualization techniques.',
      year: '2021',
    },
    {
      id: 5,
      title: 'Workshop Facilitator',
      description:
        'Organized and conducted workshops on web development technologies for junior students, helping them build their first web applications.',
      year: '2020',
    },
  ];
}
