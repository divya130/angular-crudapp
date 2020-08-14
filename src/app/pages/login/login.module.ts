import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
// import { NgxSpinnerModule } from "ngx-spinner";
import { FormsModule } from '@angular/forms';
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    // NgxSpinnerModule,
    FormsModule,
    RouterModule
  ]
})
export class LoginModule { }
