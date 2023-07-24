const schema = `
  input MessageInput {
    content: String
    author: String
  }

  type Message {
    id: ID!
    content: String
    author: String
  }

  type Query {
    getMessage(id: ID!): Message
  }

  type Mutation {
    createMessage(input: MessageInput): Message
    updateMessage(id: ID!, input: MessageInput): Message
  }
`;

// If Message had any complex fields, we'd put them on this object.
class Message {
    constructor(id, { content, author }) {
        this.id = id;
        this.content = content;
        this.author = author;
    }
}

// Maps username to content
const fakeDatabase = new Map();

const root = {
    getMessage: ({ id }) => {
        if (!fakeDatabase.has(id))
            throw new Error('no message exists with id ' + id);

        return new Message(id, fakeDatabase.get(id));
    },
    createMessage: ({ input }) => {
        // Create a random id for our "database".
        var id = require('crypto').randomBytes(10).toString('hex');

        fakeDatabase.set(id, input);
        return new Message(id, input);
    },
    updateMessage: ({ id, input }) => {
        if (!fakeDatabase.has(id))
            throw new Error('no message exists with id ' + id);

        // This replaces all old data, but some apps might want partial update.
        fakeDatabase.set(id, input);
        return new Message(id, input);
    },
};

module.exports = { root, schema };