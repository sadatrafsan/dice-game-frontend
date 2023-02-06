import { Component, OnInit } from '@angular/core';
import {PlayerService} from "../../service/player.service";
import {PlayerResponse} from "../../dto/response/player-response";
import {GameRequest} from "../../dto/request/game-request";
import {GameService} from "../../service/game.service";
import {GameResponse} from "../../dto/response/game-response";


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  players: PlayerResponse[] = [];
  participants: any = []
  gameRequest!: GameRequest;
  game!: GameResponse;

  constructor(private playerService: PlayerService,
              private gameService:GameService) { }

  ngOnInit(): void {
    this.gameRequest = {
      players: [],
      highestPoint: 0
    };
    this.getPlayers();
  }


  private getPlayers(){
    this.playerService.getPlayers().subscribe(response => {
      this.players = response;
    });
  }

  selectParticipants(e: any){

    if (e.target.checked){
      this.participants.push(e.target.value);
    }
    else{
      this.participants = this.participants.filter((item:any) => item !== e.target.value)
    }
  }

  isButtonVisible(){

    return this.participants.length > 1 && this.participants.length < 5;
  }

  startGame(){

    const numberOfPlayers = this.participants.length;

    this.gameRequest.highestPoint = 6;

    if(numberOfPlayers == 2){

      this.gameRequest.players.push(this.participants[0], this.participants[1]);
    }
    else if(numberOfPlayers == 3){
      this.gameRequest.players.push(this.participants[0], this.participants[1], this.participants[2]);
    }
    else if(numberOfPlayers == 4){
      this.gameRequest.players.push(this.participants[0], this.participants[1], this.participants[2], this.participants[3]);
    }
    else {
      console.log('Error!');
    }

    if(this.gameRequest.players.length >= 2 && this.gameRequest.highestPoint > 0){
      this.gameService.startGame(this.gameRequest).subscribe(response => {
        this.game = response;
        console.log(this.game);
      });
    }
    else{
      console.log("No Participants found");
    }

  }
}
