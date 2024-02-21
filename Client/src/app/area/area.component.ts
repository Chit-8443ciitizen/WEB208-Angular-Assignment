// import { Component, OnInit } from '@angular/core';
// import { ToastrService } from 'ngx-toastr';
// import { AreaService } from '../services/area.service';
// import { environment } from 'src/environments/environment';

// @Component({
//   selector: 'app-area',
//   templateUrl: './area.component.html',
//   styleUrls: ['./area.component.css'],
// })
// export class AreaComponent implements OnInit {
//   areas: any;
//   currentPage: number = 1;
//   totalPages: number = 0;
//   totalItems: number = 0;
//   totalPagesArray: any;

//   nameArea: string = '';

//   constructor(
//     private areaService: AreaService,
//     private toastr: ToastrService
//   ) {}

//   ngOnInit(): void {
//     this.getAreas();
//   }

//   getAreas(page: number = environment.pagination.page, limit: number = environment.pagination.limit) {
//     this.areaService.getAreaPage(page, limit).subscribe(
//       (response) => {
//         this.areas = response.areas;
//         this.currentPage = response.currentPage;
//         this.totalPages = response.totalPages;
//         this.totalItems = response.totalItems;

//         this.totalPagesArray = Array.from(
//           { length: this.totalPages },
//           (_, index) => index + 1
//         );
//       },
//       (error) => {
//         console.log(error);
//       }
//     );
//   }

//   saveArea(create: boolean, edit: boolean, huydev: any) {
//     if (create) {
//       const data = {
//         nameArea: this.nameArea,
//       };
//       this.areaService.add(data).subscribe(
//         (response) => {
//           this.toastr.success(`Thêm Khu Vực Thành Công`, 'Success');
//           this.getAreas();
//           this.clearForm();
//         },
//         (error) => {
//           console.log(error);
//         }
//       );
//     } else if (edit && huydev) {
//       const data = {
//         nameArea: huydev.nameArea,
//       };
//       this.areaService.update(huydev._id, data).subscribe(
//         (response) => {
//           if (response.status === true) {
//             this.toastr.success(`${response.message}`, 'Success');
//           } else {
//             this.toastr.error(`${response.message}`, 'Error');
//           }
//           this.getAreas();
//         },
//         (error) => {
//           console.log(error);
//         }
//       );
//     }
//   }

//   deleteArea(id: any) {
//     this.areaService.delete(id).subscribe(
//       (response) => {
//         if (response === true) {
//           this.toastr.success(`${response.message}`, 'Success');
//         } else {
//           this.toastr.error(`${response.message}`, 'Error');
//         }
//         this.getAreas();
//       },
//       (error) => {
//         console.log(error);
//       }
//     );
//   }

//   clearForm() {
//     this.nameArea = '';
//   }
// }

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

  saveArea(create: boolean, edit: boolean, huydev: any) {
    const data = {
      nameArea: create ? this.nameArea : huydev.nameArea
    };

    const serviceCall = create ? this.areaService.add(data) : this.areaService.update(huydev._id, data);

    serviceCall.subscribe(
      (response: any) => {
        if (response.status === true) {
          this.toastr.success(response.message, 'Success');
        } else {
          this.toastr.error(response.message, 'Error');
        }
        this.getAreas();
        if (create) {
          this.clearForm();
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
  }
}
