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
