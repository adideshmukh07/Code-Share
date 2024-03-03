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
    // continue from here 
    socket.on('joinRoom',(roomID)=>{
        socket.join(roomID);
    })
    socket.on('code-change',(roomID,newCode)=>{
        socket.broadcast.to(roomID).emit('code-update',newCode);
    })
})

app.use(cors())
connectDb()
const port = process.env.PORT || 4000

app.use(errorHandler);
app.use(express.json())

app.use('/', require('./routes/pasteroutes'))
app.use('/rooms', require('./routes/roomroutes'))


server.listen(port, () => {
    console.log(`Server running on port ${port}`)
})
