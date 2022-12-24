const { Thought, User } = require('../models')

const thoughtControl = { 
    getAllThoughts(req, res) {
      Thought.find({})
        .select('-__v')
        .then((dbThoughtData) => res.json(dbThoughtData))
        .catch((err) => {
          console.log(err)
          res.status(500).json(err)
        })
    },
    createThought({ params, body }, res) {
        Thought.create(body)
          .then(({ _id }) => {
            return User.findOneAndUpdate(
              { _id: body.userId },
              { $push: { thoughts: _id } },
              { new: true },
            )
          })
          .then((dbUserData) => {
            if (!dbUserData) {
              res.status(404).json({ message: 'No user found with this username!' })
              return
            }
            res.json(dbUserData)
          })
          .catch((err) => res.json(err))
      },