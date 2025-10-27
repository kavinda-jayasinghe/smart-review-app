export interface MessageThreadPreview {
  id: number;
  senderName: string;
  senderAvatarUrl?: string;
  lastMessage: string;
  timeLabel: string; // "10:30 AM", "Yesterday", "2 days ago"
}
