import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Pagina404Component } from './pagina404/pagina404.component';
import { CrearFacturaComponent } from './core/pages/crear-factura/crear-factura.component';
import { BuscarFacturaComponent } from './core/pages/buscar-factura/buscar-factura.component';

const routes: Routes = [
  {
    path: 'crear-factura',
    component: CrearFacturaComponent,
  },
  {
    path: 'buscar-factura',
    component: BuscarFacturaComponent,
  },
  {
    path: '**',
    component: CrearFacturaComponent
  },
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, { useHash: true })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
