import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { API_BASE_URL, TEST_JWT_TOKEN } from '../../../shared/utility/constant';
import { MessageDetails } from '../../../shared/utility/MessageDetails';
import { catchError, map } from 'rxjs/operators'; // ADD THIS
import { APIResponse } from '../../../shared/utility/APIResponse';
import { MessageUser } from '../../../shared/utility/MessageUser';
import { MessageUserDto } from '../../../shared/utility/MessageUserDto';
import { MessageResponse } from '../../../shared/utility/MessageResponse';
import { UserSuggestion } from '../../../shared/utility/UserSuggestion';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  API_BASE_URL: any;

  constructor(private http: HttpClient) {}
  

  getAllClasses(userId: number): Observable<any> {

    return this.http.get<any>(
      `${API_BASE_URL}/class?userId=${userId}`
    );
  }
  createClass(formData: FormData): Observable<any> {
    return this.http.post<any>(`${API_BASE_URL}/class`, formData);
  }
  createTopic(topicData: any): Observable<any> {

    return this.http.post(`${API_BASE_URL}/topic`, topicData);
  }
  getTopicsByClass(classId: number): Observable<any> {
    return this.http.get(`${API_BASE_URL}/topic/class/${classId}`);
  }
  createAssignment(data: any): Observable<any> {
    return this.http.post(`${API_BASE_URL}/assignment`, data);
  }

  getAssignmentsByClass(classId: number): Observable<any> {
    return this.http.get(`${API_BASE_URL}/assignment/class/${classId}`);
  }


///---------------------------------------------------------------------------------msg

private readonly BASE_URL = 'http://localhost:8090/api/v1/message';
// Send message
  send(msg: MessageDetails): Observable<MessageResponse> {
    return this.http.post<APIResponse<MessageResponse>>(this.BASE_URL, msg)
      .pipe(map(res => res.body));
  }

  // Get chat history
getChatMessages(currentUserId: number, partnerUserId: number): Observable<MessageResponse[]> {
    return this.http
      .get<any>(`${this.BASE_URL}/get-all-messages`, {
        params: { currentUserId, partnerUserId }
      })
      .pipe(
        map(res => {
          const messages = res.body || [];
          return messages.map((m: any) => ({
            id: m.id,
            senderId: m.fromUserId,
            senderName: m.fromUserName || 'Unknown',
            receiverId: m.toUserId,
            receiverName: m.toUserName || 'Unknown',
            content: m.content,
            date: m.createdAt || new Date().toISOString(),
            isEditing: false
          }));
        }),
        catchError(() => of([]))
      );
  }


  // Update message
  updateMessage(id: number, content: string): Observable<MessageResponse> {
    return this.http.put<APIResponse<MessageResponse>>(`${this.BASE_URL}/${id}`, `"${content}"`)
      .pipe(map(res => res.body));
  }

  // Delete message
  deleteMessage(id: number): Observable<any> {
    return this.http.delete<APIResponse<string>>(`${this.BASE_URL}/${id}`);
  }

  // Get all users (for search)
  getAllUsers(): Observable<UserSuggestion[]> {
    return of([
      { id: 2, fullName: 'Nimal Perera', role: 'TEACHER' },
      { id: 3, fullName: 'Sithmi W.', role: 'STUDENT' }
    ]);
  }

}
