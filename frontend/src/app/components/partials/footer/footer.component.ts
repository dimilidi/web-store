import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SidebarService } from 'src/app/services/sidebar.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit{

  isSidebarOpen!: boolean;
  private sidebarSubscription!: Subscription;

  constructor(private sidebarService: SidebarService){}

  ngOnInit(): void {
       this.sidebarSubscription = this.sidebarService.isSidebarOpen().subscribe((isOpen) => {
    this.isSidebarOpen = isOpen;
  });
  }
  
}
