import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { gestionInspeccionesUrl } from '../../../constants/Api';
import { login } from '../../../constants/Routes';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  constructor( private apiService:ApiService, private router:Router ) {}

  validateToken(localToken:string|null, userId:string|null): Promise<{validToken:boolean, data:{id:number, email:string, nombre:string, rol:string, telefono:string, proyectosCliente:any[]}|null}> {
    return new Promise((resolve, reject) => {
      if(localToken && localToken.length > 0){
        this.apiService.get(gestionInspeccionesUrl, `clientes/id/${userId}`, localToken).subscribe({
          next:(response => {
            if(response){
              resolve({
                validToken: true,
                data: response
              })
            }
          }),
          error: (error => {
            this.closeSession();
            resolve({
              validToken: false,
              data: null
            })
          })
        })
      }
      else{
        this.closeSession();
        resolve({
          validToken: false,
          data: null
        })
      }
    })
  }

  closeSession(){
    localStorage.clear();
    this.router.navigateByUrl(login.path)
  }
}
