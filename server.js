const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
dotenv.config()

const app = express()

const userSchema = new mongoose.Schema({
    email: {type: String, unique: true},
    password: {type: String}
})
const User = mongoose.model("User", userSchema)



app.post('/login', async(req, res)=> {
    try {
        const {email, password} = req.body;
        if(!email) return res.status(401).json({message: "Email cannot be empty"})
        if(!password) return res.status(401).json({message: "Password cannot be empty"})
        const existingUser = await User.findOne({email})
        if(!existingUser) return res.status(401).json({message: "User doesn't exist"})
        res.status(201).json({message: "Login Successful"})
    } catch (error) {
        res.status(500).json({error})
    }
})


const PORT = process.env.PORT || 8080

const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("MongoDB is connected")
    } catch (error) {
        console.log(error)
    }
}


connectDB()
.then((
    app.listen(PORT, ()=>{
        console.log(`Server is running at ${PORT}`)
    })
))
.catch(err=> console.log(err.message))