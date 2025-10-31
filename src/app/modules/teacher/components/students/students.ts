import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';   // <-- gives *ngFor/*ngIf
import { FormsModule } from '@angular/forms';     // <-- gives [(ngModel)]
interface StudentRow {
  name: string;
  avg: number;       // %
  completed: number;
  total: number;
}
@Component({
  selector: 'app-students',
  imports: [CommonModule, FormsModule], 
  templateUrl: './students.html',
  styleUrl: './students.scss',
})
export class Students {

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
    return !t ? this.rows : this.rows.filter(r => r.name.toLowerCase().includes(t));
  }

  addStudent() {
    // hook to dialog/route later
    alert('Add Student');
  }

  viewMore(s: StudentRow) {
    // navigate to /students/:id later
    alert(`View ${s.name}`);
  }
}