import { Component, OnInit } from '@angular/core';
import { SpaceXService } from '../../../core/services/space-x/space-x.service';
import { CommonModule } from '@angular/common';
import { ToastrNotificationService } from '../../../core/services/toastr-notification.service';
import { ErrorHandlerService } from '../../../core/services/error-handler.service';

@Component({
  selector: 'app-upcoming-launch',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './upcoming-launch.component.html',
  styleUrl: './upcoming-launch.component.css'
})
export class UpcomingLaunchComponent implements OnInit {

  upcomingLaunches: any;
  loading: boolean = false;

  constructor(private _spaceXService: SpaceXService,
    private _toastrNotificationService: ToastrNotificationService,
    private _errorsHandlerService: ErrorHandlerService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this._spaceXService.getLaunches('upcoming').subscribe({
      next: (response: any) => {
        if (response.success) {
          this.upcomingLaunches = response.data;
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
