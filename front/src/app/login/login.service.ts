import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';
import { User } from '../models/user';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
    private loginUrl = 'http://127.0.0.1:9001/api/user/login';
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<any>;
    public username: string;

    constructor(private http: HttpClient,
                private route: Router) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }
    
    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(email: string, password: string) {
        return this.http.post<any>(this.loginUrl, { email, password })
            .pipe(map(user => {
                
                if (user && user.obj.token) {
                    
                    localStorage.setItem('currentUser', JSON.stringify(user.obj));
                    this.currentUserSubject.next(user.obj);
                    this.username = email;
                    
                }
                
                return user;
            }));
    }

    logout() {
        localStorage.removeItem('currentUser');
        this.route.navigate(['../../login']);
        this.currentUserSubject.next(null);
    }
  
}
