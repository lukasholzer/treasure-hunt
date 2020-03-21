// import {
//   generateDeck,
//   getRoleCards,
//   getGameCards,
//   shuffleDeck,
//   CardType
// } from './config';
// import { uuid } from './uuid';
// import { Player } from '@witch-hunter/api-interfaces';
// import { createGameStore } from './+state/store';
// import { gameReducer } from './+state/reducer';

// export class Game {
//   /** The store where the data flow is managed */
//   private _store = createGameStore(gameReducer);

//   private _id = uuid();

//   constructor(players: Player[]) {

//     this._store.dispatch()

//     const playersCount = players.length;

//     const deck = generateDeck(playersCount);
//     // there  can be more players card than players to put a random factor
//     //in how many guardians can take part.
//     const roleCards = shuffleDeck(getRoleCards(deck)).slice(0, playersCount);
//     const gameCards = shuffleDeck(getGameCards(deck));

//     console.log(this._id);

//     console.log('ROLE: ', roleCards);
//     console.log('Game: ', gameCards);
//   }
// }
