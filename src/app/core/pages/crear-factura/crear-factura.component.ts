import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/services/cliente.service';
import { FacturaService } from 'src/app/services/factura.service';
import { ProductoService } from 'src/app/services/producto.service';
import { Cliente } from '../../models/cliente.model';
import { Factura } from '../../models/factura.model';
import { Producto } from '../../models/producto.model';
import { DetallesFactura } from '../../models/detallesFactura.model';
import { AlertService } from 'src/app/services/alert.service';
import { response } from 'express';

declare var $: any;
declare var jQuery: any;
@Component({
  selector: 'app-crear-factura',
  templateUrl: './crear-factura.component.html',
  styleUrls: ['./crear-factura.component.css']
})
export class CrearFacturaComponent implements OnInit {
  clientes: Cliente[] = [];
  productos: Producto[] = [];
  factura: Factura = {
    id: 0,
    fechaEmisionFactura: new Date(),
    idCliente: 0,
    cliente: undefined,
    numeroFactura: undefined,
    numeroTotalArticulos: 0,
    subTotalFacturas: 0,
    totalImpuestos: 0,
    totalFactura: 0,
    detalles: []
  };

  constructor(
    private clienteService: ClienteService,
    private productoService: ProductoService,
    private facturaService: FacturaService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.cargarClientes();
    this.cargarProductos();
  }

  cargarClientes(): void {
    this.clienteService.obtenerClientes().subscribe((clientes) => {
      this.clientes = clientes;
    });
  }

  cargarProductos(): void {
    this.productoService.obtenerProductos().subscribe((productos) => {
      this.productos = productos;
      $(document).ready(function () {
        $('.footable3').footable({
          paginate: true,
          limitNavigation: 3,
          breakpoints: {
          }
        });
      });
    });
  }

  agregarProducto(): void {
    this.factura.detalles.push({
      id: 0,
      idFactura: this.factura.id,
      idProducto: 0,
      producto: undefined,
      cantidadDeProducto: 1,
      precioUnitarioProducto: 0,
      subtotalProducto: 0,
      notas: ''
    });
  }

  calcularTotales(): void {
    this.factura.subTotalFacturas = this.factura.detalles.reduce(
      (sum, item) => sum + (item.precioUnitarioProducto || 0) * (item.cantidadDeProducto || 1),
      0
    );
    this.factura.totalImpuestos = this.factura.subTotalFacturas * 0.19;
    this.factura.totalFactura = this.factura.subTotalFacturas + this.factura.totalImpuestos;
  }


  guardarFactura(): void {
    if (this.factura.detalles.length === 0) {
      this.alertService.warning('Debes agregar al menos un producto a la factura.');
      return;
    }
    const facturaPayload = {
      ...this.factura,
      idCliente: Number(this.factura.idCliente),
      detalles: this.factura.detalles.map(detalle => ({
        ...detalle,
        idFactura: 0,
        idProducto: Number(detalle.idProducto),
        producto: undefined
      }))
    };
    this.facturaService.crearFactura(facturaPayload).subscribe({
      next: (response) => {
        this.alertService.success(`${response.mensaje} Id: ${response.facturaId}`);
        this.nuevo();
      },
      error: (error) => {
        console.error('Error al crear la factura:', error);
        this.alertService.error('Hubo un error al crear la factura. Por favor, inténtalo de nuevo.');
      }
    });
  }


  actualizarProducto(detalle: DetallesFactura) {
    const idProducto = Number(detalle.idProducto);
    const productoSeleccionado = this.productos.find(p => p.id === idProducto);
    if (productoSeleccionado) {
      detalle.producto = productoSeleccionado;
      detalle.precioUnitarioProducto = productoSeleccionado.precioUnitario;
      detalle.subtotalProducto = detalle.precioUnitarioProducto * detalle.cantidadDeProducto;
      this.calcularTotales();
    }
  }



  eliminarProducto(detalle: DetallesFactura) {
    this.factura.detalles = this.factura.detalles.filter(d => d !== detalle);
    this.calcularTotales();
  }

  nuevo(): void {
    this.factura = {
      id: 0,
      fechaEmisionFactura: new Date(),
      idCliente: undefined,
      cliente: undefined,
      numeroFactura: undefined,
      numeroTotalArticulos: 0,
      subTotalFacturas: 0,
      totalImpuestos: 0,
      totalFactura: 0,
      detalles: []
    };

    setTimeout(() => {
      $('select').val('').trigger('change');
    }, 10);
  }

}
