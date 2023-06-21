const mongoose = require('mongoose')

const connectDb = async () => {
    try{
        const connect = await mongoose.connect('mongodb+srv://gyash9991:G6ZeajVHGlPmQ3KN@cluster0.qslaotu.mongodb.net/?retryWrites=true&w=majority')
        console.log("Database Connected: ", connect.connection.host, connect.connection.name)
    } catch(err) {
        console.log(err);
        process.exit(1);
    }
};

module.exports = connectDb;