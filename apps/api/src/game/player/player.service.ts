import { Injectable } from '@nestjs/common';

interface Player {

}

@Injectable()
export class PlayerService {

  players = new Map<string, Player>();

  addPlayer(id: string, player: Player) {
    console.log(id, player);
  }

}
