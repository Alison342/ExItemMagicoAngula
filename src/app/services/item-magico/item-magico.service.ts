import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { ItemMagico } from '../../models/item-magico.model';

@Injectable({
  providedIn: 'root'
})
export class ItemMagicoService {

  private readonly API_URL = "http://localhost:3000/itensMagicos";

  constructor(private http: HttpClient) { }

  listar(): Observable<ItemMagico[]> {
    return this.http.get<ItemMagico[]>(this.API_URL)
      .pipe(catchError(this.tratarErro))
  }

  atualizar(id: number, item: ItemMagico): Observable<ItemMagico> {
    return this.http.put<ItemMagico>(`${this.API_URL}/${id}`, item)
      .pipe(catchError(this.tratarErro))
  }

  deletar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`)
      .pipe(catchError(this.tratarErro))
  }

  private tratarErro(error: HttpErrorResponse) {
    console.error("Erro na requisição: ", error)
    return throwError(() => new Error("Erro ao processar a requisição!"))
  }
}
