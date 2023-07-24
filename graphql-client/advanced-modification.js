import { requestGraphQL } from './helper.js'

const author = 'andy';
const content = 'hope is a good thing';

const query = `
mutation CreateMessage($input: MessageInput) {
  createMessage(input: $input) {
    id
  }
}`;

requestGraphQL('advanced-mutation', query, { input: { author, content } })
  .then(data => console.log('data returned:\n' + JSON.stringify(data.data, undefined, 2)));