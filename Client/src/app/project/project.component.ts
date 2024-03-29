import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../services/project.service';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { filter } from 'rxjs';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
})
export class ProjectComponent implements OnInit {
  projects: any;
  leaders : any;
  projectEmployees : any;

  isAdmin: boolean = false;
  level: string | null = null;

  currentPage: number = 1;
  totalPages: number = 0;
  totalItems: number = 0;
  totalPagesArray: any;

  nameProject: string = '';
  nameLeader: string = '';
  teamSize: string = '';
  dateOfStart: string = '';
  budget: string = '';
  expense: string = '';
  status: string = '';

  constructor(
    private projectService: ProjectService,
    private toastr: ToastrService,
    private userService: UserService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.getProjects();
    this.getLeaders();
    
    this.authService.level.subscribe((level) => {
      this.level = level;
    });
    this.level = this.authService.getLevel();
    this.checkAdmin(this.level || "");
  }

  saveProject(create: boolean, edit: boolean, project: any) {
    if (create) {
      const data = {
        nameProject: this.nameProject,
        nameLeader: this.nameLeader,
        teamSize: this.teamSize,
        dateOfStart: this.dateOfStart,
        budget: this.budget,
        expense: this.expense,
        status: this.status,
      }; console.log(data);
      this.projectService.add(data).subscribe(
        (response) => {
          if (response.status === true) {
            this.toastr.success(`${response.message}`, 'Success');
          } else {
            this.toastr.error(`${response.message}`, 'Error');
          }
          this.getProjects();
          this.clearForm();
        },
        (error) => {
          console.log(error);
        }
      );
    } else if (edit && project) {
      const data = {
        nameProject: project.nameProject,
        nameLeader: project.nameLeader,
        teamSize: project.teamSize,
        dateOfStart: project.dateOfStart,
        budget: project.budget,
        expense: project.expense,
        status: project.status,
      };
      this.projectService.update(project._id, data).subscribe(
        (response) => {
          if (response.status === true) {
            this.toastr.success(`${response.message}`, 'Success');
          } else {
            this.toastr.error(`${response.message}`, 'Error');
          }
          this.getProjects();
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  deleteProject(id: any) {
    this.projectService.delete(id).subscribe(
      (response) => {
        if (response === true) {
          this.toastr.success(`${response.message}`, 'Success');
        } else {
          this.toastr.error(`${response.message}`, 'Error');
        }
        this.getProjects();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getProjects(page: number = environment.pagination.page, limit: number = environment.pagination.limit) {
    this.projectService.getProjectPage(page, limit).subscribe(
      (response) => {
        //console.log(response.projects);
        this.projects = response.projects;
        this.currentPage = response.currentPage;
        this.totalPages = response.totalPages;
        this.totalItems = response.totalItems;

        this.totalPagesArray = Array.from(
          { length: this.totalPages },
          (_, index) => index + 1
        );
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getLeaders() {
    this.userService.get().subscribe(
      (response) => {
        this.leaders = response.filter((leader: any)=> leader.level === "leader");
        //console.log(this.leaders);
        // this.projectEmployees = this.leaders.filter((leader:any) => leader._id ==="")
      },
      (error) => {
        console.log(error);
      }
    );
  }

  clearForm() {
    this.nameProject = '';
    this.nameLeader = '';
    this.teamSize = '';
    this.dateOfStart = '';
    this.budget = '';
    this.status = '';
  }

  checkAdmin(level: string): void {
    this.isAdmin = (level === 'admin');
  }
  
}
