import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  // providers:[BsModalRef]
})
export class CreateComponent implements OnInit {
  userCreateForm: FormGroup;
    submitted = false;
    public event: EventEmitter<any> = new EventEmitter();

    constructor(private formBuilder: FormBuilder,public bsModalRef: BsModalRef
      ,private userService:UserService,public toastr:ToastrService,) { }
    ngOnInit() {
        this.userCreateForm = this.formBuilder.group({
          first_name: ['', Validators.required],
          last_name: ['', Validators.required],
            userName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            phone: ['', [Validators.required,Validators.pattern("^[0-9]*$"), Validators.minLength(10), Validators.maxLength(10)]],
            address: ['', Validators.required],
            pincode: ['', [Validators.required,Validators.minLength(6),Validators.pattern("^[0-9]*$")]],
            designation:['',Validators.required]
        });
    }

    get usr() { return this.userCreateForm.controls; }

    onSubmit() {
        this.submitted = true;
        if (this.userCreateForm.invalid) {
            return;
        }
console.log(this.userCreateForm)
        const usrCreateObj = {
          "name": this.userCreateForm.value.userName,
          "job": this.userCreateForm.value.designation
      }
      console.log(usrCreateObj)
      this.userService.userCreation(usrCreateObj).subscribe(data=> {
        console.log(data,"success")
        this.triggerEvent(this.userCreateForm.value);
        this.toastr.success('User Create successfully.', '', {
          disableTimeOut: false,
          closeButton: true,
          positionClass: 'toast-' + 'top' + '-' +  'center'
        });
        this.bsModalRef.hide();      
      },err=> {
        
      })
    }
    triggerEvent(item: string) {
      this.event.emit({ data: item , res:200 });
    }
closeModel() {
  this.bsModalRef.hide();      
}
}
