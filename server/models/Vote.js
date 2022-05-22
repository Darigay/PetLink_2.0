const { Schema } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const voteSchema = new Schema(
  {
    user_id: {
      type: String,
      required: true,
    },

<<<<<<< HEAD
    // voteId: {
    //   type: ID,
    //   required: true,
    // },
=======
    post_id: {
      type: String,
      required: true,
    },
>>>>>>> parent of 5c7901b (minor fixes)

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
