const { Schema } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const voteSchema = new Schema(
  {
    user_id: {
      type: String,
      required: true,
    },

    // voteId: {
    //   type: ID,
    //   required: true,
    // },

    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp),
    }
  },
  {
    toJSON: {
      getters: true,
    }
  }
);

module.exports = voteSchema;
