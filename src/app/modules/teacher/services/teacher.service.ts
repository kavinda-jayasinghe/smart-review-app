import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE_URL, TEST_JWT_TOKEN } from '../../../shared/utility/constant';
import { MessageDetails } from '../../../shared/utility/MessageDetails';
import { map } from 'rxjs/operators'; // ADD THIS
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


///msg

private readonly BASE_URL = 'http://localhost:8090/api/v1/message';
suggest(term: string): Observable<UserSuggestion[]> {
    return this.http.get<UserSuggestion[]>(`${this.BASE_URL}/suggest`, { params: { q: term } });
  }

// teacher.service.ts
getAllUsers(): Observable<UserSuggestion[]> {
  return this.http
    .get<APIResponse<UserSuggestion[]>>(`${this.BASE_URL}/suggest-all`)
    .pipe(map(res => res.body)); // ← res.body, not res.data
}

  send(msg: MessageDetails): Observable<any> {
    return this.http.post(`${this.BASE_URL}`, msg);
  }
getConversationUsers(userId: number): Observable<MessageUser[]> {
  return this.http.get<APIResponse<MessageUserDto[]>>(`${this.BASE_URL}/${userId}`)
    .pipe(
      map(res => res.body.map(dto => ({
        userId: dto.userId,
        firstName: dto.firstName,
        lastName: dto.lastName,
        fullName: `${dto.firstName} ${dto.lastName}`,
        profilePic: dto.profilePic,
        lastMessageDate: dto.lastMessageDate
      })))
    );
  }
  getChatMessages(currentUserId: number, partnerUserId: number): Observable<MessageResponse[]> {
  return this.http
    .get<APIResponse<MessageResponse[]>>(`${this.API_BASE_URL}/get-all-messages/${currentUserId}/${partnerUserId}`)
    .pipe(map(res => res.body));
}
}
