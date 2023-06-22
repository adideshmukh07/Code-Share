const asyncHandler = require("express-async-handler");
const Paste = require('../models/pastemodel')
const makelink = require('./makelink')
const bcrypt = require("bcryptjs")
const ObjectID = require('mongodb').ObjectId;


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
    const paste = await Paste.find({ link: req.params.id}).setOptions({ sanitizeFilter: true });
    if(paste.length == 0){
        // error
        res.status(404).json("Not found");
        throw new Error("Paste not Found");
    }
    const hashedpass = paste[0]["password"]
    bcrypt.compare(password, hashedpass, function(error, match){
        if(match){
            res.status(200).json(paste)
        }
        else{
            res.status(403).json("Access Denied")
        }
    })
});

//@desc  Update Paste
//@route PUT /Pastes/:id
//@access public
const updatePaste = asyncHandler( async (req, res) => {
    const { title, code, language, password } = req.body
    const paste = await Paste.find({ link: req.params.id}).setOptions({ sanitizeFilter: true });
    if(paste.length == 0){
        // error
        res.status(404).json("Not found");
        throw new Error("Paste not Found");
    }
    const hashedpass = paste[0]["password"] 
    bcrypt.compare(password, hashedpass, async function(error, match){
        if(error){
            throw error
        }
        else if(!match){
            res.status(403).json("Access Denied")
        }
        else{
            const ID=paste[0]._id;
            const updatedPaste= await Paste.findByIdAndUpdate(
                ID,
                {
                    link: req.params.id,
                    title: title,
                    code: code,
                    language: language,
                    password: hashedpass
                },
                {new: true}
            );
            res.status(200).json(updatedPaste);
        }
    })
});

//@desc  delete Paste
//@route DELETE /Pastes/:id
//@access public
const deletePaste = asyncHandler( async (req, res) => {
    const { password } = req.body
    const paste = await Paste.find({ link: req.params.id}).setOptions({ sanitizeFilter: true });
    if(paste.length == 0){
        // error
        res.status(404).json("Not found");
        throw new Error("Paste not Found");
    }
    const hashedpass = paste[0]["password"]
    bcrypt.compare(password, hashedpass, async function(error, match){
        if(error){
            throw error  
        }
        else if(!match){
            res.status(403).json("Access Denied")
        }
        else{
            const ID = paste[0]._id 
            Paste.deleteOne({_id:new  
                ObjectID(ID)}).then(data=>{
                console.log("deleted")
            })
            res.status(200).json("Deleted")
        }
    })
    
});

module.exports = {createPaste, getPaste, updatePaste, deletePaste}