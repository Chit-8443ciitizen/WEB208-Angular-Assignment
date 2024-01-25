import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HeaderComponent } from './common/header/header.component';
import { LoginComponent } from './common/login/login.component';
import { ErrorComponent } from './common/error/error.component';
import { LeaderComponent } from './common/leader/leader.component';
import { DashboardRightComponent } from './common/dashboard/dashboard-right/dashboard-right.component';
import { DashboardLeftComponent } from './common/dashboard/dashboard-left/dashboard-left.component';
import { DashboardMidComponent } from './common/dashboard/dashboard-mid/dashboard-mid.component';
import { CreateProjectComponent } from './common/create_project/create_project.component';
import { CreateTaskComponent } from './common/create-task/create-task.component';



@NgModule({
  declarations: [
    AppComponent, 
    LoginComponent, ErrorComponent, CreateProjectComponent, CreateTaskComponent,
     
    HeaderComponent, LeaderComponent, DashboardRightComponent, DashboardLeftComponent, DashboardMidComponent, 
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
