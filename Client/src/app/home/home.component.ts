import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ProjectService } from '../services/project.service';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  loading: boolean = true;

  username: string;
  totalAllUsers: any[] = [];
  listUsers: any;
  listAllProjects: any;
  listIDProject: any;
  lengthProjectDeployment: any;
  lengthTaskProcessing: any;
  totalReducerProject: any;

  filterMembersEast: any;
  filterMembersWest: any;
  filterMembersSouth: any;
  filterMembersNorth: any;

  areaCounts: any;

  constructor(
    private authService: AuthService,
    private projectService: ProjectService,
    private taskService: TaskService
  ) {
    this.username = localStorage.getItem('username') || '';
  }

  ngOnInit(): void {
    this.getAllUsers();
    this.getAllProjects();
    this.getAllTasks();
  }

  getAllUsers() {
    this.authService.getUsers().subscribe(
      (response) => {
        // console.log(response)
        this.totalAllUsers = response.length;
        this.listUsers = response;
        this.filterMembersEast = response.filter(
          (huyne: any) => huyne.area.nameArea === 'East'
        );
        this.filterMembersWest = response.filter(
          (huyne: any) => huyne.area.nameArea === 'West'
        );
        this.filterMembersSouth = response.filter(
          (huyne: any) => huyne.area.nameArea === 'South'
        );
        this.filterMembersNorth = response.filter(
          (huyne: any) => huyne.area.nameArea === 'North'
        );
        // tính tổng thành viên theo khu vực
        this.areaCounts = {
          East: this.filterMembersEast.length,
          West: this.filterMembersWest.length,
          South: this.filterMembersSouth.length,
          North: this.filterMembersNorth.length,
        };
        this.loading = false;
        // console.log(areaCounts)
      },
      (error) => {
        console.log(error);
        this.loading = false;
      }
    );
  }
  // tính nhân viên nghỉ việc status nè
  getOnLeaveEmployees(area: any): any {
    // console.log(area);
    if (area === 'East') {
      return this.filterMembersEast.filter(
        (user: any) => user.status === 'Office'
      ).length;
    } else if (area === 'West') {
      return this.filterMembersWest.filter(
        (user: any) => user.status === 'Office'
      ).length;
    } else if (area === 'South') {
      return this.filterMembersSouth.filter(
        (user: any) => user.status === 'Office'
      ).length;
    } else if (area === 'North') {
      return this.filterMembersNorth.filter(
        (user: any) => user.status === 'Office'
      ).length;
    }
    this.loading = false;
    return 0;
  }

  getAllTasks() {
    this.taskService.get().subscribe(
      (response) => {
        // console.log(response)
        this.lengthTaskProcessing = response.filter(
          (huyne: any) => huyne.status === 'processing'
        ).length;
        this.loading = false;
      },
      (error) => {
        console.log(error);
        this.loading = false;
      }
    );
  }

  getAllProjects() {
    this.projectService.get().subscribe(
      (response) => {
        // console.log(response);
        this.lengthProjectDeployment = response.filter(
          (huyne: any) => huyne.status === 'deployment'
        ).length;
        this.totalReducerProject = response.reduce(
          (total: any, item: any) => total + parseInt(item.budget),
          0
        );

        this.listAllProjects = response;
        const selectedValue = this.listAllProjects[0]._id;
        this.getSelectedProjects(selectedValue);
        this.loading = false;
      },
      (error) => {
        console.log(error);
        this.loading = false;
      }
    );
  }

  getSelectedProjects(selectedValue: any) {
    this.projectService.getSelect(selectedValue).subscribe(
      (response) => {
        this.listIDProject = response;
        this.loading = false;
      },
      (error) => {
        console.log(error);
        this.loading = false;
      }
    );
  }

  onProjectChange(event: any) {
    const selectedValue = event.target.value;
    // console.log(selectedValue);
    this.getSelectedProjects(selectedValue);
  }
}
