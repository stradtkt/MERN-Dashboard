const express = require('express');
const router = express.Router();
const auth = require('./../../middleware/auth');
const {check, validationResult} = require('express-validator');
const User = require('../../models/User');
const Task = require('../../models/Task');



router.post('/',  [auth, [
    check('title', 'Title for the task cannot be empty')
]], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }
    try {
        const user = await User.findById(req.user.id).select('-password');
        const newTask = new Task({
            title: req.body.title,
            isCompleted: req.body.isCompleted,
            avatar: user.avatar,
            user: req.user.id
        });
        const task = await newTask.save();
        res.json(task);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});


router.get('/', auth, async (req, res) => {
    try {
        const tasks = await Task.find().sort({date: -1});
        res.json(tasks);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});


router.delete('/:id', auth, async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if(task.user.toString() !== req.user.id) {
            return res.status(401).json({msg: 'User not authorized'});
        }
        if(!task) {
            return res.status(404).jsson({msg: 'Task not found'});
        }
        await task.remove();
        res.json({msg: 'Task removed'});
    } catch (error) {
        console.error(error.message);
        if(error.kind === 'ObjectId') {
            return res.status(404).json({msg: 'Task not found'});
        }
        res.status(500).send('Server Error');
    }
})

router.get('/:id', auth, async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if(!task) {
            return res.status(404).json({msg: 'Task not found'});
        }
        res.json(task);
    } catch (error) {
        console.error(error.message);
        if(error.kind === 'ObjectId') {
            return res.status(404).json({msg: 'Task not found'});
        }
        res.status(500).send('Server Error');
    }
});

router.post('/comment/:id', [auth, [
    check('text', 'Comment text is required')
]], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }
    try {
        const user = await User.findById(req.user.id).select('-password');
        const task = await Task.findById(req.params.id);
        const newComment = {
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
        };
        task.comments.unshift(newComment);
        await task.save();
        res.json(task.comments);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});


router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        const comment = task.comments.find(comment => comment === req.params.comment_id);
        if(!comment) {
            return res.status(404).json({msg: 'Comment does not exist'});
        }
        if(comment.user.toString() !== req.user.id) {
            return res.status(401).json({msg: 'User not authorized'});
        }
        const remove = task.comments
            .map(c => c.user.toString())
            .indexOf(req.user.id);
        task.comments.splice(remove, 1);
        await task.save();
        res.json(post.comments);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});


router.put('/:id/completed', auth, async (req, res) => {
    try {
        const task = Task.findById(req.params.id);
        if(task.isCompleted === false) {
            task.isCompleted = true;
            await task.save();
        }
    } catch (error) {
        console.error(error.message);
        if(error.kind === 'ObjectId') {
            return res.status(404).json({msg: 'Task not found'});
        }
        res.status(500).send('Server Error');
    }
});





module.exports = router;