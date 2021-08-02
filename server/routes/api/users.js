const router = require('express').Router();
const auth = require('../auth');
const users = require('../../controllers/users.controller.js');

//POST new user route (optional, everyone has access)
router.post('/', auth.optional, users.create);
// Retrieve all users
router.get('/', auth.optional, users.findAll);
//GET current route (required, only authenticated users have access)
router.get('/current', auth.optional, users.currentOne);
//GET current route (required, only authenticated users have access)
router.get('/:userId', auth.optional, users.findOne);
// Update a User with userId
router.post('/update/:userId', auth.optional, users.update);
// Delete a User with userId
router.delete('/:userId', auth.optional, users.delete);
//POST login route (optional, everyone has access)
router.post('/login', auth.optional, users.login);

module.exports = router;