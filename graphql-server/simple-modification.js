// const db = new Map();

const schema = `
type Mutation {
    setMessage(message: String): String
}

type Query {
    getMessage: String
}
`;

let savedMessage = "";

const setMessage = ({ message }) => savedMessage = message;
const getMessage = () => savedMessage;

const root = { setMessage, getMessage };

module.exports = { root, schema };