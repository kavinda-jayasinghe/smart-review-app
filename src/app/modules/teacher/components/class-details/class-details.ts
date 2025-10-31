import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TeacherService } from '../../services/teacher.service';

import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

import { NotFound } from "../../../../shared/components/not-found";
import { ClassDataService } from '../../services/class-data/class-data';
import { Students } from '../students/students';
import { Overview } from '../overview/overview';
import { Topic } from '../topic/topic';
import { Assignments } from "../assignments/assignments";

type Tab = 'overview' | 'topics' | 'assignments' | 'students';
@Component({
  selector: 'app-class-details',

  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatListModule, Students, Overview, Topic, Assignments],
  templateUrl: './class-details.html',
  styleUrl: './class-details.scss',
})
export class ClassDetails {
  classId!: number;
  classData: any;
  title = '';
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
      this.title=data.className;
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
