const { Schema, model } = require("mongoose");

//Creating model for user
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      // new to add trim aggretgate to server.js
    },
    email: {
      type: String,
      required: true,
      unique: true,
      //match: [regex here]
      validate: {
        validator: function (v) {
          return /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
        },
      },
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
      getter: true,
    },
    id: false,
  }
);

//Create virtual
userSchema.virtual("friendCount").get(function () {
  return `${this.friends.length}`;
});

// Initialize our model
const User = model("user", userSchema);

module.exports = User;
