import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink } from '@angular/router';
import { TeacherTopicsService, TopicResponseDto, TopicDetailsDto } from '../../../core/services/teacher-topics.service';
import { TeacherClassesService, ClassDetailsDto } from '../../../core/services/teacher-classes.service';

@Component({
  selector: 'app-topics',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule, RouterLink],
  templateUrl: './topics.html',
  styleUrls: ['./topics.scss'],
})
export class Topics {
  topics = signal<TopicResponseDto[] | null>(null);
  classes = signal<ClassDetailsDto[] | null>(null);
  loading = signal(false);
  error = signal<string | null>(null);

  private fb = inject(FormBuilder);
  form = this.fb.group({
    id: [null as number | null],
    title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(120)]],
    class_id: [null as number | null, Validators.required],
    class_name: ['']
  });

  constructor(private topicsSvc: TeacherTopicsService, private classesSvc: TeacherClassesService) {
    this.refresh();
  }

  refresh() {
    this.loading.set(true); this.error.set(null);
    this.classesSvc.list().subscribe({ next: list => this.classes.set(list), error: () => {} });
    this.topicsSvc.list().subscribe({
      next: list => { this.topics.set(list); this.loading.set(false); },
      error: err => { this.error.set(err?.error?.message || 'Failed to load'); this.loading.set(false); }
    });
  }
  edit(t: TopicResponseDto) {
    this.form.setValue({ id: t.id, title: t.title, class_id: t.classId, class_name: t.className });
  }
  resetForm() { this.form.reset({ id: null, title: '', class_id: null, class_name: '' }); }
  save() {
    if (this.form.invalid) return;
    const value = this.form.getRawValue() as TopicDetailsDto;
    this.loading.set(true); this.error.set(null);
    const op = value.id ? this.topicsSvc.update(value.id, value) : this.topicsSvc.create(value);
    op.subscribe({ next: _ => { this.resetForm(); this.refresh(); }, error: err => { this.error.set(err?.error?.message || 'Save failed'); this.loading.set(false); } });
  }
  remove(t: TopicResponseDto) {
    if (!confirm('Delete topic?')) return;
    this.loading.set(true); this.error.set(null);
    this.topicsSvc.delete(t.id).subscribe({ next: () => this.refresh(), error: err => { this.error.set(err?.error?.message || 'Delete failed'); this.loading.set(false); } });
  }
}
