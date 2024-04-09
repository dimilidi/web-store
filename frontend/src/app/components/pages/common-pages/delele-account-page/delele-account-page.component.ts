import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/models/User';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { UserStateService } from 'src/app/services/user-state.service';


@Component({
  selector: 'app-delele-account-page',
  templateUrl: './delele-account-page.component.html',
  styleUrls: ['./delele-account-page.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0 })),
      transition('void <=> *', animate('500ms ease-in-out')),
    ]),
  ],
})
export class DeleleAccountPageComponent {
  user: User = this.userStateService.currentUser;


  constructor(private userService: UserService, private router: Router, private userStateService: UserStateService) {}


  deleteUserAccount() {
    this.userService.deleteAccount().subscribe();
  }

  backToAccount() {
    this.router.navigate(['/account'])
  }
}
