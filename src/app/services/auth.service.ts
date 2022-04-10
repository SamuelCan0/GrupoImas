import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public url:string;
  public headers = new HttpHeaders({
    'Content-Type':'application/json',
  });

  constructor(private http: HttpClient,private r:Router) {
    this.url='https://grupo-imas-server.herokuapp.com/api/';
  }


  login(usuario:Usuario):Observable<any>{
    let params=JSON.stringify(usuario);
    return this.http.post(this.url+'usuario',params,{headers:this.headers});
  }

  loggedIn(){
    return !!localStorage.getItem('token');
  }

  getToken(){
    return localStorage.getItem('token');
  }

  logout(){
    localStorage.removeItem('token');
    this.r.navigate(['/signin']);
  }
}
