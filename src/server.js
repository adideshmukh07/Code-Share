const cors = require('cors')
const express = require('express')
const app = express()
const {Server} = require('socket.io');
const env = require('dotenv').config()
const connectDb = require('./config/dbconnection')
const errorHandler = require("./middleware/errorhandler");
const http = require('http');

let server = http.createServer(app);
let io = new Server(server,{
    cors:{
        origin:"*"
    }
});

io.on('connection',(socket)=>{
    console.log(socket.id);
    // continue from here 
    socket.on('code-change',(newCode)=>{
        socket.broadcast.emit('code-update',newCode);
    })
})
app.use(cors())
connectDb()
const port = process.env.PORT || 4000

app.use(errorHandler);
app.use(express.json())
app.use('/', require('./routes/pasteroutes'))


server.listen(port, () => {
    console.log(`Server running on port ${port}`)
})
