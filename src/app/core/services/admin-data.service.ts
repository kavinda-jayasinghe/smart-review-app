import { Injectable } from '@angular/core';
import { AdminStats } from '../models/stats.model';
import { Student } from '../models/student.model';
import { Teacher } from '../models/teacher.model';
import { MessageThreadPreview } from '../models/message.model';

@Injectable({ providedIn: 'root' })
export class AdminDataService {
  getAdminStats(): AdminStats {
    return {
      totalStudents: 500,
      totalTeachers: 50,
      totalClasses: 100,
      activeToday: 100, // screenshot shows Active Students Today 100
      newSignups7d: 35,
    };
  }

  getStudents(page = 1, pageSize = 4): { data: Student[]; total: number } {
    const all: Student[] = [
      { id: 1, name: 'Kavinda', age: 17 },
      { id: 2, name: 'Vihanga', age: 16 },
      { id: 3, name: 'Dulsara', age: 18 },
      { id: 4, name: 'Nuwan', age: 17 },
      { id: 5, name: 'Sithmi', age: 16 },
      { id: 6, name: 'Tharushi', age: 17 },
      { id: 7, name: 'Kasun', age: 18 },
      { id: 8, name: 'Ravindu', age: 17 },
    ];

    const start = (page - 1) * pageSize;
    const data = all.slice(start, start + pageSize);
    return { data, total: all.length };
  }

  getTeachers(page = 1, pageSize = 4): { data: Teacher[]; total: number } {
    const all: Teacher[] = [
      { id: 1, name: 'Mr. Perera', subject: 'Mathematics' },
      { id: 2, name: 'Ms. Silva', subject: 'Science' },
      { id: 3, name: 'Mr. Fernando', subject: 'English' },
      { id: 4, name: 'Ms. Rajapaksa', subject: 'History' },
      { id: 5, name: 'Mr. Jayasuriya', subject: 'ICT' },
      { id: 6, name: 'Ms. Kumudini', subject: 'Biology' },
    ];

    const start = (page - 1) * pageSize;
    const data = all.slice(start, start + pageSize);
    return { data, total: all.length };
  }

  getMessageThreads(): MessageThreadPreview[] {
    return [
      {
        id: 1,
        senderName: 'Kavinda',
        lastMessage: 'Hey, how was the test?',
        timeLabel: '10:30 AM',
      },
      {
        id: 2,
        senderName: 'Dulsara',
        lastMessage: "Don't forget the assignment!",
        timeLabel: 'Yesterday',
      },
      {
        id: 3,
        senderName: 'Vihaga',
        lastMessage: 'See you in class',
        timeLabel: '2 days ago',
      },
      {
        id: 4,
        senderName: 'Nuwan',
        lastMessage: "Let's study together",
        timeLabel: '3 days ago',
      },
    ];
  }
}
