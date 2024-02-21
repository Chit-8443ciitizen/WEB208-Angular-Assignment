import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../services/project.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
})
export class ProjectComponent implements OnInit {
  projects: any;

  currentPage: number = 1;
  totalPages: number = 0;
  totalItems: number = 0;
  totalPagesArray: any;

  nameProject: string = '';
  teamSize: string = '';
  dateOfStart: string = '';
  budget: string = '';
  expense: string = '';
  status: string = '';

  constructor(
    private projectService: ProjectService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getProjects();
  }

  saveProject(create: boolean, edit: boolean, huydev: any) {
    if (create) {
      const data = {
        nameProject: this.nameProject,
        teamSize: this.teamSize,
        dateOfStart: this.dateOfStart,
        budget: this.budget,
        expense: this.expense,
        status: this.status,
      };
      this.projectService.add(data).subscribe(
        (response) => {
          this.toastr.success(`Thêm Project Thành Công`, 'Success');
          this.getProjects();
          this.clearForm();
        },
        (error) => {
          console.log(error);
        }
      );
    } else if (edit && huydev) {
      const data = {
        nameProject: huydev.nameProject,
        teamSize: huydev.teamSize,
        dateOfStart: huydev.dateOfStart,
        budget: huydev.budget,
        expense: huydev.expense,
        status: huydev.status,
      };
      this.projectService.update(huydev._id, data).subscribe(
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
        console.log(response);
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

  clearForm() {
    this.nameProject = '';
    this.teamSize = '';
    this.dateOfStart = '';
    this.budget = '';
    this.status = '';
  }
}
