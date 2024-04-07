const { Schema, model } = require('mongoose');

// Schema to create a thought model
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => new Date(createdAtVal).toDateString()
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Reaction'
            }
        ]
    },
    {
        toJSON: {
          getters: true,
        },
        id: false,
      }
);

const Thought = model('thought', thoughtSchema);

module.exports = Thought;