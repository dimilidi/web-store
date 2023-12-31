import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
  loginForm!: FormGroup;
  isSubmitted = false;
  returnUrl = '';
  showPassword: boolean = false;
  isFormInvalid!: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
    this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl;
  }

  get fc() {
    return this.loginForm.controls;
  }

  submit() {
    this.isFormInvalid = this.loginForm.invalid;
    this.isSubmitted = true;
    if (this.loginForm.invalid) return;

    const fv = this.loginForm.value;

    this.authService.login({
      email: fv.email,
      password: fv.password,
    }).subscribe(() => {
      this.router.navigateByUrl(this.returnUrl);
    });
  }

  togglePasswordVisibility(propertyName: string) {
    if (propertyName === 'showPassword') {
      this.showPassword = !this.showPassword;
    } 
  }
}
