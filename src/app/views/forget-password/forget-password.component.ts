import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { NotificationsService } from '../../shared/notifications.service';
@Component({
  selector: 'app-forget',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {
  isEmailEntered:Boolean = false;
  validUser:Boolean = false;

  forgetForm:FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public notificationService: NotificationsService
  ) { }

  ngOnInit() {
    this.forgetForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: [''],
      otp: [''],
      confirmPassword: ['']
    })
  }

  validateEmail(){
    this.isEmailEntered = true;
    this.notificationService.notify('warning','Invalid Email');
    this.notificationService.notify('success','success');
  }

  validateOTP(){
    this.validUser = true;
  }

  changePassword(){

  }
}
