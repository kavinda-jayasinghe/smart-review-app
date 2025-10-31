import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';  // THIS LINE IS REQUIRED
interface Message {
  id: number;
  senderId: number;
  senderName: string;
  receiverId: number;
  receiverName: string;
  content: string;
  date: string;
  isEditing?: boolean;
  editContent?: string;
}

interface ChatUser {
  userId: number;
  firstName: string;
  lastName: string;
  fullName: string;
  profilePic: string | null;
  lastMessageDate: string;
}

interface UserSuggestion {
  id: number;
  fullName: string;
  role: string;
}
@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.scss'
})
export class MessagesComponent {
private readonly currentUser = { id: 1, fullName: 'You (John)' };

  // UI State
  searchTerm = '';
  content = '';
  selectedChatUser: ChatUser | null = null;
  conversationUsers: ChatUser[] = [];
  filteredSuggestions: UserSuggestion[] = [];
  messages: Message[] = [];

  // Hard-coded data
  private allUsers: UserSuggestion[] = [
    { id: 2, fullName: 'Nimal Perera', role: 'TEACHER' },
    { id: 3, fullName: 'Sithmi W.', role: 'STUDENT' },
    { id: 4, fullName: 'Kavindu Silva', role: 'STUDENT' },
    { id: 5, fullName: 'Chalana F.', role: 'ADMIN' }
  ];

  private hardCodedChats: { [key: number]: Message[] } = {
    2: [
      { id: 1, senderId: 2, senderName: 'Nimal Perera', receiverId: 1, receiverName: 'You', content: 'Hello!', date: '2025-10-31T10:00:00Z' },
      { id: 2, senderId: 1, senderName: 'You', receiverId: 2, receiverName: 'Nimal Perera', content: 'Hi Nimal!', date: '2025-10-31T10:01:00Z' }
    ],
    3: [
      { id: 3, senderId: 3, senderName: 'Sithmi W.', receiverId: 1, receiverName: 'You', content: 'Assignment done?', date: '2025-10-30T09:00:00Z' }
    ]
  };

  ngOnInit(): void {
    this.loadConversationUsers();
  }

  // Load conversation list from hard-coded data
  private loadConversationUsers(): void {
    this.conversationUsers = this.allUsers.map(user => {
      const lastMsg = this.hardCodedChats[user.id]?.[this.hardCodedChats[user.id].length - 1];
      return {
        userId: user.id,
        firstName: user.fullName.split(' ')[0],
        lastName: user.fullName.split(' ').slice(1).join(' '),
        fullName: user.fullName,
        profilePic: null,
        lastMessageDate: lastMsg?.date || new Date().toISOString()
      };
    });
  }

  // Search
  onSearchInput(): void {
    const term = this.searchTerm.trim().toLowerCase();
    this.filteredSuggestions = term
      ? this.allUsers.filter(u => u.fullName.toLowerCase().includes(term)).slice(0, 8)
      : [];
  }

  selectFromSearch(user: UserSuggestion): void {
    this.openChatWith(user.id, user.fullName);
    this.searchTerm = '';
    this.filteredSuggestions = [];
  }

  // Open Chat
  openChatWith(userId: number, fullName: string): void {
    const existing = this.conversationUsers.find(u => u.userId === userId);
    if (existing) {
      this.selectedChatUser = existing;
    } else {
      const nameParts = fullName.split(' ');
      const newUser: ChatUser = {
        userId,
        firstName: nameParts[0],
        lastName: nameParts.slice(1).join(' '),
        fullName,
        profilePic: null,
        lastMessageDate: new Date().toISOString()
      };
      this.conversationUsers.unshift(newUser);
      this.selectedChatUser = newUser;
    }

    // Load messages
    this.messages = [...(this.hardCodedChats[userId] || [])];
    this.scrollToBottom();
  }

  // Send Message
  send(): void {
    if (!this.selectedChatUser || !this.content.trim()) return;

    const newMsg: Message = {
      id: Date.now(),
      senderId: this.currentUser.id,
      senderName: this.currentUser.fullName,
      receiverId: this.selectedChatUser.userId,
      receiverName: this.selectedChatUser.fullName,
      content: this.content.trim(),
      date: new Date().toISOString()
    };

    this.messages.push(newMsg);
    this.hardCodedChats[this.selectedChatUser.userId] = this.messages;
    this.selectedChatUser.lastMessageDate = newMsg.date;
    this.sortConversationList();
    this.content = '';
    this.scrollToBottom();
  }

  // Edit Message
  editMessage(msg: Message): void {
    msg.isEditing = true;
    msg.editContent = msg.content;
  }

  saveEdit(msg: Message): void {
    if (msg.editContent?.trim()) {
      msg.content = msg.editContent.trim();
    }
    msg.isEditing = false;
    delete msg.editContent;
  }

  cancelEdit(msg: Message): void {
    msg.isEditing = false;
    delete msg.editContent;
  }

  // Delete Message
  deleteMessage(msg: Message): void {
    if (confirm('Delete this message?')) {
      this.messages = this.messages.filter(m => m.id !== msg.id);
      this.hardCodedChats[this.selectedChatUser!.userId] = this.messages;
      if (this.messages.length === 0) {
        this.selectedChatUser!.lastMessageDate = new Date().toISOString();
      } else {
        this.selectedChatUser!.lastMessageDate = this.messages[this.messages.length - 1].date;
      }
      this.sortConversationList();
    }
  }

  // Helpers
  private sortConversationList(): void {
    this.conversationUsers.sort((a, b) =>
      new Date(b.lastMessageDate).getTime() - new Date(a.lastMessageDate).getTime()
    );
  }

  private scrollToBottom(): void {
    setTimeout(() => {
      const el = document.querySelector('.chat-box');
      if (el) el.scrollTop = el.scrollHeight;
    }, 100);
  }

  isSentByMe(msg: Message): boolean {
    return msg.senderId === this.currentUser.id;
  }
}