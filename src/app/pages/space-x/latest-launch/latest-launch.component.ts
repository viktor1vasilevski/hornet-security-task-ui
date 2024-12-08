import { Component, OnInit } from '@angular/core';
import { SpaceXService } from '../../../core/services/space-x/space-x.service';
import { CommonModule } from '@angular/common';
import { ToastrNotificationService } from '../../../core/services/toastr-notification.service';
import { ErrorHandlerService } from '../../../core/services/error-handler.service';

@Component({
  selector: 'app-latest-launch',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './latest-launch.component.html',
  styleUrl: './latest-launch.component.css'
})
export class LatestLaunchComponent implements OnInit {

  launchData: any;
  loading: boolean = false;

  constructor(private _spaceXService: SpaceXService,
    private _toastrNotificationService: ToastrNotificationService,
    private _errorsHandlerService: ErrorHandlerService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this._spaceXService.getLaunches('latest').subscribe({
      next: (response: any) => {
        if (response.success) {
          this.launchData = response.data;
        } else {
          this._toastrNotificationService.showNotification(response.message, response.notificationType);
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
