import { Registro } from '../models/registro';
import { HttpClient, HttpResponse, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Maquina } from '../models/maquina';
import { Cliente } from '../models/cliente';
import { Setor } from './../models/setor';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  constructor(private http: HttpClient) { }
  private registroURL = 'http://127.0.0.1:8000/api/registro';
  private maquinaURL = 'http://127.0.0.1:8000/api/maquina';
  private clienteURL = 'http://127.0.0.1:8000/api/cliente';
  private setorURL = 'http://127.0.0.1:8000/api/setor';

  getCliente(){
    return this.http.get<Cliente[]>(this.clienteURL);
  }

  getSetor(){
    return this.http.get<Setor[]>(this.setorURL);
  }
  
  getMaquina(){
    return this.http.get<Maquina[]>(this.maquinaURL);
  }

  getRegistro(){
    return this.http.get<Registro[]>(this.registroURL);
  }

  postRegistro(form){
    console.log(form);
    return this.http.post(this.registroURL, form);
  }

  deleteRegistro(id):Observable<HttpResponse<any>>{
    return this.http.delete(`${this.registroURL}/${id}`, { observe: 'response' });
  }

  updateRegistro(Registro: any, id): Observable<any>{
    console.log(Registro);
    console.log(id);
    return this.http.patch(`${this.registroURL}/${id}`, Registro);
  }
}
