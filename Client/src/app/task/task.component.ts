import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../services/project.service';
import { ToastrService } from 'ngx-toastr'; //
import { TaskService } from '../services/task.service';
import { AuthService } from '../services/auth.service';
import { environment } from 'src/environments/environment';
import { UserService } from '../services/user.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
})
export class TaskComponent implements OnInit {
  projects: any;
  tasks: any;
  users : any;

  level!: string | null;

  currentPage: number = 1;
  totalPages: number = 0;
  totalItems: number = 0;
  totalPagesArray: any;

  taskName: string = '';
  description: string = '';
  idProject: string = '';
  assignedTo: string = '';
  priority: string = '';
  status: string = '';

  isAdmin: boolean = false ;

  constructor(
    private projectService: ProjectService,
    private taskService: TaskService,
    private toastr: ToastrService,
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    // const level = localStorage.getItem('level');
    // this.level = level;
    this.getTask();
    this.getProjects();
    this.getEmployees();
    this.getTask();
  }

  getProjects() {
    this.projectService.get().subscribe(
      (response) => {
        this.projects = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  checkAdmin(level: string): void {
    this.isAdmin = (level === 'admin');
  }
  getTask(
    page: number = environment.pagination.page,
    limit: number = environment.pagination.limit
  ) {
    const level = localStorage.getItem('level');
    this.level = level;
    if (level === 'leader' || level === 'admin') {
      this.checkAdmin(level);
      this.taskService.getTaskPage(page, limit).subscribe(
        (response) => {
          this.tasks = response.tasks;
          this.currentPage = response.currentPage;
          this.totalPages = response.totalPages;
          this.totalItems = response.totalItems;

          this.totalPagesArray = Array.from(
            { length: this.totalPages },
            (_, index) => index + 1
          );

          // console.log(response)
        },
        (error) => {
          console.log(error);
        }
      );
      if (level === 'leader'){

      }
    } else {
      const username = localStorage.getItem('username');
      if (username) {
        this.userService.getUserId(username).subscribe(
          (response) => {
            // console.log(response)
            this.taskService
              .getTaskPageUser(page, limit, response._id)
              .subscribe(
                (response) => {
                  // console.log(response)
                  this.tasks = response.tasks;
                  this.currentPage = response.currentPage;
                  this.totalPages = response.totalPages;
                  this.totalItems = response.totalItems;

                  this.totalPagesArray = Array.from(
                    { length: this.totalPages },
                    (_, index) => index + 1
                  );

                  // console.log(response)
                },
                (error) => {
                  console.log(error);
                }
              );
          },
          (error) => {
            console.log(error);
          }
        );
      } else {
        console.log('username not null !');
      }
    }
  }

  getEmployees() {
      this.userService.get().subscribe(
        (response) => {
          this.users = response.filter((user: any)=> user.level === "employee");
        },
        (error) => {
          console.log(error);
        }
      );
  }

  saveTask(create: boolean, edit: boolean, task: any) {
    if (create) {
      const data = {
        idProject: this.idProject,
        taskName: this.taskName,
        description: this.description,
        assignedTo: this.assignedTo,
        priority: this.priority,
        status: this.status,
      };
      this.taskService.add(data).subscribe(
        (response) => {
          if (response.status === true) {
            this.toastr.success(`${response.message}`, 'Success');
          } else {
            this.toastr.error(`${response.message}`, 'Error');
          }
          this.getTask();
          this.clearForm();
        },
        (error) => {
          console.log(error);
        }
      );
    } else if (edit && task) {
      const data = {
        idProject: task.idProject._id,
        taskName: task.taskName,
        description: task.description,
        assignedTo: task.assignedTo,
        priority: task.priority,
        status: task.status,
      };
      this.taskService.update(task._id, data).subscribe(
        (response) => {
          if (response.status === true) {
            this.toastr.success(`${response.message}`, 'Success');
          } else {
            this.toastr.error(`${response.message}`, 'Error');
          }
          this.getTask();
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  deleteTask(id: any) {
    this.taskService.delete(id).subscribe(
      (response) => {
        if (response.status === true) {
          this.toastr.success(`${response.message}`, 'Success');
        } else {
          this.toastr.error(`${response.message}`, 'Error');
        }
        this.getTask();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  clearForm() {
    this.idProject = '';
    this.taskName = '';
    this.description = '';
    this.assignedTo = '';
    this.priority = '';
    this.status = '';
  }
}
