import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/models/User';

@Component({
  selector: 'app-delele-account-page',
  templateUrl: './delele-account-page.component.html',
  styleUrls: ['./delele-account-page.component.css']
})
export class DeleleAccountPageComponent {
  user: User = this.userService.currentUser;

  constructor(private userService: UserService) {}
  
  deleteUserAccount() {
    this.userService.deleteAccount().subscribe();
  }

}
