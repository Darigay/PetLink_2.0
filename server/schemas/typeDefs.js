const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    friendCount: Int
    thoughts: [Thought]
    friends: [User]
  }

  type Thought {
    _id: ID
    thoughtText: String
    createdAt: String
    username: String
    image: String
    reactionCount: Int
    reactions: [Reaction]
    vote: [ID]
    voteCount: Int
  }

  type Reaction {
    _id: ID
    reactionBody: String
    createdAt: String
    username: String
  }

 

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    users: [User]
    user(username: String!): User
    thoughts(username: String): [Thought]
    thought(_id: ID!): Thought
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addThought(thoughtText: String!): Thought
    updateThought(thoughtId: ID!, thoughtText:String!): Thought
    deleteThought(thoughtId: ID!): Thought
    addReaction(thoughtId: ID!, reactionBody: String!): Thought
    updateReaction(thoughtId: ID!, reactionBody: String!, reactionId: ID!): Thought
    
    addFriend(friendId: ID!): User
    removeFriend(friendId: ID!): User
    addVote(thoughtId: ID!): Thought
  }
`;

module.exports = typeDefs;
