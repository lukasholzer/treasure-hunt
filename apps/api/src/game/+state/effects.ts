import { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { filter, withLatestFrom, map, tap } from 'rxjs/operators';
import { Action, ActionType, startGame, noop } from './actions';
import { GameState } from './store';

/** Type for an effect */
export type Effect = (
  action$: Observable<Action>,
  state$?: Observable<GameState>,
) => Observable<Action>;

/** Operator to filter actions */
export const ofType = <T>(
  ...types: ActionType[]
): MonoTypeOperatorFunction<Action<T>> =>
  filter((action: Action) => types.indexOf(action.type) > -1);

/** Connects to a new Data dataSource */
export const startGame$: Effect = (
  action$: Observable<Action>,
  state$: Observable<GameState>,
) =>
  action$.pipe(
    ofType(ActionType.JOIN_GAME),
    withLatestFrom(state$),
    map(([, { players }]) => {
      if (players.length === 4) {
        return startGame();
      }
      return noop();
    }),
  );
