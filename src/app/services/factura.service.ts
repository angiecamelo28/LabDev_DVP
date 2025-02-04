import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Factura } from '../core/models/factura.model';

const BASE_URL: string = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class FacturaService {

  constructor(private http: HttpClient) {}

  getFacturas(): Observable<Factura[]> {
    return this.http.get<Factura[]>(`${BASE_URL}/factura/listar`);
  }

  getFacturasPorCliente(idCliente: number): Observable<Factura[]> {
    return this.http.get<Factura[]>(`${BASE_URL}/factura/buscarPorCliente/${idCliente}`);
  }

  getFacturaPorNumero(numeroFactura: number): Observable<Factura> {
    return this.http.get<Factura>(`${BASE_URL}/factura/buscarPorNumero/${numeroFactura}`);
  }

  crearFactura(factura: Factura): Observable<any> {
    return this.http.post(`${BASE_URL}/factura/crear`, factura);
  }

}
