import { Cliente } from "./cliente.model";
import { DetallesFactura } from "./detallesFactura.model";

export interface Factura {
  id: number;
  fechaEmisionFactura: Date;
  idCliente?: number;
  cliente?: Cliente;
  numeroFactura?: number;
  numeroTotalArticulos: number;
  subTotalFacturas: number;
  totalImpuestos: number;
  totalFactura: number;
  detalles: DetallesFactura[];
}
