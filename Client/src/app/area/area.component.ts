import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AreaService } from '../services/area.service';
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
  currentPage = 1;
  totalPages = 0;
  totalItems = 0;
  totalPagesArray: number[] = [];
  nameArea = '';
  createdAt = '';

  constructor(
    private areaService: AreaService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAreas();
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
          this.currentPage = response.currentPage;
          this.totalPages = response.totalPages;
          this.totalItems = response.totalItems;
          this.totalPagesArray = Array.from({ length: this.totalPages }, (_, index) => index + 1);
        }
      );
  }

  saveArea(create: boolean, area: any) {
    const data = {
      nameArea: this.nameArea,
      createdAt: this.createdAt
    };
  
    const serviceCall = create ? this.areaService.add(data) : this.areaService.update(area._id, data);
  
    serviceCall.subscribe(
      (response: any) => {
        if (response.status === true) {
          this.toastr.success(response.message, 'Success');
          this.getAreas(); // Di chuyển gọi hàm getAreas() vào trong phần xử lý thành công của subscribe để đảm bảo nó chỉ được gọi khi yêu cầu thành công
          if (create) {
            this.clearForm(); // Xóa form sau khi thêm thành công (chỉ nên làm nếu là create)
          }
        } else {
          this.toastr.error(response.message, 'Error');
        }
      },
      (error) => console.error(error)
    );
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

  clearForm() {
    this.nameArea = '';
    this.createdAt = ''; // Xóa giá trị của createdAt khi form được xóa
  }
}
