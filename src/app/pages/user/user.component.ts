import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { CreateComponent } from './create/create.component';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
users=[];
currentPage = 1;
page: number =1;
paginationDetails: any={
  page: 1,
per_page: 6,
total: 0,
total_pages: 0
};

modalRef: BsModalRef;

  constructor(private userService:UserService,private modalService: BsModalService,
    public toastr:ToastrService) { }

  ngOnInit() {
    this.getUsers()
  }
  pageChanged(event: any): void {
    this.page = event.page;
    this.getUsers()
  }
getUsers() {
  this.userService.getUsers(this.page).subscribe(data=> {
this.users = data.data;
this.paginationDetails = data;
this.users.unshift({
  avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/calebogden/128.jpg",
email: "george@reqres.in",
first_name: "User",
id: 23,
last_name: "not found"
})
console.log(data,"Userds data")
  },
  err=> {

  })
}
openModal() {
  this.modalRef = this.modalService.show(CreateComponent);
  this.modalRef.content.closeBtnName = 'Close';
  this.modalRef.content.event.subscribe(res => {
   console.log(res.data);
   let obj = res.data;
   obj['avatar'] = "https://s3.amazonaws.com/uifaces/faces/twitter/follettkyle/128.jpg";
    // this.users.unshift(res.data);
  });
}
deleteUser(usrID) {
this.userService.deleteUser(usrID).subscribe(val=> {
console.log(val)
this.toastr.success('User Deleted successfully.', '', {
  disableTimeOut: false,
  closeButton: true,
  positionClass: 'toast-' + 'top' + '-' +  'center'
});
},err=> {
  this.toastr.error('Error while deleting the user.', '', {
    disableTimeOut: false,
    closeButton: true,
    positionClass: 'toast-' + 'top' + '-' +  'center'
  });
})
}
}
