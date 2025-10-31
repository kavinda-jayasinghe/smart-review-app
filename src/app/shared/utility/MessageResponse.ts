// src/app/models/message-response.model.ts
export interface MessageResponse {
  id: number;
  senderId: number;
  senderName: string;
  receiverId: number;
  receiverName: string;
  content: string;
  date: string; // ISO string
}