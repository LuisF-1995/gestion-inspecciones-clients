import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { dashboard, register } from '../../../constants/Routes';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'page-login',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {
  registerUrl = register.path;
  dashboardUrl = dashboard.path;

  onSubmit(){

  }
}
