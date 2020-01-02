import { Component } from "@angular/core";
import { OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { NotificationsService } from "../../../shared/notifications.service";
import { environment } from "../../../../environments/environment";
// import { AuthService } from '../auth.service';
import { Router } from "@angular/router";
import { AuthService } from "../auth.service";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-login",
  templateUrl: "login.component.html",
  styleUrls: ["login.component.scss"]
})
export class LoginComponent implements OnInit {
  ngSwitchState = "loading";
  loginForm: FormGroup;
  submitted = false;
  baseURl = environment.BaseURL;
  constructor(
    private formBuilder: FormBuilder,
    public notificationService: NotificationsService,
    private service: AuthService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    document.body.classList.add("login-bg"); // Add This if want to add image on componet html

    this.loginForm = this.formBuilder.group({
      email: ["", Validators.required],
      password: ["", Validators.required],
      passcode: ["", Validators.required]
    });
    this.ngSwitchState = "loaded";

    // this.notificationService.notify('info','test');
    // this.notificationService.notify('warning','test2');
    // this.notificationService.notify('error','test3');
    // this.notificationService.notify('success','test');
  }

  login() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.spinner.show();

    this.service.login(this.loginForm.value).subscribe(_response => {
      // this.get('1');
      this.spinner.hide();

      if (_response.error) {
        this.notificationService.notify("warning", _response.error);
      } else {
        this.notificationService.notify("success", "success");
        this.router.navigate(["/dashboard"]);
      }
    });
  }
}
