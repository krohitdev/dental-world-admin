import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
type Alerts = 'success' | 'info' | 'warning' | 'error';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  message;
  constructor(private toastrService: ToastrService) { 
  }

  notify(alert: Alerts, detail: string, title? : String): void {
    this.message = detail;
    this.showAlert(alert,title);
  }

  showAlert(obj,title?): void {
    switch (obj) {
      case 'success': {
        this.toastrService.success(this.message);
        break;
      }
      case 'info': {
        this.toastrService.info(this.message,title);
        break;
      }
      case 'warning': {
        this.toastrService.warning(this.message);
        break;
      }
      case 'error': {
        this.toastrService.error(this.message);
        break;
      }
    }
  }
  
}
