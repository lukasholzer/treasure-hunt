import { generateDeck, CardType, generateCardsOfType, countFiresInCollection } from './config';

test('should generate the correct deck', () => {
  console.log(CardType)

  const a = CardType.Characters

  console.log(isType(a, 'Fire'))
});


function isType(card: CardType, type: string) {
  return Boolean(card & CardType[type])
}

// describe('Deck or collection methods to identify cards', () => {


//   test('Check for fire cards inside Collection where no are', () => {
//     // const deck = [...generateCardsOfType(5, CardTypes.Gold)];

//     // expect(countFiresInCollection(deck)).toBe(0);
//   });
// });
