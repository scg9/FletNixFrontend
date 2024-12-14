import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { faApple, faGoogle, faFacebookF, faTwitter, faGithub } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  faTriangleExclamation = faTriangleExclamation;
  faApple = faApple;
  faGoogle = faGoogle;
  faFacebookF = faFacebookF;
  faTwitter = faTwitter;
  faGithub = faGithub;

  constructor(
    private _formBuilder: FormBuilder
  ) {
    this.form = this.buildForm();
  }

  ngOnInit(): void { }

  /**
   * Build form
   */
  private buildForm(): FormGroup {
    return this._formBuilder.group({
      name: [null, [Validators.required, Validators.maxLength(255)]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      password_confirmation: [null, [Validators.required]]
    });
  }

  /**
   * Send recovery email
   */
  register(): void {

  }

}
