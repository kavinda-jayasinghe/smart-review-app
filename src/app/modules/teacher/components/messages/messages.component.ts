// src/app/components/messages/messages.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TeacherService } from '../../services/teacher.service';
import { MessageDetails } from '../../../../shared/utility/MessageDetails';
import { UserSuggestion } from '../../../../shared/utility/UserSuggestion';
import { MessageUser } from '../../../../shared/utility/MessageUser';


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

  // ---------- HARD-CODED CURRENT USER ----------
  private readonly currentUser = {
    id: 1,
    fullName: 'John Doe'
  } as const;

  constructor(private teacherService: TeacherService) {}

  // -------------------------------------------------
  ngOnInit(): void {
    this.loadConversationUsers();
    this.loadAllUsersForSearch();
  }

  // -------------------------------------------------
  /** Load users you've messaged */
  private loadConversationUsers(): void {
    this.teacherService.getConversationUsers(this.currentUser.id).subscribe({
      next: (users) => {
        this.conversationUsers = users;
      },
      error: () => alert('Failed to load chats')
    });
  }

  /** Load ALL users for search */
  private loadAllUsersForSearch(): void {
    this.teacherService.getAllUsers().subscribe({
      next: (users) => {
        this.allUsers = users;
        console.log('All users loaded:', users);
      },
      error: (err) => console.error('Failed to load users', err)
    });
  }

  // -------------------------------------------------
  /** Called on every keystroke */
  onSearchInput(): void {
    const term = this.searchTerm.trim().toLowerCase();
    this.filteredSuggestions = term
      ? this.allUsers
          .filter(u => u.fullName.toLowerCase().includes(term))
          .slice(0, 8)
      : [];
  }

  /** Select from dropdown → open chat */
  selectFromSearch(user: UserSuggestion): void {
    this.openChatWith(user.id, user.fullName);
    this.searchTerm = '';
    this.filteredSuggestions = [];
  }

  /** Open chat (from list or search) */
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
    this.sortConversationList();
  }

  /** Sort by last message */
  private sortConversationList(): void {
    this.conversationUsers.sort((a, b) =>
      new Date(b.lastMessageDate).getTime() - new Date(a.lastMessageDate).getTime()
    );
  }

  // -------------------------------------------------
  /** SEND MESSAGE */
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
        this.content = '';
        this.selectedChatUser!.lastMessageDate = new Date().toISOString();
        this.sortConversationList();
        alert('Message sent!');
      },
      error: () => alert('Send failed')
    });
  }
}