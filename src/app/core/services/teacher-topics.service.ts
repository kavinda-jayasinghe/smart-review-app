import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_BASE_URL } from '../api';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface ApiResponse<T> { code: string; message: string; data: T; }
export interface TopicDetailsDto {
  id: number | null;
  title: string;
  class_id: number;
  class_name?: string | null;
}
export interface DocumentDto { id: number; name: string; url: string; }
export interface TopicResponseDto {
  id: number; title: string; classId: number; className: string;
  numberOfAssignment: number; documents: DocumentDto[];
}

@Injectable({ providedIn: 'root' })
export class TeacherTopicsService {
  private base = API_BASE_URL + '/topic';
  constructor(private http: HttpClient) {}

  list(): Observable<TopicResponseDto[]> {
    return this.http.get<ApiResponse<TopicResponseDto[]>>(this.base).pipe(map(r => r.data));
  }
  get(id: number): Observable<TopicResponseDto> {
    return this.http.get<ApiResponse<TopicResponseDto>>(`${this.base}/${id}`).pipe(map(r => r.data));
  }
  create(dto: TopicDetailsDto): Observable<TopicResponseDto> {
    return this.http.post<ApiResponse<TopicResponseDto>>(this.base, dto).pipe(map(r => r.data));
  }
  update(id: number, dto: TopicDetailsDto): Observable<TopicResponseDto> {
    return this.http.put<ApiResponse<TopicResponseDto>>(`${this.base}/${id}`, dto).pipe(map(r => r.data));
  }
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}`);
  }
}

