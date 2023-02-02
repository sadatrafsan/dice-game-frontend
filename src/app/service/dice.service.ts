import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DiceResponse} from "../dto/dice-response";

@Injectable({
  providedIn: 'root'
})
export class DiceService {

  private url =  environment.BASE_API_URL + '/dice';

  constructor(private http: HttpClient) { }

  rollDice(): Observable<DiceResponse>{
    return this.http.get<DiceResponse>(this.url + '/roll');
  }
}
