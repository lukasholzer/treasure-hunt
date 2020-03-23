import { Player } from '@treasure-hunt/api-interfaces';

/** Enum for all the possible action types */
export enum ActionType {
  NOOP = '@@actions no operation',
  INIT = '@@actions init',
  ASSIGN_CHARACTER = '@@actions assign avatars',
  JOIN_GAME = '@@actions join game',
  LEAVE_GAME = '@@actions leave game',
  END_GAME = '@@actions end game',
  START_GAME = '@@actions start game',
}

/** Interface for an action */
export interface Action<T = any> {
  readonly type: ActionType;
  payload?: T;
}
/** Function which helps to create actions without mistakes */
export const action = <T>(type: ActionType, payload?: T): Action<T> => ({
  type,
  payload,
});

export const noop = () => action<void>(ActionType.NOOP);

/** Action that starts the game */
export const startGame = () => action<void>(ActionType.START_GAME);

/** Join the game with a player */
export const joinGame = (player: Player) =>
  action<Player>(ActionType.JOIN_GAME, player);

/** A player leaves a game */
export const leaveGame = (player: Player) =>
  action<Player>(ActionType.LEAVE_GAME, player);

/** Ends a game for all */
export const endGame = () => action<Player>(ActionType.END_GAME);

export const assignCharacter = (player: Player) =>
  action<Player>(ActionType.ASSIGN_CHARACTER, player);
