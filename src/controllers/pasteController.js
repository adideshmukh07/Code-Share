const asyncHandler = require("express-async-handler");
const Paste = require('../models/pastemodel')

//@desc  create Paste
//@route POST /Pastes
//@access public
const createPaste = asyncHandler( async (req, res) => {
    const { title, code, language, password } = req.body;
    if(!password){
        password = ""
    }
    const paste = await Paste.create({
        link: "clink",
        title,
        code,
        language,
        password
    });
    res.status(201).json(paste)
});

//@desc  Get Paste
//@route GET /Pastes/:id
//@access public
const getPaste = asyncHandler( async (req, res) => {
    const { password } = req.body
    const paste = await Paste.find({ link: req.params.id, password: password }).setOptions({ sanitizeFilter: true });
    if(!paste){
        // error
        // password wrong ya no item with this link
    }
    res.status(200).json(paste)
});

//@desc  Update Paste
//@route PUT /Pastes/:id
//@access public
const updatePaste = asyncHandler( async (req, res) => {
    res.status(201).json(`Update Pastes ${req.params.id}`)
});

//@desc  delete Paste
//@route DELETE /Pastes/:id
//@access public
const deletePaste = asyncHandler( async (req, res) => {
    res.status(200).json(`Delete Pastes ${req.params.id}`)
});

module.exports = {createPaste, getPaste, updatePaste, deletePaste}