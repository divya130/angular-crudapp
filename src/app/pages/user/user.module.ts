import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [UserComponent, CreateComponent, EditComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    PaginationModule.forRoot(),
    FormsModule, ReactiveFormsModule,
    ModalModule.forRoot(),
    RouterModule
  ]
})
export class UserModule { }
