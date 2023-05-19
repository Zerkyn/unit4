const { User } = require('../models/user')
const { Post } = require('../models/post')


module.exports = {
    getAllPosts: async (req, res) => {
        try {
            const posts = await Post.findAll({
                where: { privateStatus: false },
                include: [{
                    model: User,
                    required: true,
                    attributes: [`username`]
                }]
            })
            res.status(200).send(posts)
        } catch (error) {
            console.log('ERROR IN getAllPosts')
            console.log(error)
            res.sendStatus(400)
        }
    },
    getCurrentUserPosts: async (req, res) => {
        try {
            const { userId } = req.params
            console.log(userId)
            const posts = await Post.findAll({
                where: { userId: userId },
                include: [{
                    model: User,
                    required: true,
                    attributes: [`username`]
                }]
            })
            res.status(200).send(posts)
        } catch (error) {
            console.log('ERROR IN getCurrentUserPosts')
            console.log(error)
            res.sendStatus(400)
        }
    },
    addPost: async (req, res) => {
        try {
            const { title, content, status, userId } = req.body
            console.log(id)
            await Post.create({ title: title, content: content, privateStatus: status, userId: id })
            res.sendStatus(200)
        }
        catch (error) {
            console.log('error adding post')
            console.log(error)
            res.sendStatus(400)
        }
    },
    editPost: async (req, res) => {
        try {
            const { id } = req.params
            const { status } = req.body
            await Post.update({ privateStatus: status }, {
                where: { id: +id }
            })
            res.sendStatus(200)
        }
        catch (error) {
            console.log('error with edit')
            console.log(error)
            res.sendStatus(400)
        }
    },
    deletePost: async (req, res) => {
        try {
            const { id } = req.params
            await Post.destroy({ where: { id: +id } })
            res.sendStatus(200)
        }
        catch (error) {
            console.log('delete post error')
            console.log(error)
            res.sendStatus(400)
        }
    }
}