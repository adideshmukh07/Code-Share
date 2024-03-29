const asyncHandler = require("express-async-handler");
const Room = require('../models/roommodel')
const makelink = require('./makelink')
const bcrypt = require("bcryptjs")
const ObjectID = require('mongodb').ObjectId

const createRoom = asyncHandler( async (req, res) => {
    const { title, code, language, isPublic, password } = req.body;
    if(!title || !code || !language){
        res.status(400);
        throw new Error("All fields are mandatory !");
    }
    let link = "abcd"
    while(1){
        link = makelink(5)
        const room = await Room.find({ link: link }).setOptions({ sanitizeFilter: true });
        if(room.length == 0) 
            break;
    }
    const room = await Room.create({
        link: link, 
        title,
        code,
        language,
        isPublic,
        password
    });
    res.status(201).json(room)
});


const getRoom = asyncHandler( async (req, res) => {
    const password = req.query.password
    let room = await Room.find({ link: req.params.id}).setOptions({ sanitizeFilter: true });
    if(room.length == 0){
        // error
        res.status(404);
        throw new Error("Room not Found");
    }
    const hashedpass = room[0]["password"]
    console.log(room);
    if(!hashedpass){
        res.status(200).json(room)
    }
    else{
        bcrypt.compare(password, hashedpass, function(error, match){
            if(!match){
                res.status(403).json('Unauthorized')
            }
            else{
                res.status(200).json(room);
            }
        })
    }
});

const updateRoom = asyncHandler( async (req, res) => {
    const { title, code, language, isPublic, password } = req.body;
    const room = await Room.find({ link: req.params.id }).setOptions({ sanitizeFilter: true });
    // console.log(code);
    if(room.length == 0){
        // error
        res.status(404);
        throw new Error("Room not Found");
    }
    const hashedpass = room[0]["password"]
    if(!hashedpass){
        const ID = room[0]._id;
        const updatedRoom = await Room.findByIdAndUpdate(
            ID,
            {
                link: req.params.id,
                title: title,
                code: code,
                language: language,
                isPublic: isPublic,
                password: hashedpass
            },
            { new: true }
        );
        res.status(200).json(updatedRoom);
    }
    else{
        bcrypt.compare(password, hashedpass, async function(error, match){
            if(error){
                throw error
            }
            else if(!match){
                res.status(403).json('Unauthorized')
            }
            else{
                const ID = room[0]._id;
                const updatedRoom = await Room.findByIdAndUpdate(
                    ID,
                    {
                        link: req.params.id,
                        title: title,
                        code: code,
                        language: language,
                        isPublic: isPublic,
                        password: hashedpass
                    },
                    {new: true}
                );
                res.status(200).json(updatedRoom);
            }
        })
    }
});


module.exports = {createRoom, getRoom, updateRoom }