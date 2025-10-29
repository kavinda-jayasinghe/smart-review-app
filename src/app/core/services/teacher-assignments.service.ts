import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_BASE_URL } from '../api';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface ApiResponse<T> { code: string; message: string; data: T; }
export interface McqResponseDto { id: number; question: string; options: string[]; correctAnswer: string; assignmentId: number; assignmentTitle: string; }
export interface DocumentDto { id: number; name: string; url: string; }
export interface AssignmentDetailsDto {
  assignmentName: string;
  timeDuration: string; // HH:mm:ss
  startTime: string; // ISO 8601
  endTime: string;   // ISO 8601
  isMcq: boolean;
  topicId: number;
}
export interface AssignmentResponseDto extends AssignmentDetailsDto {
  id: number;
  topicTitle: string;
  mcqs: McqResponseDto[];
  documentDtos: DocumentDto[];
}

@Injectable({ providedIn: 'root' })
export class TeacherAssignmentsService {
  private base = API_BASE_URL + '/assignment';
  constructor(private http: HttpClient) {}

  create(dto: AssignmentDetailsDto): Observable<AssignmentResponseDto> {
    return this.http.post<ApiResponse<AssignmentResponseDto>>(this.base, dto).pipe(map(r => r.data));
  }
  get(id: number): Observable<AssignmentResponseDto> {
    return this.http.get<ApiResponse<AssignmentResponseDto>>(`${this.base}/${id}`).pipe(map(r => r.data));
  }
  listByClassId(classId: number): Observable<AssignmentResponseDto[]> {
    return this.http.get<ApiResponse<AssignmentResponseDto[]>>(`${this.base}/class/${classId}`).pipe(map(r => r.data));
  }
  update(id: number, dto: AssignmentDetailsDto): Observable<AssignmentResponseDto> {
    return this.http.put<ApiResponse<AssignmentResponseDto>>(`${this.base}/${id}`, dto).pipe(map(r => r.data));
  }
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}`);
  }
}

