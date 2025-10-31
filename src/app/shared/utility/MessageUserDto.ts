// src/app/models/message-user-dto.model.ts
export interface MessageUserDto {
  userId: number;
  firstName: string;
  lastName: string;
  profilePic: string | null;
  lastMessageDate: string; // ISO string
}