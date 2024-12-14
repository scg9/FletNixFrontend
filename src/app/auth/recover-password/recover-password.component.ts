import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.scss']
})
export class RecoverPasswordComponent implements OnInit {

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
      password: [null, [Validators.required]],
      password_confirmation: [null, [Validators.required]]
    });
  }

  /**
   * Send recovery email
   */
  recoverPassword(): void {

  }

}
