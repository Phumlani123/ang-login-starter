import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, User } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  password = '';
  signinForm!: FormGroup;
  submitted = false;
  user!: User;
  constructor(
    private formBuilder: FormBuilder,
    // private route: ActivatedRoute,

    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.signinForm = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  get form() {
    return this.signinForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.signinForm.invalid) {
      return;
    }
    this.authService.fakeSignin(
      this.form['email'].value,
      this.form['password'].value
    );
  }
}
