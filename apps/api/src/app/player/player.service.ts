import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Game } from '@treasure-hunt/api/game/core';
import { Player } from '@treasure-hunt/shared/interfaces';
import { RedisService } from 'nestjs-redis';
import { Redis, Command } from 'ioredis';
import { serialize } from 'class-transformer';

const KEY = 'players';

@Injectable()
export class PlayerService implements OnModuleInit {
  private _logger: Logger = new Logger('Player Logger');
  private _redisClient: Redis;

  constructor(private readonly _redisService: RedisService) {}

  async onModuleInit() {
    this._redisClient = await this._redisService.getClient();
  }

  async login(player: Player): Promise<void> {
    await this._redisClient.hmset(KEY, { [player.id]: JSON.stringify(player) });

    this._logger.log(
      `Player <${player.name}> logged in with socket id ${player.id}`,
    );
  }

  async logout(id: string): Promise<number> {
    return this._redisClient.hdel(KEY, id);
  }

  async getPlayer(id: string): Promise<Player> {
    return JSON.parse(await this._redisClient.hget(KEY, id));
  }
}
