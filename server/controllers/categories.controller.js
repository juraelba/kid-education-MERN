const mongoose = require('mongoose');
const Category = mongoose.model('Category');

// Create and Save a new User
exports.create = (req, res) => {
    const { body: { category } } = req;
  if(!category.name) {
    return res.status(422).json({
      errors: {
        name: 'is required',
      },
    });
  }

  const finalCategory = new Category(category);

  return finalCategory.save()
  .then(data => {
    res.send(data);
  }).catch(err => {
      res.status(500).send({
          message: err.message || "Some error occurred while creating the category."
      });
  });
};

// Retrieve and return all categories from the database.
exports.findAll = (req, res) => {
  Category.find()
    .then(categories => {
        res.send(categories);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving categories."
        });
    });
};

// Find a single category with a categoryId
exports.findOne = (req, res) => {
    const id = req.params.categoryId;
    return Category.findById(id)
    .then(category => {
      if(!category) {
          return res.status(404).send({
              message: "Category not found with id " + req.params.categoryId
          });            
      }
      res.send(category);
      }).catch(err => {
          if(err.kind === 'ObjectId') {
              return res.status(404).send({
                  message: "Category not found with id " + req.params.categoryId
              });                
          }
          return res.status(500).send({
              message: "Error retrieving category with id " + req.params.categoryId
          });
      });

};

// Update a category identified by the categoryId in the request
exports.update = (req, res) => {
    const { body: { category } } = req;
    // Validate Request
    if(!category.name) {
        return res.status(400).send({
            message: "Category name can not be empty"
        });
    }

    // Find category and update it with the request body
    Category.findByIdAndUpdate(req.params.categoryId, {
        name: category.name
    }, {new: true})
    .then(result => {
        if(!result) {
            return res.status(404).send({
                message: "Category not found with id " + req.params.categoryId
            });
        }
        res.send(result);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Category not found with id " + req.params.categoryId
            });                
        }
        return res.status(500).send({
            message: "Error updating category with id " + req.params.categoryId
        });
    });

};

// Delete a category with the specified categoryId in the request
exports.delete = (req, res) => {
  Category.findByIdAndRemove(req.params.categoryId)
    .then(category => {
        if(!category) {
            return res.status(404).send({
                message: "Category not found with id " + req.params.categoryId
            });
        }
        res.send({message: "Category deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Category not found with id " + req.params.categoryId
            });                
        }
        return res.status(500).send({
            message: "Could not delete category with id " + req.params.categoryId
        });
    });
};
