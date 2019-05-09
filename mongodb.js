//CRUD operations

// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient
// const ObjectID = mongodb.ObjectID

const {MongoClient, ObjectID} = require('mongodb')//same as above three lines

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

// const id = new ObjectID()
// console.log(id)
// console.log(id.getTimestamp())

MongoClient.connect(connectionURL,{useNewUrlParser:true},(error,client)=>{
    if(error){
        return console.log("cannot connect to database")
    }
    
    const db =  client.db(databaseName)

    //CREATE FUNCTION
    // db.collection('users').insertOne({
    //     name: 'Sudiksha',
    //     age: 21
    // })

    // db.collection('users').insertMany([{
    //     name: 'Sudi',
    //     age: 25
    // },{
    //     name: 'Suddu',
    //     age: 28
    // }],(error,result)=>{
    //     if(error){
    //         return console.log('unable to insert')
    //     }
    //     console.log(result.ops)
    // })


    // db.collection('tasks').insertMany([
    //     {
    //         description: 'washing',
    //         completed: true
    //     },{
    //         description: 'ironing',
    //         completed: false
    //     },{
    //         description: 'talking',
    //         completed: true
    //     }
    // ],(error,result)=>{
    //     if(error){
    //         return console.log('unable to insert documents')
    //     }
    //     console.log(result.ops)
    // })

    //READ FUNCTION
    // db.collection('users').findOne({name:'Suddu'},(error,user) => {
    //     if(error){
    //         return console.log('unable to execute the query')
    //     }

    //     console.log(user)
    //     })
    // db.collection('users').find({age:21}).toArray((error,users)=>{
    //     console.log(users)
    // })
    // db.collection('users').find({age:21}).count((error,count)=>{
    //     console.log(count)
    // })
    // db.collection('tasks').findOne({_id: new ObjectID("5c91125a4e5a3d2d0c359d9d")},(error,user)=>{
    //     if(error){
    //         return console.log('unable to execute query')
    //     }
    //     console.log(user)
    // })
    // db.collection('tasks').find({completed:false}).toArray((error,users)=>{
    //     if(error){
    //         return console.log('unable to execute query')
    //     }
    //     console.log(users)
    // })

    //UPDATE FUNCTION
    // db.collection('users').updateOne({
    //     _id: new ObjectID("5c911027d825632e78ff6f73")
    // },{
    //     $inc: {
    //         age: 4
    //     }
    // }).then((result)=>{
    //     console.log(result)
    // }).catch((error)=>{
    //     console.log(error)
    // })

    // db.collection('tasks').updateMany({
    //     completed: false
    // },{
    //     $set: {
    //         completed: true
    //     }
    // }).then((result)=>{
    //     console.log(result)
    // }).catch((error)=>{
    //     console.log(error)
    // })

    //DELETE FUNCTION
    // db.collection('users').deleteMany({
    //     age:21
    // }).then((result)=>{
    //     console.log(result)
    // }).catch((error)=>{
    //     console.log(error)
    // })

    db.collection('tasks').deleteMany({
        description:'talking'
    }).then((result)=>{
        console.log(result)
    }).catch((error)=>{
        console.log(error)
    })
})