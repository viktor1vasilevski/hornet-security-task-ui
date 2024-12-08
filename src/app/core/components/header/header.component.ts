import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { ModalService } from '../../services/modal/modal.service';
import { RegisterComponent } from '../modals/register/register.component';
import { AuthService } from '../../services/auth/auth.service';
import { LoginComponent } from '../modals/login/login.component';
import { AuthenticationManagerService } from '../../services/authentication-manager/authentication-manager.service';
import { ToastrNotificationService } from '../../services/toastr-notification.service';
import { ErrorHandlerService } from '../../services/error-handler.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy {

  isLoggedIn: boolean = false;
  loading: boolean = false;

  @ViewChild('registerModal', { read: ViewContainerRef })
  registerEntry!: ViewContainerRef;
  registerSub!: Subscription;

  @ViewChild('loginModal', { read: ViewContainerRef })
  loginEntry!: ViewContainerRef;
  loginSub!: Subscription;

  constructor(
    private _modalService: ModalService<any>,
    private _authService: AuthService,
    private _authenticationManagerService: AuthenticationManagerService,
    private _toastrNotificationService: ToastrNotificationService,
    private _router: Router,
    private _errorHandlerService: ErrorHandlerService) {   
  }  

  ngOnDestroy(): void {
    this.loginSub?.unsubscribe();
    this.registerSub?.unsubscribe();
  }

  ngOnInit(): void {
    this._authenticationManagerService.loggedIn$.subscribe((status) => {
    this.isLoggedIn = status;
   });
  }

  logout() {
    this._authenticationManagerService.logout();
    this.isLoggedIn = false;
    this._router.navigate([''])
    this._toastrNotificationService.showNotification('User logged out', 0);
  }

  login() {
    this.loginSub = this._modalService.openModal(this.registerEntry, LoginComponent, null, true).subscribe((data) => {
      this.loading = true;
      this._authService.loginUser(data).subscribe({
        next: (response: any) => {
          if (response.success) {
            const token = response.data.token;
            this._authenticationManagerService.setSession(token);
            this.isLoggedIn = true;
            this._router.navigate(['']);
            this._toastrNotificationService.showNotification(
              response.message,
              response.notificationType
            );
          } else {
            this._toastrNotificationService.showNotification(
              response.message,
              response.notificationType
            );
          }
          this.loading = false;
        },
        error: (errors: any) => {
          this._errorHandlerService.handleValidationErrors(errors);
          this.loading = false;
        },
      }); 
    })
  }

  


  register() {
    this.registerSub = this._modalService.openModal(this.registerEntry, RegisterComponent, null, true).subscribe((data) => {
      this.loading = true;
      this._authService.registerUser(data).subscribe({
        next: (response: any) => {
          if (response.success) {
            this._toastrNotificationService.showNotification(
              response.message,
              response.notificationType
            );
          } else {
            this._toastrNotificationService.showNotification(
              response.message,
              response.notificationType
            );
          }
          this.loading = false;
        },
        error: (errors: any) => {
          this._errorHandlerService.handleValidationErrors(errors);
          this.loading = false;
        },
      });
        
    })
    
  }

}
