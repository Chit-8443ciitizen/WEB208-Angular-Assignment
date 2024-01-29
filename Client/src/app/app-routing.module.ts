import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './common/header/header.component';
import { LoginComponent } from './common/login/login.component';
import { ErrorComponent } from './common/alert/error/error.component';
import { LeaderComponent } from './modules/administrator/dashboard_main/leader.component';
import { CreateProjectComponent } from './modules/administrator/create_project/create_project.component';
import { CreateTaskComponent } from './modules/leader/create_task/create-task.component';
import { CreateEmployeeComponent } from './modules/administrator/create-employee/create-employee.component';
import { ConnectDbComponent } from './common/alert/connect-db/connect-db.component';


const routes: Routes = [
  {path:'', component:LeaderComponent},
  {path:'header', component:HeaderComponent},
  {path:'login', component:LoginComponent},
  {path:'error', component:ErrorComponent},
  {path:'leader', component:LeaderComponent},
  {path:'create_project', component:CreateProjectComponent},
  {path:'create_task', component:CreateTaskComponent},
  {path:'create_employee', component:CreateEmployeeComponent},
  {path:'alert/connect_db', component:ConnectDbComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
