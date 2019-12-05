import { Maquina } from '../models/maquina';
import { HttpClient, HttpResponse, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Setor } from '../models/setor';

@Injectable({
  providedIn: 'root'
})
export class MaquinaService {

  constructor(private http: HttpClient) { }
  private maquinaURL = 'http://127.0.0.1:8000/api/maquina';
  private setorURL = 'http://127.0.0.1:8000/api/setor';

  getMaquina(){
    return this.http.get<Maquina[]>(this.maquinaURL);
  }

  getSetor(){
    return this.http.get<Setor[]>(this.setorURL);
  }

  postMaquina(form){
    console.log(form);
    return this.http.post(this.maquinaURL, form);
  }

  deleteMaquina(id):Observable<HttpResponse<any>>{
    return this.http.delete(`${this.maquinaURL}/${id}`, { observe: 'response' });
  }

  updateMaquina(Maquina: any, id): Observable<any>{
    console.log(Maquina);
    console.log(id);
    return this.http.patch(`${this.maquinaURL}/${id}`, Maquina);
  }
}
