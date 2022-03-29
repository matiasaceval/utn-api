const { Router } = require('express');
const path = require('path');

const root = path.resolve(__dirname, '..', '..');

const router = Router();

router.get('/', (req, res) => {
    res.sendFile(path.join(root, 'docsify', 'index.html'));
})

router.get('/endpoints', (req, res) => {
    res.sendFile(path.join(root, 'docsify', 'index.html'));
})

router.get('/guide', (req, res) => {
    res.sendFile(path.join(root, 'docsify', 'index.html'));
})


module.exports = router;