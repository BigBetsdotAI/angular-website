import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ContactFormData {
  quickName: string;
  quickEmail: string;
  quickPhone?: string;
  quickMessage: string;
}

export interface ApiResponse {
  success: boolean;
  message: string;
  error?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = 'http://localhost:3001/api'; // Backend URL

  constructor(private http: HttpClient) {}

  sendContactForm(formData: ContactFormData): Observable<ApiResponse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<ApiResponse>(`${this.apiUrl}/contact`, formData, { headers });
  }

  checkBackendHealth(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}/health`);
  }
}
