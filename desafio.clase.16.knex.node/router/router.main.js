// express y router
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

router.use(express.json());
router.use('/', express.static('public'));
router.use(bodyParser.urlencoded({ extended: false }));

router.get('/', async (req, res) => {
    try {
        res.render('../public/table');
    }
    catch (e) {
        console.log(e.message);
    }
})

module.exports = { router };