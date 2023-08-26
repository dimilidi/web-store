import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forgotten-password',
  templateUrl: './forgotten-password.component.html',
  styleUrls: ['./forgotten-password.component.css'],
})
export class ForgottenPasswordComponent {
  forgetForm!: FormGroup;
  isSubmitted = false;
  returnUrl = '';
  showPassword: boolean = false;
  isFormInvalid!: boolean;


  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.forgetForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
    this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl;
  }

  get fc() {
    return this.forgetForm.controls;
  }

  submit() {
    this.isFormInvalid = this.forgetForm.invalid;
    this.isSubmitted = true;
    if (this.forgetForm.invalid) return;

    this.userService.sendEmailService(this.forgetForm.value.email).subscribe({
      next: (res) => {
        console.log(res?.message);
        
        this.toastrService.success('Successful Submit.', res?.message);
        this.forgetForm.reset();
      },
      error: (error) => {
        this.toastrService.error('Email sent failed', error.error.message);
      }
    });
  }

  togglePasswordVisibility(propertyName: string) {
    if (propertyName === 'showPassword') {
      this.showPassword = !this.showPassword;
    }
  }
}
