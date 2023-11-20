import { Routes } from '@angular/router';
import { dashboard, register, login } from '../constants/Routes';
import { ErrorPageComponent } from './pages/error-page/error-page.component';

export const routes: Routes = [
  login,
  register,
  dashboard,
  {
    path:'**',
    component:ErrorPageComponent
  }
];
