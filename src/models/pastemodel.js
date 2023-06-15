const mongoose = require('mongoose');

const pasteSchema = mongoose.Schema({
    link : {
        type: String,
    },
    title : {
        type: String,
        required: [true, "Please add the title"],
    },
    code : {
        type: String,
        required: [true, "Please add the code"],
    },
    language : {
        type: String,
        required: [true, "Please add the language"],
    },
    password : {
        type: String, 
        required: [false],
    }
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model("paste", pasteSchema)