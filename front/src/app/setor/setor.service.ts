import { Setor } from './../models/setor';
import { HttpClient, HttpResponse, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SetorService {

  constructor(private http: HttpClient) { }
  private setorURL = 'http://127.0.0.1:8000/api/setor';


  getSetor(){
    return this.http.get<Setor[]>(this.setorURL);
  }

  postSetor(form){
    console.log(form);
    return this.http.post(this.setorURL, form);
  }

  deleteSetor(id):Observable<HttpResponse<any>>{
    return this.http.delete(`${this.setorURL}/${id}`, { observe: 'response' });
  }

  updateSetor(Setor: any, id): Observable<any>{
    console.log(Setor);
    console.log(id);
    return this.http.patch(`${this.setorURL}/${id}`, Setor);
  }
}
