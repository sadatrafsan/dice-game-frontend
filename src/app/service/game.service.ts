import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {catchError, retry, throwError} from "rxjs";
import {GameRequest} from "../dto/request/game-request";
import {GameResponse} from "../dto/response/game-response";
import {ScoreResponse} from "../dto/response/score-response";

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private url =  environment.BASE_API_URL + '/game';

  constructor(private http: HttpClient) { }

  startGame(request: GameRequest) {

    return this.http.post<GameResponse>(this.url, request, {responseType: 'json'}).pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }

  getScoresByGameId(gameId: number) {

    return this.http.get<ScoreResponse[]>(this.url + '/scores/' + gameId).pipe(
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
