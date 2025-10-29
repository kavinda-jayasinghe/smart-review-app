import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { Assignments } from "../assignments/assignments";
interface Metric {
  label: string;
  value: string;
  sub?: string;
}
interface Row {
  assignment: string;
  topic: string;
  due: string;        // keep it simple, already formatted
  status: 'Published' | 'Draft';
  submissions: string;
}
type Tab = 'overview' | 'topics' | 'assignments' | 'students';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatListModule, Assignments],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss'],
})
export class Dashboard {
  title = 'Grade 10 Maths';
  tab: Tab = 'overview';


  metrics: Metric[] = [
    { label: 'Completion % (Today)', value: '76%' },
    { label: 'Overdue Reviews', value: '14' },
    { label: 'Total Assignments', value: '47' },
    { label: 'Total Students', value: '132' },
  ];

  upcoming: Row[] = [
    { assignment: 'Math Quiz 1',        topic: 'Algebra',        due: 'Today 11:59 PM',  status: 'Published', submissions: '18/25' },
    { assignment: 'Science Project',    topic: 'Biology',        due: 'Tomorrow 1:00 PM',status: 'Published', submissions: '22/28' },
    { assignment: 'History Essay',      topic: 'World History',  due: 'Tue 10:00 AM',    status: 'Published', submissions: '15/20' },
    { assignment: 'English Assignment', topic: 'Literature',     due: 'Wed 2:00 PM',     status: 'Published', submissions: '20/24' },
    { assignment: 'Physics Lab Report', topic: 'Physics',        due: 'Thu 4:00 PM',     status: 'Published', submissions: '17/22' },
    { assignment: 'Geography Presentation', topic: 'Geography',  due: 'Fri 11:59 PM',    status: 'Published', submissions: '21/26' },
    { assignment: 'Art Project',        topic: 'Visual Arts',    due: 'Sat 1:00 PM',     status: 'Published', submissions: '19/23' },
  ];

  setTab(t: Tab) { this.tab = t; }
  is(t: Tab) { return this.tab === t; }
}
