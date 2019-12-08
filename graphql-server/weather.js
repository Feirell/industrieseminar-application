const { WeatherService, getAtInRange } = require('../common/weather-service');

const ws = new WeatherService();

const schema = `
type WeekForecast {
    monday: Int
}

input RangeRequest {
    start: Float!
    end: Float
    step: Int
}

type Query {
    getHumidity(range: RangeRequest!): [Float!]!
    getTemperature(range: RangeRequest!): [Float!]!
    getSnowProbability(range: RangeRequest!): [Float!]!
    getRainProbability(range: RangeRequest!): [Float!]!
}`;

const get = (name, ws) => {
    if (typeof ws['get' + name] != 'function')
        throw new Error('could not get function ' + name);

    const fnc = ws['get' + name].bind(ws);

    return ({ range: { start, end = start, step = 60 } }) =>
        getAtInRange(new Date(start), new Date(end), step).map(fnc);
}

const root = {
    getHumidity: get('Humidity', ws),
    getTemperature: get('Temperature', ws),
    getSnowProbability: get('SnowProbability', ws),
    getRainProbability: get('RainProbability', ws)
}

module.exports = { schema, root };