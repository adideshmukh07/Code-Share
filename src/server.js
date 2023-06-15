const express = require('express')
const app = express()
const env = require('dotenv').config()
const connectDb = require('./config/dbConnection')

connectDb()
const port = process.env.PORT || 5000

app.use(express.json())
app.use('/', require('./routes/pasteroutes'))


app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})
