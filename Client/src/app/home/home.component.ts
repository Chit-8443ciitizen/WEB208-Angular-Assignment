import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ProjectService } from '../services/project.service';
import { TaskService } from '../services/task.service';
import { Observable, of} from 'rxjs';
import { map } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  loading: boolean = true;

  username: string;
  level: string;
  totalAllUsers: any[] = [];
  listAllUsers: any;

  listExistTasks: any[] = []; // Khởi tạo mảng trước khi sử dụng
  listCurrentProjectTasks: any;
  lengthTaskProcessing: any;

  listIDProject: any;
  currentProjectUsers: any;
  listAllProjects: any;
  currentProject: any;
  lengthProjectDeployment: any;
  lengthProjectComplete: any;
  totalReducerProject: any;

  filterEmployeesEast: any;
  filterEmployeesWest: any;
  filterEmployeesSouth: any;
  filterEmployeesNorth: any;

  areaCounts: any;

  constructor(
    private authService: AuthService,
    private projectService: ProjectService,
    private taskService: TaskService
  ) {
    this.username = localStorage.getItem('username') || '';
    this.level = localStorage.getItem('level') || ''
  }

  ngOnInit(): void {
    this.getAllUsers();
    this.getAllProjects();
    this.getAllTasks();
    
    //console.log(this.listCurrentProjectTasks);    
  }

  getAllUsers() {
    this.authService.getUsers().subscribe(
      (response) => {
        // console.log(response)
        this.listAllUsers = response; //
        this.totalAllUsers = response.length;
        this.filterEmployeesEast = response.filter(
          (data: any) => data.area.nameArea === 'East'
        );
        this.filterEmployeesWest = response.filter(
          (data: any) => data.area.nameArea === 'West'
        );
        this.filterEmployeesSouth = response.filter(
          (data: any) => data.area.nameArea === 'South'
        );
        this.filterEmployeesNorth = response.filter(
          (data: any) => data.area.nameArea === 'North'
        );
        // tính tổng thành viên theo khu vực
        this.areaCounts = {
          East: this.filterEmployeesEast.length,
          West: this.filterEmployeesWest.length,
          South: this.filterEmployeesSouth.length,
          North: this.filterEmployeesNorth.length,
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
  getOnLeaveEmployees(area: any): any {
    // console.log(area);
    if (area === 'East') {
      return this.filterEmployeesEast.filter(
        (user: any) => user.status === 'Office'
      ).length;
    } else if (area === 'West') {
      return this.filterEmployeesWest.filter(
        (user: any) => user.status === 'Office'
      ).length;
    } else if (area === 'South') {
      return this.filterEmployeesSouth.filter(
        (user: any) => user.status === 'Office'
      ).length;
    } else if (area === 'North') {
      return this.filterEmployeesNorth.filter(
        (user: any) => user.status === 'Office'
      ).length;
    }
    this.loading = false;
    return 0;
  }

  getAllProjects() {
    this.projectService.get().subscribe(
      (response) => {
        // console.log(response);
        this.lengthProjectDeployment = response.filter(
          (project: any) => project.status === 'deployment'
        ).length;
        this.lengthProjectComplete = response.filter(
          (project: any) => project.status === 'complete'
        ).length;
        this.totalReducerProject = response.reduce(
          (total: any, item: any) => total + parseInt(item.budget),
          0
        );

        this.listAllProjects = response; 
        this.currentProject = this.listAllProjects[0];
        //console.log(this.currentProject +"- currentProject");
        const selectedValue = this.listAllProjects[0]._id; 
        //console.log(selectedValue+" getAllProjects()");
        this.getSelectedProjects(selectedValue);
        
        this.loading = false;
      },
      (error) => {
        console.log(error);
        this.loading = false;
      }
    );
  }

  getSelectedProjects(selectedValue: string) {
    this.projectService.getID(selectedValue).subscribe(
      (response) => {
        this.currentProject = response;
        console.log(this.currentProject._id); 
        //this.getListCurrentProjectTasks(this.currentProject._id);
        this.loading = false;
      },
      (error) => {
        console.log(error);
        this.loading = false;
      }
    );
  }



  getAllTasks() {
    //console.log(this.currentProject + " - currentProject")
    this.taskService.get().subscribe(
      (response) => {
        // console.log(response)
        this.listExistTasks = response.filter((task: any) => task.status !== "cancel"  );
        //console.log(JSON.stringify(this.listExistTasks)+"-listExistTasks");
        
        this.lengthTaskProcessing = response.filter(
          (task: any) => task.status === 'processing'
        ).length;
        
        this.loading = false;
      },
      (error) => {
        console.log(error);
        this.loading = false;
      }
    );
  }

  getListCurrentProjectTasks(selectedValue: string): void {
    this.listCurrentProjectTasks = this.listExistTasks.filter((
      task : {_id:string})=> task._id === selectedValue);
    console.log(this.listCurrentProjectTasks);
  }

  onProjectChange(event: any) {
    const selectedValue = event.target.value || this.currentProject?._id;
    console.log(selectedValue); 
    this.getSelectedProjects(selectedValue);
    this.getListCurrentProjectTasks(selectedValue);
  }
}
