import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { SidebarService } from 'src/app/services/sidebar.service';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.css']
})
export class LogoComponent {
  isSidebarOpen!: boolean; 
  private sidebarSubscription!: Subscription;

  constructor(
    private sidebarService: SidebarService,
  ) {}

  ngOnInit(): void {
    this.sidebarSubscription = this.sidebarService.isSidebarOpen().subscribe((isOpen) => {
      this.isSidebarOpen = isOpen;
    });
    
  }

}
