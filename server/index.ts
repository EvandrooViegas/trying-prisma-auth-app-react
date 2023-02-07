
//imports
import express from "express"
import cors from "cors"
import jwt from "jsonwebtoken"
import { PrismaClient } from '@prisma/client'

//configs
const PORT = 1333
const app = express()
const prisma = new PrismaClient()
app.use(cors())
app.use(express.json())

interface IReqUser {
    email: string,
    password: string,
    name: string
}
//routes
app.get("/test", (_, res) => {
    res.send({
        api: "works"
    })
})

app.post("/register", async(req, res) => {
    const reqUser:IReqUser  = req.body.user
    const userAlreadyExist = await (async() => {
        const user = await prisma.user.findUnique({
        where: {
            email: reqUser.email
        }})
        if(user) return true 
        else return false
    })()
    if(userAlreadyExist) {
        res.send({
            status: "error",
            message: "user already exists"
        })
    } else {
        
        const prismaUser = await prisma.user.create({
            data: reqUser
        })
        const userToken = jwt.sign(prismaUser, "key123")
        res.send({
            status: "ok",
            data: userToken,
            message: "user created successfully"
        })
    }
})

app.post("/login", async(req, res) => {
    const reqUser:IReqUser = req.body.user 
    let token
    const isValidUser = await async function(){
        const foundUser = await prisma.user.findUnique({
            where: {
                email: reqUser.email,
            }
        })
        if(foundUser && foundUser.password === reqUser.password) {
            token = jwt.sign(foundUser, "key123")
            return true 
        }
        else return false
    }() 
    if(isValidUser) {
        res.send({
            message: "User found",
            status: "ok",
            data: token
        })
    } else {
        res.send({
            message: "Wrong credentials",
            status: "error"
        })
    }
})

app.get("/users", async(req, res) => {
    const users = await prisma.user.findMany()
    res.send({
        status: "ok",
        data: users,
        message: "success"
    })
})
//listen
app.listen(PORT, () => {
    console.log(`⛩ Server connected in the port: ${PORT}`)
})
