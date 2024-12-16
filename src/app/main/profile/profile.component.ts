import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  form: FormGroup;
  userData: any; // To hold the user's profile data
  faTriangleExclamation = faTriangleExclamation;

  constructor(
    private _formBuilder: FormBuilder,
    private movieService: MovieService,
    private _http: HttpClient
  ) {
    this.form = this._formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(255)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['',[Validators.required, Validators.minLength(6)]], // Current Password
      new_password: ['',[Validators.required, Validators.minLength(6)]], // New Password
      new_password_confirmation: ['',[Validators.required, Validators.minLength(6)]] // Confirm New Password
    }, {
      validator: this.passwordsMatchValidator // Custom Validator
    });
  }

  ngOnInit(): void {
    this.movieService.userProfile$.subscribe((data) => {
    if (data && data.name && data.email) { // Ensure data is not undefined
      this.userData = data; // Update userData for avatar display
      console.log("Updated user data in ProfileComponent:", data);
      console.log("Received profile data:", data); // Debug the user data
      this.form.patchValue({
        name: data.name,
        email: data.email
      });
    }
  });

    // Fetch initial profile data
    this.movieService.fetchUserProfile();
  }

  getUserProfile(): void {
    const token = sessionStorage.getItem('token'); // Retrieve token from session storage

    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      this._http.get('http://ec2-13-201-18-40.ap-south-1.compute.amazonaws.com:3000/api/auth/getprofile', { headers }).subscribe(
        (response: any) => {
          this.userData = response; // Store user data
          this.updateFormWithUserData();
        },
        (error) => {
          console.error('Failed to fetch user profile:', error);
        }
      );
    } else {
      console.error('No token found. Unable to fetch user profile.');
    }
  }
  passwordsMatchValidator(group: FormGroup): { [key: string]: boolean } | null {
    const newPassword = group.get('new_password')?.value;
    const confirmPassword = group.get('new_password_confirmation')?.value;

    return newPassword === confirmPassword ? null : { passwordsMismatch: true };
  }

  updateFormWithUserData(): void {
    if (this.userData) {
      this.form.patchValue({
        name: this.userData.name,
        email: this.userData.email,
      });
    }
  }
  enablePasswordValidation(): void {
    this.form.get('password')?.setValidators(Validators.required);
    this.form.get('new_password')?.setValidators([Validators.required, Validators.minLength(6)]);
    this.form.get('new_password_confirmation')?.setValidators(Validators.required);

    this.form.get('password')?.updateValueAndValidity();
    this.form.get('new_password')?.updateValueAndValidity();
    this.form.get('new_password_confirmation')?.updateValueAndValidity();
  }

    updateProfile(): void {
    if (this.form.valid) {
      this.movieService.updateUserProfile(this.form.value).subscribe(
        () => {
          alert('Profile updated successfully!');
          console.log(this.form.value,"wheniupdatethe profile")
          // No need to refetch because BehaviorSubject is updated
        },
        (error) => console.error('Failed to update profile:', error)
      );
    }
  }
}
