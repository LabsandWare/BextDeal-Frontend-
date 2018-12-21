import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { catchError, map, tap } from "rxjs/operators";

import { Product } from "../_models";
import { error } from '@angular/compiler/src/util';
import { MessageService } from "./message.service";
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  products: Product[] = [];

  constructor(
    private http: HttpClient, 
    private messageService: MessageService) { }
  
  createProduct (product: Product) {

    console.log(product);

    const uri = 'http://localhost:8080/api/product';

    return this.http.post<any>(uri, product)
      .pipe(
        tap(
          data => console.log(data)
        ),
        catchError(this.handleError('Product Upload', []))
      );
  }

  getProducts() {

    const uri = 'http://localhost:8080/api/product';

    return this.http.get<any>(uri)
      .toPromise()
      .then(response => response )
      .catch(this.handleError);
  }

  getProductByID(id: number) {  

    const uri = 'http://localhost:8080/api/product';

    return this.http.get(uri + id);
  }

  updateProduct(product: Product) {

    const uri = 'http://localhost:8080/api/product';

    return this.http.put(uri + product.id, product);
  }

  deleteProduct(id: number) {

    const uri = 'http://localhost:8080/api/product';

    return this.http.delete(uri + id);
  }

  /** 
  * 
  * Handle  Http operation that failed
  * Let the app continue
  * @param operation -  name of the operation that failed
  * @param result - operation value to return as the observable result
  * */
  private handleError<T>(operation = 'operation', result?: T) {

    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error);

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T)
    }
  }

  /** Log a AuthService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`ProductsService: ${message}`);
  }

}
