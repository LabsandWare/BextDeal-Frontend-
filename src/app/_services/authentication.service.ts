import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { catchError, map, tap } from "rxjs/operators";

import { User } from "../_models";
import { error } from '@angular/compiler/src/util';
import { MessageService } from "./message.service";
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient, private messageService: MessageService) { }
  
  login(email: string, password: string) {
    const uri ='http://localhost:8080/api/login';

    const obj = {
      email: email,
      password: password
    };

    return this.http.post<any>(uri, obj)
      .pipe(map(user => {
        if (user && user.api_token) {
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
        return user;
      }));

  }

  register(user :User) {
    const uri = 'http://localhost:8080/api/register';

    user.role = "bidder";

    return this.http.post<any>(uri, user)
      .pipe(map(user => {
        if (user && user.api_token) {
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
        return user;
      }));
  }

  logout(id :number) {

    // remove user from local storage to log user out
    const url = `http://localhost:8080/api/logout/${id}`;

    return this.http.get(url)
    .pipe(
      tap( _ => this.log("logout successfully")),
      catchError(this.handleError('logout', []))
    )
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

      // TODO: send the error ti remote logging infrastructure
      console.error(error);

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T)
    }
  }

  /** Log a AuthService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`AuthenticationService: ${message}`);
  }


}
