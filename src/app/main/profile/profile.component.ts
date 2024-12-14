import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

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
      name: ['John Doe', [Validators.required, Validators.maxLength(255)]],
      email: ['john.doe@gmail.com', [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      new_password: [null, []],
      new_password_confirmation: [null, []]
    });
  }

}
