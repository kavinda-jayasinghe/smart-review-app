import { Component, effect, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CreateClassDialog } from '../dashboard/create-class-dialog';
import { TeacherClassesService, ClassDetailsDto } from '../../../core/services/teacher-classes.service';

@Component({
  selector: 'app-classes',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatListModule, MatIconModule, RouterLink, MatDialogModule],
  templateUrl: './classes.html',
  styleUrls: ['./classes.scss'],
})
export class Classes {
  classes = signal<ClassDetailsDto[] | null>(null);
  loading = signal(false);
  error = signal<string | null>(null);
  selected = signal<ClassDetailsDto | null>(null);

  private fb = inject(FormBuilder);
  form = this.fb.group({
    id: [null as number | null],
    className: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(120)]],
    description: [''],
    teacherId: [123, Validators.required],
    dp: [''],
  });

  private dialog = inject(MatDialog);
  constructor(private svc: TeacherClassesService) {
    this.refresh();
    effect(() => {
      const s = this.selected();
      if (s) this.form.patchValue(s);
    });
  }

  refresh() {
    this.loading.set(true); this.error.set(null);
    this.svc.list().subscribe({
      next: list => { this.classes.set(list); this.loading.set(false); },
      error: err => { this.error.set(err?.error?.message || 'Failed to load'); this.loading.set(false); }
    });
  }

  edit(item: ClassDetailsDto) { this.selected.set(item); }
  resetForm() { this.selected.set(null); this.form.reset({ id: null, className: '', description: '', teacherId: 123, dp: '' }); }

  save() {
    if (this.form.invalid) return;
    const value = this.form.getRawValue() as ClassDetailsDto;
    this.loading.set(true); this.error.set(null);
    const op = value.id ? this.svc.update(value.id, value) : this.svc.create(value);
    op.subscribe({
      next: _ => { this.resetForm(); this.refresh(); },
      error: err => { this.error.set(err?.error?.message || 'Save failed'); this.loading.set(false); }
    });
  }

  remove(item: ClassDetailsDto) {
    if (!item.id) return;
    if (!confirm('Delete class?')) return;
    this.loading.set(true); this.error.set(null);
    this.svc.delete(item.id).subscribe({
      next: () => this.refresh(),
      error: err => { this.error.set(err?.error?.message || 'Delete failed'); this.loading.set(false); }
    });
  }

  getDp(c: ClassDetailsDto) {
    if (c.dp) return `data:image/png;base64,${c.dp}`;
    const label = encodeURIComponent((c.className || 'Class').slice(0, 12));
    return `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='240'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='%23dbeafe'/><stop offset='1' stop-color='%23ede9fe'/></linearGradient></defs><rect width='100%' height='100%' fill='url(%23g)'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-family='Segoe UI, Roboto, sans-serif' font-size='28' fill='%236b7280'>${label}</text></svg>`;
  }

  openCreateClass() {
    const ref = this.dialog.open(CreateClassDialog, { width: '520px' });
    ref.afterClosed().subscribe(ok => { if (ok) this.refresh(); });
  }
}
