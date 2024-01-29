import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HeaderComponent } from './common/header/header.component';
import { LoginComponent } from './common/login/login.component';
import { ErrorComponent } from './common/alert/error/error.component';
import { ConnectDbComponent } from './common/alert/connect-db/connect-db.component';
import { LeaderComponent } from './modules/administrator/dashboard_main/leader.component';
import { DashboardRightComponent } from './modules/administrator/dashboard-right/dashboard-right.component';
import { DashboardLeftComponent } from './modules/administrator/dashboard-left/dashboard-left.component';
import { DashboardMidComponent } from './modules/administrator/dashboard-mid/dashboard-mid.component';
import { CreateProjectComponent } from './modules/administrator/create_project/create_project.component';
import { CreateTaskComponent } from './modules/leader/create_task/create-task.component';
import { CreateEmployeeComponent } from './modules/administrator/create-employee/create-employee.component';
import { EditProjectComponent } from './modules/administrator/edit-project/edit-project.component';
import { EditTaskComponent } from './modules/leader/edit-task/edit-task.component';
import { EditEmployeeComponent } from './modules/administrator/edit-employee/edit-employee.component';
import { DashboardMainComponent } from './modules/employee/dashboard-main/dashboard-main.component';
import { MongoDBAPIService } from './core/service/mongodb-api.service';





@NgModule({
  declarations: [
    AppComponent, 
    LoginComponent, ErrorComponent, 
    
     
    HeaderComponent, LeaderComponent, 
    DashboardRightComponent, DashboardLeftComponent, DashboardMidComponent, DashboardMainComponent, 
    CreateEmployeeComponent, CreateProjectComponent, CreateTaskComponent,
    EditProjectComponent, EditTaskComponent, EditEmployeeComponent,  
    
    ConnectDbComponent, 
  ],
  imports: [
    BrowserModule, ReactiveFormsModule,
    AppRoutingModule, FormsModule, HttpClientModule
  ],
  providers: [
     MongoDBAPIService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
