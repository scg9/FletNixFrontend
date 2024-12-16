import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { faApple, faGoogle, faFacebookF, faTwitter, faGithub } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  faTriangleExclamation = faTriangleExclamation;
  faApple = faApple;
  faGoogle = faGoogle;
  faFacebookF = faFacebookF;
  faTwitter = faTwitter;
  faGithub = faGithub;
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
   * Build form
   */
  private buildForm(): FormGroup {
    return this._formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]],
    });
  }

  /**
   * Login user
   */
  login(): void {
    if (this.form.valid) {
      const { email, password } = this.form.value;

      // Send a POST request to the backend API
      this._http.post('http://ec2-13-201-18-40.ap-south-1.compute.amazonaws.com:3000/api/auth/login', { email, password }).subscribe(
        (response: any) => {
          // Success: Save the token and navigate to the dashboard
          sessionStorage.setItem('token', response.token);
          localStorage.setItem('token', response.token); // Save the JWT in localStorage
          this.errorMessage = null; // Clear any previous error message
          this._router.navigateByUrl(''); // Redirect to the dashboard or homepage
        },
        (error) => {
          // Handle errors
          console.error('Login error:', error);
          if (error.status === 300) {
            this.errorMessage = 'Kindly Rigister to login';
          } else if(error.status === 400){
            this.errorMessage = ' Invalid email or password';
          }else {
            this.errorMessage = 'An error occurred. Please try again later.';
          }
        }
      );
    } else {
      // Mark the form as dirty to show validation errors
      this.form.markAllAsTouched();
    }
  }
}
