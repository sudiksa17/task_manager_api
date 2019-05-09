const express = require('express')
const tasks = require('../models/task.js')
const auth = require('../middleware/auth')
const router = new express.Router()

router.get('/task',auth,async (req,res)=>{
   const match = {}
   const sort= {}

   if(req.query.completed){
      match.completed = req.query.completed ==='true'
   }

   if(req.query.sortBy){
      const parts = req.query.sortBy.split(':')
      sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
   }

    try{
       await req.user.populate({
          path: 'tasks',
          match,
          options: {
             limit : parseInt(req.query.limit),
             skip : parseInt(req.query.skip),
             sort
          }
       }).execPopulate()
       res.status(201).send(req.user.tasks)
    }catch(e){
       res.status(500).send()
    }
  
    // tasks.find({}).then((tasks)=>{
    //    res.send(tasks)
    // }).catch((e)=>{
    //    res.status(500).send()
    // })
 })
 
 router.get('/task/:id',auth,async (req,res)=>{
  const _id = req.params.id
  try{
     const task = await tasks.findOne({_id, owner:req.user._id})
     if(!task){
       return res.status(404).send()
    }
    res.send(task)
  }catch(e){
    res.status(500).send()
  }
 //  tasks.findById(_id).then((task)=>{
 //     if(!task){
 //        return res.status(404).send()
 //     }
 //     res.send(task)
 //  }).catch((e)=>{
 //     res.status(500).send()
 //  })
 })
 
 router.post('/task', auth, async (req,res)=>{
     //const task = new tasks(req.body)

     const task = new tasks ({
        ...req.body,
        owner: req.user._id
     })
     try{
       await task.save()
       res.status(201).send(task)
     }catch(e){
       res.status(400).send(e)
     }
    //  task.save().then(()=>{
    //       res.send(task)
    //  }).catch((e)=>{
    //     res.status(400).send(e)
    //  })
  })
 
  router.patch('/task/:id',auth,async (req,res)=>{
     
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description','completed']
    const isValidOperation = updates.every((update)=>allowedUpdates.includes(update))
 
    if(!isValidOperation){
       return res.status(400).send('error: invalid updates')
    }
    try{
      const task = await tasks.findOne({_id:req.params.id,owner: req.user._id})

      if(!task){
         return res.status(404).send()
      }
      updates.forEach((update)=>{
         task[update]= req.body[update]
      })
      await task.save()

      // const task = await tasks.findByIdAndUpdate(req.params.id,req.body,{new: true,runValidators: true})
 
     
       res.send(task)
    }catch(e){
       res.status(400).send()
    }
  })
 
  router.delete('/task/:id',auth,async (req,res)=>{
    try{
       const task = await tasks.findOneAndDelete({_id:req.params.id,owner: req.user._id})
 
       if(!task){
          return res.status(404).send()
       }
 
       res.send(task)
    }catch(e){
       res.status(500).send()
    }
 })

 module.exports =  router