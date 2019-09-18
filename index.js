const express = require('express')
const { ApolloServer, gql, AuthenticationError, UserInputError } = require('apollo-server-express')

const port = 8000

const typeDefs = gql`
  type Query {
    helloPublic: String
    helloPrivate: String
    helloVariable(someNumber: Int!): String
    helloBadInput(lessThanFive: Int!): Boolean
  }
  type Mutation {
    helloChangeSomething: Boolean
  }
`

const resolvers = {
  Query: {
    helloPublic: () => 'Hello public',
    helloPrivate: (_, __, context) => {
      if (context.user) {
        return 'Hello private'
      }
      throw new AuthenticationError('Not authenticated')
    },
    helloVariable: (_, args) => `Your number was ${args.someNumber}`,
    helloBadInput: (_, args) => {
      if (args.lessThanFive > 5) {
        throw new UserInputError(
          `Argument lessThanFive must be less than 5 (received ${args.lessThanFive})`
        )
      }
      return true
    },
  },
}

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ user: req.header('user') }),
})

const app = express()

apolloServer.applyMiddleware({ app })

app.listen(port, () => console.log(`Listening on port ${port}`))
