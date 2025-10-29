import { Component, computed, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormArray, FormControl, FormGroup } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { TeacherAssignmentsService, AssignmentDetailsDto, AssignmentResponseDto } from '../../../core/services/teacher-assignments.service';
import { TeacherClassesService, ClassDetailsDto } from '../../../core/services/teacher-classes.service';
import { TeacherTopicsService, TopicResponseDto } from '../../../core/services/teacher-topics.service';
import { TeacherMcqService, McqDetailsDto, McqResponseDto } from '../../../core/services/teacher-mcq.service';

@Component({
  selector: 'app-assignments',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule, MatListModule],
  templateUrl: './assignments.html',
  styleUrls: ['./assignments.scss'],
})
export class Assignments {
  classes = signal<ClassDetailsDto[] | null>(null);
  topics = signal<TopicResponseDto[] | null>(null);
  assignments = signal<AssignmentResponseDto[] | null>(null);
  selectedClassId = signal<number | null>(null);
  selectedAssignment = signal<AssignmentResponseDto | null>(null);
  loading = signal(false);
  error = signal<string | null>(null);

  // DI helper usable in field initializers
  private fb = inject(FormBuilder);

  // Create / Update Assignment
  form = this.fb.group({
    assignmentName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(120)]],
    timeDuration: ['01:00:00', Validators.required],
    startTime: ['', Validators.required],
    endTime: ['', Validators.required],
    isMcq: [true, Validators.required],
    topicId: [null as number | null, Validators.required],
  });

  // Bulk MCQs for selected assignment
  mcqs = new FormArray<McqForm>([]);
  hasSelection = computed(() => !!this.selectedAssignment());

  constructor(
    private classesSvc: TeacherClassesService,
    private topicsSvc: TeacherTopicsService,
    private assignmentsSvc: TeacherAssignmentsService,
    private mcqSvc: TeacherMcqService,
  ) {
    this.loadRefs();
  }

  loadRefs() {
    this.loading.set(true); this.error.set(null);
    this.classesSvc.list().subscribe({ next: list => this.classes.set(list), error: () => {} });
    this.topicsSvc.list().subscribe({ next: list => this.topics.set(list), error: () => {} });
    this.loading.set(false);
  }

  onClassChange(classId: number | null) {
    this.selectedClassId.set(classId);
    this.assignments.set(null);
    this.selectedAssignment.set(null);
    if (!classId) return;
    this.loading.set(true); this.error.set(null);
    this.assignmentsSvc.listByClassId(classId).subscribe({
      next: list => { this.assignments.set(list); this.loading.set(false); },
      error: err => { this.error.set(err?.error?.message || 'Failed to load assignments'); this.loading.set(false); }
    });
  }

  submitAssignment() {
    if (this.form.invalid) return;
    const dto = this.form.getRawValue() as AssignmentDetailsDto;
    this.loading.set(true); this.error.set(null);
    this.assignmentsSvc.create(dto).subscribe({
      next: created => {
        // refresh list for the class of the topic, if known
        const t = this.topics()?.find(x => x.id === dto.topicId);
        if (t) this.onClassChange(t.classId);
        this.form.reset({ assignmentName: '', timeDuration: '01:00:00', startTime: '', endTime: '', isMcq: true, topicId: null });
        this.selectedAssignment.set(created);
        this.mcqs.clear();
      },
      error: err => { this.error.set(err?.error?.message || 'Create failed'); this.loading.set(false); }
    });
  }

  viewAssignment(a: AssignmentResponseDto) { this.selectedAssignment.set(a); this.mcqs.clear(); }
  clearSelection() { this.selectedAssignment.set(null); this.mcqs.clear(); }
  removeAssignment(a: AssignmentResponseDto) {
    if (!confirm('Delete assignment?')) return;
    this.loading.set(true); this.error.set(null);
    this.assignmentsSvc.delete(a.id).subscribe({
      next: () => {
        const cid = this.selectedClassId();
        if (cid) this.onClassChange(cid); else { this.assignments.set(null); this.loading.set(false); }
        if (this.selectedAssignment()?.id === a.id) this.clearSelection();
      },
      error: err => { this.error.set(err?.error?.message || 'Delete failed'); this.loading.set(false); }
    });
  }

  // MCQ bulk form helpers
  addMcq() { this.mcqs.push(this.createMcqGroup()); }
  removeMcq(i: number) { this.mcqs.removeAt(i); }
  private createMcqGroup(): McqForm {
    return this.fb.nonNullable.group({
      question: ['', Validators.required],
      optionA: ['', Validators.required],
      optionB: ['', Validators.required],
      optionC: [''],
      optionD: [''],
      correctAnswer: ['', Validators.required],
    });
  }

  submitMcqs() {
    const a = this.selectedAssignment();
    if (!a || this.mcqs.length === 0) return;
    const payload: McqDetailsDto[] = this.mcqs.controls.map((g) => {
      const v = g.getRawValue();
      return {
        assignmentId: a.id,
        question: v.question,
        options: [v.optionA, v.optionB, v.optionC, v.optionD].filter(Boolean) as string[],
        correctAnswer: v.correctAnswer,
      };
    });
    this.loading.set(true); this.error.set(null);
    this.mcqSvc.createBulk(payload).subscribe({
      next: (result: McqResponseDto[]) => {
        // update selected assignment mcqs list
        this.selectedAssignment.set({ ...a, mcqs: [...(a.mcqs || []), ...result] });
        this.mcqs.clear();
        this.loading.set(false);
      },
      error: err => { this.error.set(err?.error?.message || 'Failed to add MCQs'); this.loading.set(false); }
    });
  }
}

type McqForm = FormGroup<{
  question: FormControl<string>;
  optionA: FormControl<string>;
  optionB: FormControl<string>;
  optionC: FormControl<string | ''>;
  optionD: FormControl<string | ''>;
  correctAnswer: FormControl<string>;
}>;
