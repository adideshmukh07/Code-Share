const asyncHandler = require("express-async-handler");
const Paste = require('../models/pastemodel')
const makelink = require('./makelink')
//@desc  create Paste
//@route POST /Pastes
//@access public
const createPaste = asyncHandler( async (req, res) => {
    const { title, code, language, password } = req.body;
    let link
    while(1){
        link = makelink(10)
        const paste = await Paste.find({ link: link }).setOptions({ sanitizeFilter: true });
        if(paste.length == 0) 
            break;
    }
    const paste = await Paste.create({
        link: link,
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
    const { title, code, language, password } = req.body
    const paste = await Paste.find({ link: req.params.id, password: password }).setOptions({ sanitizeFilter: true });
    if(!paste){
        // error
        // password wrong ya no item with this link
        res.status(404);
        throw new Error("Paste not Found");
    }
    const ID=paste[0]._id;
    console.log(paste)
    const updatedPaste= await Paste.findByIdAndUpdate(
        ID,
        {
            link: req.params.id,
            title: title,
            code: code,
            language: language,
            password: password
        },
        {new: true}
    );
    res.status(200).json(updatedPaste);
});

//@desc  delete Paste
//@route DELETE /Pastes/:id
//@access public
const deletePaste = asyncHandler( async (req, res) => {
    const { password } = req.body
    const paste = await Paste.find({ link: req.params.id, password: password }).setOptions({ sanitizeFilter: true });
    if(!paste){
        // error
        // password wrong ya no item with this link
        res.status(404);
        throw new Error("Paste not Found");
    }
    await Paste.deleteOne();
    res.status(200).json(paste);
});

module.exports = {createPaste, getPaste, updatePaste, deletePaste}