import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('f') loginForm!: NgForm ;
  userData = {
    tenDN : '',
    matKhau :''
    }
  ngOnInit(): void{

  }
  onSubmit(): void{ // (contactForm:NgForm)
    console.log(this.loginForm.value) // contactForm
  }
  suggest(){
    this.userData.tenDN = "[your username]@fpt.edu.vn" 
  }
}
