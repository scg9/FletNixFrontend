import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  faTriangleExclamation = faTriangleExclamation;
  errorMessage: string | null = null;

  constructor(
    private _formBuilder: FormBuilder,
    private _http: HttpClient,
    private _router: Router
  ) {
    this.form = this.buildForm();
  }

  ngOnInit(): void {}

  /**
   * Build the registration form
   */
  private buildForm(): FormGroup {
    return this._formBuilder.group({
      name: [null, [Validators.required, Validators.maxLength(255)]],
      email: [null, [Validators.required, Validators.email]],
      date: [null, [Validators.required]], // You can add a custom validator for age if needed
      password: [null, [Validators.required, Validators.minLength(6)]],
      password_confirmation: [null, [Validators.required]],
    });
  }

  /**
   * Register user
   */
  register(): void {
    if (this.form.valid) {
      const { name, email, date, password, password_confirmation } = this.form.value;

      // Ensure passwords match
      if (password !== password_confirmation) {
        this.errorMessage = 'Passwords do not match';
        return;
      }

      // Send a POST request to the backend API
      this._http
        .post('http://ec2-13-201-18-40.ap-south-1.compute.amazonaws.com:3000/api/auth/register', {
          name,
          email,
          age: this.calculateAge(date), // Convert DOB to age
          password,
        })
        .subscribe(
          (response: any) => {
            // Success: Redirect to login page
            console.log('Registration successful:', response);
            this.errorMessage = null; // Clear any error messages
            this._router.navigateByUrl('/auth'); // Redirect to login page
          },
          (error) => {
            // Handle errors
            console.error('Registration error:', error);
            if (error.status === 400) {
              this.errorMessage = error.error.message || 'User already exists.';
            } else {
              this.errorMessage = 'An error occurred. Please try again later.';
            }
          }
        );
    } else {
      // Mark the form as dirty to show validation errors
      this.form.markAllAsTouched();
    }
  }

  /**
   * Calculate age from DOB
   */
  private calculateAge(dob: string): number {
    const birthDate = new Date(dob);
    const ageDiffMs = Date.now() - birthDate.getTime();
    const ageDate = new Date(ageDiffMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }
}
