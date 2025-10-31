import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Metric { label: string; value: string; }
interface GlanceItem {
  icon: 'class' | 'assignment' | 'bookmark';
  title: string;
  sub: string;            // time or due text
  actionLabel?: string;   // right side text
}

@Component({
  selector: 'app-teacher-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './teacher-dashboard.component.html',
  styleUrls: ['./teacher-dashboard.component.scss']
})
export class TeacherDashboardComponent {
  name = 'Mr. Nuwan Saranath';

  metrics: Metric[] = [
    { label: 'Completion', value: '72%' },
    { label: 'Overdue reviews', value: '14' },
    { label: 'Total Classes', value: '3' },
    { label: 'Total Students', value: '86' }
  ];

  glance: GlanceItem[] = [
    { icon:'class',      title:'CS101 - Intro to CS',              sub:'10:00 AM - 11:00 AM', actionLabel:'View' },
    { icon:'class',      title:'ENG110 - Academic Writing',        sub:'1:00 PM - 2:00 PM',   actionLabel:'View' },
    { icon:'assignment', title:'Assignment 1 - Intro to CS',       sub:'Due: Sep 15',         actionLabel:'View' },
    { icon:'assignment', title:'Assignment 2 - Calculus II',       sub:'Due: Sep 10',         actionLabel:'View' },
    { icon:'assignment', title:'Assignment 3 - Academic Writing',  sub:'Due: Sep 5',          actionLabel:'View' },
    { icon:'bookmark',   title:'Topics to review',                 sub:'View all',            actionLabel:'View' }
  ];
}