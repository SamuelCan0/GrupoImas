import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { SigninComponent } from './components/signin/signin.component';
import { InfoComponent } from './components/info/info.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { AuthGuard } from './guard/auth.guard';
import { ServiciosComponent } from './components/servicios/servicios.component';

const routes: Routes = [
  {path:'inicio',component: InicioComponent},
  {path:'contacto',component:ContactoComponent},
  {path:'servicios',component:ServiciosComponent},
  {path: '**', redirectTo:'inicio', pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
