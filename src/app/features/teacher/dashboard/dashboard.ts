import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TeacherClassesService, ClassDetailsDto } from '../../../core/services/teacher-classes.service';
import { TeacherTopicsService, TopicResponseDto } from '../../../core/services/teacher-topics.service';
import { TeacherAssignmentsService, AssignmentResponseDto } from '../../../core/services/teacher-assignments.service';
import { CreateClassDialog } from './create-class-dialog';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, MatCardModule, MatButtonModule, MatIconModule, MatListModule, MatDialogModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss'],
})
export class Dashboard {
  private classesSvc = inject(TeacherClassesService);
  private topicsSvc = inject(TeacherTopicsService);
  private assignmentsSvc = inject(TeacherAssignmentsService);
  private dialog = inject(MatDialog);

  loading = signal(true);
  error = signal<string | null>(null);
  classes = signal<ClassDetailsDto[] | null>(null);
  topics = signal<TopicResponseDto[] | null>(null);
  upcoming = signal<AssignmentResponseDto[]>([]);

  totalClasses = computed(() => this.classes()?.length ?? 0);
  totalTopics = computed(() => this.topics()?.length ?? 0);
  totalAssignments = computed(() => (this.topics()?.reduce((n, t) => n + (t.numberOfAssignment || 0), 0)) || 0);

  constructor() {
    this.load();
  }

  load() {
    this.loading.set(true);
    this.error.set(null);
    // Load classes and topics first
    this.classesSvc.list().subscribe({
      next: list => {
        this.classes.set(list);
        this.fetchUpcoming(list);
      },
      error: err => { this.error.set(err?.error?.message || 'Failed to load classes'); this.loading.set(false); }
    });
    this.topicsSvc.list().subscribe({
      next: list => this.topics.set(list),
      error: err => this.error.set(err?.error?.message || 'Failed to load topics')
    });
  }

  private fetchUpcoming(list: ClassDetailsDto[]) {
    const promises = list.map(c => new Promise<AssignmentResponseDto[]>((resolve) => {
      if (!c.id) { resolve([]); return; }
      this.assignmentsSvc.listByClassId(c.id).subscribe({
        next: xs => resolve(xs || []),
        error: _ => resolve([])
      });
    }));
    Promise.all(promises).then(groups => {
      const flat = groups.flat();
      const now = new Date().getTime();
      const upcoming = flat
        .filter(a => Date.parse(a.startTime) >= now)
        .sort((a, b) => Date.parse(a.startTime) - Date.parse(b.startTime))
        .slice(0, 5);
      this.upcoming.set(upcoming);
      this.loading.set(false);
    }).catch(() => {
      this.upcoming.set([]);
      this.loading.set(false);
    });
  }

  openCreateClass() {
    const ref = this.dialog.open(CreateClassDialog, { width: '520px' });
    ref.afterClosed().subscribe(ok => { if (ok) this.load(); });
  }
}
