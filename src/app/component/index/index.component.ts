import { Component, OnInit } from '@angular/core';
import {DiceService} from "../../service/dice.service";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  constructor(private diceService:DiceService) { }

  ngOnInit(): void {
  }

  rollDice(){
    this.diceService.rollDice().subscribe(response => {
      console.log(response);
    })
  }
}
