import { Component, OnInit } from '@angular/core';
import { Portafolio } from 'src/app/models/portafolio';
import { PortafolioService } from 'src/app/services/portafolio.service';
import { FormsModule, NgForm } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
import { uploadServices } from 'src/app/services/upload.service';
import { async } from 'rxjs';


@Component({
  selector: 'app-portafolio-admin',
  templateUrl: './portafolio-admin.component.html',
  styleUrls: ['./portafolio-admin.component.css'],
  providers:[uploadServices]

})
export class PortafolioAdminComponent implements OnInit {

  public options: string[] = ["casa", "terreno", "departamento","local","cabaña","oficina","bodega","rancho"];
  tipo = "";
  op:boolean=true;
  op2:boolean=false;
  public portafolios:Portafolio[]=[];
  portafolio=new Portafolio("","","",0,0,0,"","","","","","","");
  public files: File[] = [];
  public files2: File[] = [];
  public files3: File[] = [];
  public files4: File[] = [];
  public files5: File[] = [];
  tiempo=5000;
  cargando:boolean=false;
  imagen1='';
  constructor(private ls: PortafolioService,private ups:uploadServices,private toastr:ToastrService) { }

  ngOnInit(): void {
    this.obtenerPortafolio();
  }

  onSelect2(event:any) {
    console.log(event);
    this.files2.push(...event.addedFiles);
  }

  onRemove2(event:any) {
    console.log(event);
    this.files2.splice(this.files2.indexOf(event), 1);
  }

  onSelect3(event:any) {
    console.log(event);
    this.files3.push(...event.addedFiles);
  }

  onRemove3(event:any) {
    console.log(event);
    this.files3.splice(this.files3.indexOf(event), 1);
  }

  onSelect4(event:any) {
    console.log(event);
    this.files4.push(...event.addedFiles);
  }

  onRemove4(event:any) {
    console.log(event);
    this.files4.splice(this.files4.indexOf(event), 1);
  }

  onSelect5(event:any) {
    console.log(event);
    this.files5.push(...event.addedFiles);
  }

  onRemove5(event:any) {
    console.log(event);
    this.files5.splice(this.files5.indexOf(event), 1);
  }

  onSelect(event:any) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }

  onRemove(event:any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  selectPortafolio(portafolio:any){
    this.portafolio=portafolio;
    this.op=false;
    this.op2=true;
  }

  clearPortafolio(){
    this.portafolio._id="";
    this.portafolio.banos=0;
    this.portafolio.descrip="";
    this.portafolio.imagen2="";
    this.portafolio.imagen3="";
    this.portafolio.imagen4="";
    this.portafolio.imagen5="";
    this.portafolio.precio="";
    this.portafolio.recamaras=0;
    this.portafolio.tamano=0;
    this.portafolio.tipo="";
    this.portafolio.titulo="";
    this.files=[];
    this.files2=[];
    this.files3=[];
    this.files4=[];
    this.files5=[];
    this.cargando=false;
  }

  deletePortafolio(){
    this.op=true;
    this.op2=false;

    this.ls.deletePortafolio(this.portafolio._id).subscribe((res)=>{
      this.clearPortafolio();
      this.ngOnInit();
    },(err)=>{
      console.log(err);
      this.clearPortafolio();
      this.ngOnInit();
    })
  }



  async addPortafolio(){

    if (this.portafolio.tipo=="terreno" || this.portafolio.tipo=="bodega") {
      this.portafolio.banos=0;
      this.portafolio.recamaras=0;
    }
    if (this.portafolio.tipo=="oficina" || this.portafolio.tipo=="local") {
      this.portafolio.recamaras=0;
    }
    if (this.portafolio.descrip=='' || this.portafolio.precio==""  || this.portafolio.tamano==0 || this.portafolio.tipo=='' || this.portafolio.titulo=='') {
      alert('Datos Vacios')
    } else {
      if (!this.files[0]) {
        alert('No has subido una imagen');
      }else{
        this.cargando=true;
          const file_data=this.files[0];
          const file_data2=this.files2[0];
          const file_data3=this.files3[0];
          const file_data4=this.files4[0];
          const file_data5=this.files5[0];
          const data =new FormData();
          data.append('file',file_data);
          data.append('upload_preset','publicaciones');
          this.ups.uploadImage(data).subscribe( response=>{this.portafolio.imagen1=response.url;});
          if(this.files2.length>0){
            data.append('file',file_data2);
            data.append('upload_preset','publicaciones');
            this.tiempo=this.tiempo+5000;
            this.ups.uploadImage(data).subscribe( response=>{this.portafolio.imagen2=response.url;});
          }
          if(this.files3.length>0){
            data.append('file',file_data3);
            data.append('upload_preset','publicaciones');
            this.tiempo=this.tiempo+5000;
            this.ups.uploadImage(data).subscribe( response=>{this.portafolio.imagen3=response.url;});
          }
          if(this.files4.length>0){
            data.append('file',file_data4);
            data.append('upload_preset','publicaciones');
            this.tiempo=this.tiempo+5000;
            this.ups.uploadImage(data).subscribe( response=>{this.portafolio.imagen4=response.url;});
          }
          if(this.files5.length>0){
            data.append('file',file_data5);
            data.append('upload_preset','publicaciones');
            this.tiempo=this.tiempo+5000;
            this.ups.uploadImage(data).subscribe( response=>{this.portafolio.imagen5=response.url;});
          }

        setTimeout(() => {
          this.ls.addPortafolio(this.portafolio).subscribe((res)=>{
            alert('Agregado Correctamente');
            this.clearPortafolio();
            this.ngOnInit();
          },(err)=>{
            alert('Ocurrio un Error Vuelve a Intentar');
            this.cargando=false;
          })
        }, this.tiempo);


      }
    }
  }

  updatePortafolio(){
    this.cargando=true;
    this.op=true;
    this.op2=false;
    const file_data=this.files[0];
        const data =new FormData();
        data.append('file',file_data);
        data.append('upload_preset','publicaciones');
        data.append('cloud_name','grupo-imas');
        this.ups.uploadImage(data).subscribe( response=>{
        this.portafolio.imagen1=response.url;
        console.log("lo hizo primero {"+this.portafolio.imagen1+'}');
      });
    if (this.portafolio.tipo=="terreno" || this.portafolio.tipo=="bodega") {
      this.portafolio.banos=0;
      this.portafolio.recamaras=0;
    }
    if (this.portafolio.tipo=="oficina" || this.portafolio.tipo=="local") {
      this.portafolio.recamaras=0;
    }
    setTimeout(() => {
      this.ls.editPortafolio(this.portafolio).subscribe((res)=>{

        alert('Actualizado Correctamente');
        this.clearPortafolio();
        this.ngOnInit();
      },(err)=>{
        console.log(err);
      })
    }, 5000);
  }


  obtenerPortafolio(){
    this.ls.getPortafolios().subscribe((p:Portafolio[])=>{
      this.portafolios=p;
    })
  }





}
