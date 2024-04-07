const { Schema, model } = require('mongoose');

// Reaction schema - will not be model
const reactionSchema = new Schema (
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Schema.Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        }
    },
    {
        toJSON: {
          getters: true,
        },
        id: false,
      }
);

const Reaction = model('reaction', reactionSchema);

module.exports = Reaction;