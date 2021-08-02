const mongoose = require('mongoose');
const passport = require('passport');
const Users = mongoose.model('Users');

// Create and Save a new User
exports.create = (req, res) => {
    const { body: { user } } = req;
  if(!user.email) {
    return res.status(422).json({
      errors: {
        email: 'is required',
      },
    });
  }

  if(!user.password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
      },
    });
  }

  const finalUser = new Users(user);

  finalUser.setPassword(user.password);

  return finalUser.save()
    .then(() => res.json({ user: finalUser.toAuthJSON() }));

};

exports.currentOne = (req, res) => {
    const { payload: { id } } = req;
    return Users.findById(id)
        .then((user) => {
        if(!user) {
            return res.sendStatus(400);
        }
        return res.json({ user: user.toAuthJSON() });
        });
};

// Retrieve and return all users from the database.
exports.findAll = (req, res) => {
    Users.find()
    .then(users => {
        res.send(users);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving users."
        });
    });
};

// Find a single user with a userId
exports.findOne = (req, res) => {
    const id = req.params.userId;
    return Users.findById(id)
        .then((user) => {
        if(!user) {
            return res.sendStatus(400);
        }
        return res.json({ user: user.toAuthJSON() });
        });

};

// Update a user identified by the userId in the request
exports.update = (req, res) => {
    const { body: { user } } = req;
    console.log(user)
    // Validate Request
    if(!user) {
        return res.status(400).send({
            message: "User content can not be empty"
        });
    }

    // Find user and update it with the request body
    Users.findByIdAndUpdate(req.params.userId, {
        name: user.name,
        email: user.email,
        school: user.school,
        language: user.language,
        country: user.country,
        role: user.role
    }, {new: true})
    .then(result => {
        if(!result) {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });
        }
        res.send(result);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Error updating user with id " + req.params.userId
        });
    });

};

// Delete a user with the specified userId in the request
exports.delete = (req, res) => {
    Users.findByIdAndRemove(req.params.userId)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });
        }
        res.send({message: "User deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Could not delete user with id " + req.params.userId
        });
    });

};

exports.login = (req, res, next) => {
    const { body: { user } } = req;
  if(!user.email) {
    return res.status(422).json({
      errors: {
        email: 'is required',
      },
    });
  }

  if(!user.password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
      },
    });
  }

  return passport.authenticate('local', { session: false }, (err, passportUser, info) => {
    if(err) {
      return next(err);
    }

    if(passportUser) {
      const user = passportUser;
      user.token = passportUser.generateJWT();
      return res.json({ user: user.toAuthJSON() });
    }

    return status(400).info;
  })(req, res, next);
}