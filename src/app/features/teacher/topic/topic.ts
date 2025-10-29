import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common'; 

interface TopicRow {
  name: string;
  assignments: number;
  enabled?: boolean;
}

@Component({
  selector: 'app-topic',
  imports: [FormsModule,CommonModule],
  templateUrl: './topic.html',
  styleUrl: './topic.scss',
})
export class Topic {

q = '';
  rows: TopicRow[] = [
    { name: 'Algebra',      assignments: 5, enabled: true },
    { name: 'Geometry',     assignments: 3, enabled: true },
    { name: 'Calculus',     assignments: 2, enabled: true },
    { name: 'Statistics',   assignments: 4, enabled: true },
    { name: 'Trigonometry', assignments: 1, enabled: true },
  ];

  filtered() {
    const t = this.q.trim().toLowerCase();
    return !t ? this.rows : this.rows.filter(r => r.name.toLowerCase().includes(t));
  }

  addTopic() { alert('Add Topic'); }
  enable(r: TopicRow) { r.enabled = true; /* call API here */ }
}