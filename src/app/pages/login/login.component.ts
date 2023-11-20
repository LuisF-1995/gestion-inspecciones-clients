import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { dashboard, register } from '../../../constants/Routes';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../services/login/auth.service';
import { FormsModule } from '@angular/forms';
import { ValidateDataService } from '../../services/form-validation/validate-data.service';

@Component({
  selector: 'page-login',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {

  constructor(private validateDataService: ValidateDataService,private authService: AuthService, private router: Router) {
  }

  registerUrl:string = register.path;
  dashboardUrl:string = dashboard.path;
  email:string = "";
  password:string = "";
  isValidMail:boolean = false;
  errorMessage:string = "";

  identifyMailErrors(): void {
    const emailParts = this.email.split('@');

    if (emailParts.length !== 2) {
      this.errorMessage = 'Error: El correo electrónico debe contener un solo "@"';
      return;
    }

    const [username, domain] = emailParts;

    if (username === '' || domain === '') {
      this.errorMessage = 'Error: El nombre de usuario o el dominio no pueden estar vacíos';
      return;
    }

    const domainParts = domain.split('.');

    if (domainParts.length < 2) {
      this.errorMessage = 'Error: El dominio debe contener al menos un punto (.)';
      return;
    }

    const topLevelDomain = domainParts[domainParts.length - 1];

    if (topLevelDomain.length < 2 || topLevelDomain.length > 6) {
      this.errorMessage = 'Error: La parte superior del dominio debe tener entre 2 y 6 caracteres';
      return;
    }

    this.errorMessage = 'Error: Otra condición de validación no cumplida';
  }


  login(){
    const validEmail:boolean = this.validateDataService.validateEmail(this.email);
    this.errorMessage = this.validateDataService.identifyMailErrors(this.email);

    if(this.email.length > 0 && validEmail && this.password.length > 0){
      const isAuthenticated = this.authService.login(this.email, this.password);

      if (isAuthenticated) {
        this.router.navigateByUrl(dashboard.path);
      }
      else {
        console.log('Autenticación fallida');
      }
    }
    else{
      console.log(this.errorMessage);
    }
  }
}
