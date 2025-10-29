import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

type Status = 'active' | 'inactive'; // future use
interface StudentRow {
  name: string;
  avg: number;           // percentage
  completed: number;
  total: number;
}
@Component({
    standalone: true,
  selector: 'app-student',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './student.html',
  styleUrl: './student.scss',
})
export class Student {

 q = '';

  rows: StudentRow[] = [
    { name: 'Ethan Harper',  avg: 85, completed: 20, total: 25 },
    { name: 'Olivia Bennett',avg: 92, completed: 18, total: 20 },
    { name: 'Noah Carter',   avg: 78, completed: 15, total: 20 },
    { name: 'Ava Morgan',    avg: 90, completed: 22, total: 25 },
    { name: 'Liam Foster',   avg: 88, completed: 10, total: 10 },
  ];

  filtered() {
    const t = this.q.trim().toLowerCase();
    return !t ? this.rows :
      this.rows.filter(r => r.name.toLowerCase().includes(t));
  }

  addStudent() {
    // hook up to dialog or route later
    alert('Add Student clicked');
  }

  viewMore(s: StudentRow) {
    // navigate to profile page later
    alert(`View ${s.name}`);
  }
}
