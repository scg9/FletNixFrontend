import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  form: FormGroup;
  faTriangleExclamation = faTriangleExclamation;

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
      email: [null, [Validators.required, Validators.email]]
    });
  }

  /**
   * Send recovery email
   */
  sendRecoveryEmail(): void {

  }

}
