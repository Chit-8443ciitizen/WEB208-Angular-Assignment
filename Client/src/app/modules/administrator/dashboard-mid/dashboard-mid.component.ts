import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-mid',
  templateUrl: './dashboard-mid.component.html',
  styleUrls: ['./dashboard-mid.component.css']
})
export class DashboardMidComponent {
  current_project: string= "";
  
  ngOnInit(): void{
     this.current_project = "Management Student"
  }
}
