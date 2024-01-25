import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './common/header/header.component';
import { LoginComponent } from './common/login/login.component';
import { ErrorComponent } from './common/error/error.component';
import { LeaderComponent } from './common/leader/leader.component';
import { CreateProjectComponent } from './common/create_project/create_project.component';
import { CreateTaskComponent } from './common/create-task/create-task.component';


const routes: Routes = [
  {path:'', component:CreateTaskComponent},
  {path:'header', component:HeaderComponent},
  {path:'login', component:LoginComponent},
  {path:'error', component:ErrorComponent},
  {path:'leader', component:LeaderComponent},
  {path:'create_project', component:CreateProjectComponent},
  {path:'create_task', component:CreateTaskComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
