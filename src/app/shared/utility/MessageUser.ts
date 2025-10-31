// src/app/models/message-user.model.ts
export interface MessageUser {
  userId: number;
  firstName: string;
  lastName: string;
  fullName: string;
  profilePic: string | null;
  lastMessageDate: string; // ISO string
}