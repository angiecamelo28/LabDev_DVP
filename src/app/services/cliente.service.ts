import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

const BASE_URL: string = environment.base_url;
@Injectable({
  providedIn: 'root'
})

export class ClienteService {
  constructor(private http: HttpClient) {}

  crearCliente(cliente: any): Observable<any> {
    return this.http.post(`${BASE_URL}/cliente/crear`, cliente);
  }

  obtenerClientes(): Observable<any[]> {
    return this.http.get<any[]>(`${BASE_URL}/cliente/listar`);
  }
}
