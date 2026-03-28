const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    const locals ={
        title: 'NodeJs Blogs',
        description: 'A NodeJs Blog App built with Express and MongoDB'
    }
    res.render('index', locals);
});

router.get('/about', (req, res) => {
    res.render('about');
});

module.exports = router;