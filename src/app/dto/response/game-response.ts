import {PlayerResponse} from "./player-response";

export class GameResponse {

  id!: number;
  winnerId!: string;
  players!: PlayerResponse[];
  highestPoint!: number;
  status!: boolean;
}
