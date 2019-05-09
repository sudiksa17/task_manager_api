const express = require('express')
const User = require('../models/user.js')
const auth = require('../middleware/auth')
const multer = require('multer')
const sharp = require('sharp')
const {sendWelcomeEmail,sendCancelEmail} = require('../emails/account')
const router = new express.Router()


router.get('/user/me',auth,async(req,res)=>{
   res.send(req.user)
})

 router.get('/user/:id',async (req,res)=>{
    const _id =  req.params.id
 
    try{
      const user = await User.findById(_id)
      if(!user){
             return res.status(404).send()
          }
          res.send(user)
    }catch(e){
       res.status(500).send()
    }
 })
 
 router.post('/user',async (req,res)=>{
    const user = new User(req.body)
    
     try{
       await user.save()
       sendWelcomeEmail(user.email,user.name)
       const token = await user.generateAuthToken()       
       res.status(201).send({user,token})
     }catch(e){
       res.status(400).send()
     }
 
 })
 
//for logging in user
 router.post('/user/login',async (req,res)=>{
    try{
       
        const user = await User.findByCredientials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
       
        res.send({user,token})
    
    }catch(e){
         res.status(400).send()
    }
 })

 router.post('/user/logout',auth,async (req,res)=>{
    try{
        req.user.tokens = req.user.tokens.filter((token)=>{
           return token.token !== req.token
        })
        await req.user.save()
        res.send()
    }catch(e){
        res.status(500).send()
    }
 })

 router.patch('/user/me',auth,async (req,res)=>{
 
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name','email','password','age']
    const isValidOperation = updates.every((update)=>allowedUpdates.includes(update))
 
    if(!isValidOperation){
       return res.status(400).send('error: invalid updates')
    }
    try{
      // const user = await User.findById(req.params.id)
      updates.forEach((update)=> req.user[update]= req.body[update])
      await req.user.save()

      // const user = await User.findByIdAndUpdate(req.params.id,req.body,{new: true,runValidators: true})
 
      //  if(!user){
      //     return res.status(404).send()
      //  }
       res.send(req.user)
    }catch(e){
       res.status(400).send()
    }
 })
 
 router.delete('/user/me',auth,async (req,res)=>{
    try{
       await req.user.remove()
       sendCancelEmail(req.user.email,req.user.name)
       res.send(req.user)
    }catch(e){
       res.status(500).send()
    }
 })


 const avatar = multer({
  
    limits:{
       fileSize: 1000000
    },
    fileFilter(req,file,cb){
       if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
          return cb(new Error('Please upload an image.'))
       }
       cb(undefined,true)
    }
 })
 router.post('/user/me/avatar',auth, avatar.single('avatar'),async(req,res)=>{
   const buffer = await sharp(req.file.buffer).resize({width:250,height:250}).png().toBuffer()
   req.user.avatar = buffer
   await req.user.save()
    res.send()
 },(error,req,res,next)=>{
      res.status(400).send({error: error.message})
 })

router.delete('/user/me/avatar',auth, async(req,res)=>{
    req.user.avatar = undefined
    await req.user.save()
    res.send()
})

router.get('/user/:id/avatar',async(req,res)=>{
   try{
      const user = await User.findById(req.params.id)

      if(!user||!user.avatar){
         throw new Error()
      }

      res.set('Content-Type','image/png')
      res.send(user.avatar)
   }catch(e){
      res.status(404).send()
   }
})

 module.exports = router