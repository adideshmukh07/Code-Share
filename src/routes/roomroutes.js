const express = require('express');
const router = express.Router();

const { createRoom, getRoom, updateRoom } = require('../controllers/roomController');


router.route("/").post(createRoom)
router.route("/:id").get(getRoom)
router.route("/:id").put(updateRoom)

module.exports = router