import { Controller, Get, Put } from '@nestjs/common';
import { LobbyService } from './lobby.service';

@Controller('lobby')
export class LobbyController {
  constructor(private _lobbyService: LobbyService) {}

  @Get('/all')
  listAllLobbies() {
    const lobbies = this._lobbyService.lobbies;
    return {
      count: lobbies.length,
      lobbies,
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
