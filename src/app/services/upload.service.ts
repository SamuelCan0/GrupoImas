import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class uploadServices{

  public headers = new HttpHeaders({
    'Content-type':'application/json',
    'Access-Control-Allow-Headers':'Authorization'
  });

  constructor(private http: HttpClient, private as:AuthService) {
  }

  uploadImage(valores:any): Observable<any>{
    let data=valores;
    return this.http.post('https://api.cloudinary.com/v1_1/grupo-imas/image/upload',data,{headers:this.headers});
  }

}
