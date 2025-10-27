export interface User {
  id: number;
  name: string;
  avatarUrl?: string;
  roles: ('ADMIN' | 'TEACHER' | 'STUDENT')[];
}
