const express = require('express')
require('./db/mongoose.js')
const userRouter = require('../src/router/user')
const taskRouter = require('../src/router/task')

var app = express()

const port = process.env.PORT

const multer = require('multer')

const upload = multer({
    dest: 'images'
})

app.post('/upload', upload.single('upload'),(req,res)=>{
    res.send()
})

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port,()=>{
    console.log('the server is running on port ' + port)
})
