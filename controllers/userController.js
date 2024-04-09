const { UserId } = require('mongoose').Types;
const { User, Thought } = require('../models');

module.exports = {
    // get all users
    async getUsers(req, res) {
        try {
          const users = await User.find();
    
          const userObj = {
            users,
            headCount: await headCount(),
          };
    
          res.json(userObj);
        } catch (err) {
          console.log(err);
          return res.status(500).json(err);
        }
      },
    // get a single user by its _id and populated thought and friend data
    async getSingleUser(req, res) {
        try {
          const user = await User.findOne({ _id: req.params.userId })
            .select('-__v');
    
          if (!user) {
            return res.status(404).json({ message: 'No user with that ID' })
          }
    
          res.json({
            user,
            grade: await grade(req.params.userId),
          });
        } catch (err) {
          console.log(err);
          return res.status(500).json(err);
        }
      },
    // create a new user
    async createUser(req, res) {
        try {
          const user = await User.create(req.body);
          res.json(user);
        } catch (err) {
          res.status(500).json(err);
        }
      },

    // update a user by its _id

    // remove a user by its _id
    async deleteUser(req, res) {
        try {
          const user = await User.findOneAndRemove({ _id: req.params.userId });
    
          if (!user) {
            return res.status(404).json({ message: 'No such user exists' });
          }

          res.json({ message: 'User successfully deleted' });
        } catch (err) {
          console.log(err);
          res.status(500).json(err);
        }
      },

    // add a new friend toa user's friend list
    async addFriend(req, res) {
        console.log('You added a friend!');
        console.log(req.body);
    
        try {
          const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.body } },
            { runValidators: true, new: true }
          );
    
          if (!user) {
            return res
              .status(404)
              .json({ message: 'No user found with that ID :(' });
          }
    
          res.json(user);
        } catch (err) {
          res.status(500).json(err);
        }
      },

    // remove a friend by its _id
    async removeFriend(req, res) {
        try {
          const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friend: { friendId: req.params.friendId } } },
            { runValidators: true, new: true }
          );
    
          if (!user) {
            return res
              .status(404)
              .json({ message: 'No user found with that ID :(' });
          }
    
          res.json(user);
        } catch (err) {
          res.status(500).json(err);
        }
      },
}