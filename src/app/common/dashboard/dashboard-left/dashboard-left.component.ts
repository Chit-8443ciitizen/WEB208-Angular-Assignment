import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-left',
  templateUrl: './dashboard-left.component.html',
  styleUrls: ['./dashboard-left.component.css']
})
export class DashboardLeftComponent {
  leader_name:string =""

  ngOnInit(): void{
    this.leader_name = "POLY TECHNIC";
  }
}
