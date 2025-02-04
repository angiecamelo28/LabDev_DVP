import { Producto } from "./producto.model";

export interface DetallesFactura {
  id: number;
  idFactura: number;
  idProducto?: number;
  producto?: Producto;
  cantidadDeProducto: number;
  precioUnitarioProducto: number;
  subtotalProducto: number;
  notas?: string;
}
