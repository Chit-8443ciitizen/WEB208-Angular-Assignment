import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './common/header/header.component';
import { LoginComponent } from './common/login/login.component';
import { ErrorComponent } from './common/error/error.component';

const routes: Routes = [
  {path:'/', component:HeaderComponent},
  {path:'/header', component:HeaderComponent},
  {path:'/login', component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
