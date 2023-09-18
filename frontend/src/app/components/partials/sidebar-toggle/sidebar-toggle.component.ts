import { Component } from '@angular/core';
import { SidebarService } from 'src/app/services/sidebar.service';

@Component({
  selector: 'app-sidebar-toggle',
  templateUrl: './sidebar-toggle.component.html',
  styleUrls: ['./sidebar-toggle.component.css'],
})
export class SidebarToggleComponent {
  constructor(private sidebarService: SidebarService) {}

  toggleSidebar(): void {
    return this.sidebarService.toggleSidebar();
  }
}
