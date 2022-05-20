const { AuthenticationError } = require('apollo-server-express');
const { User, Thought } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select('-__v -password')
          .populate('thoughts')
          .populate('friends');

        return userData;
      }

      throw new AuthenticationError('Not logged in');
    },
    users: async () => {
      return User.find()
        .select('-__v -password')
        .populate('thoughts')
        .populate('friends');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username })
        .select('-__v -password')
        .populate('friends')
        .populate('thoughts');
    },
    thoughts: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Thought.find(params).sort({ createdAt: -1 });
    },
    thought: async (parent, { _id }) => {
      return Thought.findOne({ _id });
    }
  },

  Mutation: {

    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },

    // update User

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);
      return { token, user };
    },
    addThought: async (parent, args, context) => {
      if (context.user) {
        const thought = await Thought.create({ ...args, username: context.user.username });
        //  const thought = await Thought.create({ ...args, username: "test" });
        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { thoughts: thought._id } },
          { new: true }
        );

        return thought;
      }

      throw new AuthenticationError('You need to be logged in!');
    },

    // Update Thought
    updateThought: async (parent, args, context) => {
      if (context.user) {

        const thought = await Thought.updateOne({_id :args.thoughtId }, 
          {thoughtText:args.thoughtText});

        return thought;
      }
   
      throw new AuthenticationError('You need to be logged in!');
    },
 

    // Delete Thought (PRIORITY!)
    deleteThought: async (parent, args, context) => {
      if (context.user) {

        const thought = await Thought.deleteOne({_id :args.thoughtId });
        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $pull: { thoughts: args.thoughId } },
          { new: true }
        );


        return thought;
      }
   
      throw new AuthenticationError('You need to be logged in!');
    },


    addReaction: async (parent, { thoughtId, reactionBody }, context) => {
      if (context.user) {
        const updatedThought = await Thought.findOneAndUpdate(
          { _id: thoughtId },
          { $push: { reactions: { reactionBody, username: context.user.username} } },
          { new: true, runValidators: true }
        );

        return updatedThought;
      }

      throw new AuthenticationError('You need to be logged in!');
    },

    // Update Reaction
    updateReaction: async (parent, { thoughtId, reactionBody, reactionId}, context) => {
      if (context.user) {
        const updatedReaction = await Thought.findOneAndUpdate(
          { _id: thoughtId , "reactions._id": reactionId},
          { $set: {  "reactions.$.reactionBody":reactionBody  } },
          { new: true, runValidators: true }
        );

        return updatedReaction;
      }

      throw new AuthenticationError('You need to be logged in!');
    },


    // Delete Reaction
    // deleteReaction: async (parent, { reactionId }, context) => {
    //   if (context.user) {
    //     const updatedThought = await User.findOneAndDelete(
    //       { _id: thoughtId},
    //       { $push: { reactions: { reactionBody, username: context.user.username } }},
    //       { new: true }
    //     )
        
    //     return updatedUser;
        
    //   }
    //   throw new AuthenticationError('You need to be logged in!');
    // },

    addFriend: async (parent, { friendId }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { friends: friendId } },
          { new: true }
        ).populate('friends');

        return updatedUser;
      }

      throw new AuthenticationError('You need to be logged in!');
    },

    // Remove Friend (Priority #2)
    deleteFriend: async (parent, { friendId }, context) => {
      if (context.user) {
        const removeUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { friends: {Id}} },
          { new: true }
        )
       
        return removeUser;
        
      }
      throw new AuthenticationError('You need to be logged in!');
    },

  }
};

module.exports = resolvers;
