const express = require('express');
const router = express.Router();

const { createRoom, getRoom} = require('../controllers/roomController');


router.route("/").post(createRoom)
router.route("/:id").get(getRoom)

module.exports = router