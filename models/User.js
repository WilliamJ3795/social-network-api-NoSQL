
const moment = require('moment')
const { Schema, model } = require('mongoose')

const UserSchema = new Schema(
    {
      username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        // Regex (regular expression) used to find all characters for an email address
        match: [
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
          'Enter a valid email address',
        ],
      },
      thoughts: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Thought',
        },
      ],
      friends: [
        {
          type: Schema.Types.ObjectId,
          ref: 'User',
        },
      ],
    },
    {
      //we want virtuals to be included with our response
  
      toJSON: {
        virtuals: true,
        getters: true,
      },
      id: false,
    },
  )
  
const User = model('User', UserSchema)

UserSchema.virtual('friendCount').get(function () {
  return this.friends.lenght
})

module.exports = User