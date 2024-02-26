import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  users: any;

  currentPage: number = 1;
  totalPages: number = 0;
  totalItems: number = 0;
  totalPagesArray: any;

  constructor(
    private userService: UserService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(page: number = environment.pagination.page, limit: number = environment.pagination.limit) {
    this.userService.getUserPage(page,limit).subscribe(
      (response) => {
        this.users = response.users;
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

  updateUser(user: any) {
    const data = {
      status: user.status,
      level: user.level,
    };
    this.userService.update(user._id, data).subscribe(
      (response) => {
        if (response.status === true) {
          this.toastr.success(`${response.message}`, 'Success');
        } else {
          this.toastr.error(`${response.message}`, 'Error');
        }
        this.getUsers();
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
