import { Injectable } from '@angular/core';
import { ToastrNotificationService } from './toastr-notification.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(private _toastrNotificationService: ToastrNotificationService) { }

    /**
     * Handles API validation and general errors, displaying them as toastr notifications.
     * - For validation errors, field-specific messages are shown.
     * - For general errors, a single message is displayed.
     * 
     * @param errors - The error object returned from the API, containing either validation or general errors.
     */
    handleValidationErrors(errors: any): void {  
      const validationErrors = errors?.error?.errors;
      
      if (validationErrors) {
        for (const field in validationErrors) {
          if (validationErrors.hasOwnProperty(field)) {
            validationErrors[field].forEach((message: string) => {
              this._toastrNotificationService.showNotification(message, 1);
            });
          }
        }
      } else if (errors?.error?.message) {
        this._toastrNotificationService.showNotification(errors.error.message, errors.error.notificationType);
      } else {
        this._toastrNotificationService.showNotification('An unknown error occurred.', 1);
      }
    }
    
    
}
