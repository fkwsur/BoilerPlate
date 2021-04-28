const router = require('express').Router();
const {searchController : controller} = require('../controller');

router.post('/search', controller.Search);
router.get('/list', controller.List);

module.exports = router;