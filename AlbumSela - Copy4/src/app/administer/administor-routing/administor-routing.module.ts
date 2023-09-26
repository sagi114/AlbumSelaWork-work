import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AdiministerComponent } from '../adiminister/adiminister.component';

const routes: Routes = [
  { path: 'administer', component: AdiministerComponent}
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AdministorRoutingModule { }
