import { authGuard } from './guards/auth.guard';
import { DashboardComponent } from './comps/dashboard/dashboard.component';
import { Routes } from '@angular/router';
import { LoginComponent } from './comps/login/login.component';
import { RegisterComponent } from './comps/register/register.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [authGuard]
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },

];
