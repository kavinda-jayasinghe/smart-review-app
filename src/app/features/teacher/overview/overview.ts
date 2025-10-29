import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Metric { label: string; value: string; }
interface Row {
  assignment: string;
  topic: string;
  due: string;
  status: 'Published';
  submissions: string; // "18/25"
}

@Component({
  selector: 'app-overview',
  imports: [CommonModule],
  templateUrl: './overview.html',
  styleUrl: './overview.scss',
})
export class Overview {
 metrics: Metric[] = [
    { label: 'Completion % (Today)', value: '76%' },
    { label: 'Overdue Reviews',      value: '14' },
    { label: 'Total Assignments',    value: '47' },
    { label: 'Total Students',       value: '132' },
  ];

  rows: Row[] = [
    { assignment:'Math Quiz 1',           topic:'Algebra',       due:'Today 11:59 PM',   status:'Published', submissions:'18/25' },
    { assignment:'Science Project',       topic:'Biology',       due:'Tomorrow 1:00 PM', status:'Published', submissions:'22/28' },
    { assignment:'History Essay',         topic:'World History', due:'Tue 10:00 AM',     status:'Published', submissions:'15/20' },
    { assignment:'English Assignment',    topic:'Literature',    due:'Wed 2:00 PM',      status:'Published', submissions:'20/24' },
    { assignment:'Physics Lab Report',    topic:'Physics',       due:'Thu 4:00 PM',      status:'Published', submissions:'17/22' },
    { assignment:'Geography Presentation',topic:'Geography',     due:'Fri 11:59 PM',     status:'Published', submissions:'21/26' },
    { assignment:'Art Project',           topic:'Visual Arts',   due:'Sat 1:00 PM',      status:'Published', submissions:'19/23' },
  ];
}