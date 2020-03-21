import { Player } from '@witch-hunter/api-interfaces';
import { BehaviorSubject, merge, Observable } from 'rxjs';
import { CardType } from '../config';
import { Action, ActionType } from './actions';
import { Effect } from './effects';
import { Reducer } from './reducer';
import { shareReplay, withLatestFrom, map } from 'rxjs/operators';

/** Interface that describes the Game state */
export interface GameState {
  /** The list of players taking part in this game */
  players: Player[];
  /** The played cards on the table */
  tableCards: CardType[];
  /** all hands by player id in the current game */
  hands: Map<string, CardType[]>;
}

/** The initial Game state */
export const initialState: GameState = {
  players: [],
  tableCards: [],
  hands: new Map<string, CardType[]>()
};

/** Array of side effects */
const effects: Effect[] = [];

/**
 * The Game Store is one place where the state is handled.
 * It is a minimal implementation of a redux like architecture to handle
 * state in an immutable and on-directional way.
 *
 * This makes testing and debugging way easier, because there is always a
 * clear state that can only be modified through actions.
 *
 * 1. Action gets dispatched (An action indicates a change in the store)
 * 2. The reducer gets an action and the current state, and according to the action
 *    modifies the state.
 * 3. A Selector can always read the latest value from the store.
 *    So the only way to modify the state is dispatching an action.
 * 4. If some async work has to be done the effect is responsible for that.
 *    Effects are listening for actions then doing some async work and dispatching some
 *    Other actions with the payload of the async stuff.
 */
class GameStore {
  /** The current action that got dispatched */
  private readonly action$ = new BehaviorSubject<Action>({
    type: ActionType.INIT
  });

  /** The current state that is present */
  private readonly state$: BehaviorSubject<GameState>;

  constructor(reducer: Reducer, initialStoreState: GameState) {
    this.state$ = new BehaviorSubject<GameState>(initialStoreState);

    this.action$
      .pipe(
        shareReplay(),
        withLatestFrom(this.state$),
        map(([action, state]) => reducer(state, action))
      )
      .subscribe(state => {
        // Here the state gets modified through the outcome of the reducer
        this.state$.next(state);
      });

    // Each effect will get the stream of actions and will dispatch other actions in return
    // The emitted actions will be immediately dispatched through the normal store.dispatch()
    merge(...effects.map(epic => epic(this.action$, this.state$))).subscribe(
      (action: Action) => {
        this.dispatch(action);
      }
    );
  }

  /** Dispatch a new Action that modifies the store */
  dispatch(action: Action): void {
    this.action$.next(action);
  }

  /** Use a provided selector function to get a State out of the store */
  select<T>(selector: (state$: Observable<GameState>) => T): T {
    return selector(this.state$);
  }
}

export function createGameStore(reducer: Reducer): GameStore {
  return new GameStore(reducer, initialState);
}
