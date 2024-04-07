const router = require('express').Router();

const (
    getThoughts,
    createThoughts,
    getSingleThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction,
) = require ('../../controllers/thoughtController.js');

// /api/thoughts
router.route('/').get(getThoughts).post(createThought);

// /api/thoughts/:thoughtId
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);

// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(addReaction).delete(deleteReaction);

module.exports = router;