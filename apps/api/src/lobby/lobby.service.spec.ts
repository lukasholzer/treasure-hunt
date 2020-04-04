import { Test, TestingModule } from '@nestjs/testing';
import { LobbyService, PLAYER_ALREADY_IN_LOBBY_ERROR } from './lobby.service';
import { uuid } from '@treasure-hunt/shared/util';
import { Player } from '@treasure-hunt/shared/interfaces';

const getPlayer = (name: string): Player => ({
  name,
  id: uuid(),
  image: 'http://my-image',
});

const players = [
  getPlayer('Player 1'),
  getPlayer('Player 2'),
  getPlayer('Player 3'),
  getPlayer('Player 4'),
  getPlayer('Player 5'),
];

describe('LobbyService', () => {
  let service: LobbyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LobbyService],
    }).compile();

    service = module.get<LobbyService>(LobbyService);
  });

  it('should create a lobby if a player joins', () => {
    expect(service.lobbies.size).toBe(0);
    service.joinLobby('test-lobby', players[0]);
    expect(service.lobbies.size).toBe(1);
    service.joinLobby('test-lobby', players[1]);
    expect(service.lobbies.size).toBe(1);
  });

  it('should return the lobby name if the player is already in a lobby', () => {
    service.joinLobby('test-lobby', players[0]);
    service.joinLobby('test-lobby', players[0]);
  });

  it('should not be possible to join another lobby if a player is already in a lobby', () => {
    service.joinLobby('test-lobby', players[0]);
    service.joinLobby('test-lobby', players[1]);
    expect(service.lobbies.size).toBe(1);

    expect(() => service.joinLobby('other-lobby', players[1])).toThrowError(
      PLAYER_ALREADY_IN_LOBBY_ERROR('test-lobby'),
    );
    expect(service.lobbies.size).toBe(1);
  });
});
