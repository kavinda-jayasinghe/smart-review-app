// src/app/components/messages/messages.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TeacherService } from '../../services/teacher.service';
import { MessageDetails } from '../../../../shared/utility/MessageDetails';
import { UserSuggestion } from '../../../../shared/utility/UserSuggestion';
import { MessageUser } from '../../../../shared/utility/MessageUser';
import { MessageResponse } from '../../../../shared/utility/MessageResponse';


@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.scss'
})
export class MessagesComponent implements OnInit {
searchTerm = '';
  content = '';
  selectedChatUser: MessageUser | null = null;
  conversationUsers: MessageUser[] = [];
  filteredSuggestions: UserSuggestion[] = [];
  private allUsers: UserSuggestion[] = [];

  // Chat Messages
  messages: MessageResponse[] = [];

  // Current User
  private readonly currentUser = { id: 1, fullName: 'John Doe' } as const;

  constructor(private teacherService: TeacherService) {}

  ngOnInit(): void {
    this.loadConversationUsers();
    this.loadAllUsersForSearch();
  }

  ngOnDestroy(): void {}

  // Load conversation list
  private loadConversationUsers(): void {
    this.teacherService.getConversationUsers(this.currentUser.id).subscribe({
      next: (users) => {
        this.conversationUsers = users;
      }
    });
  }

  // Load all users for search
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

      const newUser: MessageUser = {
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

    // LOAD CHAT HISTORY
    this.loadChatMessages(userId);
    this.sortConversationList();
  }

  // Load messages between currentUser and partner
  private loadChatMessages(partnerId: number): void {
    this.teacherService.getChatMessages(this.currentUser.id, partnerId).subscribe({
      next: (msgs) => {
        this.messages = msgs;
        this.scrollToBottom();
      },
      error: () => alert('Failed to load messages')
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
      next: () => {
        const newMsg: MessageResponse = {
          id: Date.now(),
          senderId: this.currentUser.id,
          senderName: this.currentUser.fullName,
          receiverId: this.selectedChatUser!.userId,
          receiverName: this.selectedChatUser!.fullName,
          content: this.content.trim(),
          date: new Date().toISOString()
        };

        this.messages.push(newMsg);
        this.content = '';
        this.selectedChatUser!.lastMessageDate = newMsg.date;
        this.sortConversationList();
        this.scrollToBottom();
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
      const chatBox = document.querySelector('.chat-box');
      if (chatBox) chatBox.scrollTop = chatBox.scrollHeight;
    }, 100);
  }

  // UI Helper
  isSentByMe(msg: MessageResponse): boolean {
    return msg.senderId === this.currentUser.id;
  }
}