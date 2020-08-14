import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  userid:any;
  Userdetails: any;
  userUpdateForm: FormGroup;
  submitted = false;
  usernotfound: boolean;

  constructor(private userService:UserService,private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,private router:Router,public toastr:ToastrService,) {
   }

  ngOnInit() {
    this.userUpdateForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
        userName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phone: ['9787654321', [Validators.required,Validators.pattern("^[0-9]*$"), Validators.minLength(10), Validators.maxLength(10)]],
        address: ['Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09', Validators.required],
        pincode: ['123456', [Validators.required,Validators.minLength(6),Validators.pattern("^[0-9]*$")]],
        designation:['Developer',Validators.required]
    });
    this.activatedRoute.params.subscribe((params: Params) => {
      console.log('checking val', params);
      (params.userid !== undefined) ? this.userid = params.userid : this.userid = '';
  if (this.userid) {
    this.getUserDetails()
  }
    })
  }
  get usr() { return this.userUpdateForm.controls; }

getUserDetails() {
this.userService.getUserDetail(this.userid).subscribe(data=> {
  console.log(data,"hhhh")
  this.Userdetails = data;
  this.userUpdateForm.controls['first_name'].setValue(data.data.first_name);
  this.userUpdateForm.controls['userName'].setValue(data.data.first_name + ' '+ data.data.last_name);

  this.userUpdateForm.controls['last_name'].setValue(data.data.last_name);
  this.userUpdateForm.controls['email'].setValue(data.data.email);

  

},err=> {
console.log(err,"errrr")
if (err.status === 404) {
  this.usernotfound = true
}
})
}
onSubmit() {
  this.submitted = true;

  if (this.userUpdateForm.invalid) {
      return;
  }
  console.log(this.userUpdateForm.value,"oooo")
  const usrObj ={
    "name": this.userUpdateForm.value.userName,
    "job": this.userUpdateForm.value.designation
}
this.userService.userUpdation(this.userid,usrObj).subscribe(data=>{
console.log(data,"data")
this.toastr.success('User ' +this.userUpdateForm.value.userName +' Updated successfully.', '', {
  disableTimeOut: false,
  closeButton: true,
  positionClass: 'toast-' + 'top' + '-' +  'center'
});
this.router.navigate(['user/list'])
},err=>{
  console.log(err)
  this.toastr.error('Error while updating the user details.', '', {
    disableTimeOut: false,
    closeButton: true,
    positionClass: 'toast-' + 'top' + '-' +  'center'
  });
})
}
}
