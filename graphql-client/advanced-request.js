import { requestGraphQL } from './helper.js'

const dice = 3;
const sides = 6;
const query = `
query RollDice($dice: Int!, $sides: Int) {
  getDie(numSides: $sides){
      roll(numRolls: $dice)
  }
}`;

requestGraphQL('advanced-request', query, { dice, sides })
    .then(data => console.log('data returned:\n' + JSON.stringify(data.data, undefined, 2)));