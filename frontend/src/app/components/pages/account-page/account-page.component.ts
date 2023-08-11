import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/models/User';

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.css'],
})
export class AccountPageComponent  {
  user: User = this.userService.currentUser;

  constructor(private userService: UserService, private router:Router) {}

  handleEditAccount() {
    this.router.navigate(['edit-account'])
  }
}
