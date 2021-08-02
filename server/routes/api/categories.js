const router = require('express').Router();
const auth = require('../auth');
const categories = require('../../controllers/categories.controller.js');

//POST new category route (required, only authenticated users have access)
router.post('/', [auth.required, auth.isAdmin], categories.create);
// Retrieve all categories
router.get('/', auth.optional, categories.findAll);
//GET current route (required, only authenticated users have access)
router.get('/:categoryId', auth.required, categories.findOne);
// Update a Category with categoryId
router.post('/update/:userId', [auth.required, auth.isAdmin], categories.update);
// Delete a Category with categoryId
router.delete('/:categoryId', [auth.required, auth.isAdmin], categories.delete);

module.exports = router;