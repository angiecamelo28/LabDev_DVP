import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Producto } from '../core/models/producto.model';

const BASE_URL = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  constructor(private http: HttpClient) {}

  obtenerProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${BASE_URL}/producto/listar`);
  }
}
