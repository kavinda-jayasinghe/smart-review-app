import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_BASE_URL } from '../api';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface ApiResponse<T> { code: string; message: string; data: T; }
export interface ClassDetailsDto {
  id: number | null;
  className: string;
  description?: string | null;
  teacherId: number;
  dp?: string | null; // base64
}

@Injectable({ providedIn: 'root' })
export class TeacherClassesService {
  private base = API_BASE_URL + '/class';
  constructor(private http: HttpClient) {}

  list(): Observable<ClassDetailsDto[]> {
    return this.http.get<ApiResponse<ClassDetailsDto[]>>(this.base).pipe(map(r => r.data));
  }
  get(id: number): Observable<ClassDetailsDto> {
    return this.http.get<ApiResponse<ClassDetailsDto>>(`${this.base}/${id}`).pipe(map(r => r.data));
  }
  create(dto: ClassDetailsDto): Observable<ClassDetailsDto> {
    return this.http.post<ApiResponse<ClassDetailsDto>>(this.base, dto).pipe(map(r => r.data));
  }
  update(id: number, dto: ClassDetailsDto): Observable<ClassDetailsDto> {
    return this.http.put<ApiResponse<ClassDetailsDto>>(`${this.base}/${id}`, dto).pipe(map(r => r.data));
  }
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}`);
  }
}

