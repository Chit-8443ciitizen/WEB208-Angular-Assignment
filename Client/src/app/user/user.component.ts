import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  users: any;
  level: string | null = null;
  isAdmin: boolean = false;
  currentPage: number = 1;
  totalPages: number = 0;
  totalItems: number = 0;
  totalPagesArray: any;

  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getUsers();

    this.authService.level.subscribe((level) => {
      this.level = level;
    });
    this.level = this.authService.getLevel();
    this.checkAdmin(this.level || "");
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

  deleteUser(id: any) {
    this.userService.delete(id).subscribe(
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

  checkAdmin(level: string): void {
    this.isAdmin = (level === 'admin');
    //this.isEmployee = (level === 'employee');
  }
  checkLevel(id: string): string {
    //this.isAdmin = (level === 'admin');
    //this.isEmployee = (level === 'employee');
    return "kkk";
  }

}
