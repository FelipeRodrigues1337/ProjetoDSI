import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { SetorComponent } from './setor/setor.component';
import { RegistroComponent } from './registro/registro.component';
import { ClientesComponent } from './clientes/clientes.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MaquinaComponent } from './maquina/maquina.component';
import { LoginComponent } from './login/login.component';

import { ToastrModule } from 'ngx-toastr';
import { NavbarComponent } from './navbar/navbar.component';
import { ProcurarPessoaPipe } from './pipes/procurar-pessoa-pipe';
import { ProcurarMovPipe } from './pipes/procurar-setor-pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProcurarClientePipe } from './pipes/nome.cliente.pesquisar.pipe';
import { ProcurarSetorPipe } from './pipes/nome.setor.pesquisar.pipe';
import { ProcurarMaquinaPipe } from './pipes/procurar-maquina-pipe';
import { ProcurarTMaquinaPipe } from './pipes/procurar-tmaquinas-pipe';
import { CadastrarComponent } from './cadastrar/cadastrar.component';


@NgModule({
  declarations: [
    AppComponent,
    SetorComponent,
    RegistroComponent,
    ClientesComponent,
    MaquinaComponent,
    LoginComponent,
    NavbarComponent,
    ProcurarPessoaPipe,
    ProcurarMovPipe,
    ProcurarClientePipe,
    ProcurarSetorPipe,
    ProcurarMaquinaPipe,
    ProcurarTMaquinaPipe,
    CadastrarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule.forRoot(),
    FormsModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
