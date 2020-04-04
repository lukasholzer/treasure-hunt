import { Player } from '@treasure-hunt/shared/interfaces';

export const LOBBY_FULL_ERROR = `The lobby is already full!`;

export class Lobby {
  /** The list of players inside the lobby */
  private _players = new Map<string, Player>();

  /** The maximum number of players for the lobby */
  private _maxPlayers = 10;

  constructor(public name: string) {}

  get players(): Player[] {
    return Array.from(this._players.values())
  }

  /** Checks if the lobby is empty */
  get isEmpty(): boolean {
    return this._players.size === 0;
  }

  /** Checks if the provided player is part of the lobby */
  hasPlayer(id: string) {
    return this._players.has(id);
  }

  /** Adds a player the lobby */
  addPlayer(player: Player) {
    if (this._players.size < this._maxPlayers) {
      this._players.set(player.id, player);
      return;
    }
    throw new Error(LOBBY_FULL_ERROR);
  }

  /** Removes a player the lobby */
  removePlayer(id: string) {
    this._players.delete(id);
  }

  getPlayer(id: string): Player | null {
    if (this.hasPlayer(id)) {
      return this._players.get(id);
    }
    return null;
  }
}
