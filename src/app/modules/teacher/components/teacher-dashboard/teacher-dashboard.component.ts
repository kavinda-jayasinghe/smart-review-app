import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-teacher-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './teacher-dashboard.component.html',
  styleUrls: ['./teacher-dashboard.component.scss']
})
export class TeacherDashboardComponent {
  isModalOpen = false;

  openModal() {
    console.log('Button clicked!'); // ✅ To verify click works
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }
}