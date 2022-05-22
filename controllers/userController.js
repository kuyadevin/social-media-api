const { Thought, User } = require("../models");

module.exports = {
  //Get all users
  getUsers(req, res) {
    User.find()
      .then((users) => res.json(courses))
      .catch((err) => res.status(500).json(err));
  },
  // Get a specific user
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select("-__v")
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with that ID" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Create a user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
};
