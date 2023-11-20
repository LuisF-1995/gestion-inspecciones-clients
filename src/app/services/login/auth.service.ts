import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  login(email: string|null|undefined, password: string|null|undefined): boolean {
    return true;
  }
}
