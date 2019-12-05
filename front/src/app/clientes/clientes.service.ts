import { Cliente } from '../models/cliente';
import { HttpClient, HttpResponse, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http: HttpClient) { }
  private clienteURL = 'http://127.0.0.1:8000/api/cliente';

  getCliente(){
    return this.http.get<Cliente[]>(this.clienteURL);
  }

  postCliente(form){
    console.log(form);
    return this.http.post(this.clienteURL, form);
  }

  deleteCliente(id):Observable<HttpResponse<any>>{
    return this.http.delete(`${this.clienteURL}/${id}`, { observe: 'response' });
  }

  updateCliente(Cliente: any, id): Observable<any>{
    console.log(Cliente);
    console.log(id);
    return this.http.patch(`${this.clienteURL}/${id}`, Cliente);
  }
}
