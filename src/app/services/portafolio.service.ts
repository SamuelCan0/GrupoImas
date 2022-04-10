import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Portafolio } from '../models/portafolio';
import { Usuario } from '../models/usuario';
import { AuthService } from './auth.service';
import { TokenInterceptorService } from './token-interceptor.service';

@Injectable({
  providedIn: 'root'
})
export class PortafolioService {

  public url:string;
  public token=localStorage.getItem('token');
  public headers = new HttpHeaders({
    'Content-Type':'application/json'
  });

  constructor(private http: HttpClient,private as:AuthService) {
    this.url='https://grupo-imas-server.herokuapp.com/api/';
  }

  getPortafolios(): Observable<any>{
    return this.http.get(this.url+'portafolios',{headers:this.headers});
  }

  getPortafolio(id:String):Observable<any>{
    return this.http.get(this.url+'portafolio/'+id,{headers:this.headers});
  }

  deletePortafolio(id:String){
    return this.http.delete(this.url+'deleteP/'+id,{headers:this.headers});
  }

  addPortafolio(portafolio:Portafolio){
    let params=JSON.stringify(portafolio);
    return this.http.post(this.url+'saveP',params,{headers:this.headers});
  }

  editPortafolio(portafolio:Portafolio){
    let params=JSON.stringify(portafolio);
    let id=portafolio._id;
    return this.http.put(this.url+'updateP/'+id,params,{headers:this.headers});
  }



}
