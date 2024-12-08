import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastrNotificationService {

  constructor(private _toastr: ToastrService) { }

  showNotification(message: any, type: any) {
    const position = {
      timeOut: 5000,
      positionClass: 'toast-bottom-right',
    };
  
    switch (type) {
      case 0:
        this._toastr.success(message, 'Success', position);
        break;
      case 1:
        this._toastr.error(message, 'Error', position);
        break;
      case 2:
        this._toastr.info(message, 'Info', position);
        break;
      case 3:
        this._toastr.warning(message, 'Warning', position);
        break;
      default:
        this._toastr.info(message, 'Info', position);
        break;
    }
  }
}
