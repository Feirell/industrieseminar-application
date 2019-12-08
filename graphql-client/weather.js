import { requestGraphQL } from './helper.js'

const query = `
query Simple($rr: RangeRequest!) {
    getTemperature(range: {start: 1575816512902})
    getHumidity(range: $rr)
}
`;

const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(today.getDate() + 1);

requestGraphQL('weather', query, {
    rr: { start: today.getTime(), end: tomorrow.getTime() }
})
    .then(data => console.log('data returned:\n' + JSON.stringify(data.data, undefined, 2)));