import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TeacherService } from '../../services/teacher.service';

import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { Students } from "../../../../features/teacher/students/students";
import { Assignments } from "../../../../features/student/assignments";
import { NotFound } from "../../../../shared/components/not-found";
import { Overview } from "../../../../features/teacher/overview/overview";
import { ClassDataService } from '../../services/class-data/class-data';
type Tab = 'overview' | 'topics' | 'assignments' | 'students';
@Component({
  selector: 'app-class-details',
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatListModule, Students, Assignments, NotFound, Overview],
  templateUrl: './class-details.html',
  styleUrl: './class-details.scss',
})
export class ClassDetails {
  classId!: number;
  classData: any;
  title = 'Grade 10 Maths';
  tab: Tab = 'overview';


  setTab(t: Tab) { this.tab = t; }
  is(t: Tab) { return this.tab === t; }
  constructor(
    private route: ActivatedRoute, 
    private teacherService: TeacherService,
    private classDataService: ClassDataService
  ) {

  }

  ngOnInit(): void {
    this.classId = Number(this.route.snapshot.paramMap.get('id'));
      this.classDataService.selectedClass$.subscribe(data => {
      this.classData = data;
      console.log('Received class:', this.classData);
    });
    this.loadClassDetails();
  }
  
  loadClassDetails(): void {
    // this.teacherService.getClassById(this.classId).subscribe({
    //   next: (res) => {
    //     this.classData = {
    //       className: res.body.className,
    //       description: res.body.description,
    //       totalStudent: res.body.totalStudent,
    //       image: res.body.dp ? `data:image/jpeg;base64,${res.body.dp}` : 'https://via.placeholder.com/300'
    //     };
    //   },
    //   error: (err) => {
    //     console.error('Error fetching class details:', err);
    //   }
    // });
  }
}
