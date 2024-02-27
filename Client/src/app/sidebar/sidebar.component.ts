import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router, ActivatedRoute, NavigationEnd, Event as NavigationEvent } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  level: string | null = null;
  isAdmin: boolean = true;

  activeRoute: string = '';
  
  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.authService.level.subscribe((level) => {
      this.level = level;
      // localStorage.setItem('level', level || "");
    });

    this.level = this.authService.getLevel();
    //console.log(this.level);
    
    this.checkAdmin(this.level || "");
  }
  checkAdmin(level: string): void {
    this.isAdmin = (level === 'admin');
  }
}
