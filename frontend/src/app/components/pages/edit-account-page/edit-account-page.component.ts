import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { phoneNumberValidator } from '../../../shared/validators/phone_number_validator';

import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/models/User';

@Component({
  selector: 'app-edit-account-page',
  templateUrl: './edit-account-page.component.html',
  styleUrls: ['./edit-account-page.component.css'],
})
export class EditAccountPageComponent {
  editAccountForm!: FormGroup;
  isSubmitted = false;
  returnUrl = '/edit-account';
  editImageIsOpen: boolean = false;
  user: User = this.userService.currentUser;
  file: any;
  fileName: string = '';
  fileContent: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const avatarFormControl = new FormControl(this.user.avatar);
    this.editAccountForm = this.formBuilder.group({
      name: [this.user.name, [Validators.required, Validators.minLength(5)]],
      address: [
        this.user.address,
        [Validators.required, Validators.minLength(10)],
      ],
      phone: [this.user.phone, [Validators.required, phoneNumberValidator()]],
      avatar: avatarFormControl,
    });
  }

  get fc() {
    return this.editAccountForm.controls;
  }

  handleFileChange(event: any) {
    const files = event.target.files;
    if (files && files.length > 0) {
      this.file = files[0];

      // Set the filename for display (optional)
      this.fileName = this.file.name;

      // Handle file reading (optional)
      this.readFile();
    }
  }

  readFile() {
    const reader = new FileReader();
    reader.readAsDataURL(this.file);
    reader.onloadend = () => {
      // Get the file content (base64 encoded)
      this.fileContent = reader.result as string;
      this.user.avatar = this.fileContent;
      this.editImageIsOpen = false;

      console.log('File content (base64):', this.fileContent);
    };
  }

  toggleEditAvatar(): void {
    this.editImageIsOpen = !this.editImageIsOpen;
  }

  deleteAvatar() {
    this.user.avatar = '';
    this.editImageIsOpen = false;
  }

  saveChanges() {
    this.editImageIsOpen = false;
    this.isSubmitted = true;
    
    if (this.editAccountForm.invalid) return;

    const editedData = this.editAccountForm.value;
    this.userService
      .editAccount({
        name: editedData.name,
        address: editedData.address,
        phone: editedData.phone,
        avatar: this.user.avatar,
      })
      .subscribe(() => {
        this.router.navigate(['account']);
      });
  

    
  }
}