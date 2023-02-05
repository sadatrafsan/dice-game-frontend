import { Component, OnInit } from '@angular/core';
import {PlayerService} from "../../service/player.service";
import {PlayerResponse} from "../../dto/response/player-response";
import {Router} from "@angular/router";


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  players: PlayerResponse[] = [];
  participants: any = []

  constructor(private playerService: PlayerService,
              private router: Router) { }

  ngOnInit(): void {
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

    if(numberOfPlayers == 2){
      const player1 = this.participants[0];
      const player2 = this.participants[1];

      this.router.navigate(['/game'], {queryParams: {p1: player1, p2:player2, point:25}});
    }
    else if(numberOfPlayers == 3){
      const player1 = this.participants[0];
      const player2 = this.participants[1];
      const player3 = this.participants[2];
      this.router.navigate(['/game'], {queryParams: {p1: player1, p2:player2, p3:player3, point:25}});
    }
    else if(numberOfPlayers == 4){
      const player1 = this.participants[0];
      const player2 = this.participants[1];
      const player3 = this.participants[2];
      const player4 = this.participants[3];
      this.router.navigate(['/game'], {queryParams: {p1: player1, p2:player2, p3:player3, p4:player4, point:25}});
    }
    else {
      console.log('Error!');
    }
  }
}
