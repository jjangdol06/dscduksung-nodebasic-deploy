const express = require('express');
const db = require('../models');
const router = express.Router();

router.get('/posts', async (req, res, next) => {
    try {
        const posts = await db.PostTable.findAll({
            order: [['createdAt', 'DESC']], // 내림차순 == 최신순
        });
        res.json(posts);
    } catch (e) {
        console.error(e);
        next(e);
    }
});

router.post('/post', async (req, res, next) => {
    try {
        const newPost = await db.PostTable.create({
            title: req.body.title,
            content: req.body.content,
        });

        const post = await db.PostTable.findOne({
            where: { id: newPost.id },
        });

        res.json(post);
    } catch (e) {
        console.error(e);
        next(e);
    }
});

router.put('/post/:id', async (req, res, next) => {
    try {
        const post = await db.PostTable.findOne({
            where: { id: req.params.id }
        });
        if (!post) {
            return res.status(404).send('포스트가 존재하지 않습니다!');
        }

        await db.PostTable.update(
            req.body,
            { where: { id: req.params.id }, returning: true }
        ).then(function(result) {
            res.json(result[1][0]);
        }).catch(function(err) {
            //TODO: error handling
        });
    } catch (e) {
        console.error(e);
        next(e);
    }
});

router.delete('/post/:id', async (req, res, next) => {
    try {
        const post = await db.PostTable.findOne({
            where: { id: req.params.id }
        });
        if (!post) {
            return res.status(404).send('포스트가 존재하지 않습니다!');
        }

        await post.destroy();
        return res.status(200).send(`${req.params.id}번 포스트를 삭제하였습니다.`);
    } catch (e) {
        console.error(e);
        next(e);
    }
});

module.exports = router;