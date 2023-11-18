import { DashboardComponent } from "../app/pages/dashboard/dashboard.component";
import { LoginComponent } from "../app/pages/login/login.component";
import { RegisterComponent } from "../app/pages/register/register.component";

export const login = {
  path:"",
  tittle: "Login",
  component: LoginComponent
}

export const register = {
  path:"register",
  title: "Register",
  component: RegisterComponent
}

export const dashboard = {
  path: "dashboard",
  title: "Client Dashboard",
  component: DashboardComponent
}
