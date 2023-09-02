import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { Order } from 'src/app/shared/models/Order';
import { User } from 'src/app/shared/models/User';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit{
  users!: User[];
  orders!: Order[];
  orderService: any;

  constructor(private userService: UserService, private toastrService: ToastrService){}

  ngOnInit(): void {
    this.getAllUsers().subscribe();
  }

  getAllUsers(){
    return this.userService.getAllUsers().pipe(
      tap({
        next: (res) => {
          this.users = res.data;
          console.log('USERS',res.data.name);
          this.toastrService.success(
            `All Users fetched`,
            res.message
          );
        },
        error: (errors) => {
          this.toastrService.error(errors.error, 'Getting users failed');
        }
      })
    )
  
  }
  
 


}
