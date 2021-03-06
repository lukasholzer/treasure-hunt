import { Controller, Get, Put } from '@nestjs/common';
import { LobbyService } from './lobby.service';

// TODO: add route protection for admins.
@Controller('lobby')
export class LobbyController {
  constructor(private _lobbyService: LobbyService) {}

  @Get('/all')
  listAllLobbies() {
    const lobbies = this._lobbyService.lobbies;
    const players = Array.from(this._lobbyService['_playerList'].entries())
    return {
      count: lobbies.length,
      lobbies,
      players,
    };
  }

  @Get('/reset')
  reset() {
    this._lobbyService.reset();
    const lobbies = this._lobbyService.lobbies;
    return {
      count: lobbies.length,
      lobbies,
    };
  }
}
