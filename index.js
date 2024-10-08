require('colors');
const { ApolloServer } = require('apollo-server');
const jwt = require('jsonwebtoken');
const typeDefs = require('./schema.js');
const resolvers = require('./resolvers.js');
const API_PORT = 4000;

const context = ({ req }) => {
    const auth = req.headers.authorization || '';
    const token = auth.replace('Bearer ', '');

    if (!token) {
        throw new Error('You must be logged in to access this resource.');
    }

    try {
        // Verify the token and extract user data
        const user = jwt.verify(token, 'app-secret');
        return { user };
    } catch (err) {
        throw new Error('Invalid or expired token.');
    }
};



const server = new ApolloServer({
    typeDefs,
    resolvers,
    context
});

server.listen({ port: API_PORT })
    .then(({ url }) => {
        console.log(`Server is ready at: `.green + `${url}`.yellow);
        console.log('Query at:'.magenta + ' https://studio.apollographql.com/dev'.yellow);
    })
    .catch((error) => {
        console.error(error);
    });
