import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SetorComponent } from './setor/setor.component';
import { MaquinaComponent } from './maquina/maquina.component';
import { RegistroComponent } from './registro/registro.component';
import { AuthGuard } from './login/auth.guard';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CadastrarComponent } from './cadastrar/cadastrar.component';

const routes: Routes = [
  { path: '', redirectTo:'login' ,pathMatch:'full'},
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: NavbarComponent, canActivate:[AuthGuard], children:[
  { path: 'setor', component: SetorComponent },
  { path: 'maquina', component: MaquinaComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'cadastrar', component: CadastrarComponent },
  { path: '', component: RegistroComponent },
    ] }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
