const mongoose = require('mongoose');
const bcrypt = require("bcryptjs")

const roomSchema = mongoose.Schema({
    link : {
        type: String,
    },
    title : {
        type: String,
        required: [true, "Please add the title"],
    },
    code : {
        type: String,
        required: [true, "Please add the code"],
    },
    language : {
        type: String,
        required: [true, "Please add the language"],
    },
    isPublic : {
        type: Boolean,
        required: [true, "Plaase add the visibility"],
    },
    password : {
        type: String, 
        required: [false],
    }
    },
    {
        timestamps: true,
    }
)

roomSchema.pre("save", function (next) {
    const room = this
    if(!room.password) return next()
    if (this.isModified("password") || this.isNew) {
      bcrypt.genSalt(10, function (saltError, salt) {
        if (saltError) {
          return next(saltError)
        } else {
          bcrypt.hash(room.password, salt, function(hashError, hash) {
            if (hashError) {
              return next(hashError)
            }
  
            room.password = hash
            next()
          })
        }
      })
    } else {
      return next()
    }
})

module.exports = mongoose.model("room", roomSchema)