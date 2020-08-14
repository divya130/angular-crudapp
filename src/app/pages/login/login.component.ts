import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = {};

  constructor(
    private authService:AuthService,private router:Router,public toastr:ToastrService
    ) {

  }
  ngOnInit() {
    
  }
 

  onSubmit(){
    const userObj ={
      "email": this.model.email,
      "password": this.model.password
  }
    this.authService.userAuthentication(userObj).subscribe(
      (data : any)=>{
        localStorage.setItem('userToken',data.token);
        this.toastr.success('Logged in successfully.', '', {
          disableTimeOut: false,
          closeButton: true,
          positionClass: 'toast-' + 'top' + '-' +  'center'
        });
        this.router.navigate(['user/list']);
      },
      (err )=>{
        console.log(err)
        this.router.navigate(['login']);
      }
    )
  }


  
}

