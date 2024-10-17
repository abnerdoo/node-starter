const express = require('express');
const router = express.Router();
const todoController = require('../../controllers/Todo/TodoController');
const middleware = require('../../middlewares/jwt')

router.use(middleware)
router.post('/', todoController.createTodo);
router.get('/', todoController.getTodos);
router.get('/:id', todoController.findById)
router.put('/:id', todoController.updateTodo);
router.delete('/:id', todoController.deleteTodo);

module.exports = router;