const User = require('../model/user')

// read all users
const readAll =   async (req,res) => {
        let users = await User.find()

    res.status(200).json({ status: true,length: users.length, users })   
}

// read single user
const readSingle = async (req,res) => {
    // to read any ref from router parameter
    let { userId } = req.params 

    let single = await User.findById({ _id: userId })
        if(!single)
            return res.status(404).json({ status: false, msg: `Requested id not found`})

    res.status(200).json({ status: true, user: single })   
}

// create new user
const createUser = async (req,res) => {
    // reading the incoming data (urlencoded/json)
    let data = req.body 

    // check for existsting data
    // existing email 
    let extUser = await User.findOne({ email: data.email })
        if(extUser)
            return res.status(400).json({ status: false, msg: `user email ${data.email} already exists`})

        // existing mobile number
    let extMobile = await User.findOne({ mobile: data.mobile })
        if(extMobile)
            return res.status(400).json({ status: false, msg: `user mobile ${data.mobile} already registered`})

        // to create new user data
    let newUser = await User.create(data)
        // final response
    res.status(201).json({ status: true,msg: "New user created successfully", newUser })   
}
// update user
const updateUser = async (req,res) => {
     let { id } = req.params

     // weather user id exists or not
     let extUser = await User.findById(id)
        if(!extUser)
            return res.status(404).json({ status: false, msg: `Requested user id not found`})

        await User.findByIdAndUpdate({ _id: id }, req.body)
            
    res.status(201).json({ status: true,msg: "successfully updated user data"})   
}

// delete user
const deleteUser = async (req,res) => {
    let { id } = req.params

    // weather user exists or not
    let extUser = await User.findById(id)
        if(!extUser)
            return res.status(404).json({ status: false, msg: `Requested user id not found`})

     await User.findByIdAndDelete(id)

    res.status(201).json({ status: true,msg: "Successfully deleted existing user data"})   
}

module.exports = { readAll, readSingle, createUser, updateUser, deleteUser}