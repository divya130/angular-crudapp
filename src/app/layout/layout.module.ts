import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppLayoutComponent } from './app-layout/app-layout.component';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { NavComponent } from './nav/nav.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [AppLayoutComponent, AuthLayoutComponent, NavComponent],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class LayoutModule { }
