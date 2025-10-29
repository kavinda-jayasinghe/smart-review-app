import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';  
interface ChatItem {
  id: number;
  name: string;
  last: string;     // last message
  time: string;     // 10:30 AM, Yesterday, 2 days ago
  avatar: string;   // image url
}
@Component({
  selector: 'app-message',
  imports: [FormsModule,CommonModule],
  templateUrl: './message.html',
  styleUrl: './message.scss',
})
export class Message {
 q = '';
  chats: ChatItem[] = [
    { id: 1, name: 'Kavinda', last: 'Hey, how was the test?', time: '10:30 AM', avatar: 'https://i.pravatar.cc/64?img=15' },
    { id: 2, name: 'Dulsara', last: "Don't forget the assignment!", time: 'Yesterday', avatar: 'https://i.pravatar.cc/64?img=12' },
    { id: 3, name: 'Vihaga',  last: 'See you in class', time: '2 days ago', avatar: 'https://i.pravatar.cc/64?img=3' },
    { id: 4, name: 'Nuwan',   last: "Let's study together", time: '3 days ago', avatar: 'https://i.pravatar.cc/64?img=7' },
  ];

  filtered() {
    const t = this.q.trim().toLowerCase();
    return !t ? this.chats : this.chats.filter(c =>
      c.name.toLowerCase().includes(t) || c.last.toLowerCase().includes(t)
    );
  }

  openChat(c: ChatItem) {
    // route to /messages/:id later
    alert(`Open chat with ${c.name}`);
  }
}