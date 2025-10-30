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
    const headers = new HttpHeaders({
      'Authorization': 'Bearer '+TEST_JWT_TOKEN
    });

    return this.http.get<any>(
      `${API_BASE_URL}/class?userId=${userId}`,
      { headers }
    );
  }
  createClass(formData: FormData): Observable<any> {
    return this.http.post<any>(`${API_BASE_URL}/class`, formData);
  }

}
