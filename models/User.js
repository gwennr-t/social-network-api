const { Schema, model } = require('mongoose');

// Schema to create a User model
const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            Trimmed: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/, 'Please enter a valid email address'],
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    }
);

const User = model('user', userSchema);

module.exports = User;