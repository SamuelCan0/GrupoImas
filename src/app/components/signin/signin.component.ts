import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from "@angular/forms";
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { PortafolioService } from 'src/app/services/portafolio.service';
import { Router } from "@angular/router";



@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {


  public usuarios:Usuario[]=[];
  usuario=new Usuario("","","");
  constructor(private ps:AuthService, private r:Router) { }

  ngOnInit(): void {
  }

  signIn(){
    if(this.usuario.password=='' || this.usuario.username==''){
      alert('Campos Vacios');
    }
    this.ps.login(this.usuario).subscribe((res)=>{
      console.log(res);
      localStorage.setItem('token',res.token);
      this.r.navigate(['/portafolio-admin']);
    },
    err=>console.log(err))
  }

}
