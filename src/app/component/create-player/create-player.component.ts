import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {PlayerService} from "../../service/player.service";
import {PlayerRequest} from "../../dto/request/player-request";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-player',
  templateUrl: './create-player.component.html',
  styleUrls: ['./create-player.component.css']
})
export class CreatePlayerComponent implements OnInit {

  playerForm!: FormGroup;
  playerRequest: PlayerRequest;
  ages: number[] = [];

  constructor(private playerService: PlayerService, private router: Router) {
    this.playerRequest = {
      name: '',
      age: 0
    };
  }

  ngOnInit(): void {

    this.playerForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      age: new FormControl('', [Validators.required])
    });

    for(let i=12; i<=60; i++){
      this.ages.push(i);
    }
  }


  get name() {
    return this.playerForm.get('name');
  }

  get age() {
    return this.playerForm.get('age');
  }

  onSubmit(){

    this.playerRequest.name = this.name?.value;
    this.playerRequest.age = this.age?.value;

    this.playerService.createPlayer(this.playerRequest).subscribe({
      next: () => {
        this.router.navigateByUrl('/');
      },
      error: () => {
        console.log('Error!');
      }
    });
  }
}
