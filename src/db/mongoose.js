const mongoose = require('mongoose')

mongoose.connect(process.env.MONGOOSE_URL,{
    useNewUrlParser: true,
    useCreateIndex: true,
    usefindAndModify: false
})

