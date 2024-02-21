import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  level!: string | null;
  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    this.authService.huyit.subscribe((level) => {
      this.level = level;
    });
    this.level = this.authService.getLevel();
  }
}
