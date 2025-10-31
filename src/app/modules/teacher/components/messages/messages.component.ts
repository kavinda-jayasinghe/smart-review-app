import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';  // THIS LINE IS REQUIRED
import { MessageResponse } from '../../../../shared/utility/MessageResponse';
import { MessageDetails } from '../../../../shared/utility/MessageDetails';
import { TeacherService } from '../../services/teacher.service';
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
searchTerm = '';
  content = '';
  selectedChatUser: ChatUser | null = null;
  conversationUsers: ChatUser[] = [];
  filteredSuggestions: UserSuggestion[] = [];
  messages: MessageResponse[] = [];
  private allUsers: UserSuggestion[] = [];

  // Current User
  private readonly currentUser = { id: 1, fullName: 'John Doe' } as const;

  constructor(private teacherService: TeacherService) {}

  ngOnInit(): void {
    this.loadConversationUsers();
    this.loadAllUsersForSearch();
  }

  // Load conversation list (from backend or hard-coded)
  private loadConversationUsers(): void {
    // You can replace with real API later
    this.teacherService.getAllUsers().subscribe({
      next: (users) => {
        this.allUsers = users;
        this.conversationUsers = users.map(u => ({
          userId: u.id,
          firstName: u.fullName.split(' ')[0],
          lastName: u.fullName.split(' ').slice(1).join(' '),
          fullName: u.fullName,
          profilePic: null,
          lastMessageDate: new Date().toISOString()
        }));
      }
    });
  }

  private loadAllUsersForSearch(): void {
    this.teacherService.getAllUsers().subscribe({
      next: (users) => {
        this.allUsers = users;
      }
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

  // Open Chat → Load Messages
  openChatWith(userId: number, fullName: string): void {
    const existing = this.conversationUsers.find(u => u.userId === userId);
    if (existing) {
      this.selectedChatUser = existing;
    } else {
      const nameParts = fullName.trim().split(/\s+/);
      const firstName = nameParts[0] || 'Unknown';
      const lastName = nameParts.slice(1).join(' ') || '';

      const newUser: ChatUser = {
        userId,
        firstName,
        lastName,
        fullName,
        profilePic: null,
        lastMessageDate: new Date().toISOString()
      };
      this.conversationUsers.unshift(newUser);
      this.selectedChatUser = newUser;
    }

    // Load messages from backend
    this.loadChatMessages(userId);
  }

private loadChatMessages(partnerId: number): void {
    this.teacherService.getChatMessages(this.currentUser.id, partnerId).subscribe({
      next: (msgs) => {
        this.messages = msgs;
        this.scrollToBottom();
      },
      error: () => {
        this.messages = [];
        alert('Failed to load messages');
      }
    });
  }
  

  // Send Message
  send(): void {
    if (!this.selectedChatUser || !this.content.trim()) return;

    const payload: MessageDetails = {
      senderId: this.currentUser.id,
      senderName: this.currentUser.fullName,
      receiverId: this.selectedChatUser.userId,
      receiverName: this.selectedChatUser.fullName,
      content: this.content.trim()
    };

    this.teacherService.send(payload).subscribe({
      next: (savedMsg) => {
        this.messages.push(savedMsg);
        this.content = '';
        this.selectedChatUser!.lastMessageDate = savedMsg.date;
        this.sortConversationList();
        this.scrollToBottom();
      },
      error: () => alert('Send failed')
    });
  }

  // Edit Message
  editMessage(msg: MessageResponse): void {
    msg['isEditing'] = true;
    msg['editContent'] = msg.content;
  }

  saveEdit(msg: MessageResponse): void {
    if (!msg['editContent']?.trim()) return;

    this.teacherService.updateMessage(msg.id, msg['editContent'].trim()).subscribe({
      next: (updated) => {
        msg.content = updated.content;
        msg['isEditing'] = false;
        delete msg['editContent'];
      }
    });
  }

  cancelEdit(msg: MessageResponse): void {
    msg['isEditing'] = false;
    delete msg['editContent'];
  }

  // Delete Message
  deleteMessage(msg: MessageResponse): void {
    if (!confirm('Delete this message?')) return;

    this.teacherService.deleteMessage(msg.id).subscribe({
      next: () => {
        this.messages = this.messages.filter(m => m.id !== msg.id);
        if (this.messages.length > 0) {
          this.selectedChatUser!.lastMessageDate = this.messages[this.messages.length - 1].date;
        }
        this.sortConversationList();
      }
    });
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

  isSentByMe(msg: MessageResponse): boolean {
    return msg.senderId === this.currentUser.id;
  }
}