import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
interface Metric { label: string; value: string; }
interface GlanceItem { icon: 'class' | 'assignment' | 'bookmark'; title: string; sub: string; }

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
name = 'Mr. Nuwan Saranath';

  metrics: Metric[] = [
    { label: 'Completion', value: '72%' },
    { label: 'Overdue reviews', value: '14' },
    { label: 'Total Classes', value: '3' },
    { label: 'Total Students', value: '86' },
  ];

  glance: GlanceItem[] = [
    { icon:'class',      title:'CS101 - Intro to CS',             sub:'10:00 AM - 11:00 AM' },
    { icon:'class',      title:'ENG110 - Academic Writing',       sub:'1:00 PM - 2:00 PM' },
    { icon:'assignment', title:'Assignment 1 - Intro to CS',      sub:'Due: Sep 15' },
    { icon:'assignment', title:'Assignment 2 - Calculus II',      sub:'Due: Sep 10' },
    { icon:'assignment', title:'Assignment 3 - Academic Writing', sub:'Due: Sep 5' },
    { icon:'bookmark',   title:'Topics to review',                sub:'View all' },
  ];
}