import {
  Component,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { UserRegister } from 'src/app/shared/interfaces/UserRegister';
import { PWMatchValidator } from 'src/app/shared/validators/password_match_validator';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css'],
})
export class RegisterPageComponent implements OnInit {
  registerForm!: FormGroup;
  isSubmitted = false;
  isInvalid!: boolean;
  returnUrl = '';
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;
  isFormInvalid!: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group(
      {
        name: ['', [Validators.required, Validators.minLength(5)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(5)]],
        confirmPassword: ['', Validators.required],
        address: ['', [Validators.required, Validators.minLength(10)]],
      },
      {
        validators: PWMatchValidator('password', 'confirmPassword'),
      }
    );

    this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl;
  }

  get fc() {
    return this.registerForm?.controls;
  }

  submit() {
    this.isFormInvalid = this.registerForm.invalid;
    this.isSubmitted = true;
    if (this.registerForm.invalid) return;

    const fv = this.registerForm.value;
    const user: UserRegister = {
      name: this.capitalizeFirstLetter(fv.name),
      email: fv.email,
      password: fv.password,
      confirmPassword: fv.confirmPassword,
      address: fv.address,
    };

    this.authService.register(user).subscribe(() => {
      this.registerForm.reset();
      this.router.navigateByUrl(this.returnUrl);
    });
  }


  private capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  togglePasswordVisibility(propertyName: string) {
    if (propertyName === 'showPassword') {
      this.showPassword = !this.showPassword;
    } else if (propertyName === 'showConfirmPassword') {
      this.showConfirmPassword = !this.showConfirmPassword;
    }
  }
}
