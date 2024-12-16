import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable ,BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private apiUrl = 'http://ec2-13-201-18-40.ap-south-1.compute.amazonaws.com:3000/api/shows'; // Replace with your actual API URL
  private profileApiUrl = 'http://ec2-13-201-18-40.ap-south-1.compute.amazonaws.com:3000/api/auth/getprofile'; // User Profile API
  private updateProfileUrl = 'http://ec2-13-201-18-40.ap-south-1.compute.amazonaws.com:3000/api/auth/updateprofile'; // Profile Update API

   // BehaviorSubject to store and share user profile data
  private userProfileSubject: BehaviorSubject<any> = new BehaviorSubject<any>({ name: 'Guest', email: 'guest@gmail' });
  userProfile$ = this.userProfileSubject.asObservable();

  constructor(private http: HttpClient) {}

  getMovies(page: number = 1, limit: number = 8): Observable<any> {
    // Retrieve the token from sessionStorage
    const token = sessionStorage.getItem('token');

    // Set the Authorization header if the token exists
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // Make the GET request with headers
    return this.http.get<any>(`${this.apiUrl}?page=${page}&limit=${limit}`, { headers });
  }
  getUserProfile(): Observable<any> {
    const token = sessionStorage.getItem('token'); // Retrieve token
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(this.profileApiUrl, { headers });
  }

  // updateUserProfile(updatedData: any): Observable<any> {
  //   const token = sessionStorage.getItem('token');
  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  //   return this.http.put<any>(this.updateProfileUrl, updatedData, { headers });
  // }
  updateUserProfile(updatedData: any): Observable<any> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return new Observable((observer) => {
      this.http.put<any>(this.updateProfileUrl, updatedData, { headers }).subscribe(
        (response) => {
          if (response && response.user) {
            this.userProfileSubject.next(response.user); // Only update with the 'user' object
          }
          observer.next(response);
          observer.complete();
        },
        (error) => {
          console.error('Failed to update profile:', error);
          observer.error(error);
        }
      );
    });
  }
  // Fetch user profile and update BehaviorSubject
  fetchUserProfile(): void {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.get<any>(this.profileApiUrl, { headers }).subscribe(
      (response) => this.userProfileSubject.next(response),
      (error) => console.error('Failed to fetch user profile:', error)
    );
  }
  
}

