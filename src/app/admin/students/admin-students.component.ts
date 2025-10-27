import { Component } from '@angular/core';
import { AdminDataService } from '../../core/services/admin-data.service';
import { Student } from '../../core/models/student.model';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-admin-students',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './admin-students.component.html',
  styleUrls: ['./admin-students.component.css'],
})
export class AdminStudentsComponent {
  page = 1;
  pageSize = 4;

  students: Student[] = [];
  total = 0;

  constructor(private data: AdminDataService) {
    this.load();
  }

  load() {
    const res = this.data.getStudents(this.page, this.pageSize);
    this.students = res.data;
    this.total = res.total;
  }

  totalPages(): number {
    return Math.ceil(this.total / this.pageSize);
  }

  goToPage(p: number) {
    if (p >= 1 && p <= this.totalPages()) {
      this.page = p;
      this.load();
    }
  }

  pagesArray(): number[] {
    const pages: number[] = [];
    for (let i = 1; i <= this.totalPages(); i++) {
      pages.push(i);
    }
    return pages;
  }
}
