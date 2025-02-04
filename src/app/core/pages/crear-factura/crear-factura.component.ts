import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/services/cliente.service';
import { FacturaService } from 'src/app/services/factura.service';
import { ProductoService } from 'src/app/services/producto.service';
import { Cliente } from '../../models/cliente.model';
import { Factura } from '../../models/factura.model';
import { Producto } from '../../models/producto.model';
import { DetallesFactura } from '../../models/detallesFactura.model';

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
    idCliente: undefined,
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
    private facturaService: FacturaService
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
      idProducto: undefined,
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
    this.facturaService.crearFactura(this.factura).subscribe(() => {
      alert('Factura guardada exitosamente');
      this.factura = { ...this.factura, detalles: [] };
    });
  }


  actualizarProducto(detalle: DetallesFactura) {
    const productoSeleccionado = this.productos.find(p => p.id === detalle.idProducto);
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
}
