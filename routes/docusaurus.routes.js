const express = require("express");
const router = express.Router();

const controller = require('../controllers/docusaurus.controller');

router.post('/', controller.atEvent)

module.exports = router;