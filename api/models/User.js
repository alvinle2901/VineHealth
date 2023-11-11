const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter your Name']
    },
    email: {
      type: String,
      required: [true, 'Please enter your email']
    },
    password: {
      type: String,
      required: [true, 'Please enter your password']
    },
    avatar: {
      public_id: {
        type: String,
        required: [true, 'Please upload one profile picture']
      },
      url: {
        type: String,
        required: [true, 'Please upload one profile picture']
      }
    },
  },
  { timestamps: true }
)

// hash password
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }
  this.password = await bcrypt.hash(this.password, 10)
})

// jwt token
userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  })
}

// compare password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

module.exports = mongoose.model('User', userSchema)
