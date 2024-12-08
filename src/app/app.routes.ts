import { Routes } from '@angular/router';
import { PastLaunchComponent } from './pages/space-x/past-launch/past-launch.component';
import { LatestLaunchComponent } from './pages/space-x/latest-launch/latest-launch.component';
import { UpcomingLaunchComponent } from './pages/space-x/upcoming-launch/upcoming-launch.component';
import { UnauthorizedComponent } from './shared/unauthorized/unauthorized.component';
import { authGuard } from './core/guards/auth.guard';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'space-x/past-launch', component: PastLaunchComponent, canActivate: [ authGuard ] },
    { path: 'space-x/latest-launch', component: LatestLaunchComponent, canActivate: [ authGuard ] },
    { path: 'space-x/upcoming-launch', component: UpcomingLaunchComponent, canActivate: [ authGuard ] },

    {
        path: 'unauthorized',
        component: UnauthorizedComponent
    },
];
