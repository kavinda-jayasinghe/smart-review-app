import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';


export interface StudentRow {
  name: string;
  avg: number;           // percentage
  completed: number;
  total: number;
}

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [FormsModule],    
  templateUrl: './student.html',
  styleUrl: './student.scss',
})
export class StudentComponent {
  
/** Search query */
  q = '';

  /** Sample data */
  rows: StudentRow[] = [
    { name: 'Ethan Harper',    avg: 85, completed: 20, total: 25 },
    { name: 'Olivia Bennett',  avg: 92, completed: 18, total: 20 },
    { name: 'Noah Carter',     avg: 78, completed: 15, total: 20 },
    { name: 'Ava Morgan',      avg: 90, completed: 22, total: 25 },
    { name: 'Liam Foster',     avg: 88, completed: 10, total: 10 },
  ];

  /** Filter logic */
  filtered(): StudentRow[] {
    const query = this.q.trim().toLowerCase();
    if (!query) return this.rows;
    return this.rows.filter(s => s.name.toLowerCase().includes(query));
  }

  /** Actions */
  addStudent(): void {
    alert('Add Student clicked');
  }

  viewMore(student: StudentRow): void {
    alert(`View ${student.name}`);
  }

  /** trackBy function – MUST accept index and item */
  trackByName(index: number, student: StudentRow): string {
    return student.name;
  }
}