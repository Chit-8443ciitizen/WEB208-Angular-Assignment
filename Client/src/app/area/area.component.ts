import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AreaService } from '../services/area.service';
import { AuthService } from '../services/auth.service';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.css'],
})
export class AreaComponent implements OnInit {
  areas: any;
  editAreas: any;

  isAdmin: boolean = false;
  level: string | null = null;

  currentPage = 1;
  totalPages = 0;
  totalItems = 0;
  totalPagesArray: number[] = [];
  nameArea: string = '';
  createdAt: string = '';
  nameEditArea: string = '';
  createdEditAt: string = '';
  constructor(
    private authService: AuthService,
    private areaService: AreaService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAreas();
    this.clearForm();

    this.authService.level.subscribe((level) => {
      this.level = level;
    });
    this.level = this.authService.getLevel();
    this.checkAdmin(this.level || "");
  }

  getAreas(page: number = environment.pagination.page, limit: number = environment.pagination.limit) {
    this.areaService.getAreaPage(page, limit)
      .pipe(
        catchError(error => {
          console.error(error);
          return throwError('An error occurred while fetching areas.');
        })
      )
      .subscribe(
        (response: any) => {
          this.areas = response.areas;
          this.editAreas = response.areas;
          this.currentPage = response.currentPage;
          this.totalPages = response.totalPages;
          this.totalItems = response.totalItems;
          this.totalPagesArray = Array.from({ length: this.totalPages }, (_, index) => index + 1);
        }
      );
  }

  saveArea(create: boolean, edit: boolean, area: any) {
    if (create) {
      const data = {
        nameArea: this.nameArea,
        createdAt: this.createdAt
      }; console.log(data);
      this.areaService.add(data).subscribe(
        (response) => {
          if (response.status === true) {
            this.toastr.success(`${response.message}`, 'Success');
          } else {
            this.toastr.error(`${response.message}`, 'Error');
          }
          this.getAreas();
          this.clearForm();
        },
        (error) => {
          console.log(error);
        }
      );
    } else if (edit && area) {
      const data = {
        nameArea: area.nameArea,
        createdAt: area.createdAt
      };
      this.areaService.update(area._id, data).subscribe(
        (response) => {
          if (response.status === true) {
            this.toastr.success(`${response.message}`, 'Success');
          } else {
            this.toastr.error(`${response.message}`, 'Error');
          }
          this.getAreas();
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
  
  deleteArea(id: any) {
    this.areaService.delete(id)
      .subscribe(
        (response: any) => {
          if (response.status === true) {
            this.toastr.success(response.message, 'Success');
          } else {
            this.toastr.error(response.message, 'Error');
          }
          this.getAreas();
        },
        (error) => console.error(error)
      );
  }

  getCurrentDate(): string{
    const today = new Date();
    const day = String(today.getDate()).padStart(2,'0');
    const month = String(today.getMonth()+1).padStart(2, '0');
    const year = today.getFullYear();

    return `${year}-${month}-${day}`;
  }

  clearForm() {
    this.nameArea = '';
    this.createdAt = ''; // Xóa giá trị của createdAt khi form được xóa
  }

  checkAdmin(level: string): void {
    this.isAdmin = (level === 'admin');
  }

}
