import { requestGraphQL } from './helper.js'

const query = `
mutation SetMessage($message: String!) {
  setMessage(message: $message)
}`;

requestGraphQL('simple-modification', query, { message: 'example message' })
    .then(data => console.log('data returned:\n' + JSON.stringify(data.data, undefined, 2)));