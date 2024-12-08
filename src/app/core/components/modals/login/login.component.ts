import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginModel } from '../../../models/auth/login.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ ReactiveFormsModule, CommonModule ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  @Output() closeMeEvent = new EventEmitter();
  @Output() confirmEvent = new EventEmitter<LoginModel>();

  loginForm: FormGroup;
  passwordPattern = '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{4,}$';
  emailPattern = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+$';


  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      password: ['', [Validators.required, Validators.pattern(this.passwordPattern)]],
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  closeMe() {
    this.closeMeEvent.emit();
  }
  
  confirm() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      const loginData: LoginModel = { email, password };
      this.confirmEvent.emit(loginData);
    }
  }

}
