import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
export class EditAccountPageComponent implements OnInit {
  editAccountForm!: FormGroup;
  isSubmitted = false;
  returnUrl = '/edit-account';
  editImageIsOpen: boolean = false;
  user: User = this.userService.currentUser;
  file: any;
  fileName: string = '';
  fileContent: string = '';
  selectedDialCode: string = '+359 ';
  phoneWithoutCountryCode!: string;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}
  @ViewChild('dynamicInput') dynamicInput!: ElementRef<HTMLInputElement>;

  ngOnInit(): void {
    const avatarFormControl = new FormControl(this.user.avatar);
    this.editAccountForm = this.formBuilder.group({
      name: [this.user.name, [Validators.required, Validators.minLength(5)]],
      address: [
        this.user.address,
        [Validators.required, Validators.minLength(10)],
      ],
      phone: [this.user.phone, [phoneNumberValidator()]],
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

    // Get the phone number from the form control
    let phoneNumber = this.editAccountForm.get('phone')!.value;

    this.userService
      .editAccount({
        name: editedData.name,
        address: editedData.address,
        phone: phoneNumber,
        avatar: this.user.avatar,
      })
      .subscribe(() => {
        this.router.navigate(['account']);
      });
  }

  cancelChanges() {
    this.router.navigate(['/account']);
  }

  // Handle the emitted dial code
  handleDialCodeChange(dialCode: any) {
    if (this.selectedDialCode === dialCode) return;

    // Get the current phone control value
    const phoneNumberControl = this.editAccountForm.get('phone');
    const phoneNumber = phoneNumberControl ? phoneNumberControl.value : '';
    const cleanedPhoneNumber = phoneNumber.replace(/^\+\d+\s/, ''); // Remove existing country code

    // Update the formatted phone number with the new dial code
    const formattedPhoneNumber = `+${dialCode} ${cleanedPhoneNumber}`;
    this.editAccountForm.patchValue({ phone: formattedPhoneNumber });
  }
}
