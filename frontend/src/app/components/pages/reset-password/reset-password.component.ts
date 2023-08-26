import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { PWMatchValidator } from 'src/app/shared/validators/password_match_validator';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit{
  resetForm!: FormGroup;
  isSubmitted = false;
  isInvalid!: boolean;
  returnUrl = '';
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;
  isFormInvalid!: boolean;
  token!: string;
  

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.resetForm  = this.formBuilder.group(  {
      password: ['', [Validators.required, Validators.minLength(5)]],
      confirmPassword: ['', Validators.required],
    },
    {
      validators: PWMatchValidator('password', 'confirmPassword'),
    }
  );

  this.activatedRoute.params.subscribe( val =>{
    this.token = val['token'];
  })

  this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl;
  }

  get fc() {
    return this.resetForm.controls;
  }

  togglePasswordVisibility(propertyName: string) {
    if (propertyName === 'showPassword') {
      this.showPassword = !this.showPassword;
    } else if (propertyName === 'showConfirmPassword') {
      this.showConfirmPassword = !this.showConfirmPassword;
    }
  }

  reset(){
    let resetObj = {
      token: this.token,
      password: this.resetForm.value.password
    };
    this.userService.resetPasswordService(resetObj).subscribe({
      next: (res) => {
        this.toastrService.success('Email sent successfully', res?.message);
        this.resetForm.reset();
        this.router.navigate(['login']);
      },
      error: (error) => {
        this.toastrService.error('Email sent failed', error.error?.message);
      }
    });
    
  }
}
