import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/services/cliente.service';
import { FacturaService } from 'src/app/services/factura.service';
import { Factura } from '../../models/factura.model';
import { AlertService } from 'src/app/services/alert.service';

declare var $: any;
declare var jQuery: any;

@Component({
  selector: 'app-buscar-factura',
  templateUrl: './buscar-factura.component.html',
  styleUrls: ['./buscar-factura.component.css']
})
export class BuscarFacturaComponent implements OnInit {
  clientes: any[] = [];
  facturas: Factura[] = [];
  selectedTipoBusqueda: 'cliente' | 'numeroFactura' = 'cliente';
  selectedClienteId: number | null = 0;
  numeroFactura: number | null = null;
  mensaje: string = '';

  constructor(private facturaService: FacturaService, private clienteService: ClienteService,private alertService: AlertService) {}

  ngOnInit(): void {
    this.obtenerClientes();
  }

  obtenerClientes(): void {
    this.clienteService.obtenerClientes().subscribe(
      (clientes) => {
        this.clientes = clientes;
        if(this.clientes.length == 0){
          this.alertService.warning('No hay clientes registrados');
        }
      },
      (error) => {
        this.alertService.error('Error al obtener clientes', error);
      }
    );
  }

  buscar(): void {
    this.mensaje = '';
    this.facturas = [];

    if (this.selectedTipoBusqueda === 'cliente' && this.selectedClienteId) {
      this.facturaService.getFacturasPorCliente(this.selectedClienteId).subscribe(
        (facturas) => {
          this.facturas = facturas;
          $(document).ready(function () {
            $('.footable3').footable({
              paginate: true,
              limitNavigation: 3,
              breakpoints: {
              }
            });
          });
          if (facturas.length == 0) {
            this.mensaje = 'No se encontraron facturas para este cliente.';
            this.alertService.warning('No se encontraron facturas para este cliente');
          }
        },
        (error) => {
          this.alertService.error('Error al obtener las facturas', error);
          this.mensaje = 'Error al obtener las facturas.';
        }
      );
    } else if (this.selectedTipoBusqueda === 'numeroFactura' && this.numeroFactura) {
      this.facturaService.getFacturaPorNumero(this.numeroFactura).subscribe(
        (factura) => {
          this.facturas = factura ? [factura] : [];
          if (!factura) {
            this.alertService.warning('No se encontró ninguna factura con este número');
            this.mensaje = 'No se encontró ninguna factura con este número.';
          }
        },
        (error) => {
          this.mensaje = 'No se encontró la factura.';
          this.alertService.error('Error al buscar factura', error);
        }
      );
    }
  }

  limpiar(): void {
    this.selectedTipoBusqueda = 'cliente';
    this.selectedClienteId = 0;
    this.numeroFactura = null;
    this.facturas = [];
    this.mensaje = '';
    setTimeout(() => {
      $('select').val('').trigger('change');
    }, 10);
  }

}

