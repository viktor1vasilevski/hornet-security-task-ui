import { Component, OnInit } from '@angular/core';
import { SpaceXService } from '../../../core/services/space-x/space-x.service';
import { CommonModule } from '@angular/common';
import { ToastrNotificationService } from '../../../core/services/toastr-notification.service';
import { ErrorHandlerService } from '../../../core/services/error-handler.service';

@Component({
  selector: 'app-past-launch',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './past-launch.component.html',
  styleUrl: './past-launch.component.css'
})
export class PastLaunchComponent implements OnInit {

  pastLaunches: any;
  loading: boolean = false;

  constructor(private _spaceXService: SpaceXService,
    private _toastrNotificationService: ToastrNotificationService,
    private _errorsHandlerService: ErrorHandlerService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this._spaceXService.getLaunches('past').subscribe({
      next: (response: any) => {
        if (response.success) {
          this.pastLaunches = response.data;
        } else {
          this._toastrNotificationService.showNotification(
            response.message,
            response.notificationType
          );
        }
        this.loading = false;
      },
      error: (errors: any) => {
        this._errorsHandlerService.handleValidationErrors(errors);
        this.loading = false;
      },
    });
  }

}
