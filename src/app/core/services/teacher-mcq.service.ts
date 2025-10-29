import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_BASE_URL } from '../api';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface ApiResponse<T> { code: string; message: string; data: T; }
export interface McqDetailsDto { assignmentId: number; question: string; options: string[]; correctAnswer: string; }
export interface McqResponseDto extends McqDetailsDto { id: number; assignmentTitle: string; }

@Injectable({ providedIn: 'root' })
export class TeacherMcqService {
  private base = API_BASE_URL + '/mcq';
  constructor(private http: HttpClient) {}

  createBulk(items: McqDetailsDto[]): Observable<McqResponseDto[]> {
    return this.http.post<ApiResponse<McqResponseDto[]>>(this.base, items).pipe(map(r => r.data));
  }
  listByAssignment(assignmentId: number): Observable<McqResponseDto[]> {
    return this.http.get<ApiResponse<McqResponseDto[]>>(`${this.base}/assignment/${assignmentId}`).pipe(map(r => r.data));
  }
  delete(id: number): Observable<void> { return this.http.delete<void>(`${this.base}/${id}`); }
}

