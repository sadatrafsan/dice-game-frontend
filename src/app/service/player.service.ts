import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {PlayerRequest} from "../dto/request/player-request";
import {catchError, retry, throwError} from "rxjs";
import {PlayerResponse} from "../dto/response/player-response";

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  private url =  environment.BASE_API_URL + '/players';

  constructor(private http: HttpClient) { }

  getPlayers() {

    return this.http.get<PlayerResponse[]>(this.url).pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }

  createPlayer(request: PlayerRequest) {

    return this.http.post(this.url, request, {responseType: 'json'}).pipe(
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
