import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { TeacherClassesService, ClassDetailsDto } from '../../../core/services/teacher-classes.service';

@Component({
  selector: 'app-create-class-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatDialogTitle, MatDialogContent, MatDialogActions],
  template: `
    <h2 mat-dialog-title>Create New Class</h2>
    <mat-dialog-content>
      <form [formGroup]="form" style="display:grid; gap:12px; width:100%; margin-top:8px;">
        <mat-form-field appearance="outline">
          <mat-label>Class Name</mat-label>
          <input matInput formControlName="className" required>
        </mat-form-field>
        <mat-form-field appearance="outline">
          <mat-label>Description</mat-label>
          <input matInput formControlName="description">
        </mat-form-field>
      </form>
      <p class="error" *ngIf="error">{{ error }}</p>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="close()">Cancel</button>
      <button mat-raised-button color="primary" [disabled]="form.invalid || loading" (click)="create()">Create</button>
    </mat-dialog-actions>
  `
})
export class CreateClassDialog {
  private fb = inject(FormBuilder);
  private svc = inject(TeacherClassesService);
  private ref = inject(MatDialogRef<CreateClassDialog>);

  loading = false;
  error: string | null = null;

  form = this.fb.group({
    className: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(120)]],
    description: [''],
  });

  close() { this.ref.close(false); }

  create() {
    if (this.form.invalid) return;
    this.loading = true; this.error = null;
    const v = this.form.getRawValue();
    const dto: ClassDetailsDto = { id: null, className: v.className!, description: v.description || '', teacherId: 123, dp: '' };
    this.svc.create(dto).subscribe({
      next: _ => { this.loading = false; this.ref.close(true); },
      error: err => { this.error = err?.error?.message || 'Failed to create class'; this.loading = false; }
    });
  }
}

