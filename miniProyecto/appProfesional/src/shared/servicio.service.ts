import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Profesional } from 'src/model/model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProfesionalService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  
  getProfesionales(): Observable<Profesional[]> {
    return this.http.get<Profesional[]>(`${this.apiUrl}/profesionales`);
  }

  getProfesionalPorNombreApellido(nombre: string, apellido: string): Observable<Profesional[]> {
    const params = {
      nombre: nombre,
      apellido: apellido
    };
    return this.http.get<Profesional[]>(`${this.apiUrl}/profesionales`, { params: params });
  }


  crearProfesional(profesional: Profesional): Observable<Profesional> {
    return this.http.post<Profesional>(`${this.apiUrl}/profesionales`, profesional);
  }

  actualizarProfesional(nombre: string, profesional: Profesional): Observable<Profesional> {
    return this.http.put<Profesional>(`${this.apiUrl}/profesionales/${nombre}`, profesional);
  }

  eliminarProfesional(nombre: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/profesionales/${nombre}`);
  }
}
