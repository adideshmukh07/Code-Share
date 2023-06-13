const express = require('express');
const router = express.Router();
const { createPaste, getPaste, updatePaste, deletePaste} = require('../controllers/pasteController');


// router.route("/").get(getAnnouncements)
//Create Paste
router.route("/").post(createPaste)

router.route("/:id").get(getPaste)

router.route("/:id").put(updatePaste)

router.route("/:id").delete(deletePaste)

module.exports = router