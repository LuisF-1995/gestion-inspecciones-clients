import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValidateDataService } from '../../services/form-validation/validate-data.service';
import { Router, RouterLink } from '@angular/router';
import { gestionInspeccionesUrl } from '../../../constants/Api';
import { login } from '../../../constants/Routes';
import { RegisterService } from '../../services/register/register.service';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { SpinnerComponent } from '../../components/spinner/spinner.component';

@Component({
  selector: 'page-register',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, SpinnerComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  constructor(private router: Router, private validateDataService: ValidateDataService, private registerService:RegisterService){}

  apiUrl:string = gestionInspeccionesUrl;
  loginUrl:string = login.path;
  registerData = {
    nombre:"",
    telefono:"",
    email:"",
    password:""
  }
  errorMessage:string = "";
  showSpinner:boolean = false;
  spinnerMessage:string = '';

  async register(){
    this.showSpinner = true;
    this.spinnerMessage = 'Validando email ...';
    const validEmail:boolean = this.validateDataService.validateEmail(this.registerData.email);

    if(this.registerData.email.length > 0 && validEmail && this.registerData.password.length > 0){
      this.spinnerMessage = 'Verificando usuario ...';
      const recordInfo = await this.registerService.register(this.apiUrl, "clientes/register", this.registerData);

      if (recordInfo.success) {
        this.showSpinner = false;
        Swal.fire({
          title: 'Registro exitoso!',
          text: `Ya puedes iniciar sesión`,
          icon: 'success',
          confirmButtonText: 'Iniciar sesión',
          showCancelButton:true,
          cancelButtonText: 'Cerrar'
        })
        .then(event => {
          if(event.isConfirmed){
            this.router.navigateByUrl(this.loginUrl);
          }
        })
      }
      else {
        this.showSpinner = false;
        this.errorMessage = recordInfo.message;
        Swal.fire({
          title: 'No se pudo registrar!',
          text: this.errorMessage,
          icon: 'info',
          confirmButtonText: 'Iniciar sesion',
          showCancelButton:true,
          cancelButtonText: 'Cerrar'
        })
        .then(event => {
          if(event.isConfirmed){
            this.router.navigateByUrl(this.loginUrl);
          }
        })
      }
    }
    else{
      this.showSpinner = false;
      this.errorMessage = this.validateDataService.identifyMailErrors(this.registerData.email);
    }
  }
}
