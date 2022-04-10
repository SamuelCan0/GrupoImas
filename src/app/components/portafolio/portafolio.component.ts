import { Component, OnInit } from '@angular/core';
import { Portafolio } from 'src/app/models/portafolio';
import { PortafolioService } from 'src/app/services/portafolio.service';
import {MatTableDataSource} from '@angular/material/table';


@Component({
  selector: 'app-portafolio',
  templateUrl: './portafolio.component.html',
  styleUrls: ['./portafolio.component.css']
})
export class PortafolioComponent implements OnInit {


  public portafolios:Portafolio[]=[];
  portafolio=new Portafolio("","","",0,0,0,"","","","","","","");
  dataSource = new MatTableDataSource(this.portafolios);
  public clasifi="";
  constructor(private ls: PortafolioService) { }

  ngOnInit(): void {
    this.obtenerPortafolio();
  }


  obtenerPortafolio(){
    this.ls.getPortafolios().subscribe((p:Portafolio[])=>{
      this.portafolios=p;
    })
  }


  clasificar(tipo:string){
    console.log(tipo);
    this.clasifi=tipo;
  }

}
