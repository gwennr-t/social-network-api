const { User, Thought } = require('../models');

module.exports = {
    // get all thoughts
    async getThoughts(req, res) {
        try {
          const thoughts = await Thought.find().populate('users');
          res.json(thoughts);
        } catch (err) {
          res.status(500).json(err);
        }
    },

    // get a single thought by its _id
    async getSingleThought(req, res) {
        try {
          const thought = await Thought.findOne({ _id: req.params.thoughtId })
            .populate('users');
    
          if (!thought) {
            return res.status(404).json({ message: 'No thought with that ID' });
          }
    
          res.json(thought);
        } catch (err) {
          res.status(500).json(err);
        }
    },

    // create a new thought
    async createThought(req, res) {
        try {
          const thought = await Thought.create(req.body);
          res.json(thought);
        } catch (err) {
          console.log(err);
          return res.status(500).json(err);
        }
    },

    // update a thought by its _id
    async updateThought(req, res) {
        try {
          const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
          );
    
          if (!thought) {
            res.status(404).json({ message: 'No thought with this id!' });
          }
    
          res.json(thought);
        } catch (err) {
          res.status(500).json(err);
        }
    },

    // remove a thought by its _id
    async deleteThought(req, res) {
        try {
          const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
    
          if (!thought) {
            res.status(404).json({ message: 'No thought with that ID' });
          }
    
          await User.deleteMany({ _id: { $in: thought.users } });
          res.json({ message: 'Thought and users deleted!' });
        } catch (err) {
          res.status(500).json(err);
        }
    },

    // create a reaction stored in a single thoughts reactions array field
    
    // pull and remove a reaction by the reaction's reactionId value

}