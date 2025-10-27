import { Component, OnInit } from '@angular/core';
import { AdminDataService } from '../../core/services/admin-data.service';
import { AdminStats } from '../../core/models/stats.model';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [NgFor],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  statsCards: { label: string; value: number | string }[] = [];

  constructor(private data: AdminDataService) {}

  ngOnInit(): void {
    const stats: AdminStats = this.data.getAdminStats();
    this.statsCards = [
      { label: 'Total Students', value: stats.totalStudents },
      { label: 'Total Teachers', value: stats.totalTeachers },
      { label: 'Total Classes', value: stats.totalClasses },
      { label: 'Active Students Today', value: stats.activeToday },
      { label: 'New Signups (7-day)', value: stats.newSignups7d },
    ];
  }
}
