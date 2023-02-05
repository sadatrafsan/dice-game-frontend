import { Component, OnInit } from '@angular/core';
import {DiceService} from "../../service/dice.service";
import {PlayerService} from "../../service/player.service";
import {PlayerResponse} from "../../dto/response/player-response";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  players: PlayerResponse[] = [];

  constructor(private diceService:DiceService,
              private playerService: PlayerService) { }

  ngOnInit(): void {
    this.getPlayers();
  }

  rollDice(){
    this.diceService.rollDice().subscribe(response => {
      console.log(response);
    })
  }

  private getPlayers(){
    this.playerService.getPlayers().subscribe(response => {
      this.players = response;
    });
  }
}
