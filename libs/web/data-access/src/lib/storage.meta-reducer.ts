import { Action, ActionReducer } from '@ngrx/store';
import { merge, pick } from 'lodash-es';

function saveState(state: any, key: string) {
  localStorage.setItem(key, JSON.stringify(state));
}

function recoverState(key: string): any {
  return JSON.parse(localStorage.getItem(key));
}

/**
 * A meta reducer that persists parts of the store in the local storage
 * And refreshes the store on init with the data from the storage.
 */
export function storageMetaReducer<S, A extends Action = Action>(
  saveKeys: string[],
  localStorageKey: string,
) {
  // after load/refresh…
  let onInit = true;
  return function(reducer: ActionReducer<S, A>) {
    return function(state: S, action: A): S {
      // get the next state.
      const nextState = reducer(state, action);
      // init the application state.
      if (onInit) {
        onInit = false;
        const savedState = recoverState(localStorageKey);
        return merge(nextState, savedState);
      }

      // save the next state to the application storage.
      const stateToSave = pick(nextState, saveKeys);
      saveState(stateToSave, localStorageKey);

      return nextState;
    };
  };
}
