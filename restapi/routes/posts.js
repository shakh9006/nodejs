const express = require('express')
const router = express.Router()
const Post = require('../models/Posts')

router.get('/', async (req, res) => {
    try {
        const posts = await Post.find()
        res.send(posts)
    } catch (e) {
        res.json({
            status: false,
            message: e,
        })
    }
})

router.post('/', (req, res) => {
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    })

    post.save()
        .then(data => res.send(data))
        .catch(err => res.json({message: err}))
})

router.get('/:postId', async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId)
        res.send(post)
    } catch (e) {
        res.json({
            success: false,
            message: e,
        })
    }

})

router.delete('/:postId', async (req, res) => {
    try {
        const removedPost = await Post.remove({_id: req.params.postId})
        await res.json({
            success: true,
            message: `The post has been removed successfully!`,
        })
    } catch (e) {
        await res.json({
            success: false,
            message: e,
        })
    }
})

router.patch('/:postId', async (req, res) => {
    try {
        const updatedPost = await Post.updateOne(
            {_id: req.params.postId},
            {$set: {"description": req.body.description}}
        )

        await res.json({
            success: true,
            message: 'The Post updated successfully!',
            updatedPost,
        })

    } catch (e) {
        await res.json({
            success: false,
            message: e,
        })
    }
})

module.exports = router