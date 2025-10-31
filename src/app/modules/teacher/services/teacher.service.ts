import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE_URL, TEST_JWT_TOKEN } from '../../../shared/utility/constant';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

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





}
