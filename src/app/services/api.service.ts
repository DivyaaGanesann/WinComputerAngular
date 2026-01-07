import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private base = 'http://localhost/backend'; // your PHP backend folder

  constructor(private http: HttpClient) {}

  // --- Courses API ---
  addCourse(course: FormData) {
    return this.http.post(`${this.base}/add-courses.php`, course);
  }

  updateCourse(id: number, course: FormData) {
    return this.http.post(`${this.base}/add-courses.php?id=${id}`, course);
  }

  deleteCourse(id: number) {
    return this.http.delete(`${this.base}/add-courses.php?id=${id}`);
  }

  getcourses() {
    return this.http.get<any[]>(`${this.base}/getcourses.php`);
  }

  // --- IEEE API ---
  getIEEE(): Observable<any[]> {
    return this.http.get<any[]>(`${this.base}/get_ieee.php`);
  }

  addIEEE(data: FormData) {
    return this.http.post(`${this.base}/save_ieee.php`, data);
  }

  updateIEEE(id: number, data: FormData) {
    return this.http.post(`${this.base}/update_ieee.php?id=${id}`, data);
  }

  deleteIEEE(id: number) {
    return this.http.post(`${this.base}/delete_ieee.php`, { id });
  }

  // --- Enquiry API ---
  saveEnquiry(enquiry: any): Observable<any> {
    return this.http.post(`${this.base}/save-enquiry.php`, enquiry);
  }

  getEnquiries(): Observable<any[]> {
    return this.http.get<any[]>(`${this.base}/enquiries.php`);
  }

  deleteEnquiry(id: number): Observable<any> {
    return this.http.delete(`${this.base}/delete-enquiry.php?id=${id}`);
  }
}
