import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, retry, throwError} from "rxjs";
import {DiceResponse} from "../dto/response/dice-response";

@Injectable({
  providedIn: 'root'
})
export class DiceService {

  private url =  environment.BASE_API_URL + '/dice';

  constructor(private http: HttpClient) { }

  rollDice(): Observable<DiceResponse>{
    return this.http.get<DiceResponse>(this.url + '/roll').pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }

  private errorHandler(error: any) {

    let errorMessage = '';

    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    console.log(errorMessage);

    return throwError(() => {
      return errorMessage;
    });
  }
}
