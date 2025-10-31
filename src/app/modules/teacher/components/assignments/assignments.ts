import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TeacherService } from '../../services/teacher.service';

interface AssignmentRow {
  startDate: string;
  endDate: string;
  title: string;
  topic: string;
  isMcq: boolean;
  submitted: number;
  graded: number;
}

interface TopicItem {
  id: number;
  title: string;
}

@Component({
  selector: 'app-assignments-teacher',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './assignments.html',
  styleUrls: ['./assignments.scss'],
})
export class Assignments {
  q = '';
  showModal = false;
  classId!: number;

  // Data arrays
  rows: AssignmentRow[] = [];
  topics: TopicItem[] = [];

  // Topic selection
  selectedTopicId: number | null = null;

  constructor(
    private teacherService: TeacherService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.classId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadAssignments();
    this.loadTopics();
  }

  /** ✅ Load all topics for the current class */
  loadTopics(): void {
    this.teacherService.getTopicsByClass(this.classId).subscribe({
      next: (res: any) => {
        console.log('📥 Topics Response:', res);
        if (res?.body && Array.isArray(res.body)) {
          this.topics = res.body.map((t: any) => ({
            id: t.id,
            title: t.title,
          }));
        }
        console.log('✅ Topics loaded:', this.topics);
      },
      error: (err) => console.error('❌ Error loading topics:', err),
    });
  }

  /** ✅ Load assignments for the class */
  loadAssignments(): void {
    this.teacherService.getAssignmentsByClass(this.classId).subscribe({
      next: (res: any) => {
        console.log('📥 Assignments Response:', res);
        if (res?.body && Array.isArray(res.body)) {
          this.rows = res.body.map((a: any) => ({
            startDate: a.startTime ? a.startTime.substring(0, 10) : 'N/A',
            endDate: a.endTime ? a.endTime.substring(0, 10) : 'N/A',
            title: a.assignmentName,
            topic: a.topicTitle || 'N/A',
            isMcq: a.isMcq ?? false,
            submitted: a.submittedCount || 0,
            graded: a.gradedCount || 0,
          }));
        }
        console.log('✅ Assignments loaded:', this.rows);
      },
      error: (err) => console.error('❌ Error loading assignments:', err),
    });
  }

  /** ✅ Filter table search */
  filtered(): AssignmentRow[] {
    const term = this.q.trim().toLowerCase();
    return !term
      ? this.rows
      : this.rows.filter(
          (r) =>
            r.title.toLowerCase().includes(term) ||
            r.topic.toLowerCase().includes(term)
        );
  }

  /** ✅ Open modal */
  openModal(): void {
    this.showModal = true;
    this.selectedTopicId = null;
  }

  /** ✅ Close modal */
  closeModal(): void {
    this.showModal = false;
  }

  /** ✅ Add new assignment */
  addAssignment(form: any): void {
    if (form.valid && this.selectedTopicId) {
      const payload = {
        assignmentName: form.value.assignmentName,
        timeDuration: form.value.timeDuration || '01:00:00',
        startTime: new Date(form.value.startTime),
        endTime: new Date(form.value.endTime),
        isMcq:
          form.value.isMcq === 'true' ||
          form.value.isMcq === true ||
          form.value.isMcq === 'yes',
        topicId: this.selectedTopicId,
      };

      console.log('📤 Sending Assignment Payload:', payload);

      this.teacherService.createAssignment(payload).subscribe({
        next: () => {
          console.log('✅ Assignment created successfully');
          this.loadAssignments();
          form.reset();
          this.selectedTopicId = null;
          this.showModal = false;
        },
        error: (err) => console.error('❌ Error creating assignment:', err),
      });
    } else {
      alert('⚠️ Please fill all required fields and select a topic.');
    }
  }
}
