// const userRouter = require('express').Router()

const express = require('express')
const userRoute = express.Router()

const { readAll, createUser, updateUser, deleteUser, readSingle } = require('../controller/userController')


// read all users => get request method /api/user/all
userRoute.get(`/all`, readAll)

// read single -> /api/user/single/123
userRoute.get(`/single/:userId`, readSingle)

// create new user => post request  -> /api/user/create
userRoute.post(`/create`, createUser)

// update existing user => patch request -> /api/user/update/123
userRoute.patch(`/update/:id`, updateUser)

// delete existing user => delete request -> /api/user/delete/123
userRoute.delete(`/delete/:id`, deleteUser)

module.exports = userRoute