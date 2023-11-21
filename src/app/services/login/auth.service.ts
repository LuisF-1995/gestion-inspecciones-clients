import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { resolve } from 'path';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(  private apiService: ApiService  ) {
   }

  async login(apiUrl:string, endpoint:string, data:{email:string, password:string}, token?:string): Promise<{success:boolean, message:string, token?:string, data?:any}> {
    return new Promise((resolve, reject) => {
      this.apiService.post(apiUrl, endpoint, data).subscribe({
        next: (response) => {
          resolve({
            success: response.authenticationSuccess,
            message: response.authInfo,
            token: response.jwtToken
          })
        },
        error: (error) => {
          if(error.status != 200)
            resolve({
              success: false,
              message: "Usuario no existe!!",
            });
        }
      });
    })
  }

  async verifyClientExists(apiUrl:string, endpoint:string, data:{email:string, password:string}, token?:string): Promise<boolean>{
    return new Promise((resolve, reject) => {
      this.apiService.post(apiUrl, endpoint, data).subscribe({
        next: (response) => {
          resolve(true);
        },
        error: (error) => {
          resolve(false);
        }
      });
    })
  }
}
