const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
const voteSchema = require('./Vote');
const dateFormat = require('../utils/dateFormat');

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: 'You need to leave a thought!',
      minlength: 1,
      maxlength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp)
    },
    username: {
      type: String,
      required: true
    },

    reactions: [reactionSchema],
    vote: [voteSchema],
    // reactions: [
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Thought'
    //   }
    // ],
    // vote: [
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Thought'
    //   }
    // ]

    image: {
      type: String,
    },

  },
  {
    toJSON: {
      getters: true
    }
  }
);

thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});
thoughtSchema.virtual('voteCount').get(function () {
  return this.vote.length;
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
