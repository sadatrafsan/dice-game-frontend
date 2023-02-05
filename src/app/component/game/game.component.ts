import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {GameService} from "../../service/game.service";
import {GameRequest} from "../../dto/request/game-request";
import {GameResponse} from "../../dto/response/game-response";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  gameRequest!: GameRequest;
  game!: GameResponse;

  constructor(private gameService:GameService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.gameRequest = {
      players: [],
      highestPoint: 0
    };

    this.route.queryParams.subscribe(params => {

      if(typeof params['p1'] !== 'undefined'){
        this.gameRequest.players.push(params['p1']);
      }

      if(typeof params['p2'] !== 'undefined'){
        this.gameRequest.players.push(params['p2']);
      }

      if(typeof params['p3'] !== 'undefined'){
        this.gameRequest.players.push(params['p3']);
      }

      if(typeof params['p4'] !== 'undefined'){
        this.gameRequest.players.push(params['p4']);
      }

      if(typeof params['point'] !== 'undefined'){
        this.gameRequest.highestPoint = params['point'];
      }

    });
  }

  startGame(){

    this.gameService.startGame(this.gameRequest).subscribe(response => {
      this.game = response;
      console.log(this.game);
    });
  }
}
